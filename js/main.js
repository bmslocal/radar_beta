        // Automatic Language Detection (Russian -> Japanese -> English default)
        function detectLanguage() {
            const urlLang = (urlParams.get('lang') || '').toLowerCase();
            if (urlLang === 'ja' || urlLang === 'en' || urlLang === 'ru' || urlLang === 'ko' || urlLang === 'zh') {
                return urlLang;
            }
            try {
                const saved = localStorage.getItem('bms_radar_lang');
                if (saved && (saved === 'ja' || saved === 'en' || saved === 'ru')) return saved;
            } catch (e) {}

            const languages = navigator.languages || [navigator.language || 'en'];
            for (let lang of languages) {
                const l = (lang || '').toLowerCase();
                if (l.startsWith('ru')) return 'ru';
                if (l.startsWith('ja')) return 'ja';
                if (l.startsWith('en')) return 'en';
                if (l.startsWith('ko')) return 'ko';
                if (l.startsWith('zh')) return 'zh';
            }
            return 'en';
        }

        let currentLang = detectLanguage();

        function changeLang(lang) {
            currentLang = lang;
            try { localStorage.setItem('bms_radar_lang', lang); } catch (e) {}
            applyLanguage();
            updateUI();
        }

        function applyLanguage() {
            const t = I18N[currentLang] || I18N.en;

            // Highlight active lang button
            ['ru', 'en', 'ja'].forEach(code => {
                const btn = document.getElementById('lang-btn-' + code);
                if (btn) {
                    if (currentLang === code) btn.classList.add('active');
                    else btn.classList.remove('active');
                }
            });

            // Text elements
            if (document.getElementById('t-app-title')) document.getElementById('t-app-title').innerText = t.appTitle;
            if (document.getElementById('t-tab-cloud')) document.getElementById('t-tab-cloud').innerText = t.tabCloud || '⚡ Быстрый старт (Облако)';
            if (document.getElementById('t-tab-manual')) document.getElementById('t-tab-manual').innerText = t.tabManual || '🛠️ Резервный (Bms_Setup)';
            if (document.getElementById('t-modal-reset-title')) document.getElementById('t-modal-reset-title').innerText = t.modalResetTitle || 'Сменить плату контроллера?';
            if (document.getElementById('t-modal-reset-desc')) document.getElementById('t-modal-reset-desc').innerText = t.modalResetDesc || 'Радар забудет сохраненный адрес текущей платы.';
            if (document.getElementById('t-modal-reset-confirm')) document.getElementById('t-modal-reset-confirm').innerText = t.modalResetConfirm || 'Забыть и искать новую';
            if (document.getElementById('t-modal-reset-cancel')) document.getElementById('t-modal-reset-cancel').innerText = t.modalResetCancel || 'Отмена';
            if (document.getElementById('t-manual-intro')) document.getElementById('t-manual-intro').innerHTML = t.manualIntro || '';
            if (document.getElementById('t-step-backup-a-title')) document.getElementById('t-step-backup-a-title').innerText = t.stepBackupATitle || 'Wi-Fi сеть Bms_Setup';
            if (document.getElementById('t-step-backup-a-desc')) document.getElementById('t-step-backup-a-desc').innerText = t.stepBackupADesc || '';
            if (document.getElementById('t-step-backup-b-title')) document.getElementById('t-step-backup-b-title').innerText = t.stepBackupBTitle || 'Прямой вход в контроллер';
            if (document.getElementById('t-step-backup-b-desc')) document.getElementById('t-step-backup-b-desc').innerHTML = t.stepBackupBDesc || '';
            if (document.getElementById('t-step-backup-c-title')) document.getElementById('t-step-backup-c-title').innerText = t.stepBackupCTitle || 'Ручной ввод IP-адреса';
            if (document.getElementById('t-step-backup-c-desc')) document.getElementById('t-step-backup-c-desc').innerText = t.stepBackupCDesc || '';
            if (document.getElementById('t-quick-guide-title')) document.getElementById('t-quick-guide-title').innerHTML = `<span>📋</span> <span>${t.quickGuideTitle || 'Быстрый старт (3 шага):'}</span>`;
            if (document.getElementById('t-qstep-1')) document.getElementById('t-qstep-1').innerHTML = t.qstep1 || '';
            if (document.getElementById('t-qstep-2')) document.getElementById('t-qstep-2').innerHTML = t.qstep2 || '';
            if (document.getElementById('t-qstep-3')) document.getElementById('t-qstep-3').innerHTML = t.qstep3 || '';
            if (document.getElementById('t-device-label')) document.getElementById('t-device-label').innerText = t.deviceLabel || 'Плата:';
            if (document.getElementById('t-btn-quick-reset')) document.getElementById('t-btn-quick-reset').innerText = t.btnQuickReset || 'Сменить плату';
            if (document.getElementById('t-btn-main-connect')) document.getElementById('t-btn-main-connect').innerText = t.btnMainConnect || 'Подключиться к контроллеру';
            if (document.getElementById('t-status-idle')) document.getElementById('t-status-idle').innerText = t.statusIdle || 'Нажмите для поиска и подключения';

            // Modal Reset Dialog
            if (document.getElementById('t-modal-reset-title')) document.getElementById('t-modal-reset-title').innerText = t.modalResetTitle || 'Сбросить плату?';
            if (document.getElementById('t-modal-reset-desc')) document.getElementById('t-modal-reset-desc').innerText = t.modalResetDesc || 'Сохраненный IP-адрес и ID текущей платы будут удалены. Радар начнет поиск новой активной платы в сети.';
            if (document.getElementById('t-modal-reset-cancel')) document.getElementById('t-modal-reset-cancel').innerText = t.modalResetCancel || 'Отмена';
            if (document.getElementById('t-modal-reset-confirm')) document.getElementById('t-modal-reset-confirm').innerText = t.modalResetConfirm || 'Забыть и сбросить';

            // Support Card
            if (document.getElementById('t-support-title')) document.getElementById('t-support-title').innerText = t.supportTitle || 'Служебная информация (для мастера)';
            if (document.getElementById('t-sup-radar-ver')) document.getElementById('t-sup-radar-ver').innerText = t.supRadarVer || 'Версия Радара:';
            if (document.getElementById('t-sup-dev-mac')) document.getElementById('t-sup-dev-mac').innerText = t.supDevMac || 'ID устройства (MAC):';
            if (document.getElementById('t-sup-dev-ip')) document.getElementById('t-sup-dev-ip').innerText = t.supDevIp || 'IP-адрес контроллера:';
            if (document.getElementById('t-sup-board-fw')) document.getElementById('t-sup-board-fw').innerText = t.supBoardFw || 'Прошивка платы:';
            if (document.getElementById('t-sup-status')) document.getElementById('t-sup-status').innerText = t.supStatus || 'Статус связи:';
            if (document.getElementById('t-btn-reset-dev')) document.getElementById('t-btn-reset-dev').innerText = t.btnResetDev || 'Сменить / забыть текущую плату';
            if (document.getElementById('t-btn-copy-support')) document.getElementById('t-btn-copy-support').innerText = t.btnCopySupport || 'Скопировать данные для поддержки';

            if (document.getElementById('t-apps-header')) document.getElementById('t-apps-header').innerText = t.appsHeader;
            if (document.getElementById('t-btn-apk-toggle')) document.getElementById('t-btn-apk-toggle').innerText = t.btnApkToggle;
            if (document.getElementById('t-badge-recommended')) document.getElementById('t-badge-recommended').innerText = t.badgeRecommended;
            if (document.getElementById('t-auto-text')) document.getElementById('t-auto-text').innerHTML = t.autoText;
            if (document.getElementById('t-ip-label')) document.getElementById('t-ip-label').innerText = t.ipLabel;
            if (document.getElementById('t-first-run-tip')) document.getElementById('t-first-run-tip').innerText = t.firstRunTip;
            if (document.getElementById('t-btn-open')) document.getElementById('t-btn-open').innerText = t.btnOpen;
            if (document.getElementById('t-btn-cloud-search') && t.btnCloudSearch) document.getElementById('t-btn-cloud-search').innerText = t.btnCloudSearch;
            if (document.getElementById('t-ip-unreachable-text') && t.ipUnreachableText) document.getElementById('t-ip-unreachable-text').innerText = t.ipUnreachableText;
            if (document.getElementById('t-btn-sync')) document.getElementById('t-btn-sync').innerText = t.btnSync;
                        if (document.getElementById('t-btn-manual')) document.getElementById('t-btn-manual').innerText = t.btnManual;
            if (document.getElementById('t-manual-ip-hint')) document.getElementById('t-manual-ip-hint').innerText = t.manualIpHint;
            if (document.getElementById('t-btn-save-ip')) document.getElementById('t-btn-save-ip').innerText = t.btnSaveIp;
            const isIpConfigured = (currentIp && currentIp !== '--');
            if (document.getElementById('t-setup-accordion-title')) {
                document.getElementById('t-setup-accordion-title').innerText = isIpConfigured ? t.accordionSetupConfig : t.accordionSetupFirst;
            }
            if (document.getElementById('setup-tile-icon')) {
                document.getElementById('setup-tile-icon').innerText = isIpConfigured ? '⚙️' : '🚀';
            }
            if (document.getElementById('t-setup-sub') && t.setupSub) {
                document.getElementById('t-setup-sub').innerText = t.setupSub;
            }
            if (document.getElementById('t-faq-accordion-title')) {
                document.getElementById('t-faq-accordion-title').innerText = t.accordionFaq;
            }
            if (document.getElementById('t-faq-sub') && t.faqSub) {
                document.getElementById('t-faq-sub').innerText = t.faqSub;
            }
            if (document.getElementById('t-step3-or') && t.step3Or) document.getElementById('t-step3-or').innerText = t.step3Or;
            if (document.getElementById('t-step3-advanced-title') && t.step3AdvancedTitle) document.getElementById('t-step3-advanced-title').innerHTML = t.step3AdvancedTitle;
            if (document.getElementById('t-step3-advanced-desc') && t.step3AdvancedDesc) document.getElementById('t-step3-advanced-desc').innerHTML = t.step3AdvancedDesc;
            if (document.getElementById('t-step3-reset-title') && t.step3ResetTitle) document.getElementById('t-step3-reset-title').innerText = t.step3ResetTitle;
            if (document.getElementById('t-step3-reset-desc') && t.step3ResetDesc) document.getElementById('t-step3-reset-desc').innerText = t.step3ResetDesc;
            if (document.getElementById('t-btn-step3-reset') && t.btnStep3Reset) document.getElementById('t-btn-step3-reset').innerText = t.btnStep3Reset;
            if (document.getElementById('t-step4-btn') && t.step4Btn) document.getElementById('t-step4-btn').innerHTML = t.step4Btn;

            if (document.getElementById('t-apk-title')) document.getElementById('t-apk-title').innerText = t.apkTitle;
            if (document.getElementById('t-apk-desc')) document.getElementById('t-apk-desc').innerText = t.apkDesc;
            if (document.getElementById('t-apk-f2')) document.getElementById('t-apk-f2').innerHTML = t.apkF2;
            if (document.getElementById('t-btn-download-apk')) document.getElementById('t-btn-download-apk').innerText = t.btnDownloadApk;
            if (document.getElementById('t-apk-install-hint') && t.apkInstallHint) document.getElementById('t-apk-install-hint').innerText = t.apkInstallHint;

            if (document.getElementById('t-install-title-android')) document.getElementById('t-install-title-android').innerText = t.installTitleAndroid;
            if (document.getElementById('t-install-desc-android')) document.getElementById('t-install-desc-android').innerText = t.installDescAndroid;
            if (document.getElementById('btn-install-app')) document.getElementById('btn-install-app').innerText = t.btnInstall;
            if (document.getElementById('t-install-title-ios')) document.getElementById('t-install-title-ios').innerText = t.installTitleIos;
            if (document.getElementById('t-install-desc-ios')) document.getElementById('t-install-desc-ios').innerHTML = t.installDescIos;

            if (document.getElementById('t-step1-title')) document.getElementById('t-step1-title').innerText = t.step1Title;
            if (document.getElementById('t-step1-desc')) document.getElementById('t-step1-desc').innerHTML = t.step1Desc;
            if (document.getElementById('t-step1-net')) document.getElementById('t-step1-net').innerHTML = t.step1Net;
            if (document.getElementById('t-step1-pwd')) document.getElementById('t-step1-pwd').innerHTML = t.step1Pwd;
            if (document.getElementById('t-step1-warn')) document.getElementById('t-step1-warn').innerHTML = t.step1Warn;
            if (document.getElementById('t-step1-note')) document.getElementById('t-step1-note').innerHTML = t.step1Note;
            if (document.getElementById('t-step3-net')) document.getElementById('t-step3-net').innerHTML = t.step3Net;
            if (document.getElementById('t-step3-pwd')) document.getElementById('t-step3-pwd').innerHTML = t.step3Pwd;
            if (document.getElementById('t-step2-title')) document.getElementById('t-step2-title').innerText = t.step2Title;
            if (document.getElementById('t-step2-body')) document.getElementById('t-step2-body').innerHTML = t.step2Body;
            if (document.getElementById('t-step3-title')) document.getElementById('t-step3-title').innerText = t.step3Title;
            if (document.getElementById('t-step3-desc')) document.getElementById('t-step3-desc').innerHTML = t.step3Desc;
            if (document.getElementById('t-step3-tips')) document.getElementById('t-step3-tips').innerHTML = t.step3Tips;
                        if (document.getElementById('t-btn-guide-sync')) document.getElementById('t-btn-guide-sync').innerText = t.btnGuideSync;
            if (document.getElementById('t-step3-note')) document.getElementById('t-step3-note').innerHTML = t.step3Note;
            if (document.getElementById('t-step4-title')) document.getElementById('t-step4-title').innerText = t.step4Title;
            if (document.getElementById('t-step4-body')) document.getElementById('t-step4-body').innerHTML = t.step4Body;

            if (document.getElementById('t-tr-auto-q')) document.getElementById('t-tr-auto-q').innerText = t.trAutoQ;
            if (document.getElementById('t-tr-auto-a')) document.getElementById('t-tr-auto-a').innerHTML = t.trAutoA;
            if (document.getElementById('t-tr-1-q')) document.getElementById('t-tr-1-q').innerText = t.tr1Q;
            if (document.getElementById('t-tr-1-a')) document.getElementById('t-tr-1-a').innerHTML = t.tr1A;
            if (document.getElementById('t-tr-2-q')) document.getElementById('t-tr-2-q').innerText = t.tr2Q;
            if (document.getElementById('t-tr-2-a')) document.getElementById('t-tr-2-a').innerHTML = t.tr2A;
            if (document.getElementById('t-tr-3-q')) document.getElementById('t-tr-3-q').innerText = t.tr3Q;
            if (document.getElementById('t-tr-3-a')) document.getElementById('t-tr-3-a').innerHTML = t.tr3A;
            if (document.getElementById('t-tr-android-q')) document.getElementById('t-tr-android-q').innerText = t.trAndroidQ;
            if (document.getElementById('t-tr-android-a')) document.getElementById('t-tr-android-a').innerHTML = t.trAndroidA;
            if (document.getElementById('t-tr-custom-q')) document.getElementById('t-tr-custom-q').innerText = t.trCustomQ;
            if (document.getElementById('t-tr-custom-a')) document.getElementById('t-tr-custom-a').innerHTML = t.trCustomA;
            if (document.getElementById('t-tr-4-q')) document.getElementById('t-tr-4-q').innerText = t.tr4Q;
            if (document.getElementById('t-tr-4-a')) document.getElementById('t-tr-4-a').innerHTML = t.tr4A;
        }

        let toastTimeout = null;

initState();
applyLanguage();

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
