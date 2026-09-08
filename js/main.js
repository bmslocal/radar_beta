// ========================================================
// main.js - Application Lifecycle & Bootstrap
// ========================================================

// 1. Initial Translation & UI Render on script load
applyLanguage();
updateUI();

// If linked from URL parameter (?ip=...)
if (justLinkedFromUrl) {
    var t = I18N[currentLang] || I18N.en;
    showToast(`${t.toastLinked}${currentIp}`);
}

// Auto-expand setup accordion for first-time visitors if IP is not set
if (!currentIp || currentIp === '--') {
    var content = document.getElementById('setup-content');
    var tile = document.getElementById('tile-setup');
    if (content) content.style.display = 'block';
    if (tile) tile.classList.add('active');
}

// 2. PWA & Device Detection Handlers
// Device Detection (Android vs iOS vs Desktop)
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isStandalone = Boolean(
            (window.navigator && window.navigator.standalone) || 
            (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
        );

        // Toggle APK Card in Main View
        

        if (isAndroid) {
            const btnApk = document.getElementById('btn-toggle-apk');
            if (btnApk) btnApk.style.display = 'flex';
        }

        if (isIOS && !isStandalone) {
            const iosBanner = document.getElementById('install-banner-ios');
            if (iosBanner) iosBanner.style.display = 'block';
        }

        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            if (!isStandalone) {
                const banner = document.getElementById('install-banner-android');
                if (banner) banner.style.display = 'block';
            }
        });

        const btnInstall = document.getElementById('btn-install-app');
        if (btnInstall) {
            btnInstall.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    deferredPrompt = null;
                    const banner = document.getElementById('install-banner-android');
                    if (banner) banner.style.display = 'none';
                }
            });
        }

// 3. Lifecycle & Cloud Auto-Connect
window.addEventListener('DOMContentLoaded', () => {
            if (!justLinkedFromUrl) {
                const aMac = getActiveMac();
                const isHttps = (window.location.protocol === 'https:');
                if (!isHttps && aMac) {
                    const dev = getActiveDevice();
                    const savedIp = (dev && dev.ip) ? dev.ip : currentIp;
                    if (savedIp && isValidIp(savedIp) && savedIp !== '10.10.10.1') {
                        verifyDeviceLocal(savedIp, aMac, 600).then(verify => {
                            if (aMac !== getActiveMac()) return;
                            const cloudBadge = document.getElementById('cloud-status-badge');
                            if (verify.ok && verify.matched) {
                                if (cloudBadge) {
                                    cloudBadge.style.display = 'inline-flex';
                                    cloudBadge.innerHTML = `<span id="cloud-status-dot">🟢</span> <span id="t-cloud-status-text">${I18N[currentLang]?.ipStatusOnline || "В сети"} (Wi-Fi)</span>`;
                                    cloudBadge.style.color = '#4ade80';
                                    cloudBadge.style.background = 'rgba(74, 222, 128, 0.1)';
                                    cloudBadge.style.borderColor = 'rgba(74, 222, 128, 0.25)';
                                }
                            } else {
                                // IP not responsive locally -> query cloud for freshest board
                                findControllerInCloud(false, false, 2000);
                            }
                        });
                    } else {
                        initialCloudPromise = findControllerInCloud(false, false, 2500);
                    }
                } else {
                    // On HTTPS or when no local check is performed, query cloud immediately for freshest board!
                    initialCloudPromise = findControllerInCloud(false, false, 2500);
                }
            }
        });
