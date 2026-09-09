// ========================================================
// network.js - Network & Cloud Communications (Discovery / RTDB)
// ========================================================

let isLastCloudBoardOnline = false;

let lastLiveMonitorClickTime = 0;

function safeNavigateToDashboard(ip) {
            if (!ip || !isValidIp(ip)) return;
            lastLiveMonitorClickTime = Date.now();
            try {
                const win = window.open('http://' + ip + '/', '_blank');
                if (!win || win.closed || typeof win.closed === 'undefined') {
                    // Mobile popup blocker fallback: navigate directly
                    window.location.href = 'http://' + ip + '/';
                }
            } catch (e) {
                window.location.href = 'http://' + ip + '/';
            }
        }

async function verifyDeviceLocal(ip, expectedMac = '', timeoutMs = 1200) {
            if (!isValidIp(ip)) return { ok: false, error: 'invalid_ip' };
            if (window.location.protocol === 'https:') {
                // HTTPS origin blocks fetch('http://...') as Mixed Content
                return { ok: false, error: 'mixed_content_prevented' };
            }
            const controller = new AbortController();
            const tid = setTimeout(() => controller.abort(), timeoutMs);
            try {
                // First try lightweight /api/info
                let res = null;
                try {
                    res = await fetch(`http://${ip}/api/info?t=${Date.now()}`, { signal: controller.signal });
                } catch (e) {}
                
                // Fallback to /status if /api/info is not present on older firmware
                if (!res || !res.ok) {
                    res = await fetch(`http://${ip}/status?t=${Date.now()}`, { signal: controller.signal });
                }
                clearTimeout(tid);
                if (res && res.ok) {
                    const data = await res.json();
                    const actualMac = cleanMac(data.mac || '');
                    const expMac = cleanMac(expectedMac);
                    const matched = expMac ? (actualMac === expMac) : true;
                    return { ok: true, matched, actualMac, data };
                }
                return { ok: false, error: 'http_error' };
            } catch (e) {
                clearTimeout(tid);
                return { ok: false, error: e };
            }
        }

async function findControllerInCloud(autoOpen = false, isUserInitiated = false, timeoutMs = 3500, specificMac = null, force = false) {
            const t = I18N[currentLang] || I18N.ru;
            const searchIcon = document.getElementById('cloud-search-icon');
            const searchLabel = document.getElementById('t-btn-cloud-search');
            const guideSyncBtn = document.getElementById('btn-guide-sync');
            const cloudBadge = document.getElementById('cloud-status-badge');

            const isHttps = (window.location.protocol === 'https:');

            // DIRECT-FIRST: Check if the device is already directly accessible locally on lastKnownIP (HTTP only)
            if (!isHttps && specificMac && cleanMac(specificMac).length >= 6) {
                const targetMac = cleanMac(specificMac);
                const activeDev = getActiveDevice();
                const lastKnownIp = (activeDev && activeDev.cleanMac === targetMac) ? activeDev.ip : currentIp;
                if (lastKnownIp && isValidIp(lastKnownIp) && lastKnownIp !== '10.10.10.1') {
                    const localCheck = await verifyDeviceLocal(lastKnownIp, targetMac, 600);
                    if (targetMac !== getActiveMac()) return false;
                    if (localCheck.ok && localCheck.matched) {
                        console.log(`[Direct-First] Device ${targetMac} answered locally on ${lastKnownIp}. Bypassing Firebase!`);
                        if (cloudBadge) {
                            cloudBadge.style.display = 'block';
                            cloudBadge.innerText = `🟢 ${t.ipStatusOnline || "В сети"} (Локально)`;
                        }
                        if (isUserInitiated) {
                            showToast(`✅ Контроллер на связи локально (${lastKnownIp})`);
                        }
                        if (autoOpen) {
                            setTimeout(() => { safeNavigateToDashboard(lastKnownIp); }, 200);
                        }
                        return true;
                    }
                }
            }

            // 1. IN-MEMORY CACHE: Return fresh memory result if queried less than 15s ago
            if (!force && lastCloudSuccessData && (Date.now() - lastCloudFetchTime < CLOUD_CACHE_TTL_MS)) {
                console.log(`[Cloud Discovery] Cache hit (${Math.round((Date.now() - lastCloudFetchTime)/1000)}s old). Bypassing Firebase REST!`);
                if (isUserInitiated) {
                    showToast(`✅ ${t.cloudFound || "Контроллер найден:"} ${lastCloudSuccessData.ip}`);
                }
                if (autoOpen && lastCloudSuccessData.ip && isValidIp(lastCloudSuccessData.ip)) {
                    setTimeout(() => { safeNavigateToDashboard(lastCloudSuccessData.ip); }, 150);
                }
                return true;
            }

            // 2. IN-FLIGHT DEDUPLICATION: If request is already running, join existing promise
            if (!force && inFlightCloudPromise) {
                console.log("[Cloud Discovery] In-flight cloud request already in progress, joining existing promise...");
                const res = await inFlightCloudPromise;
                if (isUserInitiated && res && currentIp && isValidIp(currentIp)) {
                    showToast(`✅ ${t.cloudFound || "Контроллер найден:"} ${currentIp}`);
                }
                if (autoOpen && res && currentIp && isValidIp(currentIp)) {
                    setTimeout(() => { safeNavigateToDashboard(currentIp); }, 150);
                }
                return res;
            }

            // 3. EXECUTE NETWORK FETCH
            const executeFetch = async () => {
                // Cancel any previous in-flight request to prevent race conditions
                if (activeCloudAbortController) {
                    try { activeCloudAbortController.abort(); } catch (e) {}
                    activeCloudAbortController = null;
                }

                const abortCtrl = new AbortController();
                activeCloudAbortController = abortCtrl;
                const thisEpoch = ++discoveryEpoch;

                if (isUserInitiated) {
                    if (searchIcon) searchIcon.style.animation = 'spin 0.8s linear infinite';
                    if (searchLabel) searchLabel.innerText = t.cloudSearching || "Поиск...";
                    if (guideSyncBtn) guideSyncBtn.disabled = true;
                    showToast(t.cloudSearching || "📡 Поиск контроллера в облаке...");
                }

                let foundIp = null;
                let foundMac = null;
                let foundVersion = null;
                let foundTs = 0;
                let candidateIp = null;
                let candidateMac = null;
                let candidateVersion = null;
                let candidateTs = 0;

                let ignoredMac = '';
                let resetTs = 0;
                try {
                    ignoredMac = cleanMac(localStorage.getItem('bms_ignored_mac') || '');
                    resetTs = Number(localStorage.getItem('bms_reset_timestamp') || 0);
                } catch (e) {}

                try {
                    const timeoutId = setTimeout(() => abortCtrl.abort(), timeoutMs);

                    try {
                        const targetCleanMac = cleanMac(specificMac || getActiveMac());
                        const isIgnored = (ignoredMac && targetCleanMac === ignoredMac && !specificMac);

                        // Level 1: Targeted Query (~110 bytes) if targetCleanMac is known and not blacklisted
                        if (targetCleanMac && targetCleanMac.length >= 6 && !isIgnored) {
                            const targetedUrl = `${RTDB_URL}/boards/${targetCleanMac}.json?nocache=${Date.now()}`;
                            const res = await fetch(targetedUrl, { signal: abortCtrl.signal });
                            if (res && res.ok) {
                                const data = await res.json();
                                if (data && data.ip && isValidIp(data.ip) && data.ip !== '0.0.0.0' && data.ip !== '1.2.3.4' && data.ip !== '192.168.43.99') {
                                    const bTs = Number(data.ts) || 0;
                                    const now = Date.now();
                                    const ageMs = (bTs > 0 && bTs <= now) ? (now - bTs) : Infinity;

                                    if (targetCleanMac === ignoredMac && bTs <= resetTs + 60000) {
                                        console.log(`[Cloud Discovery] Targeted record for ${targetCleanMac} is older than reset time (${bTs} <= ${resetTs}). Ignored.`);
                                    } else if (ageMs <= BOARD_FRESH_THRESHOLD_MS) {
                                        // 1 Board active user: fresh handshake!
                                        foundIp = data.ip.trim();
                                        foundMac = data.mac ? cleanMac(data.mac) : targetCleanMac;
                                        foundVersion = data.version || '';
                                        foundTs = bTs;
                                        console.log(`[Cloud Discovery] Targeted board ${foundMac} is fresh (${Math.round(ageMs/60000)}m ago). Bypassing global scan! (~110 bytes)`);
                                    } else {
                                        // Saved board is stale (>15m). Might be replaced by 2nd board!
                                        console.log(`[Cloud Discovery] Targeted board ${targetCleanMac} is stale (${Math.round(ageMs/60000)}m ago). Fallback to global scan...`);
                                        candidateIp = data.ip.trim();
                                        candidateMac = data.mac ? cleanMac(data.mac) : targetCleanMac;
                                        candidateVersion = data.version || '';
                                        candidateTs = bTs;
                                    }
                                }
                            }
                        }

                        // Level 2: Global query (/boards.json) ONLY if targeted query didn't find a fresh board
                        if (!foundIp) {
                            // Multi-Board & Hard Reset Isolation:
                            // If there is no targeted MAC or device was hard-reset,
                            // global scan (/boards.json) is ONLY permitted when explicitly initiated by the user.
                            // Never run it on passive background polling, page load, or visibility change.
                            const isHardReset = (localStorage.getItem('bms_hard_reset') === '1');
                            if ((!targetCleanMac || isHardReset) && !isUserInitiated) {
                                console.log('[Cloud Discovery] Passive background check with no target MAC or hard-reset. Skipping global scan.');
                                return false;
                            }

                            const globalUrl = `${RTDB_URL}/boards.json?nocache=${Date.now()}`;
                            const res = await fetch(globalUrl, { signal: abortCtrl.signal });
                            if (res && res.ok) {
                                const allBoards = await res.json();
                                if (allBoards && typeof allBoards === 'object') {
                                    const validBoards = Object.entries(allBoards)
                                        .map(([key, val]) => ({
                                            keyMac: cleanMac(key),
                                            mac: (val && val.mac) ? cleanMac(val.mac) : cleanMac(key),
                                            ip: val && val.ip && val.ip.trim(),
                                            ts: Number((val && val.ts) || 0),
                                            version: (val && val.version) || ''
                                        }))
                                        .filter(b => {
                                            if (!b.ip || !isValidIp(b.ip) || b.ip === '0.0.0.0' || b.ip === '1.2.3.4' || b.ip === '192.168.43.99') return false;
                                            // Blacklist filter: Ignore reset board unless it published fresh telemetry AFTER the reset
                                            if (ignoredMac && (b.keyMac === ignoredMac || b.mac === ignoredMac)) {
                                                if (b.ts <= resetTs + 60000) {
                                                    console.log(`[Cloud Discovery] Filtered out blacklisted stale board: ${b.mac} (ts: ${b.ts} <= reset: ${resetTs})`);
                                                    return false;
                                                }
                                            }

                                            // Global discovery freshness threshold (4 hours)
                                            const ageMs = Date.now() - b.ts;
                                            if (ageMs > BOARD_FRESH_THRESHOLD_MS) {
                                                return false;
                                            }

                                            return true;
                                        });

                                    validBoards.sort((a, b) => b.ts - a.ts);

                                    if (validBoards.length > 0) {
                                        if (validBoards[0].ts >= candidateTs) {
                                            foundIp = validBoards[0].ip.trim();
                                            foundMac = validBoards[0].mac || validBoards[0].keyMac;
                                            foundVersion = validBoards[0].version || '';
                                            foundTs = validBoards[0].ts;
                                            console.log(`[Cloud Discovery] Global scan selected freshest active board: ${foundMac} on ${foundIp} (ts: ${foundTs})`);
                                        }
                                    }
                                }
                            }

                            // Fallback to stale candidate if nothing newer was found in global (if candidate not blacklisted)
                            if (!foundIp && candidateIp) {
                                if (!ignoredMac || (candidateMac !== ignoredMac && cleanMac(candidateMac) !== ignoredMac) || candidateTs > resetTs) {
                                    foundIp = candidateIp;
                                    foundMac = candidateMac;
                                    foundVersion = candidateVersion;
                                    foundTs = candidateTs;
                                }
                            }
                        }
                    } finally {
                        clearTimeout(timeoutId);
                    }

                    // Stale check
                    if (abortCtrl.signal.aborted || thisEpoch !== discoveryEpoch) {
                        console.log(`[RTDB Discovery] Request aborted or stale epoch (${thisEpoch} vs ${discoveryEpoch})`);
                        return false;
                    }

                    if (foundIp && foundMac) {
                        const cleanNew = cleanMac(foundMac);
                        const previousMac = getActiveMac();
                        const cleanPrev = cleanMac(previousMac);
                        const isBoardSwitched = cleanPrev && (cleanPrev !== cleanNew);

                        const now = Date.now();
                        const ageMs = (foundTs > 0 && foundTs <= now) ? (now - foundTs) : Infinity;
                        // Strict online definition: Telemetry must be fresh (< 3 minutes)
                        const isVeryFresh = (foundTs > 0) && (ageMs < 3 * 60 * 1000); // < 3 min
                        const isRecent = (foundTs > 0) && (ageMs >= 3 * 60 * 1000 && ageMs < 4 * 3600 * 1000); // 3m to 4h
                        const isStale = (foundTs > 0) && (ageMs >= 4 * 3600 * 1000); // > 4h

                        isLastCloudBoardOnline = isVeryFresh;

                        // CRITICAL: If this is an unlinked/hard-reset state or discovering new boards,
                        // DO NOT adopt stale or offline boards as active!
                        if (!isVeryFresh && !specificMac && (localStorage.getItem('bms_hard_reset') === '1' || !previousMac)) {
                            console.log(`[Cloud Discovery] Discovered board ${cleanNew} is offline (${Math.round(ageMs/60000)}m old). Refusing to bind in unlinked state.`);
                            if (isUserInitiated) {
                                showToast(t.cloudNotFound || "⚠️ Контроллер пока не ответил. Убедитесь, что раздача Wi-Fi включена.");
                            }
                            return false;
                        }

                        console.log("[Cloud Discovery] Controller discovered:", foundIp, foundMac, "ts:", foundTs, "online:", isVeryFresh);

                        if (cleanNew !== ignoredMac) {
                            try {
                                localStorage.removeItem('bms_ignored_mac');
                                localStorage.removeItem('bms_reset_timestamp');
                            } catch (e) {}
                        }

                        setActiveMac(cleanNew);
                        setDeviceIp(cleanNew, foundIp, foundVersion);
                        updateUI();

                        // Cache in memory
                        lastCloudFetchTime = Date.now();
                        lastCloudSuccessData = { ip: foundIp, mac: cleanNew, version: foundVersion, ts: foundTs };

                        if (cloudBadge) {
                            cloudBadge.style.display = 'inline-flex';
                            if (isStale) {
                                const hours = Math.round(ageMs / 3600000);
                                cloudBadge.innerHTML = `<span id="cloud-status-dot">⚪</span> <span id="t-cloud-status-text">${t.cloudStatusStale || "Не в сети в Облаке"} (${hours} ч назад)</span>`;
                                cloudBadge.style.color = '#a1a1aa';
                                cloudBadge.style.background = 'rgba(255, 255, 255, 0.05)';
                                cloudBadge.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            } else if (isRecent) {
                                const mins = Math.round(ageMs / 60000);
                                cloudBadge.innerHTML = `<span id="cloud-status-dot">🟡</span> <span id="t-cloud-status-text">${t.cloudStatusRecent || "Был в сети"} (${mins} мин назад)</span>`;
                                cloudBadge.style.color = '#fde047';
                                cloudBadge.style.background = 'rgba(253, 224, 71, 0.1)';
                                cloudBadge.style.borderColor = 'rgba(253, 224, 71, 0.25)';
                            } else {
                                cloudBadge.innerHTML = `<span id="cloud-status-dot">🟢</span> <span id="t-cloud-status-text">${t.cloudStatusOnline || "Активен в Облаке"}</span>`;
                                cloudBadge.style.color = '#4ade80';
                                cloudBadge.style.background = 'rgba(74, 222, 128, 0.1)';
                                cloudBadge.style.borderColor = 'rgba(74, 222, 128, 0.25)';
                            }
                        }

                        if (isUserInitiated) {
                            if (!isVeryFresh) {
                                showToast(`⚠️ Контроллер не в сети (был ${Math.round(ageMs / 60000)} мин назад). Включите зажигание (READY)`);
                            } else if (isBoardSwitched) {
                                showToast(`✅ Обнаружена активная плата: ${formatMac(cleanNew)} (${foundIp})`);
                            } else {
                                showToast(`✅ ${t.cloudFound || "Контроллер найден:"} ${foundIp}`);
                            }
                        }

                        if (autoOpen && isVeryFresh) {
                            setTimeout(() => {
                                safeNavigateToDashboard(foundIp);
                            }, 200);
                        }
                        return true;
                    } else {
                        isLastCloudBoardOnline = false;
                        if (cloudBadge) {
                            cloudBadge.style.display = 'inline-flex';
                            cloudBadge.innerHTML = `<span id="cloud-status-dot">⚪</span> <span id="t-cloud-status-text">${t.ipStatusOffline || "Не в сети"}</span>`;
                            cloudBadge.style.color = '#a1a1aa';
                            cloudBadge.style.background = 'rgba(255, 255, 255, 0.05)';
                            cloudBadge.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }
                        if (isUserInitiated) {
                            showToast(t.cloudNotFound || "⚠️ Контроллер пока не ответил. Убедитесь, что раздача Wi-Fi включена.");
                        }
                        return false;
                    }
                } catch (err) {
                    isLastCloudBoardOnline = false;
                    if (err.name === 'AbortError') {
                        console.log("[Cloud Discovery] Request aborted cleanly");
                        return false;
                    }
                    console.error("[Cloud Discovery] Error:", err);
                    if (isUserInitiated) {
                        showToast(t.cloudError || "⚠️ Ошибка связи с облаком. Проверьте интернет на телефоне.");
                    }
                    return false;
                } finally {
                    if (thisEpoch === discoveryEpoch) {
                        if (searchIcon) searchIcon.style.animation = '';
                        if (searchLabel) searchLabel.innerText = t.btnCloudSearch || "Найти контроллер в облаке";
                        if (guideSyncBtn) guideSyncBtn.disabled = false;
                        if (activeCloudAbortController === abortCtrl) {
                            activeCloudAbortController = null;
                        }
                    }
                }
            };

            inFlightCloudPromise = executeFetch();
            try {
                return await inFlightCloudPromise;
            } finally {
                inFlightCloudPromise = null;
            }
        }

async function startOneTapDiscovery(forceSearch = false) {
            if (isDiscovering) return;

            // If background cloud search is still in flight on page load, await it so we don't open a stale IP from an old board!
            if (initialCloudPromise) {
                try { await initialCloudPromise; } catch (e) {}
                initialCloudPromise = null;
            }

            // If we already have a valid active IP and not forcing a re-search, run verified open
            if (!forceSearch && currentIp && currentIp !== '--' && isValidIp(currentIp)) {
                openDashboard();
                return;
            }

            isDiscovering = true;
            try { localStorage.removeItem('bms_hard_reset'); } catch (e) {}

            const t = I18N[currentLang] || I18N.en;
            const btn = document.getElementById('btn-main-connect');
            const statusDot = document.getElementById('status-dot');
            const statusText = document.getElementById('t-status-idle');
            const btnIcon = document.getElementById('main-connect-icon');

            const connectStatusBlock = document.getElementById('connect-status-text');
            if (btn) {
                btn.classList.add('connecting');
                btn.disabled = true;
            }
            if (btnIcon) btnIcon.style.animation = 'spin 0.8s linear infinite';
            if (connectStatusBlock) connectStatusBlock.style.display = 'flex';
            if (statusDot) statusDot.innerText = '🟡';

            const active = getActiveDevice();
            const targetMac = cleanMac((active && active.cleanMac) || currentMac || getActiveMac());
            const isHttps = (window.location.protocol === 'https:');

            try {
                // In HTTPS mode, skip Phase 1 and 2 (which would fail on Mixed Content) and query cloud immediately!
                if (!isHttps) {
                    if (statusText) statusText.innerText = t.statusSearchingLocal || 'Поиск контроллера в сети...';
                    // Phase 1: Local check on lastKnownIp
                    const lastKnownIp = (active && active.ip) ? active.ip : currentIp;
                    if (lastKnownIp && isValidIp(lastKnownIp) && lastKnownIp !== '10.10.10.1') {
                        const localCheck = await verifyDeviceLocal(lastKnownIp, targetMac, 800);
                        if (localCheck.ok && localCheck.matched) {
                            if (statusDot) statusDot.innerText = '🟢';
                            if (statusText) statusText.innerText = t.statusFound || 'Контроллер найден! Открываем...';
                            setDeviceIp(localCheck.actualMac || targetMac, lastKnownIp, (localCheck.data && (localCheck.data.firmware || localCheck.data.version)));
                            updateUI();
                            showToast(`✅ ${t.statusFound || 'Контроллер на связи!'} (${lastKnownIp})`);
                            setTimeout(() => {
                                safeNavigateToDashboard(lastKnownIp);
                            }, 200);
                            return;
                        }
                    }

                    // Phase 2: Probe standard gateway IP (192.168.4.1)
                    try {
                        const probe = await verifyDeviceLocal('192.168.4.1', targetMac, 600);
                        if (probe.ok && probe.matched) {
                            if (statusDot) statusDot.innerText = '🟢';
                            if (statusText) statusText.innerText = t.statusFound || 'Контроллер найден! Открываем...';
                            setDeviceIp(probe.actualMac || targetMac, '192.168.4.1', (probe.data && (probe.data.firmware || probe.data.version)));
                            updateUI();
                            showToast(`✅ ${t.statusFound || 'Контроллер на связи!'} (192.168.4.1)`);
                            setTimeout(() => {
                                safeNavigateToDashboard('192.168.4.1');
                            }, 200);
                            return;
                        }
                    } catch (e) {}
                }

                // Phase 3: Firebase RTDB Cloud lookup (auto-discovers freshest online board globally)
                if (statusText) statusText.innerText = t.statusSearchingCloud || 'Запрос адреса из облака...';
                const cloudFound = await findControllerInCloud(false, true, 3500);
                if (cloudFound && currentIp && currentIp !== '--') {
                    if (isLastCloudBoardOnline) {
                        if (statusDot) statusDot.innerText = '🟢';
                        if (statusText) statusText.innerText = t.statusFound || 'Контроллер найден! Открываем...';
                        updateUI();
                        showToast(`✅ ${t.statusFound || 'Контроллер найден!'} (${currentIp})`);
                        setTimeout(() => {
                            safeNavigateToDashboard(currentIp);
                        }, 200);
                        return;
                    } else {
                        updateUI();
                        return;
                    }
                }

                // If not found in any phase:
                if (statusDot) statusDot.innerText = '🔴';
                if (statusText) statusText.innerText = t.statusNotFound || 'Контроллер не найден. Проверьте шаги выше.';
                showToast('⚠️ Контроллер не ответил в облаке. Переключаем на локальный автопоиск...');

                openAndScrollToStep3();
            } catch (err) {
                console.error('[One-Tap Discovery Error]', err);
                if (statusDot) statusDot.innerText = '🔴';
                if (statusText) statusText.innerText = t.statusNotFound || 'Ошибка поиска';
            } finally {
                isDiscovering = false;
                if (btn) {
                    btn.classList.remove('connecting');
                    btn.disabled = false;
                }
                if (btnIcon) btnIcon.style.animation = '';
            }
        }

async function openDashboard() {
            const now = Date.now();
            // 1. Double-Click Fallback: If clicked again within 15 seconds, show helper modal immediately
            if (now - lastLiveMonitorClickTime < 15000) {
                console.log('[Live Monitor] Repeated click within 15s. Showing connection helper modal.');
                lastLiveMonitorClickTime = 0;
                if (typeof showMonitorHelper === 'function') {
                    showMonitorHelper(currentIp || '--');
                }
                return;
            }

            const active = getActiveDevice();
            const expectedMac = active ? active.cleanMac : getActiveMac();

            if (currentIp === '10.10.10.1') {
                safeNavigateToDashboard('10.10.10.1');
                return;
            }

            const openBtn = document.getElementById('btn-open');
            const openBtnIcon = document.getElementById('open-btn-icon');
            const openBtnText = document.getElementById('t-btn-open');
            const t = I18N[currentLang] || I18N.ru;

            if (openBtn) openBtn.disabled = true;
            if (openBtnIcon) {
                openBtnIcon.innerText = '🔄';
                openBtnIcon.style.animation = 'spin 0.8s linear infinite';
            }
            if (openBtnText) openBtnText.innerText = t.ipStatusChecking || 'Проверка связи...';

            let isOnline = false;
            let targetIp = (currentIp && currentIp !== '--' && isValidIp(currentIp)) ? currentIp : null;
            const isHttps = (window.location.protocol === 'https:');

            try {
                if (!targetIp) {
                    // No IP saved: search in cloud first
                    const found = await findControllerInCloud(false, false, 2500, expectedMac, true);
                    if (found && isLastCloudBoardOnline && currentIp && currentIp !== '--') {
                        targetIp = currentIp;
                        isOnline = true;
                    }
                } else if (isHttps) {
                    // HTTPS origin: check RTDB telemetry freshness in Cloud (fast 1800ms probe)
                    const found = await findControllerInCloud(false, false, 1800, expectedMac, true);
                    if (found && isLastCloudBoardOnline && currentIp && currentIp !== '--') {
                        targetIp = currentIp;
                        isOnline = true;
                    } else if (found && !isLastCloudBoardOnline) {
                        isOnline = false;
                    } else {
                        isOnline = false;
                    }
                } else {
                    // HTTP origin: direct local hardware probe (fast 1200ms)
                    const verify = await verifyDeviceLocal(targetIp, expectedMac, 1200);
                    if (verify.ok) {
                        if (verify.matched || !expectedMac) {
                            isOnline = true;
                        } else if (verify.actualMac) {
                            setDeviceIp(verify.actualMac, targetIp, (verify.data && (verify.data.firmware || verify.data.version)));
                            showToast(`⚠️ На ${targetIp} отвечает другая плата (${formatMac(verify.actualMac)})`);
                            isOnline = false;
                        }
                    } else {
                        // Not responding locally, try cloud fallback
                        const found = await findControllerInCloud(false, false, 1800, expectedMac, true);
                        if (found && isLastCloudBoardOnline && currentIp && currentIp !== '--') {
                            targetIp = currentIp;
                            isOnline = true;
                        } else {
                            isOnline = false;
                        }
                    }
                }
            } catch (e) {
                console.warn('[openDashboard] check failed:', e);
                isOnline = false;
            } finally {
                if (openBtn) openBtn.disabled = false;
                if (openBtnIcon) {
                    openBtnIcon.innerText = '📊';
                    openBtnIcon.style.animation = '';
                }
                if (openBtnText) openBtnText.innerText = t.btnOpen || 'Live Monitor';
            }

            // Guard: If user switched active device while checking was running
            if (expectedMac && expectedMac !== getActiveMac()) {
                return;
            }

            if (isOnline && targetIp) {
                lastLiveMonitorClickTime = Date.now();
                const t = I18N[currentLang] || I18N.ru;
                showToast(t.toastOpeningDashboard || "Панель открыта. Если страница не загрузилась — нажмите ссылку помощи ниже.");
                safeNavigateToDashboard(targetIp);
            } else {
                lastLiveMonitorClickTime = 0;
                // Controller is offline / unreachable: open modal helper on screen instead of blank tab
                if (typeof showMonitorHelper === 'function') {
                    showMonitorHelper(targetIp || currentIp || '--');
                }
            }
        }

function syncWithBoard() {
            const t = I18N[currentLang] || I18N.en;
            showToast(t.toastConnecting);
            setTimeout(() => {
                window.location.href = 'http://10.10.10.1/sync?lang=' + currentLang;
            }, 600);
        }
