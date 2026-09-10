// ========================================================
// i18n.js - Multilingual Dictionary & Localization Engine
// ========================================================

var urlParams = new URLSearchParams(window.location.search);

var I18N = {
            en: {
                appTitle: "Live Radar",
                appsHeader: "📱 Android App",
                btnApkToggle: "Android App",
                badgeRecommended: "🔥 RECOMMENDED",
                ipLabel: "Controller IP Address",
                ipStatusOnline: "Online (Ignition ON)",
                ipStatusRecent: "Online recently",
                ipStatusStale: "Offline (Ignition OFF)",
                ipStatusOffline: "Offline / Standby",
                cloudStatusOnline: "Active in Cloud",
                cloudStatusRecent: "Seen in Cloud",
                cloudStatusStale: "Offline in Cloud",
                ipStatusChecking: "Checking status...",
                firstRunTip: "First-time setup: follow the guide below 👇",
                btnOpen: "Live Monitor",
                helperTitle: "Live Monitor",
                helperIpLabel: "Monitor Address:",
                helperWarnTitle: "Page not opening?",
                helperStep1: "1. Turn ON <b>Personal Hotspot</b> on phone (network <code>Bms</code>, password <code>bms.local</code>, <b>2.4 GHz</b>).",
                helperStep2: "2. Turn ON hybrid (mode <b>READY</b>) so the controller gets power.",
                helperStep3: "3. Wait 5–10 seconds for the controller to connect to your phone network.",
                helperBtnReopen: "Open Again",
                helperBtnCheck: "Check Cloud Status",
                helperBtnClose: "Close",
                btnSync: "Find Controller",
                                btnManual: "Set IP Manually",
                step3Or: "Or enter controller IP manually:",
                step3AdvancedTitle: "For advanced users",
                step3AdvancedDesc: "Where to find the IP address? Go to the 'Connected devices' section in your phone's hotspot settings.",
                step3ResetTitle: "Проблемы с подключением или сменили плату?",
                step3ResetDesc: "Если контроллер не подключается, или вы подключили другую плату — очистите память радара.",
                btnStep3Reset: "Reset memory & find new board",
                step4Btn: "Live Monitor",
                btnSaveIp: "Save",
                autoText: "<b>Controller operates fully autonomously.</b> Phone is used only for monitoring and settings.",
                accordionSetupFirst: "First-Time Setup",
                accordionSetupConfig: "Connection & Setup",
                accordionFaq: "Help & FAQ",
                setupSub: "Step-by-step guide",
                faqSub: "Knowledge base",
                apkTitle: "Live Monitor",
                apkDesc: "Android app with live battery HUD widget:",
                apkF2: "<b>Instant auto-connect via smartphone hotspot</b><br><span style=\"color: #a1a1aa; font-size: 11.5px;\">App discovers controller automatically — no IP search or manual setup.</span>",
                btnDownloadApk: "Download APK",
                apkInstallHint: "After downloading, open the APK from notifications to install",
                installTitleAndroid: "📲 Install Application",
                installDescAndroid: "Add Live Radar to your home screen for quick one-tap access.",
                btnInstall: "Install",
                installTitleIos: "📲 Install on iPhone",
                installDescIos: "Tap the <b>Share button ⎋</b> in Safari, then select <b>«Add to Home Screen» ➕</b>.",
                step1Title: "Turn ON Phone Hotspot",
                step1Desc: "Enable <b>Personal Hotspot</b> on your phone with the following credentials:",
                step1Net: "Network: <code>Bms</code>",
                step1Pwd: "Password: <code>bmslocal</code>",
                step1Warn: "⚠️ <b>Important:</b> Only supports <b>2.4GHz Wi-Fi</b>. On iPhone, turn ON <i>«Maximize Compatibility»</i>.",
                step1Note: "",
                step2Title: "Plug into Car & Power ON",
                step2Body: "Insert the controller into your vehicle's <b>OBD2 port</b> (under the steering wheel) and power on the car (<b>READY</b> mode).",
                step3Title: "IP Discovery (Auto-Sync)",
                step3Desc: "Connect phone Wi-Fi to controller network with the following credentials:",
                step3Net: "Network: <code>Bms_Setup</code>",
                step3Pwd: "Password: <code>bmslocal</code>",
                step3Tips: "<b style='color: #fde68a;'>⚠️ IMPORTANT:</b> In the settings of this Wi-Fi network, turn <b>OFF</b> «Auto-reconnect». If prompted, select <b>«Stay connected»</b>.",
                                btnGuideSync: "Auto-Sync with Controller",
                step3Note: "The controller will send its IP to Live Radar, disable Bms_Setup, and redirect you back with IP saved.",
                step4Title: "Launch Live Monitor",
                step4Body: "After obtaining the IP address, tap <b>«📊 Live Monitor»</b> (here or at the very top) to view live telemetry.",
                trAutoQ: "🛡️ How does autonomy and updates work?",
                trAutoA: "• <b>⚡ Full autonomy:</b> Controller is plugged into the vehicle and automatically regulates fan speed. A discharged or forgotten phone never affects battery cooling.<br>• <b>📲 Energy-efficient link:</b> Phone battery is not drained by continuous data polling. Connection is only active when viewing battery temperature or changing network settings.<br>• <b>🔄 Support & updates:</b> Both controller and mobile app are engineered with support for wireless updates.",
                tr1Q: "🔴 Dashboard not opening or offline?",
                tr1A: "• Ensure vehicle is in <b>READY</b> mode.<br>• Verify hotspot is ON: default network <code>Bms</code> (password <code>bmslocal</code>) or your custom network.<br>• On iPhone, turn <b>ON</b> <i>«Maximize Compatibility»</i> in Personal Hotspot settings.<br>• On Android, set Hotspot AP Band to <b>2.4 GHz</b>.<br>• You can also try opening <a href=\"http://bms.local\" target=\"_blank\" style=\"color: #4ade80; text-decoration: underline;\">http://bms.local</a> (may be unstable on iPhone hotspot).",
                tr2Q: "📶 Tips for <code>Bms_Setup</code> Wi-Fi:",
                tr2A: "• Turn <b>OFF</b> <i>«Auto-reconnect»</i> for Bms_Setup.<br>• If prompted <i>«No Internet»</i>, tap <b>«Keep Wi-Fi connection» / «Always connect»</b>.",
                tr3Q: "🟡 IP address changed?",
                tr3A: "• Ensure phone Hotspot (2.4GHz) is ON and phone is connected to <code>Bms_Setup</code> Wi-Fi, then tap <b>«Auto-Sync»</b> <a href='javascript:void(0)' onclick='openAndScrollToStep3()' style='color: #3b82f6; text-decoration: underline;'>(go to button)</a>.<br>• Or check phone Hotspot settings for the connected device IP and save it manually.",
                trAndroidQ: "🤖 Android Hotspot 2.4GHz Settings:",
                trAndroidA: "In your Android phone settings ➔ <i>Portable Hotspot / Tethering</i> ➔ <i>Set up hotspot</i>, make sure <b>AP Band</b> is set to <b>2.4 GHz Band</b> (not 5.0 GHz preferred).",
                trCustomQ: "⚙️ How to connect controller to custom/home Wi-Fi?",
                trCustomA: "1. Turn off phone hotspot for 15s. The controller will launch its setup Wi-Fi <code>Bms_Setup</code> (password <code>bmslocal</code>).<br>2. Connect phone Wi-Fi to <code>Bms_Setup</code>, open <a href='http://10.10.10.1' target='_blank' style='color: #4ade80; text-decoration: underline;'>http://10.10.10.1</a> or <a href='http://bms.local' target='_blank' style='color: #4ade80; text-decoration: underline;'>bms.local</a>, or tap <b>«Auto-Sync»</b> above.<br>3. In the Wi-Fi settings section, enter your network SSID and password, then save. The controller will reconnect to your network automatically!",
                tr4Q: "❓ Changed phone or typo in Wi-Fi password?",
                tr4A: "No worries: turn off phone hotspot for 15 seconds. Since the controller cannot find the network, it will re-open <code>Bms_Setup</code> (password <code>bmslocal</code>), so you can enter new credentials via <a href='http://10.10.10.1' target='_blank' style='color: #4ade80; text-decoration: underline;'>http://10.10.10.1</a> or <a href='http://bms.local' target='_blank' style='color: #4ade80; text-decoration: underline;'>http://bms.local</a>.",
                toastLinked: "✅ Controller linked: ",
                toastConnecting: "📡 Connecting (10.10.10.1)...<br><small style=\"color:#cbd5e1; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;\">Ensure phone hotspot is ON and you are connected to <code>Bms_Setup</code> Wi-Fi!</small>",
                toastSetupFirst: "Please complete setup following the guide below",
                btnConnecting: "Connecting...",
                alertInvalidIp: "Invalid IP address format (example: 10.48.33.187)",
                dashUnreachable: "⚠️ <b>Cannot connect to controller.</b><br>• Ensure phone Hotspot (2.4GHz) is ON:<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>Network: <code>Bms</code></span><span>Password: <code>bmslocal</code></span></div><br>• Ensure vehicle ignition is in <b>READY</b> mode.<br>• Connect to <code>Bms_Setup</code> Wi-Fi and tap <b>«Auto-Sync via Bms_Setup»</b>.",
                errNoSetupNetwork: "⚠️ Please connect to <code>Bms_Setup</code> Wi-Fi first",
                manualIpHint: "Find IP in Hotspot settings (e.g. 10.48.33.x)",
                btnCloudSearch: "Find Controller in Cloud",
                cloudSearching: "Searching in cloud...",
                cloudFound: "Controller found:",
                cloudNotFound: "Controller not connected to cloud yet. Turn on phone hotspot.",
                cloudError: "Cloud error. Check phone internet connection.",
                quickGuideTitle: "Quick Start (3 Steps):",
                qstep1: "Turn ON phone Hotspot (Network: <code>Bms</code>, Password: <code>bmslocal</code>, Band: <b>2.4 GHz</b>).",
                qstep2: "Plug adapter into vehicle's <b>OBD2</b> port and power ON (<b>READY</b> mode).",
                qstep3: "Tap the green «Connect to Controller» button below.",
                tabCloud: "⚡ Cloud",
                cloudIntro: "⚡ <b>Recommended & simplest method:</b> one-tap automatic connection. If controller is not found via cloud, use the <b>«Search»</b> tab.",
                tabSearch: "🔍 Search",
                tabOffline: "📡 Offline",
                searchIntro: "💡 <b>Local auto-search without internet:</b> the controller sends its IP directly to Radar via service Wi-Fi.",
                searchStep1Title: "Turn on phone hotspot",
                searchStep1Desc: "Turn ON <b>Personal Hotspot</b> on your phone with the following settings:",
                searchStep1Net: "Network Name: <code>Bms</code>",
                searchStep1Pwd: "Password: <code>bmslocal</code>",
                searchStep1Note: "⚠️ <b>Important:</b> Only <b>2.4GHz Wi-Fi</b> is supported. On iPhone enable «Maximize Compatibility».",
                searchStep2Title: "Connect to Bms_Setup Wi-Fi",
                searchStep2Desc: "Connect your phone to controller's service Wi-Fi network:",
                searchStep2Net: "Network Name: <code>Bms_Setup</code>",
                searchStep2Pwd: "Password: <code>bmslocal</code>",
                searchStep2Tip: "💡 If <code>Bms_Setup</code> does not appear, turn off phone hotspot for 15 seconds — controller will create it automatically.",
                searchStep2Warn: "⚠️ In <code>Bms_Setup</code> network settings turn off «Auto-Join». If prompted «No internet», choose «Keep connection».",
                searchStep3Title: "Automatic IP Discovery",
                searchStep3Note: "The controller sends its IP to Radar and redirects you back with saved IP.",
                manualIpTitle: "Enter IP Manually (Advanced)",
                manualIpAdvDesc: "Where to find IP? In phone hotspot settings under «Connected devices».",
                offlineWarn: "⚠️ <b>Mobile internet is unavailable</b> while connected directly to controller Wi-Fi <code>Bms_Setup</code>.",
                offlineStepATitle: "Wi-Fi Network Bms_Setup",
                offlineStepADesc: "Turn off phone hotspot for 15 seconds. The controller creates a backup network for direct connection:",
                offlineStepBTitle: "Direct Controller Access",
                offlineStepBDesc: "Connect phone to <code>Bms_Setup</code> Wi-Fi and open controller interface directly:",
                btnOpenDirect: "Open http://10.10.10.1",
                offlineStepBNote: "In web interface you can view telemetry or configure Wi-Fi credentials for your phone hotspot.",
                modalResetTitle: "Switch Controller Board?",
                modalResetDesc: "Radar will forget the saved address of the current board. You will be able to connect another board or transfer the adapter to another vehicle.",
                modalResetConfirm: "Forget & Find New",
                modalResetCancel: "Cancel",
                manualIntro: "💡 <b>Backup method:</b> use this if mobile hotspot or cellular data is unavailable.",
                stepBackupATitle: "Wi-Fi Network Bms_Setup",
                stepBackupADesc: "Turn OFF phone hotspot for 15 seconds. The controller will create a temporary configuration network:",
                stepBackupBTitle: "Direct Connection",
                stepBackupBDesc: "Connect your phone to <code>Bms_Setup</code> Wi-Fi and open in browser:",
                stepBackupCTitle: "Manual IP Entry",
                stepBackupCDesc: "If you know the controller IP address from your hotspot connected devices:",
                deviceLabel: "Board:",
                btnQuickReset: "Switch Board",
                toastResetDone: "Board memory cleared. Searching for new active board...",
                btnMainConnect: "Connect to Controller",
                btnOpenDash: "Open Live Monitor",
                toggleGuideShow: "Show Connection Steps ▼",
                toggleGuideHide: "Hide Connection Steps ▲",
                statusIdle: "Tap to search and connect",
                statusSearchingLocal: "Searching in local network...",
                statusSearchingCloud: "Querying cloud for IP...",
                statusFound: "Controller found! Opening...",
                statusNotFound: "Controller not found. Check the steps above.",
                supportTitle: "Service Information",
                supRadarVer: "Radar Version:",
                supDevMac: "Device ID (MAC):",
                supDevIp: "Controller IP:",
                supBoardFw: "Board Firmware:",
                supStatus: "Link Status:",
                btnResetDev: "Switch / Forget Current Board",
                btnCopySupport: "Copy Support Data",
                toastSupportCopied: "✅ Service information copied to clipboard",
                btnMonitorHelp: "Page not opening? Tap for help",
                helperBtnReset: "Reset controller memory",
                toastHardResetDone: "Controller memory cleared. Connect to Bms_Setup or tap 'Search'.",
                toastOpeningDashboard: "Opening Live Monitor. If page fails to load, tap help below.",
                statusMemoryCleared: "Memory cleared / Waiting for search"
            },
            zh: {
                appTitle: "Live Radar",
                appsHeader: "📱 Android 应用",
                btnApkToggle: "Android 应用",
                badgeRecommended: "🔥 推荐",
                ipLabel: "控制器 IP 地址",
                ipStatusOnline: "在线 (点火已开启)",
                ipStatusRecent: "最近在线",
                ipStatusStale: "离线 (请开启点火)",
                ipStatusOffline: "离线 / 待机",
                cloudStatusOnline: "云端在线",
                cloudStatusRecent: "最近在云端",
                cloudStatusStale: "云端离线",
                ipStatusChecking: "检查状态中...",
                firstRunTip: "首次设置：请按照下方指南操作 👇",
                btnOpen: "Live Monitor",
                helperTitle: "实时监视器 (Live Monitor)",
                helperIpLabel: "监视器地址：",
                helperWarnTitle: "页面无法打开？",
                helperStep1: "1. 请开启手机<b>个人热点</b>（网络 <code>Bms</code>，密码 <code>bms.local</code>，<b>2.4 GHz</b>）。",
                helperStep2: "2. 启动混合动力汽车（<b>READY</b> 模式），为控制器供电。",
                helperStep3: "3. 等待 5-10 秒，直到控制器连接到您的热点网络。",
                helperBtnReopen: "重新打开",
                helperBtnCheck: "检查云端连接",
                helperBtnClose: "关闭",
                btnSync: "查找控制器",
                btnManual: "手动设置 IP",
                step3Or: "或手动输入控制器 IP：",
                step3AdvancedTitle: "对于高级用户",
                step3AdvancedDesc: "哪里可以找到 IP 地址？进入手机热点设置的“已连接设备”部分。",
                step3ResetTitle: "更换了电路板或第二辆车？",
                step3ResetDesc: "如果连接了另一块电路板，请点击下方重置已保存的设备内存并发现新板。",
                btnStep3Reset: "重置内存并查找新板",
                step4Btn: "Live Monitor",
                btnSaveIp: "保存",
                autoText: "<b>控制器完全自主运行。</b> 手机仅用于监控与设置。",
                accordionSetupFirst: "首次连接指南",
                accordionSetupConfig: "连接与设置",
                accordionFaq: "常见问题 (FAQ)",
                setupSub: "逐步设置指南",
                faqSub: "知识库与 FAQ",
                apkTitle: "Live Monitor",
                apkDesc: "支持悬浮窗实时监控的 Android 应用：",
                apkF2: "<b>智能手机热点极速自动直连</b><br><span style=\"color: #a1a1aa; font-size: 11.5px;\">应用自动发现控制器 — 无需查找 IP 与手动设置。</span>",
                btnDownloadApk: "下载 APK",
                apkInstallHint: "下载完成后，请从手机通知栏打开文件以完成安装",
                installTitleAndroid: "📲 安装应用程序",
                installDescAndroid: "将 Live Radar 添加到主屏幕，享受一键快速访问。",
                btnInstall: "立即安装",
                installTitleIos: "📲 在 iPhone 上添加",
                installDescIos: "在 Safari 浏览器中点击底部<b>分享按钮 ⎋</b>，然后选择<b>“添加到主屏幕” ➕</b>。",
                step1Title: "开启手机热点",
                step1Desc: "请在手机上开启<b>个人热点</b>，参数如下：",
                step1Net: "热点名称：<code>Bms</code>",
                step1Pwd: "热点密码：<code>bmslocal</code>",
                step1Warn: "⚠️ <b>特别注意：</b> 仅支持 <b>2.4GHz Wi-Fi</b>。iPhone 用户请开启<i>“最大兼容性”</i>。",
                step1Note: "",
                step2Title: "插入车辆并通电",
                step2Body: "将控制器插入车辆方向盘下方的 <b>OBD2 接口</b>，并将车辆启动至 <b>READY</b> 模式。",
                step3Title: "IP 检测（自动同步）",
                step3Desc: "请在手机上连接控制器热点，参数如下：",
                step3Net: "热点名称：<code>Bms_Setup</code>",
                step3Pwd: "热点密码：<code>bmslocal</code>",
                step3Tips: "<b style='color: #fde68a;'>⚠️ 重要提示：</b> 在此 Wi-Fi 网络的设置中，<b>关闭“自动连接”</b>。如果提示“无网络”，请选择<b>“保持连接”</b>。",
                btnGuideSync: "与控制器自动同步",
                step3Note: "控制器将自动将 IP 发送给雷达，关闭临时热点，并带您返回主屏（已保存 IP）。",
                step4Title: "启动 Live Monitor",
                step4Body: "获取 IP 地址后，点击<b>«📊 Live Monitor»</b>（此处或顶部均可）即可查看实时电池遥测数据。",
                trAutoQ: "🛡️ 自主运行与系统更新机制？",
                trAutoA: "• <b>⚡ 完全自主运行：</b>控制器硬件直连车辆，完全自动独立调节散热风扇转速。手机没电或遗忘绝不影响电池散热。<br>• <b>📲 超低功耗连接：</b>手机不会因持续通信而耗电。仅在您需要查看电池温度或更改网络设置时才发起连接。<br>• <b>🔄 长期维护与更新：</b>控制器硬件与移动端 App 均具备无线更新支持。",
                tr1Q: "🔴 无法打开仪表板或设备离线？",
                tr1A: "• 确保车辆处于通电状态（<b>READY</b> 模式）。<br>• 检查手机热点是否开启：默认网络：<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>热点名称：<code>Bms</code></span><span>热点密码：<code>bmslocal</code></span></div>或您设置的自定义网络。<br>• iPhone 用户请务必在个人热点设置中开启<i>“最大兼容性”</i>。<br>• Android 用户请将热点 AP 频段设置为 <b>2.4 GHz</b>。<br>• 您也可以尝试访问 <a href=\"http://bms.local\" target=\"_blank\" style=\"color: #4ade80; text-decoration: underline;\">http://bms.local</a>（在 iPhone 热点上可能不稳定）。",
                tr2Q: "📶 连接 Bms_Setup 时的注意事项：",
                tr2A: "• <b>关闭自动重连：</b>输入密码 <code>bmslocal</code> 时，请<b>关闭</b><i>“自动重连”</i>开关。<br>• <b>提示无网络：</b>若系统提示<i>“无互联网连接”</i>，请勾选<b>“始终连接”/“保持连接”</b>。",
                tr3Q: "🟡 IP 地址发生变化？",
                tr3A: "• 请确保手机热点 (2.4GHz) 已开启且手机已连接至 <code>Bms_Setup</code> Wi-Fi，然后点击<b>“自动同步”</b> <a href='javascript:void(0)' onclick='openAndScrollToStep3()' style='color: #3b82f6; text-decoration: underline;'>(前往按钮)</a>。<br>• 或在手机的<i>设置 ➔ 个人热点 ➔ 已连接设备</i>中查看分配的 IP 并手动输入。",
                trAndroidQ: "🤖 Android 手机 2.4GHz 热点设置方法：",
                trAndroidA: "在手机 <i>设置 ➔ 个人热点 / 网络共享 ➔ 热点设置</i> 中，将 <b>AP 频段</b> 切换为 <b>2.4 GHz 频段</b>（不要选 5 GHz）。",
                trCustomQ: "⚙️ 如何将控制器连接至自定义 Wi-Fi 网络？",
                trCustomA: "1. 关闭手机热点 15 秒，控制器将自动开启临时网络 <code>Bms_Setup</code>（密码 <code>bmslocal</code>）。<br>2. 手机连接 <code>Bms_Setup</code> Wi-Fi，打开 <a href='http://10.10.10.1' target='_blank' style='color: #4ade80; text-decoration: underline;'>http://10.10.10.1</a> 或 <a href='http://bms.local' target='_blank' style='color: #4ade80; text-decoration: underline;'>bms.local</a>，或点击上方的<b>“自动同步”</b>。<br>3. 在 Wi-Fi 设置栏中输入您的专属热点 SSID 和密码并点击保存。<br>保存后控制器将自动连接您的网络！",
                tr4Q: "❓ 更换了手机或输错了 Wi-Fi 密码？",
                tr4A: "无需担心：关闭手机热点 15 秒。控制器因无法连接网络会自动重新开启 服务热点：<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>热点名称：<code>Bms_Setup</code></span><span>热点密码：<code>bmslocal</code></span></div>，您可通过 <a href='http://10.10.10.1' target='_blank' style='color: #4ade80; text-decoration: underline;'>http://10.10.10.1</a> 或 <a href='http://bms.local' target='_blank' style='color: #4ade80; text-decoration: underline;'>bms.local</a> 重新输入正确的配置。",
                toastLinked: "✅ 控制器已连接：",
                toastConnecting: "📡 正在连接 (10.10.10.1)...<br><small style=\"color:#cbd5e1; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;\">请确保手机热点已开启，且已连接到 <code>Bms_Setup</code> Wi-Fi！</small>",
                toastSetupFirst: "请先按照下方指南完成连接设置",
                btnConnecting: "正在连接...",
                alertInvalidIp: "IP 地址格式无效（示例：10.48.33.187）",
                dashUnreachable: "⚠️ <b>无法连接至控制器。</b><br>• 请确认手机热点 (2.4GHz) 已开启：<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>热点名称：<code>Bms</code></span><span>热点密码：<code>bmslocal</code></span></div>。<br>• 请确认车辆处于 <b>READY</b> 模式。<br>• 或连接 <code>Bms_Setup</code> 热点并点击<b>“通过 Bms_Setup 自动同步”</b>。",
                errNoSetupNetwork: "⚠️ 请先连接到 <code>Bms_Setup</code> Wi-Fi",
                manualIpHint: "在热点设置中查找 IP (例如：10.48.33.x)",
                btnCloudSearch: "在云端查找控制器",
                cloudSearching: "正在云端查找控制器...",
                cloudFound: "已找到控制器：",
                cloudNotFound: "控制器尚未连接到云端。请开启手机热点。",
                cloudError: "云端连接错误，请检查手机网络。",
                quickGuideTitle: "快速上手（3步）：",
                qstep1: "开启手机热点（网络：<code>Bms</code>，密码：<code>bmslocal</code>，频段：<b>2.4 GHz</b>）。",
                qstep2: "将适配器插入车辆 <b>OBD2</b> 接口并启动车辆（<b>READY</b> 模式）。",
                qstep3: "点击下方绿色“连接到控制器”按钮。",
                tabCloud: "⚡ 云端",
                cloudIntro: "⚡ <b>推荐且最简便的方式：</b>一键自动连接。如果无法通过云端找到控制器，请使用<b>“搜索”</b>标签页。",
                tabSearch: "🔍 搜索",
                tabOffline: "📡 离线",
                searchIntro: "💡 <b>无网络本地自动搜索：</b>控制器通过服务 Wi-Fi 直接向雷达发送 IP 地址。",
                searchStep1Title: "开启手机热点",
                searchStep1Desc: "开启手机<b>个人热点</b>，参数设置如下：",
                searchStep1Net: "网络名称：<code>Bms</code>",
                searchStep1Pwd: "密码：<code>bmslocal</code>",
                searchStep1Note: "⚠️ <b>重要：</b>仅支持 <b>2.4GHz Wi-Fi</b>。在 iPhone 上请开启“最大兼容性”。",
                searchStep2Title: "连接到 Bms_Setup Wi-Fi",
                searchStep2Desc: "将手机连接到控制器的服务 Wi-Fi 网络：",
                searchStep2Net: "网络名称：<code>Bms_Setup</code>",
                searchStep2Pwd: "密码：<code>bmslocal</code>",
                searchStep2Tip: "💡 如果未出现 <code>Bms_Setup</code>，请关闭手机热点 15 秒 — 控制器将自动开启服务网络。",
                searchStep2Warn: "⚠️ 在 <code>Bms_Setup</code> 设置中关闭“自动加入”。若提示“无互联网连接”，请选择“保持连接”。",
                searchStep3Title: "自动获取 IP 地址",
                searchStep3Note: "控制器将自动将 IP 发送给雷达，并带您返回主屏（已保存 IP）。",
                manualIpTitle: "手动输入 IP（高级）",
                manualIpAdvDesc: "从手机热点设置的“已连接设备”中查找 IP 地址。",
                offlineWarn: "⚠️ <b>注意：直接连接控制器 Wi-Fi 期间无法使用蜂窝移动网络。</b>",
                offlineStepATitle: "Wi-Fi 网络 Bms_Setup",
                offlineStepADesc: "关闭手机热点 15 秒，控制器将创建备用网络以供直接访问：",
                offlineStepBTitle: "直接访问控制器",
                offlineStepBDesc: "连接手机至 <code>Bms_Setup</code> Wi-Fi 并直接在浏览器中打开控制器地址：",
                btnOpenDirect: "打开 http://10.10.10.1",
                offlineStepBNote: "在控制器界面中可查看电池遥测并配置手机热点 Wi-Fi 参数。",
                deviceLabel: "设备：",
                btnQuickReset: "更换设备",
                toastResetDone: "设备缓存已清除。请开启车辆电源 (READY) 以绑定新设备。",
                btnMainConnect: "连接到控制器",
                btnOpenDash: "打开 Live Monitor",
                toggleGuideShow: "显示连接步骤 ▼",
                toggleGuideHide: "隐藏连接步骤 ▲",
                statusIdle: "点击搜索并连接",
                statusSearchingLocal: "正在局域网中搜索...",
                statusSearchingCloud: "正在向云端请求 IP...",
                statusFound: "已找到控制器！正在打开...",
                statusNotFound: "未找到控制器。请检查上方步骤。",
                supportTitle: "服务信息",
                supRadarVer: "雷达版本：",
                supDevMac: "设备 ID (MAC)：",
                supDevIp: "控制器 IP：",
                supBoardFw: "主板固件：",
                supStatus: "连接状态：",
                btnResetDev: "切换 / 忘记当前主板",
                btnCopySupport: "复制支持信息",
                toastSupportCopied: "✅ 服务信息已复制到剪贴板",
                btnMonitorHelp: "页面打不开？点击获取帮助",
                helperBtnReset: "重置控制器内存",
                toastHardResetDone: "控制器内存已清除。请连接至 Bms_Setup 或点击“查找”。",
                toastOpeningDashboard: "已打开监视面板。如页面无法加载，请点击下方帮助。",
                statusMemoryCleared: "内存已清除 / 等待搜索"
            },
            ko: {
                appTitle: "Live Radar",
                appsHeader: "📱 Android 앱",
                btnApkToggle: "Android 앱",
                badgeRecommended: "🔥 추천",
                ipLabel: "컨트롤러 IP 주소",
                ipStatusOnline: "온라인 (시동 켜짐)",
                ipStatusRecent: "최근 온라인",
                ipStatusStale: "오프라인 (시동을 켜세요)",
                ipStatusOffline: "오프라인 / 대기",
                cloudStatusOnline: "클라우드 온라인",
                cloudStatusRecent: "클라우드 최근",
                cloudStatusStale: "클라우드 오프라인",
                ipStatusChecking: "상태 확인 중...",
                firstRunTip: "최초 설정: 아래 가이드에 따라 진행하세요 👇",
                btnOpen: "Live Monitor",
                helperTitle: "실시간 모니터 (Live Monitor)",
                helperIpLabel: "모니터 주소:",
                helperWarnTitle: "페이지가 열리지 않나요?",
                helperStep1: "1. 스마트폰에서 <b>개인용 핫스팟</b>을 켜세요 (네트워크 <code>Bms</code>, 비밀번호 <code>bms.local</code>, <b>2.4 GHz</b>).",
                helperStep2: "2. 하이브리드 시동을 켜서(<b>READY</b> 모드) 컨트롤러에 전원을 공급하세요.",
                helperStep3: "3. 컨트롤러가 핫스팟에 연결될 때까지 5~10초 정도 기다리세요.",
                helperBtnReopen: "다시 열기",
                helperBtnCheck: "클라우드 연결 확인",
                helperBtnClose: "닫기",
                btnSync: "컨트롤러 찾기",
                btnManual: "수동으로 IP 입력",
                step3Or: "또는 수동으로 IP 입력:",
                step3AdvancedTitle: "고급 사용자용",
                step3AdvancedDesc: "IP 주소는 어디서 찾나요? 휴대폰 핫스팟 설정의 '연결된 기기' 섹션으로 이동하세요.",
                step4Btn: "Live Monitor",
                btnSaveIp: "저장",
                autoText: "<b>컨트롤러는 완전 자율 작동합니다.</b> 스마트폰은 모니터링 및 설정에만 사용됩니다.",
                accordionSetupFirst: "최초 설정 가이드",
                accordionSetupConfig: "연결 및 설정",
                accordionFaq: "자주 묻는 질문 (FAQ)",
                setupSub: "단계별 설정 가이드",
                faqSub: "도움말 및 FAQ",
                apkTitle: "Live Monitor",
                apkDesc: "실시간 배터리 HUD 위젯을 지원하는 Android 앱:",
                apkF2: "<b>스마트폰 핫스팟 자동 즉시 연결</b><br><span style=\"color: #a1a1aa; font-size: 11.5px;\">앱이 컨트롤러를 자동 검색 — IP 검색이나 수동 설정 불필요.</span>",
                btnDownloadApk: "APK 다운로드",
                apkInstallHint: "다운로드 후 스마트폰 알림창에서 파일을 열어 설치하세요",
                installTitleAndroid: "📲 앱 설치하기",
                installDescAndroid: "원터치 빠른 실행을 위해 홈 화면에 Live Radar를 추가하세요.",
                btnInstall: "설치하기",
                installTitleIos: "📲 iPhone에 추가하기",
                installDescIos: "Safari 하단의 <b>공유 버튼 ⎋</b>을 탭한 후 <b>«홈 화면에 추가» ➕</b>를 선택하세요.",
                step1Title: "스마트폰 핫스팟 켜기",
                step1Desc: "스마트폰에서 다음 정보로 <b>개인용 핫스팟</b>을 켜세요:",
                step1Net: "네트워크 이름: <code>Bms</code>",
                step1Pwd: "비밀번호: <code>bmslocal</code>",
                step1Warn: "⚠️ <b>중요 알림:</b> <b>2.4GHz Wi-Fi</b>만 지원합니다. iPhone은 <i>«호환성 최대화»</i>를 켜주세요.",
                step1Note: "",
                step2Title: "차량 OBD2에 연결 및 전원 켜기",
                step2Body: "컨트롤러를 운전대 아래 <b>OBD2 단자</b>에 연결하고 차량 전원을 켜세요 (<b>READY</b> 모드).",
                step3Title: "IP 확인 (자동 동기화)",
                step3Desc: "스마트폰 Wi-Fi를 컨트롤러 네트워크에 연결하세요. 매개변수는 다음과 같습니다:",
                step3Net: "네트워크 이름: <code>Bms_Setup</code>",
                step3Pwd: "비밀번호: <code>bmslocal</code>",
                step3Tips: "<b style='color: #fde68a;'>⚠️ 중요:</b> 이 Wi-Fi 네트워크 설정에서 <b>«자동 연결»</b>을 끕니다. 팝업 시 <b>«연결 유지»</b>를 선택합니다.",
                btnGuideSync: "컨트롤러와 자동 동기화",
                step3Note: "컨트롤러가 Live Radar로 IP 주소를 전송하고 Bms_Setup을 끈 후 IP가 저장된 상태로 돌아옵니다.",
                step4Title: "Live Monitor 실행",
                step4Body: "IP 주소를 가져온 후 <b>«📊 Live Monitor»</b>(여기 또는 맨 위)를 누르면 실시간 데이터를 볼 수 있습니다.",
                trAutoQ: "🛡️ 자율 냉각 및 업데이트 방식 안내",
                trAutoA: "• <b>⚡ 완전 자율 작동:</b> 컨트롤러가 차량에 직접 연결되어 팬 속도를 스스로 조절합니다. 스마트폰이 꺼지거나 없어도 배터리 냉각에는 아무런 영향을 주지 않습니다.<br>• <b>📲 배터리 절약형 통신:</b> 스마트폰 배터리를 지속적으로 소모하지 않습니다. 배터리 온도를 확인하거나 네트워크 설정을 변경할 때만 연결됩니다.<br>• <b>🔄 지원 및 업데이트:</b> 컨트롤러와 모바일 앱 모두 무선 업데이트를 지원하도록 설계되었습니다.",
                tr1Q: "🔴 대시보드가 열리지 않거나 오프라인인 경우:",
                tr1A: "• 차량 시동이 켜져 있는지 확인하세요 (<b>READY</b> 모드).<br>• 스마트폰 핫스팟이 켜져 있는지 확인하세요: 기본 네트워크 또는 컨트롤러에 설정한 네트워크:<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>네트워크 이름: <code>Bms</code></span><span>비밀번호: <code>bmslocal</code></span></div><br>• iPhone의 경우 핫스팟 설정에서 <i>«호환성 최대화»</i>를 켜주세요.<br>• Android의 경우 AP 밴드를 <b>2.4 GHz</b>로 설정하세요.<br>• <a href=\"http://bms.local\" target=\"_blank\" style=\"color: #4ade80; text-decoration: underline;\">http://bms.local</a> 에 접속해 볼 수도 있습니다 (iPhone 핫스팟에서는 불안정할 수 있음).",
                tr2Q: "📶 Bms_Setup Wi-Fi 연결 주의사항:",
                tr2A: "• Bms_Setup의 <i>«자동 다시 연결»</i>을 끄세요.<br>• <i>«인터넷 없음»</i> 팝업 시 <b>«항상 연결» / «Wi-Fi 연결 유지»</b>를 선택하세요.",
                tr3Q: "🟡 IP 주소가 변경된 경우:",
                tr3A: "• 스마트폰 핫스팟(2.4GHz)이 켜져 있고 스마트폰이 <code>Bms_Setup</code> Wi-Fi에 연결되어 있는지 확인한 후 <b>«자동 동기화»</b>를 누르세요 <a href='javascript:void(0)' onclick='openAndScrollToStep3()' style='color: #3b82f6; text-decoration: underline;'>(버튼으로 이동)</a>.<br>• 또는 핫스팟 설정에서 연결된 기기의 IP 주소를 확인하여 수동 입력하세요.",
                trAndroidQ: "🤖 Android 핫스팟 2.4GHz 설정 방법:",
                trAndroidA: "스마트폰 <i>설정 ➔ 테더링 및 핫스팟 ➔ 핫스팟 설정</i>에서 <b>AP 밴드</b>를 <b>2.4 GHz 대역</b>으로 선택하세요.",
                trCustomQ: "⚙️ 컨트롤러를 나만의 Wi-Fi에 연결하는 방법은?",
                trCustomA: "1. 스마트폰 핫스팟을 15초간 끕니다. 컨트롤러가 설정용 Wi-Fi를 시작합니다:<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>네트워크 이름: <code>Bms_Setup</code></span><span>비밀번호: <code>bmslocal</code></span></div><br>2. <code>Bms_Setup</code> Wi-Fi에 연결한 후 <a href='http://10.10.10.1' target='_blank' style='color: #4ade80; text-decoration: underline;'>http://10.10.10.1</a> 또는 <a href='http://bms.local' target='_blank' style='color: #4ade80; text-decoration: underline;'>bms.local</a> 에 접속하거나 상단의 <b>«자동 동기화»</b>를 누릅니다.<br>3. Wi-Fi 설정 항목에서 사용할 핫스팟 이름과 비밀번호를 입력하고 저장합니다.<br>저장 후 컨트롤러가 자동으로 연결됩니다!",
                tr4Q: "❓ 스마트폰을 변경했거나 Wi-Fi 비밀번호를 잘못 입력한 경우?",
                tr4A: "걱정하지 마세요: 스마트폰 핫스팟을 15초간 끕니다. 네트워크를 찾지 못한 컨트롤러가 설정용 Wi-Fi를 다시 실행하므로:<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>네트워크 이름: <code>Bms_Setup</code></span><span>비밀번호: <code>bmslocal</code></span></div> <a href='http://10.10.10.1' target='_blank' style='color: #4ade80; text-decoration: underline;'>http://10.10.10.1</a> 또는 <a href='http://bms.local' target='_blank' style='color: #4ade80; text-decoration: underline;'>bms.local</a> 에서 새 정보를 다시 입력하실 수 있습니다.",
                toastLinked: "✅ 컨트롤러 연결됨: ",
                toastConnecting: "📡 연결 중 (10.10.10.1)...<br><small style=\"color:#cbd5e1; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;\">스마트폰 핫스팟이 켜져 있고 <code>Bms_Setup</code> Wi-Fi에 연결되어 있는지 확인하세요!</small>",
                toastSetupFirst: "먼저 아래 가이드에 따라 설정을 완료하세요",
                btnConnecting: "연결 중...",
                alertInvalidIp: "올바르지 않은 IP 주소 형식입니다 (예: 10.48.33.187)",
                dashUnreachable: "⚠️ <b>컨트롤러에 연결할 수 없습니다.</b><br>• 스마트폰 핫스팟 (2.4GHz)이 켜져 있는지 확인하세요:<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>네트워크 이름: <code>Bms</code></span><span>비밀번호: <code>bmslocal</code></span></div><br>• 차량 시동이 <b>READY</b> 상태인지 확인하세요.<br>• 또는 <code>Bms_Setup</code>에 연결 후 <b>«Bms_Setup을 통한 자동 동기화»</b>를 누르세요.",
                errNoSetupNetwork: "⚠️ 먼저 <code>Bms_Setup</code> Wi-Fi에 연결하세요",
                manualIpHint: "핫스팟 설정에서 IP 찾기 (예: 10.48.33.x)",
                btnCloudSearch: "클라우드에서 찾기",
                cloudSearching: "클라우드에서 검색 중...",
                cloudFound: "컨트롤러를 찾았습니다:",
                cloudNotFound: "컨트롤러가 아직 연결되지 않았습니다. 스마트폰 핫스팟을 켜주세요.",
                cloudError: "클라우드 오류입니다. 스마트폰 인터넷을 확인하세요.",
                quickGuideTitle: "빠른 시작 (3단계):",
                qstep1: "스마트폰 핫스팟을 켭니다 (네트워크: <code>Bms</code>, 비밀번호: <code>bmslocal</code>, 대역: <b>2.4 GHz</b>).",
                qstep2: "차량 <b>OBD2</b> 단자에 어댑터를 연결하고 시동을 켭니다 (<b>READY</b> 모드).",
                qstep3: "아래 초록색 «컨트롤러에 연결» 버튼을 누르세요.",
                tabCloud: "⚡ 클라우드",
                cloudIntro: "⚡ <b>가장 간단하고 권장되는 방법:</b> 원탭 자동 연결. 클라우드를 통해 컨트롤러를 찾을 수 없는 경우 <b>«검색»</b> 탭을 사용하세요.",
                tabSearch: "🔍 검색",
                tabOffline: "📡 오프라인",
                searchIntro: "💡 <b>인터넷 없는 로컬 자동 검색:</b> 컨트롤러가 서비스 Wi-Fi를 통해 레이더로 직접 IP를 전송합니다.",
                searchStep1Title: "스마트폰 핫스팟 켜기",
                searchStep1Desc: "다음 설정으로 스마트폰 <b>개인용 핫스팟</b>을 켜세요:",
                searchStep1Net: "네트워크 이름: <code>Bms</code>",
                searchStep1Pwd: "비밀번호: <code>bmslocal</code>",
                searchStep1Note: "⚠️ <b>중요:</b> <b>2.4GHz Wi-Fi</b>만 지원됩니다. iPhone에서는 «호환성 최대화»를 켜세요.",
                searchStep2Title: "Bms_Setup Wi-Fi 연결",
                searchStep2Desc: "스마트폰을 컨트롤러의 서비스 Wi-Fi 네트워크에 연결하세요:",
                searchStep2Net: "네트워크 이름: <code>Bms_Setup</code>",
                searchStep2Pwd: "비밀번호: <code>bmslocal</code>",
                searchStep2Tip: "💡 <code>Bms_Setup</code>이 표시되지 않으면 스마트폰 핫스팟을 15초간 끄세요. 컨트롤러가 자동으로 생성합니다.",
                searchStep2Warn: "⚠️ <code>Bms_Setup</code> 설정에서 «자동 연결»을 끄세요. «인터넷 없음» 안내 시 «연결 유지»를 선택하세요.",
                searchStep3Title: "자동 IP 수신",
                searchStep3Note: "컨트롤러가 레이더로 IP를 전달하고 IP가 저장된 상태로 복귀합니다.",
                manualIpTitle: "수동 IP 입력 (고급)",
                manualIpAdvDesc: "IP 주소는 스마트폰 핫스팟 설정의 «연결된 기기» 목록에서 확인할 수 있습니다.",
                offlineWarn: "⚠️ <b>컨트롤러 Wi-Fi에 직접 연결된 동안에는 모바일 인터넷을 사용할 수 없습니다.</b>",
                offlineStepATitle: "Wi-Fi 네트워크 Bms_Setup",
                offlineStepADesc: "스마트폰 핫스팟을 15초간 끕니다. 컨트롤러가 직접 접속용 백업 네트워크를 생성합니다:",
                offlineStepBTitle: "컨트롤러 직접 접속",
                offlineStepBDesc: "<code>Bms_Setup</code> Wi-Fi에 연결하고 브라우저에서 컨트롤러 주소를 직접 엽니다:",
                btnOpenDirect: "http://10.10.10.1 열기",
                offlineStepBNote: "웹 화면에서 배터리 상태를 확인하거나 핫스팟 Wi-Fi 정보를 설정할 수 있습니다.",
                deviceLabel: "보드:",
                btnQuickReset: "보드 전환",
                toastResetDone: "보드 메모리가 초기화되었습니다. 새 보드를 연결하려면 차량 시동을 켜세요(READY).",
                btnMainConnect: "컨트롤러에 연결",
                btnOpenDash: "Live Monitor 열기",
                toggleGuideShow: "연결 가이드 보기 ▼",
                toggleGuideHide: "연결 가이드 숨기기 ▲",
                statusIdle: "탭하여 검색 및 연결",
                statusSearchingLocal: "로컬 네트워크에서 검색 중...",
                statusSearchingCloud: "클라우드에서 IP 조회 중...",
                statusFound: "컨트롤러를 찾았습니다! 실행 중...",
                statusNotFound: "컨트롤러를 찾을 수 없습니다. 위의 단계를 확인하세요.",
                supportTitle: "서비스 정보",
                supRadarVer: "레이더 버전:",
                supDevMac: "기기 ID (MAC):",
                supDevIp: "컨트롤러 IP:",
                supBoardFw: "보드 펌웨어:",
                supStatus: "연결 상태:",
                btnResetDev: "현재 보드 전환 / 초기화",
                btnCopySupport: "지원 정보 복사",
                toastSupportCopied: "✅ 서비스 정보가 클립보드에 복사되었습니다",
                btnMonitorHelp: "페이지가 열리지 않나요? 도움말 보기",
                helperBtnReset: "컨트롤러 메모리 초기화",
                toastHardResetDone: "컨트롤러 메모리가 초기화되었습니다. Bms_Setup에 연결하거나 '검색'을 누르세요.",
                toastOpeningDashboard: "라이브 모니터가 열렸습니다. 페이지가 로드되지 않으면 아래 도움말을 누르세요.",
                statusMemoryCleared: "메모리 초기화됨 / 검색 대기 중"
            },
            ru: {
                appTitle: "Live Radar",
                appsHeader: "📱 Android App",
                btnApkToggle: "Android App",
                badgeRecommended: "🔥 РЕКОМЕНДУЕМ",
                ipLabel: "IP адрес контроллера",
                ipStatusOnline: "В сети (Зажигание включено)",
                ipStatusRecent: "В сети недавно",
                ipStatusStale: "Не в сети (Зажигание выключено)",
                ipStatusOffline: "Не в сети / Ожидание",
                cloudStatusOnline: "Активен в Облаке",
                cloudStatusRecent: "Был в сети",
                cloudStatusStale: "Офлайн",
                ipStatusChecking: "Проверка связи...",
                firstRunTip: "Первый запуск: следуйте инструкции ниже 👇",
                btnOpen: "Live Monitor",
                helperTitle: "Live Monitor",
                helperIpLabel: "Адрес монитора:",
                helperWarnTitle: "Не открывается страница?",
                helperStep1: "1. Включите <b>Точку доступа</b> на телефоне (сеть <code>Bms</code>, пароль <code>bms.local</code>, частота <b>2.4 ГГц</b>).",
                helperStep2: "2. Включите зажигание гибрида (режим <b>READY</b>), чтобы плата получала питание.",
                helperStep3: "3. Подождите 5–10 секунд, пока контроллер подключится к вашей сети.",
                helperBtnReopen: "Открыть снова",
                helperBtnCheck: "Проверить связь в облаке",
                helperBtnClose: "Закрыть",
                btnSync: "Найти контроллер",
                btnManual: "Ввести IP-адрес вручную",
                step3Or: "Укажите IP-адрес вручную:",
                step3AdvancedTitle: "Для продвинутых пользователей",
                step3AdvancedDesc: "Где взять IP-адрес? В настройках точки доступа телефона перейдите в раздел «Подключенные устройства».",
                step3ResetTitle: "Подключили другой контроллер?",
                step3ResetDesc: "⚠️ <span style=\"color: #ff9800; font-weight: bold;\">Внимание:</span> Радар отвяжет текущий контроллер! После этого вы сможете подключить новый через меню сверху.",
                btnStep3Reset: "Отвязать текущий контроллер",
                step4Btn: "Live Monitor",
                btnSaveIp: "Сохранить",
                autoText: "<b>Контроллер работает полностью автономно.</b> Телефон используется только для мониторинга и настройки.",
                accordionSetupFirst: "Первое подключение",
                accordionSetupConfig: "Настройка и связь",
                accordionFaq: "Вопросы и ответы",
                setupSub: "Пошаговый гид",
                faqSub: "База знаний (FAQ)",
                apkTitle: "Live Monitor",
                apkDesc: "Android приложение с плавающим HUD виджетом:",
                apkF2: "<b>Мгновенное автоподключение к точке доступа смартфона</b><br><span style=\"color: #a1a1aa; font-size: 11.5px;\">Приложение само находит контроллер — без поиска IP-адреса и ручных настроек.</span>",
                btnDownloadApk: "Скачать APK",
                apkInstallHint: "После загрузки откройте файл из шторки уведомлений для установки",
                installTitleAndroid: "📲 Установить приложение",
                installDescAndroid: "Добавьте Live Radar на главный экран для быстрого доступа.",
                btnInstall: "Установить",
                installTitleIos: "📲 Установка на iPhone",
                installDescIos: "Нажмите кнопку <b>Поделиться ⎋</b> в Safari и выберите <b>«На экран Домой» ➕</b>.",
                step1Title: "Включите раздачу с телефона",
                step1Desc: "Включите <b>Точку доступа</b> на телефоне со следующими параметрами:",
                step1Net: "Имя сети: <code>Bms</code>",
                step1Pwd: "Пароль: <code>bmslocal</code>",
                step1Warn: "⚠️ <b>Важно:</b> Поддерживается только <b>2.4GHz Wi-Fi</b>. На iPhone включите <i>«Максимальная совместимость»</i>.",
                step1Note: "",
                step2Title: "Подключение к авто и запуск",
                step2Body: "Вставьте контроллер в <b>OBD2 разъем</b> автомобиля и включите зажигание (режим <b>READY</b>).",
                step3Title: "Определение IP-адреса (Автопоиск)",
                step3Desc: "Подключите Wi-Fi телефона к сети контроллера со следующими параметрами:",
                step3Net: "Имя сети: <code>Bms_Setup</code>",
                step3Pwd: "Пароль: <code>bmslocal</code>",
                step3Tips: "<b style='color: #fde68a;'>⚠️ ВАЖНО:</b> В настройках этой Wi-Fi сети выключите <b>«Автоподключение»</b>. При окне «Нет интернета» выберите <b>«Оставаться подключенным»</b>.",
                btnGuideSync: "Найти контроллер (Автопоиск IP-адреса)",
                step3Note: "Контроллер передаст свой IP-адрес Радару, выключит сеть <code>Bms_Setup</code> и вернет вас на главный экран с уже сохраненным IP-адресом.",
                step4Title: "Запуск Live Monitor",
                step4Body: "После получения IP-адреса нажмите <b>«📊 Live Monitor»</b> (здесь или в самом верху) для перехода к телеметрии.",
                trAutoQ: "🛡️ Как устроена автономность и обновления?",
                trAutoA: "• <b>⚡ Полная автономность:</b> Контроллер подключен к автомобилю и сам регулирует обороты вентилятора. Забытый или разряженный телефон никак не влияет на охлаждение батареи.<br>• <b>📲 Энергоэффективная связь:</b> Телефон не сажает батарею постоянным обменом данными. Соединение требуется только тогда, когда вы хотите посмотреть температуру батареи или изменить параметры сети.<br>• <b>🔄 Поддержка и обновления:</b> Контроллер и мобильное приложение спроектированы с поддержкой обновлений.",
                tr1Q: "🔴 Дашборд не открывается или не в сети?",
                tr1A: "• Убедитесь, что зажигание включено (режим <b>READY</b>).<br>• Убедитесь, что включена раздача: стандартная сеть либо заданная вами в настройках контроллера:<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>Имя сети: <code>Bms</code></span><span>Пароль: <code>bmslocal</code></span></div><br>• На iPhone включите <i>«Максимальная совместимость»</i> в настройках модема.<br>• На Android выберите диапазон частот точки доступа <b>2.4 ГГц</b>.",
                tr2Q: "📶 Подсказки для сети Bms_Setup:",
                tr2A: "• Выключите <i>«Автоподключение»</i> для <code>Bms_Setup</code>.<br>• При появлении окна <i>«Нет интернета»</i> выберите <i>«Оставаться подключенным»</i>.",
                tr3Q: "🟡 Сменился IP-адрес?",
                tr3A: "• Благодаря умному автопоиску плата передает новый IP при подключении к вашей точке доступа.<br>• Если вы сменили плату, нажмите <b>«Сменить плату»</b> на главном экране.",
                trAndroidQ: "🤖 Настройка 2.4GHz на телефонах Android:",
                trAndroidA: "В меню <i>Настройки ➔ Точка доступа Wi-Fi ➔ Настройка точки доступа</i> переключите пункт <b>Диапазон частот (AP Band)</b> на <b>2.4 ГГц</b> (вместо 5 ГГц).",
                trCustomQ: "⚙️ Как подключить контроллер к своей сети Wi-Fi (своё имя и пароль)?",
                trCustomA: "1. Откройте Live Monitor при подключении, перейдите в настройки Wi-Fi, введите SSID и пароль вашей точки доступа и сохраните.<br>После сохранения контроллер будет подключаться к вашей сети автоматически!",
                tr4Q: "❓ Сменили телефон или ошиблись в пароле Wi-Fi?",
                tr4A: "Не переживайте: выключите раздачу на телефоне на 15 секунд. Контроллер не найдет сеть и откроет сервисную сеть <code>Bms_Setup</code> (пароль <code>bmslocal</code>), чтобы вы могли ввести новые данные через Live Monitor.",
                toastLinked: "✅ Контроллер привязан: ",
                toastConnecting: "📡 Подключение (10.10.10.1)...<br><small style=\"color:#cbd5e1; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;\">Убедитесь, что на телефоне включена точка доступа и вы подключены к Wi-Fi сети <code>Bms_Setup</code>!</small>",
                toastSetupFirst: "Пожалуйста, выполните подключение по инструкции ниже",
                btnConnecting: "Подключение...",
                alertInvalidIp: "Неверный формат IP адреса (пример: 10.48.33.187)",
                dashUnreachable: "⚠️ <b>Не удается открыть страницу контроллера.</b><br>• Проверьте, что на телефоне включена раздача (2.4GHz):<div class=\"cred-row\" style=\"margin: 6px 0;\"><span>Имя сети: <code>Bms</code></span><span>Пароль: <code>bmslocal</code></span></div><br>• Убедитесь, что авто в режиме <b>READY</b>.",
                errNoSetupNetwork: "⚠️ Сначала подключитесь к сети <code>Bms_Setup</code>",
                manualIpHint: "Найдите IP-адрес в настройках точки доступа (например: 10.48.33.x)",
                btnCloudSearch: "Найти контроллер в облаке",
                cloudSearching: "Поиск контроллера в облаке...",
                cloudFound: "Контроллер найден:",
                cloudNotFound: "Контроллер пока не ответил. Убедитесь, что раздача Wi-Fi включена.",
                cloudError: "Ошибка связи с облаком. Проверьте интернет на телефоне.",
                quickGuideTitle: "Быстрый старт (3 шага):",
                qstep1: "Включите точку доступа на телефоне (сеть: <code>Bms</code>, пароль: <code>bmslocal</code>, частота: <b>2.4 ГГц</b>).",
                qstep2: "Вставьте адаптер в разъем <b>OBD2</b> автомобиля и включите зажигание (режим <b>READY</b>).",
                qstep3: "Нажмите зеленую кнопку «Подключиться к контроллеру» ниже.",
                tabCloud: "⚡ Облако",
                cloudIntro: "⚡ <b>Рекомендуемый и самый простой способ:</b> автоматическое подключение в один клик. Если не удается найти через облако — используйте вкладку <b>«Поиск»</b>.",
                tabSearch: "🔍 Поиск",
                tabOffline: "📡 Офлайн",
                searchIntro: "💡 <b>Локальный автопоиск без интернета:</b> контроллер сам передаст свой IP в Радар через сервисную сеть.",
                searchStep1Title: "Включите раздачу с телефона",
                searchStep1Desc: "Включите <b>Точку доступа</b> на телефоне со следующими параметрами:",
                searchStep1Net: "Имя сети: <code>Bms</code>",
                searchStep1Pwd: "Пароль: <code>bmslocal</code>",
                searchStep1Note: "⚠️ <b>Важно:</b> Поддерживается только <b>2.4GHz Wi-Fi</b>. На iPhone включите «Максимальная совместимость».",
                searchStep2Title: "Подключение к Wi-Fi сети Bms_Setup",
                searchStep2Desc: "Подключите Wi-Fi на телефоне к сервисной сети контроллера:",
                searchStep2Net: "Имя сети: <code>Bms_Setup</code>",
                searchStep2Pwd: "Пароль: <code>bmslocal</code>",
                searchStep2Tip: "💡 Если сеть <code>Bms_Setup</code> не появилась, выключите раздачу на телефоне на 15 секунд — контроллер поднимет её автоматически.",
                searchStep2Warn: "⚠️ В свойствах сети <code>Bms_Setup</code> отключите «Автоподключение». Если появится запрос «Без доступа к интернету» — выберите «Сохранять подключение».",
                searchStep3Title: "Получение IP-адреса",
                searchStep3Note: "Контроллер передаст свой адрес в Радар и вернет вас на главный экран с сохраненным адресом.",
                manualIpTitle: "Ввести IP вручную (для продвинутых)",
                manualIpAdvDesc: "Где узнать IP? В настройках точки доступа телефона в списке «Подключенные устройства».",
                offlineWarn: "⚠️ <b>Мобильный интернет не будет работать</b> во время прямого подключения к Wi-Fi сети контроллера <code>Bms_Setup</code>.",
                offlineStepATitle: "Wi-Fi сеть Bms_Setup",
                offlineStepADesc: "Выключите точку доступа на телефоне на 15 секунд. Контроллер создаст резервную сеть для прямого входа:",
                offlineStepBTitle: "Прямой вход в контроллер",
                offlineStepBDesc: "Подключитесь к Wi-Fi сети <code>Bms_Setup</code> (пароль: <code>bmslocal</code>) и откройте адрес контроллера напрямую:",
                btnOpenDirect: "Открыть http://10.10.10.1",
                offlineStepBNote: "В веб-интерфейсе можно смотреть телеметрию и прописать параметры вашей точки доступа Wi-Fi.",
                modalResetTitle: "Отвязать контроллер?",
                modalResetDesc: "Радар отвяжет текущий контроллер. <br><span style=\"color: #4caf50; font-weight: bold;\">Настройки самого контроллера не удалятся!</span><br><br>После сброса вы сможете привязать новый контроллер через меню.",
                modalResetConfirm: "Забыть контроллер",
                modalResetCancel: "Отмена",
                manualIntro: "💡 <b>Резервный способ:</b> используйте, если телефон не раздает интернет или нет мобильной сети.",
                stepBackupATitle: "Wi-Fi сеть Bms_Setup",
                stepBackupADesc: "Выключите точку доступа на телефоне на 15 секунд. Контроллер сам создаст временную сеть для настройки:",
                stepBackupBTitle: "Прямой вход в контроллер",
                stepBackupBDesc: "Подключитесь к Wi-Fi сети <code>Bms_Setup</code> и откройте адрес в браузере:",
                stepBackupCTitle: "Ручной ввод IP-адреса",
                stepBackupCDesc: "Если вы знаете IP-адрес из списка подключенных устройств точки доступа:",
                deviceLabel: "Плата:",
                btnQuickReset: "Отвязать контроллер",
                toastResetDone: "Контроллер отвязан. Ожидание нового подключения...",
                btnMainConnect: "Подключиться к контроллеру",
                btnOpenDash: "Открыть Live Monitor",
                toggleGuideShow: "Показать шаги подключения ▼",
                toggleGuideHide: "Скрыть шаги подключения ▲",
                statusIdle: "Нажмите для поиска и подключения",
                statusSearchingLocal: "Поиск контроллера в локальной сети...",
                statusSearchingCloud: "Запрос свежего адреса из облака...",
                statusFound: "Контроллер найден! Открываем...",
                statusNotFound: "Контроллер не найден. Проверьте шаги 1–2 выше.",
                supportTitle: "Служебная информация",
                supRadarVer: "Версия Радара:",
                supDevMac: "ID устройства (MAC):",
                supDevIp: "IP-адрес контроллера:",
                supBoardFw: "Прошивка платы:",
                supStatus: "Статус связи:",
                btnResetDev: "Сменить / забыть текущую плату",
                btnCopySupport: "Скопировать данные для поддержки",
                toastSupportCopied: "✅ Служебная информация скопирована в буфер",
                btnMonitorHelp: "Не открывается страница? Нажмите для помощи",
                helperBtnReset: "Сбросить память контроллера",
                toastHardResetDone: "Память контроллера очищена. Подключитесь к Bms_Setup или нажмите «Поиск».",
                toastOpeningDashboard: "Открыта панель управления. Если страница не загрузилась — нажмите ссылку помощи ниже.",
                statusMemoryCleared: "Память очищена / Ожидание поиска"
            },
            ja: {
                appTitle: "BMS Cooling Radar",
                appsHeader: "📱 Android アプリ",
                btnApkToggle: "Android アプリ",
                badgeRecommended: "🔥 おすすめ",
                ipLabel: "コントローラー IP アドレス",
                ipStatusOnline: "オンライン (READY ON)",
                ipStatusRecent: "最近オンライン",
                ipStatusStale: "オフライン (READYにしてください)",
                ipStatusOffline: "オフライン / 待機",
                cloudStatusOnline: "クラウドでオンライン",
                cloudStatusRecent: "最近クラウドで確認",
                cloudStatusStale: "クラウドでオフライン",
                ipStatusChecking: "接続確認中...",
                firstRunTip: "初期設定：下のガイドに従ってください 👇",
                btnOpen: "Live Monitor",
                helperTitle: "Live Monitor",
                helperIpLabel: "モニターアドレス:",
                helperWarnTitle: "ページが開きませんか？",
                helperStep1: "1. スマホの<b>テザリング</b>をONにしてください（ネットワーク <code>Bms</code>、パスワード <code>bms.local</code>、<b>2.4 GHz</b>）。",
                helperStep2: "2. ハイブリッドの電源をON（<b>READY</b>モード）にして通電させてください。",
                helperStep3: "3. コントローラーがテザリングに接続するまで5〜10秒お待ちください。",
                helperBtnReopen: "もう一度開く",
                helperBtnCheck: "クラウド接続を確認",
                helperBtnClose: "閉じる",
                btnSync: "コントローラーを検出",
                btnManual: "IP手動設定",
                step3Or: "またはIPを手動入力:",
                step3AdvancedTitle: "上級者向け",
                step3AdvancedDesc: "テザリングの「接続中の端末」一覧でIPを確認できます。",
                step3ResetTitle: "ボードの変更または2台目の車両？",
                step3ResetDesc: "別のボードを接続した場合は、下のボタンを押して保存されたメモリをリセットし、新しいボードを検出してください。",
                btnStep3Reset: "メモリをリセットして新しいボードを検出",
                step4Btn: "Live Monitor",
                btnSaveIp: "保存",
                autoText: "<b>コントローラーは完全自律型です。</b> スマホは設定と確認時のみ使用します。",
                accordionSetupFirst: "初期接続ガイド",
                accordionSetupConfig: "設定と接続",
                accordionFaq: "よくある質問 (FAQ)",
                setupSub: "ステップ別ガイド",
                faqSub: "ナレッジベース",
                apkTitle: "Live Monitor",
                apkDesc: "フローティングHUDウィジェット付きAndroidアプリ：",
                apkF2: "<b>スマホのテザリングで瞬時に自動接続</b><br><span style=\"color: #a1a1aa; font-size: 11.5px;\">IP検索や手動設定は不要です。</span>",
                btnDownloadApk: "APKをダウンロード",
                apkInstallHint: "ダウンロード完了後、通知欄から開いてインストールしてください",
                installTitleAndroid: "📲 アプリのインストール",
                installDescAndroid: "ホーム画面に追加してワンタップで起動。",
                btnInstall: "インストール",
                installTitleIos: "📲 iPhone に追加",
                installDescIos: "Safariの共有ボタン ⎋ をタップし、「ホーム画面に追加」➕ を選択してください。",
                quickGuideTitle: "クイックスタート (3ステップ):",
                qstep1: "スマホのテザリングをONにします（SSID: <code>Bms</code>, パスワード: <code>bmslocal</code>, 帯域: <b>2.4GHz</b>）。",
                qstep2: "アダプターを車両の <b>OBD2</b> ポートに差し込み、車両を <b>READY</b> モードにします。",
                qstep3: "下の緑色の「コントローラーに接続」ボタンをタップします。",
                tabCloud: "⚡ クラウド",
                cloudIntro: "⚡ <b>推奨・最も簡単な接続方法：</b>ワンタップ自動接続。クラウド経由で見つからない場合は<b>「検索」</b>タブをお使いください。",
                tabSearch: "🔍 検索",
                tabOffline: "📡 オフライン",
                searchIntro: "💡 <b>ネット不要のローカル自動検索：</b>コントローラーが設定用Wi-Fi経由でレーダーにIPを直接通知します。",
                searchStep1Title: "スマホのテザリングをONにする",
                searchStep1Desc: "以下の設定でスマホの<b>テザリング</b>をONにしてください：",
                searchStep1Net: "ネットワーク名: <code>Bms</code>",
                searchStep1Pwd: "パスワード: <code>bmslocal</code>",
                searchStep1Note: "⚠️ <b>重要：</b><b>2.4GHz Wi-Fi</b>のみ対応しています。iPhoneでは「互換性を優先」をONにしてください。",
                searchStep2Title: "Wi-Fi Bms_Setup に接続",
                searchStep2Desc: "スマホのWi-Fiをコントローラーの設定用ネットワークに接続します：",
                searchStep2Net: "ネットワーク名: <code>Bms_Setup</code>",
                searchStep2Pwd: "パスワード: <code>bmslocal</code>",
                searchStep2Tip: "💡 <code>Bms_Setup</code> が表示されない場合は、テザリングを15秒間OFFにしてください。自動で起動します。",
                searchStep2Warn: "⚠️ <code>Bms_Setup</code> の設定で「自動接続」をOFFにしてください。「インターネット未接続」と出た場合は「接続を維持」を選択してください。",
                searchStep3Title: "IPアドレスの自動取得",
                searchStep3Note: "コントローラーがIPをレーダーに送信し、<code>Bms_Setup</code> を停止して保存済みIPで復帰します。",
                manualIpTitle: "手動IP入力 (上級者向け)",
                manualIpAdvDesc: "IPアドレスはスマホのテザリング設定「接続中の機器」一覧で確認できます。",
                offlineWarn: "⚠️ <b>コントローラーWi-Fiに接続中はモバイルデータ通信（ネット）は利用できません。</b>",
                offlineStepATitle: "Wi-Fi ネットワーク Bms_Setup",
                offlineStepADesc: "テザリングを15秒間OFFにすると、直接接続用のバックアップネットワークが起動します：",
                offlineStepBTitle: "コントローラー直接アクセス",
                offlineStepBDesc: "<code>Bms_Setup</code> Wi-Fi に接続し、ブラウザで直接コントローラーを開きます：",
                btnOpenDirect: "http://10.10.10.1 を開く",
                offlineStepBNote: "Web画面でバッテリー情報を確認したり、テザリング用Wi-Fi設定を行えます。",
                modalResetTitle: "コントローラー基板を変更しますか？",
                modalResetDesc: "レーダーは現在の基板のアドレスを消去します。別の基板に接続するか、別車両への載せ替えが可能です。",
                modalResetConfirm: "消去して新規検索",
                modalResetCancel: "キャンセル",
                manualIntro: "💡 <b>バックアップ方法：</b> テザリングやモバイル回線が利用できない場合に使用します。",
                stepBackupATitle: "Wi-Fi ネットワーク Bms_Setup",
                stepBackupADesc: "スマホのテザリングを15秒間OFFにします。設定用の一時ネットワークが起動します：",
                stepBackupBTitle: "直接アクセス",
                stepBackupBDesc: "Wi-Fi <code>Bms_Setup</code> に接続し、ブラウザで開きます：",
                stepBackupCTitle: "手動IP入力",
                stepBackupCDesc: "テザリングの接続機器一覧でIPがわかる場合：",
                deviceLabel: "ボード:",
                btnQuickReset: "ボード切替",
                toastResetDone: "ボードのメモリを消去しました。新しい基板を検索中...",
                btnMainConnect: "コントローラーに接続",
                btnOpenDash: "Live Monitor を開く",
                toggleGuideShow: "接続手順を表示 ▼",
                toggleGuideHide: "接続手順を非表示 ▲",
                statusIdle: "タップして検索・接続",
                statusSearchingLocal: "ローカルネットワークで検索中...",
                statusSearchingCloud: "クラウドからIPを検索中...",
                statusFound: "コントローラーが見つかりました！開いています...",
                statusNotFound: "コントローラーが見つかりません。上記の手順を確認してください。",
                supportTitle: "サービス情報",
                supRadarVer: "レーダーバージョン:",
                supDevMac: "デバイス ID (MAC):",
                supDevIp: "コントローラー IP:",
                supBoardFw: "ファームウェア:",
                supStatus: "接続ステータス:",
                btnResetDev: "現在のボードを変更 / 消去",
                btnCopySupport: "サポート用データをコピー",
                toastSupportCopied: "✅ サポート情報をクリップボードにコピーしました",
                btnCloudSearch: "クラウドで検索",
                cloudSearching: "クラウドで検索中...",
                cloudFound: "コントローラーを検出:",
                cloudNotFound: "未接続です。スマホのテザリングをONにしてください。",
                cloudError: "クラウドエラー。スマホのネット接続を確認してください。",
                btnMonitorHelp: "ページが開かない？タップしてサポートを表示",
                helperBtnReset: "コントローラーメモリのリセット",
                toastHardResetDone: "コントローラーのメモリを消去しました。Bms_Setupに接続するか「検索」を押してください。",
                toastOpeningDashboard: "モニターを開きました。読み込めない場合は下のサポートをタップしてください。",
                statusMemoryCleared: "メモリ消去済み / 検索待機中"
            }
        };

        // Global URL parameters

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

var currentLang = detectLanguage();

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
            if (document.getElementById('t-tab-cloud')) document.getElementById('t-tab-cloud').innerText = t.tabCloud || '⚡ Облако';
            if (document.getElementById('t-tab-search')) document.getElementById('t-tab-search').innerText = t.tabSearch || '🔍 Поиск';
            if (document.getElementById('t-tab-offline')) document.getElementById('t-tab-offline').innerText = t.tabOffline || '📡 Офлайн';

            // Tab 1 (Cloud) elements
            if (document.getElementById('t-cloud-intro')) document.getElementById('t-cloud-intro').innerHTML = t.cloudIntro || '';

            // Tab 2 (Search) elements
            if (document.getElementById('t-search-intro')) document.getElementById('t-search-intro').innerHTML = t.searchIntro || '';
            if (document.getElementById('t-search-step1-title')) document.getElementById('t-search-step1-title').innerText = t.searchStep1Title || '';
            if (document.getElementById('t-search-step1-desc')) document.getElementById('t-search-step1-desc').innerHTML = t.searchStep1Desc || '';
            if (document.getElementById('t-search-step1-net')) document.getElementById('t-search-step1-net').innerHTML = t.searchStep1Net || '';
            if (document.getElementById('t-search-step1-pwd')) document.getElementById('t-search-step1-pwd').innerHTML = t.searchStep1Pwd || '';
            if (document.getElementById('t-search-step1-note')) document.getElementById('t-search-step1-note').innerHTML = t.searchStep1Note || '';

            if (document.getElementById('t-search-step2-title')) document.getElementById('t-search-step2-title').innerText = t.searchStep2Title || '';
            if (document.getElementById('t-search-step2-desc')) document.getElementById('t-search-step2-desc').innerText = t.searchStep2Desc || '';
            if (document.getElementById('t-search-step2-net')) document.getElementById('t-search-step2-net').innerHTML = t.searchStep2Net || '';
            if (document.getElementById('t-search-step2-pwd')) document.getElementById('t-search-step2-pwd').innerHTML = t.searchStep2Pwd || '';
            if (document.getElementById('t-search-step2-tip')) document.getElementById('t-search-step2-tip').innerHTML = t.searchStep2Tip || '';
            if (document.getElementById('t-search-step2-warn')) document.getElementById('t-search-step2-warn').innerHTML = t.searchStep2Warn || '';

            if (document.getElementById('t-search-step3-title')) document.getElementById('t-search-step3-title').innerText = t.searchStep3Title || '';
            if (document.getElementById('t-search-step3-note')) document.getElementById('t-search-step3-note').innerHTML = t.searchStep3Note || '';
            if (document.getElementById('t-manual-ip-title')) document.getElementById('t-manual-ip-title').innerText = t.manualIpTitle || 'Ввести IP вручную (для продвинутых)';
            if (document.getElementById('t-manual-ip-adv-desc')) document.getElementById('t-manual-ip-adv-desc').innerText = t.manualIpAdvDesc || '';

            // Tab 3 (Offline) elements
            if (document.getElementById('t-offline-warn')) document.getElementById('t-offline-warn').innerHTML = t.offlineWarn || '';
            if (document.getElementById('t-offline-step-a-title')) document.getElementById('t-offline-step-a-title').innerText = t.offlineStepATitle || '';
            if (document.getElementById('t-offline-step-a-desc')) document.getElementById('t-offline-step-a-desc').innerText = t.offlineStepADesc || '';
            if (document.getElementById('t-offline-step-b-title')) document.getElementById('t-offline-step-b-title').innerText = t.offlineStepBTitle || '';
            if (document.getElementById('t-offline-step-b-desc')) document.getElementById('t-offline-step-b-desc').innerHTML = t.offlineStepBDesc || '';
            if (document.getElementById('t-btn-open-direct')) document.getElementById('t-btn-open-direct').innerText = t.btnOpenDirect || 'Открыть http://10.10.10.1';
            if (document.getElementById('t-offline-step-b-note')) document.getElementById('t-offline-step-b-note').innerText = t.offlineStepBNote || '';

            if (document.getElementById('t-modal-reset-title')) document.getElementById('t-modal-reset-title').innerText = t.modalResetTitle || 'Сменить плату контроллера?';
            if (document.getElementById('t-modal-reset-desc')) document.getElementById('t-modal-reset-desc').innerHTML = t.modalResetDesc || 'Радар забудет сохраненный адрес текущей платы.';
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
            if (document.getElementById('t-modal-reset-desc')) document.getElementById('t-modal-reset-desc').innerHTML = t.modalResetDesc || 'Сохраненный IP-адрес и ID текущей платы будут удалены. Радар начнет поиск новой активной платы в сети.';
            if (document.getElementById('t-modal-reset-cancel')) document.getElementById('t-modal-reset-cancel').innerText = t.modalResetCancel || 'Отмена';
            if (document.getElementById('t-modal-reset-confirm')) document.getElementById('t-modal-reset-confirm').innerText = t.modalResetConfirm || 'Забыть и сбросить';

            // Support Card
            if (document.getElementById('t-support-title')) document.getElementById('t-support-title').innerText = t.supportTitle || 'Служебная информация';
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
            
            // Helper Modal (Live Monitor Guidance)
            if (document.getElementById('t-btn-monitor-help') && t.btnMonitorHelp) document.getElementById('t-btn-monitor-help').innerText = t.btnMonitorHelp;
            if (document.getElementById('t-helper-btn-reset') && t.helperBtnReset) document.getElementById('t-helper-btn-reset').innerText = t.helperBtnReset;
            if (document.getElementById('t-helper-title')) document.getElementById('t-helper-title').innerText = t.helperTitle || 'Live Monitor';
            if (document.getElementById('t-helper-ip-label')) document.getElementById('t-helper-ip-label').innerText = t.helperIpLabel || 'Адрес монитора:';
            if (document.getElementById('t-helper-warn-title')) document.getElementById('t-helper-warn-title').innerText = t.helperWarnTitle || 'Не открывается страница?';
            if (document.getElementById('t-helper-step-1')) document.getElementById('t-helper-step-1').innerHTML = t.helperStep1 || '';
            if (document.getElementById('t-helper-step-2')) document.getElementById('t-helper-step-2').innerHTML = t.helperStep2 || '';
            if (document.getElementById('t-helper-step-3')) document.getElementById('t-helper-step-3').innerHTML = t.helperStep3 || '';
            if (document.getElementById('t-helper-btn-reopen')) document.getElementById('t-helper-btn-reopen').innerText = t.helperBtnReopen || 'Открыть снова';
            if (document.getElementById('t-helper-btn-check')) document.getElementById('t-helper-btn-check').innerText = t.helperBtnCheck || 'Проверить связь в облаке';
            if (document.getElementById('t-helper-btn-close')) document.getElementById('t-helper-btn-close').innerText = t.helperBtnClose || 'Закрыть';

            if (document.getElementById('t-btn-sync')) document.getElementById('t-btn-sync').innerText = t.btnSync;
                        if (document.getElementById('t-btn-manual')) document.getElementById('t-btn-manual').innerText = t.btnManual;
            if (document.getElementById('t-manual-ip-hint')) document.getElementById('t-manual-ip-hint').innerText = t.manualIpHint;
            if (document.getElementById('t-btn-save-ip')) document.getElementById('t-btn-save-ip').innerText = t.btnSaveIp;
            const isIpConfigured = (typeof currentIp !== 'undefined' && currentIp && currentIp !== '--');
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
            if (document.getElementById('t-step3-reset-desc') && t.step3ResetDesc) document.getElementById('t-step3-reset-desc').innerHTML = t.step3ResetDesc;
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
