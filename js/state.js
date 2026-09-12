// ========================================================
// state.js - Device Registry & State Management
// ========================================================

var IP_REGEX = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

// Global UI and Discovery State
var isDiscovering = false;

// Cloud Discovery Configuration (Cloudflare Pages Functions with fallback)
var RTDB_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? "https://bms-project-9008-default-rtdb.firebaseio.com"
    : window.location.origin;
var discoveryEpoch = 0; // Monotonic epoch counter to eliminate race conditions
var activeCloudAbortController = null;
var initialCloudPromise = null;
var inFlightCloudPromise = null;
var lastCloudFetchTime = 0;
var lastCloudSuccessData = null; // { ip, mac, version, ts }
var CLOUD_CACHE_TTL_MS = 15000; // 15 seconds in-memory cooldown for redundant fetches
var BOARD_FRESH_THRESHOLD_MS = 4 * 60 * 60 * 1000; // 4 hours freshness threshold for automotive trips

function cleanMac(mac) {
            return (mac || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        }

function formatMac(mac) {
            const clean = cleanMac(mac);
            if (clean.length === 12) {
                return clean.match(/.{1,2}/g).join(':');
            }
            return mac || '--';
        }

function isValidIp(value) {
            return IP_REGEX.test((value || '').trim());
        }

function getDeviceRegistry() {
            let registry = {};
            try {
                const raw = localStorage.getItem('bms_device_registry');
                if (raw) registry = JSON.parse(raw);
            } catch (e) {}

            // Backward compatibility & migration:
            const legacyIp = localStorage.getItem('bms_saved_ip');
            const legacyMac = localStorage.getItem('bms_saved_mac');
            if (legacyMac && legacyIp && isValidIp(legacyIp)) {
                const cMac = cleanMac(legacyMac);
                if (cMac && !registry[cMac]) {
                    registry[cMac] = {
                        mac: formatMac(cMac),
                        cleanMac: cMac,
                        ip: legacyIp.trim(),
                        updatedAt: Date.now()
                    };
                    try { localStorage.setItem('bms_device_registry', JSON.stringify(registry)); } catch (e) {}
                }
            }
            return registry;
        }

function saveDeviceRegistry(registry) {
            try {
                localStorage.setItem('bms_device_registry', JSON.stringify(registry));
            } catch (e) {}
        }

function getActiveMac() {
            let active = cleanMac(localStorage.getItem('bms_active_mac') || '');
            const registry = getDeviceRegistry();
            if (!active || !registry[active]) {
                const keys = Object.keys(registry);
                if (keys.length > 0) {
                    keys.sort((a, b) => (registry[b].updatedAt || 0) - (registry[a].updatedAt || 0));
                    active = keys[0];
                    localStorage.setItem('bms_active_mac', active);
                }
            }
            return active;
        }

function setActiveMac(mac) {
            const cMac = cleanMac(mac);
            localStorage.setItem('bms_active_mac', cMac);
            const registry = getDeviceRegistry();
            if (cMac && registry[cMac]) {
                currentIp = registry[cMac].ip || '';
                currentMac = registry[cMac].mac || formatMac(cMac);
                localStorage.setItem('bms_saved_ip', currentIp);
                localStorage.setItem('bms_saved_mac', currentMac);
            } else {
                currentIp = '';
                currentMac = formatMac(cMac);
                localStorage.setItem('bms_saved_ip', '');
                localStorage.setItem('bms_saved_mac', currentMac);
            }
            updateUI();
        }

function getActiveDevice() {
            const registry = getDeviceRegistry();
            const aMac = getActiveMac();
            return (aMac && registry[aMac]) ? registry[aMac] : null;
        }

function setDeviceIp(mac, ip, version = '') {
            const cMac = cleanMac(mac);
            if (!cMac || !isValidIp(ip)) return;
            const registry = getDeviceRegistry();
            registry[cMac] = {
                mac: formatMac(cMac),
                cleanMac: cMac,
                ip: ip.trim(),
                version: version || (registry[cMac] && registry[cMac].version) || '',
                updatedAt: Date.now()
            };
            saveDeviceRegistry(registry);
            
            // Only update currentIp and UI if this MAC is the currently active one
            if (cMac === getActiveMac()) {
                currentIp = ip.trim();
                currentMac = registry[cMac].mac;
                localStorage.setItem('bms_saved_ip', currentIp);
                localStorage.setItem('bms_saved_mac', currentMac);
                updateUI();
            }
        }

var currentIp = '';
        var currentMac = '';
        const initActive = getActiveDevice();
        if (initActive && initActive.ip) {
            currentIp = initActive.ip;
            currentMac = initActive.mac;
        } else {
            currentIp = localStorage.getItem('bms_saved_ip') || '';
            currentMac = localStorage.getItem('bms_saved_mac') || '';
        }

        const queryIp = urlParams.get('ip');
        const queryMac = urlParams.get('mac');
        var justLinkedFromUrl = false;

        if (queryMac && queryMac.length >= 6) {
            const cQueryMac = cleanMac(queryMac);
            if (queryIp && isValidIp(queryIp)) {
                setDeviceIp(cQueryMac, queryIp.trim());
                justLinkedFromUrl = true;
            } else {
                setActiveMac(cQueryMac);
            }
        } else if (queryIp && isValidIp(queryIp)) {
            const activeMac = getActiveMac();
            if (activeMac) {
                setDeviceIp(activeMac, queryIp.trim());
            } else {
                currentIp = queryIp.trim();
                localStorage.setItem('bms_saved_ip', currentIp);
            }
            justLinkedFromUrl = true;
        }

        if (justLinkedFromUrl && window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
