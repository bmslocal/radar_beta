// ========================================================
// ui.js - User Interface Rendering & Interactions
// ========================================================

var toastTimeout = null;

// Autonomous Card Dismissal Check
try {
    if (localStorage.getItem('bms_autocard_dismissed') === '1') {
        const card = document.getElementById('auto-card');
        if (card) card.style.display = 'none';
    }
} catch (e) {}

function showToast(msg) {
            const toast = document.getElementById('toast');
            if (!toast) return;
            toast.innerHTML = msg;
            toast.style.display = 'block';
            if (toastTimeout) clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => { toast.style.display = 'none'; }, 6000);
        }

function dismissAutoCard(event) {
            if (event) event.stopPropagation();
            const card = document.getElementById('auto-card');
            if (card) card.style.display = 'none';
            try {
                localStorage.setItem('bms_autocard_dismissed', '1');
            } catch (e) {}
        }

function toggleApkDetails() {
            const box = document.getElementById('apk-details-box');
            const arrow = document.getElementById('apk-toggle-arrow');
            if (!box) return;
            const isHidden = (box.style.display === 'none' || !box.style.display);
            if (isHidden) {
                box.style.display = 'block';
                if (arrow) arrow.style.transform = 'rotate(180deg)';
                box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                box.style.display = 'none';
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        }

function onApkDownload() {
            // Tracking or UI updates can happen here
        }

function toggleSupportInfo() {
            const details = document.getElementById('support-details');
            const arrow = document.getElementById('support-arrow');
            if (!details) return;
            const isHidden = (details.style.display === 'none' || !details.style.display);
            if (isHidden) {
                updateSupportInfo();
                details.style.display = 'flex';
                if (arrow) arrow.style.transform = 'rotate(180deg)';
                details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                details.style.display = 'none';
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        }

function updateSupportInfo() {
            const active = getActiveDevice();
            const mac = (active && active.cleanMac) ? (active.mac || formatMac(active.cleanMac)) : (currentMac ? formatMac(currentMac) : '--');
            const ip = (currentIp && currentIp !== '--') ? currentIp : '--';
            const fw = (active && active.version) ? active.version : '--';
            const isOnline = (currentIp && currentIp !== '--');
            const status = isOnline ? '🟢 Онлайн' : '⚪ Ожидание';

            const supMac = document.getElementById('sup-device-mac');
            const supIp = document.getElementById('sup-device-ip');
            const supFw = document.getElementById('sup-board-fw');
            const supStat = document.getElementById('sup-link-status');

            if (supMac) supMac.innerText = mac;
            if (supIp) supIp.innerText = ip;
            if (supFw) supFw.innerText = fw;
            if (supStat) supStat.innerText = status;
        }

function copySupportInfo() {
            const active = getActiveDevice();
            const mac = (active && active.cleanMac) ? (active.mac || formatMac(active.cleanMac)) : (currentMac ? formatMac(currentMac) : '--');
            const ip = (currentIp && currentIp !== '--') ? currentIp : '--';
            const fw = (active && active.version) ? active.version : '--';
            const isOnline = (currentIp && currentIp !== '--');
            const status = isOnline ? 'ONLINE' : 'OFFLINE/IDLE';

            const text = [
                '=== BMS COOLING RADAR INFO ===',
                'Radar Version: v96-beta',
                `Device MAC: ${mac}`,
                `Controller IP: ${ip}`,
                `Board Firmware: ${fw}`,
                `Connection Status: ${status}`,
                `User Agent: ${navigator.userAgent}`,
                `Timestamp: ${new Date().toISOString()}`
            ].join('\n');

            navigator.clipboard.writeText(text).then(() => {
                const t = I18N[currentLang] || I18N.en;
                showToast(t.toastSupportCopied || '✅ Служебная информация скопирована');
            }).catch(() => {
                showToast('⚠️ Не удалось скопировать в буфер');
            });
        }

function switchSetupTab(tab) {
            if (tab === 'manual') tab = 'search';

            const tabCloudBtn = document.getElementById('tab-btn-cloud');
            const tabSearchBtn = document.getElementById('tab-btn-search');
            const tabOfflineBtn = document.getElementById('tab-btn-offline');

            const panelCloud = document.getElementById('setup-tab-cloud');
            const panelSearch = document.getElementById('setup-tab-search');
            const panelOffline = document.getElementById('setup-tab-offline');

            if (tabCloudBtn) tabCloudBtn.classList.toggle('active', tab === 'cloud');
            if (tabSearchBtn) tabSearchBtn.classList.toggle('active', tab === 'search');
            if (tabOfflineBtn) tabOfflineBtn.classList.toggle('active', tab === 'offline');

            if (panelCloud) panelCloud.style.display = (tab === 'cloud' ? 'block' : 'none');
            if (panelSearch) panelSearch.style.display = (tab === 'search' ? 'block' : 'none');
            if (panelOffline) panelOffline.style.display = (tab === 'offline' ? 'block' : 'none');
        }

function toggleManualIpSpoiler() {
            const box = document.getElementById('manual-ip-box');
            const arrow = document.getElementById('manual-ip-arrow');
            if (!box) return;
            const isHidden = (box.style.display === 'none' || !box.style.display);
            box.style.display = isHidden ? 'block' : 'none';
            if (arrow) arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }

function confirmResetDevice() {
            const modal = document.getElementById('reset-modal');
            if (modal) modal.style.display = 'flex';
        }

function closeResetModal(event) {
            if (event && event.target && event.target.id !== 'reset-modal' && !event.target.classList.contains('modal-btn-cancel')) {
                return;
            }
            const modal = document.getElementById('reset-modal');
            if (modal) modal.style.display = 'none';
        }

function executeResetDevice() {
            const modal = document.getElementById('reset-modal');
            if (modal) modal.style.display = 'none';

            // Abort any active in-flight cloud discovery
            if (activeCloudAbortController) {
                try { activeCloudAbortController.abort(); } catch (e) {}
                activeCloudAbortController = null;
            }
            inFlightCloudPromise = null;
            initialCloudPromise = null;

            // Thorough Hard Reset: clear all stored device keys
            try {
                localStorage.removeItem('bms_active_mac');
                localStorage.removeItem('bms_saved_ip');
                localStorage.removeItem('bms_saved_mac');
                localStorage.removeItem('bms_device_registry');
                localStorage.removeItem('bms_ignored_mac');
                localStorage.removeItem('bms_reset_timestamp');
                localStorage.setItem('bms_hard_reset', '1');
            } catch (e) {}

            currentIp = '--';
            currentMac = '';
            lastCloudFetchTime = 0;
            lastCloudSuccessData = null;
            isLastCloudBoardOnline = false;
            
            // Force immediate UI reset to dashes and clean state
            updateUI();
            
            const t = I18N[currentLang] || I18N.ru;
            showToast(t.toastHardResetDone || "Память контроллера очищена. Подключитесь к Bms_Setup или нажмите «Поиск».");
            
            // Explicitly DO NOT auto-call findControllerInCloud here to avoid grabbing arbitrary stranger boards!
        }

function resetActiveDevice() {
            confirmResetDevice();
        }

function toggleQuickGuide() {
            const guide = document.getElementById('quick-guide');
            const toggleText = document.getElementById('t-toggle-guide-text');
            const t = I18N[currentLang] || I18N.en;
            if (!guide) return;
            const isHidden = (guide.style.display === 'none');
            if (isHidden) {
                guide.style.display = 'block';
                guide.dataset.userForceShown = 'true';
                if (toggleText) toggleText.innerText = t.toggleGuideHide || 'Скрыть шаги подключения ▲';
            } else {
                guide.style.display = 'none';
                delete guide.dataset.userForceShown;
                if (toggleText) toggleText.innerText = t.toggleGuideShow || 'Показать шаги подключения ▼';
            }
        }

function openAndScrollToGuide() {
            const setupContent = document.getElementById('setup-content');
            const setupTile = document.getElementById('tile-setup');
            const faqContent = document.getElementById('faq-content');
            const faqTile = document.getElementById('tile-faq');

            if (faqContent) faqContent.style.display = 'none';
            if (faqTile) faqTile.classList.remove('active');

            if (setupContent) setupContent.style.display = 'block';
            if (setupTile) {
                setupTile.classList.add('active');
                setupTile.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

function showMonitorHelper(ip) {
    const modal = document.getElementById('monitor-helper-modal');
    const ipVal = document.getElementById('helper-ip-val');
    const targetIp = ip || currentIp || '--';
    if (ipVal) {
        ipVal.innerText = targetIp;
    }
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeMonitorHelper(e) {
    if (e && e.target && e.target !== document.getElementById('monitor-helper-modal')) return;
    const modal = document.getElementById('monitor-helper-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function reopenDashboardFromHelper() {
    const targetIp = (currentIp && currentIp !== '--') ? currentIp : (document.getElementById('helper-ip-val') ? document.getElementById('helper-ip-val').innerText : '');
    if (targetIp && targetIp !== '--' && isValidIp(targetIp)) {
        try {
            const win = window.open('http://' + targetIp + '/', '_blank');
            if (!win || win.closed || typeof win.closed === 'undefined') {
                window.location.href = 'http://' + targetIp + '/';
            }
        } catch (e) {
            window.location.href = 'http://' + targetIp + '/';
        }
    } else {
        openDashboard();
    }
}

async function checkControllerFromHelper() {
    const icon = document.getElementById('helper-spin-icon');
    if (icon) icon.style.animation = 'spin 0.8s linear infinite';
    const t = I18N[currentLang] || I18N.ru;
    showToast(t.statusSearchingCloud || 'Запрос статуса контроллера в облаке...');
    try {
        const found = await findControllerInCloud(true, false, 3000);
        if (found && currentIp && currentIp !== '--') {
            const ipVal = document.getElementById('helper-ip-val');
            if (ipVal) ipVal.innerText = currentIp;
            showToast(`✅ ${t.statusFound || 'Контроллер на связи!'} (${currentIp})`);
        } else {
            showToast(`⚠️ ${t.statusNotFound || 'Контроллер не отвечает в облаке. Проверьте точку доступа.'}`);
        }
    } catch (e) {
        showToast('⚠️ Ошибка запроса к облаку');
    } finally {
        if (icon) icon.style.animation = '';
    }
}

function openAndScrollToSearchIntro() {
    switchSetupTab('search');
    openAndScrollToGuide();
    const introEl = document.getElementById('t-search-intro') || document.getElementById('setup-tab-search');
    if (introEl) {
        setTimeout(() => {
            introEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
    }
}

function openAndScrollToStep3() {
    openAndScrollToSearchIntro();
}

function goToSetupSync() {
    openAndScrollToSearchIntro();
}

function checkFailedNavigation() {
    const recovery = document.getElementById('nav-recovery-card');
    if (recovery && currentIp !== '10.10.10.1') {
        recovery.style.display = 'block';
    }
}

function toggleEditIp() {
            const row = document.getElementById('edit-row');
            if (row) {
                row.style.display = (row.style.display === 'flex') ? 'none' : 'flex';
            }
        }

function saveManualIp() {
            const t = I18N[currentLang] || I18N.en;
            const input = document.getElementById('manual-ip');
            const val = input ? input.value.trim() : '';
            if (isValidIp(val)) {
                const activeMac = getActiveMac();
                if (activeMac) {
                    setDeviceIp(activeMac, val);
                } else {
                    currentIp = val;
                    localStorage.setItem('bms_saved_ip', currentIp);
                    updateUI();
                }
                toggleEditIp();
                showToast(`${t.toastLinked}${currentIp}`);
            } else {
                alert(t.alertInvalidIp);
            }
        }

function toggleDeviceModal() {
            const modal = document.getElementById('device-modal');
            if (!modal) return;
            const isOpen = (modal.style.display === 'flex');
            if (isOpen) {
                modal.style.display = 'none';
            } else {
                renderDeviceList();
                modal.style.display = 'flex';
            }
        }

function renderDeviceList() {
            const listEl = document.getElementById('device-list');
            if (!listEl) return;
            const registry = getDeviceRegistry();
            const activeMac = getActiveMac();
            const entries = Object.entries(registry);

            if (entries.length === 0) {
                listEl.innerHTML = '<div style="color: #71717a; font-size: 13px; text-align: center; padding: 12px 0;">Нет сохраненных плат</div>';
                return;
            }

            let html = '';
            entries.forEach(([cMac, dev]) => {
                const isActive = (cMac === activeMac);
                const displayMac = dev.mac || formatMac(cMac);
                const ip = dev.ip || '--';
                html += `
                    <div style="background: ${isActive ? '#1e293b' : '#27272a'}; border: 1px solid ${isActive ? '#38bdf8' : '#3f3f46'}; border-radius: 10px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                        <div>
                            <div style="font-family: monospace; font-size: 13px; font-weight: 700; color: ${isActive ? '#38bdf8' : '#f4f4f5'};">${displayMac}</div>
                            <div style="font-size: 12px; color: #a1a1aa;">IP: <b style="color: #cbd5e1;">${ip}</b> ${dev.version ? `<span style="font-size: 10.5px; background: rgba(255,255,255,0.06); padding: 1px 4px; border-radius: 4px; margin-left: 4px;">${dev.version}</span>` : ''}</div>
                        </div>
                        <div style="display: flex; gap: 6px; align-items: center;">
                            ${isActive ? 
                                `<span style="font-size: 11px; font-weight: 700; color: #4ade80; background: rgba(74,222,128,0.12); padding: 4px 8px; border-radius: 6px;">АКТИВНА</span>` : 
                                `<button type="button" onclick="selectDevice('${cMac}')" style="background: #3b82f6; color: #fff; border: none; border-radius: 6px; padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer;">Выбрать</button>`
                            }
                            <button type="button" onclick="removeDevice('${cMac}')" style="background: transparent; border: none; color: #71717a; cursor: pointer; padding: 4px; font-size: 14px;" title="Удалить">🗑️</button>
                        </div>
                    </div>
                `;
            });
            listEl.innerHTML = html;
        }

async function selectDevice(mac) {
            const cMac = cleanMac(mac);
            setActiveMac(cMac);
            toggleDeviceModal();
            showToast(`Выбрана плата: ${formatMac(cMac)}`);

            const dev = getActiveDevice();
            const savedIp = dev ? dev.ip : '';
            if (savedIp && isValidIp(savedIp) && savedIp !== '10.10.10.1') {
                // Direct-First: check if board is immediately available locally
                const verify = await verifyDeviceLocal(savedIp, cMac, 600);
                if (cMac !== getActiveMac()) return; // User switched board again
                if (verify.ok && verify.matched) {
                    console.log(`[Direct-First] Board ${cMac} verified locally on ${savedIp}. Cloud query bypassed.`);
                    const cloudBadge = document.getElementById('cloud-status-badge');
                    if (cloudBadge) {
                        cloudBadge.style.display = 'block';
                        cloudBadge.innerText = `🟢 В сети (Локально)`;
                    }
                    updateUI();
                    return;
                }
            }
            // If not reachable locally on last known IP, query Firebase for this specific board
            lastCloudFetchTime = 0;
            lastCloudSuccessData = null;
            findControllerInCloud(false, false, 2500, cMac, true);
        }

function removeDevice(mac) {
            const registry = getDeviceRegistry();
            delete registry[mac];
            saveDeviceRegistry(registry);
            if (getActiveMac() === mac) {
                localStorage.removeItem('bms_active_mac');
                const keys = Object.keys(registry);
                if (keys.length > 0) {
                    setActiveMac(keys[0]);
                } else {
                    currentIp = '';
                    currentMac = '';
                    localStorage.removeItem('bms_saved_ip');
                    localStorage.removeItem('bms_saved_mac');
                    updateUI();
                }
            }
            renderDeviceList();
        }

function addNewDeviceSearch() {
            toggleDeviceModal();
            openAndScrollToStep3();
            showToast("Для подключения новой платы подключитесь к её Wi-Fi (Bms_Setup) или выполните синхронизацию.");
        }

function clearDeviceRegistry() {
            if (confirm("Удалить все сохраненные платы из памяти?")) {
                localStorage.removeItem('bms_device_registry');
                localStorage.removeItem('bms_active_mac');
                localStorage.removeItem('bms_saved_ip');
                localStorage.removeItem('bms_saved_mac');
                currentIp = '';
                currentMac = '';
                lastCloudFetchTime = 0;
                lastCloudSuccessData = null;
                updateUI();
                toggleDeviceModal();
                showToast("Список устройств очищен");
            }
        }

function toggleAccordion(type) {
            const isSetup = (type === 'setup');
            const targetContent = document.getElementById(type + '-content');
            const targetTile = document.getElementById('tile-' + type);

            const otherType = isSetup ? 'faq' : 'setup';
            const otherContent = document.getElementById(otherType + '-content');
            const otherTile = document.getElementById('tile-' + otherType);

            if (!targetContent) return;

            const isOpen = (targetContent.style.display === 'block');

            if (isOpen) {
                targetContent.style.display = 'none';
                if (targetTile) targetTile.classList.remove('active');
            } else {
                if (otherContent) otherContent.style.display = 'none';
                if (otherTile) otherTile.classList.remove('active');

                targetContent.style.display = 'block';
                if (targetTile) targetTile.classList.add('active');
                targetTile.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

function toggleTrouble(el, ev) {
            if (ev && ev.target && ev.target.closest('a')) return;
            el.classList.toggle('open');
        }

function updateUI() {
            const displayEl = document.getElementById('display-ip');
            const displayMacEl = document.getElementById('display-mac');
            const manualIpInput = document.getElementById('manual-ip');
            const firstRunTip = document.getElementById('first-run-tip');
            const setupTitle = document.getElementById('t-setup-accordion-title');
            const setupIcon = document.getElementById('setup-tile-icon');
            const connectStatusBlock = document.getElementById('connect-status-text');
            const statusDot = document.getElementById('status-dot');
            const statusText = document.getElementById('t-status-idle');
            const tBtnMainConnect = document.getElementById('t-btn-main-connect');
            const mainConnectIcon = document.getElementById('main-connect-icon');
            const quickGuide = document.getElementById('quick-guide');
            const toggleGuideBtn = document.getElementById('btn-toggle-guide');
            const btnQuickResetIcon = document.getElementById('btn-quick-reset-icon');
            const btnOpen = document.getElementById('btn-open');
            const btnMonitorHelp = document.getElementById('btn-monitor-help');
            const btnMainConnect = document.getElementById('btn-main-connect');
            const cloudStatusBadge = document.getElementById('cloud-status-badge');
            
            const t = I18N[currentLang] || I18N.en;

            const active = getActiveDevice();
            if (active && active.cleanMac) {
                if (displayMacEl) displayMacEl.innerText = active.mac || formatMac(active.cleanMac);
            } else if (currentMac) {
                if (displayMacEl) displayMacEl.innerText = formatMac(currentMac);
            } else {
                if (displayMacEl) displayMacEl.innerText = '--';
            }

            if (currentIp && currentIp !== '--' && isValidIp(currentIp)) {
                if (displayEl) displayEl.innerText = currentIp;
                if (manualIpInput) manualIpInput.value = currentIp;
                if (firstRunTip) firstRunTip.style.display = 'none';
                if (setupTitle) setupTitle.innerText = t.accordionSetupConfig;
                if (setupIcon) setupIcon.innerText = '⚙️';
                if (connectStatusBlock) connectStatusBlock.style.display = 'none';
                
                if (btnQuickResetIcon) btnQuickResetIcon.style.display = 'block';
                if (btnOpen) btnOpen.style.display = 'flex';
                if (btnMonitorHelp) btnMonitorHelp.style.display = 'flex';
                if (btnMainConnect) btnMainConnect.style.display = 'none';
                
                // Keep cloud status hidden until local check updates it
                // We don't hide it unconditionally because verifyDeviceLocal might have just shown it

                // Auto-collapse quick guide when IP is active
                if (quickGuide && !quickGuide.dataset.userForceShown) {
                    quickGuide.style.display = 'none';
                    if (toggleGuideBtn) {
                        toggleGuideBtn.style.display = 'flex';
                        const toggleText = document.getElementById('t-toggle-guide-text');
                        if (toggleText) toggleText.innerText = t.toggleGuideShow || 'Показать шаги подключения ▼';
                    }
                }
            } else {
                if (displayEl) displayEl.innerText = '--';
                if (manualIpInput) manualIpInput.value = '';
                if (firstRunTip) firstRunTip.style.display = 'none'; // Replaced redundant tip with the integrated quick guide
                if (setupTitle) setupTitle.innerText = t.accordionSetupFirst;
                if (setupIcon) setupIcon.innerText = '🚀';
                if (connectStatusBlock) connectStatusBlock.style.display = 'flex';
                if (statusDot) statusDot.innerText = '⚪';
                if (statusText && !isDiscovering) {
                    statusText.innerText = (localStorage.getItem('bms_hard_reset') === '1')
                        ? (t.statusMemoryCleared || 'Память очищена / Ожидание поиска')
                        : (t.statusIdle || 'Нажмите для поиска и подключения');
                }
                
                if (btnQuickResetIcon) btnQuickResetIcon.style.display = 'none';
                if (btnOpen) btnOpen.style.display = 'none';
                if (btnMonitorHelp) btnMonitorHelp.style.display = 'none';
                if (btnMainConnect) btnMainConnect.style.display = 'flex';
                if (cloudStatusBadge) cloudStatusBadge.style.display = 'none';

                if (tBtnMainConnect && !isDiscovering) tBtnMainConnect.innerText = t.btnMainConnect || 'Подключиться к контроллеру';
                const tBtnDup = document.getElementById('t-btn-main-connect-dup');
                if (tBtnDup && !isDiscovering) tBtnDup.innerText = t.btnMainConnect || 'Подключиться к контроллеру';
                if (mainConnectIcon && !isDiscovering) mainConnectIcon.innerText = '🚀';

                // Always show quick guide when disconnected
                if (quickGuide) quickGuide.style.display = 'block';
                if (toggleGuideBtn) toggleGuideBtn.style.display = 'none';
            }

            updateSupportInfo();
        }
