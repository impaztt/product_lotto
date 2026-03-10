document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.querySelector('.numbers-container');
    const generateBtn = document.getElementById('generate-btn');
    const generateCtaBtn = document.querySelector('[data-generate-cta]');
    const drawCountSelect = document.getElementById('draw-count');
    const drawCountChips = Array.from(document.querySelectorAll('.draw-count-chip[data-draw-count]'));
    const drawCopyAllBtn = document.getElementById('draw-copy-all-btn');
    const drawCopyStatusEl = document.getElementById('draw-copy-status');
    const drawGenerateHintEl = document.getElementById('draw-generate-hint');
    const body = document.body;
    const siteHeaderEl = document.querySelector('.site-header');
    const ruleInputs = Array.from(document.querySelectorAll('.rules-grid input[type="checkbox"]'));
    const excludeNumberGrid = document.getElementById('exclude-number-grid');
    const excludeNumberCard = document.getElementById('exclude-number-card');
    const excludeNumberTitle = document.getElementById('exclude-number-title');
    const excludeNumberRule = document.getElementById('exclude-number-rule');
    const menuToggle = document.getElementById('menu-toggle');
    const menuToggleText = menuToggle ? menuToggle.querySelector('.menu-toggle-text') : null;
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll('a')) : [];
    const navTabLinks = Array.from(document.querySelectorAll('.main-nav [data-tab-link], .mobile-nav [data-tab-link]'));
    const presetButtons = Array.from(document.querySelectorAll('.preset-btn'));
    const saveRulesBtn = document.getElementById('save-rules');
    const loadRulesBtn = document.getElementById('load-rules');
    const rulesStatus = document.getElementById('rules-status');
    const ruleCards = Array.from(document.querySelectorAll('.rule-card'));
    const ruleGroups = Array.from(document.querySelectorAll('.rule-group'));
    const rulesSelectedCount = document.getElementById('rules-selected-count');
    const rulesVisibleCount = document.getElementById('rules-visible-count');
    const remainingCombosEl = document.getElementById('remaining-combos');
    const excludedCombosEl = document.getElementById('excluded-combos');
    const remainingMeterFill = document.getElementById('remaining-meter-fill');
    const remainingMeterLabel = document.getElementById('remaining-meter-label');
    const selectedRulesListEl = document.getElementById('selected-rules-list');
    const selectedRulesEmptyEl = document.getElementById('selected-rules-empty');
    const selectedClearBtn = document.getElementById('selected-clear-btn');
    const drawSelectionDockEl = document.getElementById('draw-selection-dock');
    const drawSelectionDockPlaceholderEl = document.getElementById('draw-selection-dock-placeholder');
    const drawSelectionDockTitleEl = document.getElementById('draw-dock-title');
    const drawSelectionDockMetaEl = document.getElementById('draw-dock-meta');
    const drawSelectionDockScenarioEl = document.getElementById('draw-dock-scenario');
    const drawSelectionDockStatEl = document.getElementById('draw-dock-stat');
    const drawSelectionDockBodyEl = document.getElementById('draw-selection-dock-body');
    const drawSelectionDockMetricsEl = document.getElementById('draw-selection-dock-metrics');
    const drawSelectionDockRemainingEl = document.getElementById('draw-dock-remaining');
    const drawSelectionDockRatioEl = document.getElementById('draw-dock-ratio');
    const drawSelectionDockBenefitEl = document.getElementById('draw-dock-benefit');
    const drawSelectionDockPreviewEl = document.getElementById('draw-selection-dock-preview');
    const drawSelectionDockToggleBtn = document.getElementById('draw-dock-toggle');
    const drawSelectionDockClearBtn = document.getElementById('draw-dock-clear');
    const oddsBenefitSummaryEl = document.getElementById('odds-benefit-summary');
    const oddsBaseEls = {
        1: document.getElementById('odds-base-1'),
        2: document.getElementById('odds-base-2'),
        3: document.getElementById('odds-base-3'),
        4: document.getElementById('odds-base-4'),
        5: document.getElementById('odds-base-5')
    };
    const oddsAdjEls = {
        1: document.getElementById('odds-adj-1'),
        2: document.getElementById('odds-adj-2'),
        3: document.getElementById('odds-adj-3'),
        4: document.getElementById('odds-adj-4'),
        5: document.getElementById('odds-adj-5')
    };
    const oddsDeltaEls = {
        1: document.getElementById('odds-delta-1'),
        2: document.getElementById('odds-delta-2'),
        3: document.getElementById('odds-delta-3'),
        4: document.getElementById('odds-delta-4'),
        5: document.getElementById('odds-delta-5')
    };
    const oddsBarEls = {
        1: document.getElementById('odds-bar-1')
    };
    const customSaveBtn = document.getElementById('custom-save');
    const customApplyBtn = document.getElementById('custom-apply');
    const ruleStatEls = Array.from(document.querySelectorAll('.rule-stat'));
    const groupSelectButtons = Array.from(document.querySelectorAll('.group-select'));
    const toggleRulesBtn = document.getElementById('toggle-rules');
    const strategyButtons = Array.from(document.querySelectorAll('[data-strategy]'));
    const scenarioCards = Array.from(document.querySelectorAll('.draw-scenario-card[data-strategy]'));
    const horizontalGestureTracks = Array.from(document.querySelectorAll('.scenario-cards, .draw-slot-grid'));
    const SCENARIO_DRAG_THRESHOLD_PX = 8;
    const SCENARIO_TAP_THRESHOLD_PX = 10;
    const SCENARIO_CLICK_SUPPRESS_MS = 140;
    let drawWidthSyncRafId = 0;
    let isDrawSelectionDockCollapsed = false;
    let isDrawBottomGenerateCollapsed = false;
    let activeStrategy = '';
    let lastDrawInteraction = null;
    let lastScenarioActivation = {
        strategy: '',
        at: 0
    };
    const storeOpenOfficialBtn = document.getElementById('store-open-official-btn');
    const groupLevelButtons = Array.from(document.querySelectorAll('[data-group-level]'));
    const slotSaveButtons = Array.from(document.querySelectorAll('[data-slot-save]'));
    const slotApplyButtons = Array.from(document.querySelectorAll('[data-slot-apply]'));
    const slotMetaEls = {
        1: document.getElementById('draw-slot-meta-1'),
        2: document.getElementById('draw-slot-meta-2'),
        3: document.getElementById('draw-slot-meta-3')
    };
    const slotPanel = document.getElementById('draw-slot-panel');
    const slotGrid = document.getElementById('draw-slot-grid');
    const toggleSlotsBtn = document.getElementById('toggle-slots');
    const scenarioPanel = document.getElementById('draw-scenario-panel');
    const scenarioGrid = document.getElementById('draw-scenario-grid');
    const drawTabPanel = document.getElementById('tab-draw');
    const drawStudioBodyEl = drawTabPanel ? drawTabPanel.querySelector('.draw-studio-body') : null;
    const drawSelectedBoardEl = document.querySelector('#tab-draw .draw-selected-board');
    const drawActionButtonsEl = drawTabPanel ? drawTabPanel.querySelector('.draw-action-buttons') : null;
    const drawServiceButtons = Array.from(document.querySelectorAll('.draw-service-btn[data-draw-service]'));
    const drawModeOnlyPanels = Array.from(document.querySelectorAll('[data-draw-mode-only]'));
    const toggleScenariosBtn = document.getElementById('toggle-scenarios');
    const premiumBadgeEl = document.getElementById('draw-premium-badge');
    const premiumLockEl = document.getElementById('draw-premium-lock');
    const premiumUpgradeBtn = document.getElementById('premium-upgrade-btn');
    const premiumPlanBuyButtons = Array.from(document.querySelectorAll('.premium-plan-buy[data-premium-plan]'));
    const premiumGenerateBtn = document.getElementById('premium-generate-btn');
    const premiumCopyAllBtn = document.getElementById('premium-copy-all-btn');
    const premiumNumbersContainer = document.getElementById('premium-numbers-container');
    const premiumCopyStatusEl = document.getElementById('premium-copy-status');
    const openRulePickerBtn = document.getElementById('open-rule-picker');
    const closeRulePickerBtn = document.getElementById('close-rule-picker');
    const rulePickerPanel = document.getElementById('rule-picker-panel');
    const rulePickerBackdrop = document.getElementById('rule-picker-backdrop');
    const rulePickerSearch = document.getElementById('rule-picker-search');
    const rulePickerGroup = document.getElementById('rule-picker-group');
    const rulesSection = document.getElementById('rules');
    const guestLimitEl = document.getElementById('guest-limit');
    const guestBannerEl = document.getElementById('guest-banner');
    const welcomeModal = document.getElementById('welcome-modal');
    const welcomeAuthBtn = document.querySelector('[data-welcome-action="auth"]');
    const welcomeBrowseBtn = document.querySelector('[data-welcome-action="browse"]');
    const welcomeDismissButtons = Array.from(document.querySelectorAll('[data-welcome-close]'));
    const authModal = document.getElementById('auth-modal');
    const authButtons = Array.from(document.querySelectorAll('[data-auth]'));
    const authEntryLinks = Array.from(document.querySelectorAll('[data-open-auth]'));
    const authLogoutButtons = Array.from(document.querySelectorAll('[data-logout]'));
    const authClose = authModal ? authModal.querySelector('.modal-close') : null;
    const firebaseAuthStatusEl = document.getElementById('firebase-auth-status');
    const mypageAuthBadgeEl = document.getElementById('mypage-auth-badge');
    const mypageNicknameDisplayEl = document.getElementById('mypage-nickname-display');
    const mypageHistoryListEl = document.getElementById('mypage-history-list');
    const mypageHistoryBadgeEl = document.getElementById('mypage-history-badge');
    const mypageProfileEmailEl = document.getElementById('mypage-profile-email');
    const mypageMembershipTierEl = document.getElementById('mypage-membership-tier');
    const mypageMembershipTierSummaryEl = document.getElementById('mypage-membership-tier-summary');
    const mypageMembershipDescEl = document.getElementById('mypage-membership-desc');
    const mypageMembershipNextEl = document.getElementById('mypage-membership-next');
    const mypagePlanNoteEl = document.getElementById('mypage-plan-note');
    const mypagePlanManageBtn = document.getElementById('mypage-plan-manage-btn');
    const mypagePlanCancelBtn = document.getElementById('mypage-plan-cancel-btn');
    const mypagePresetBadgeEl = document.getElementById('mypage-preset-badge');
    const mypagePresetSummaryEl = document.getElementById('mypage-preset-summary');
    const mypagePresetUpdatedEl = document.getElementById('mypage-preset-updated');
    const mypageSlotSummaryEl = document.getElementById('mypage-slot-summary');
    const mypageSlotUpdatedEl = document.getElementById('mypage-slot-updated');
    const mypageStatsGeneratedEl = document.getElementById('mypage-stats-generated');
    const mypageStatsRoundEl = document.getElementById('mypage-stats-round');
    const mypageStatsModeEl = document.getElementById('mypage-stats-mode');
    const mypageSlotApplyButtons = Array.from(document.querySelectorAll('[data-mypage-slot-apply]'));
    const nicknameOpenModalBtn = document.getElementById('nickname-open-modal-btn');
    const nicknameModal = document.getElementById('nickname-modal');
    const nicknameModalCloseBtn = document.getElementById('nickname-modal-close');
    const nicknameModalInputEl = document.getElementById('nickname-modal-input');
    const nicknameModalCancelBtn = document.getElementById('nickname-modal-cancel');
    const nicknameModalSaveBtn = document.getElementById('nickname-modal-save');
    const nicknameStatusEl = document.getElementById('nickname-status');
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn[data-tab]'));
    const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
    const tabLinks = Array.from(document.querySelectorAll('[data-tab-link]'));
    const {
        PRESETS,
        PRESETS_LABEL,
        RULE_DETAILS,
        RULE_SAMPLE_MAP,
        RULE_STATS,
        RULES,
        TOTAL_COMBOS,
        combination,
        countBy,
        countHigh,
        countLow,
        countMultiples,
        countPrimes,
        getSampleBallClass,
        longestConsecutiveRun,
        maxInSameDecade,
        maxSameLastDigit
    } = window.LottoRules;
    const { createTabController } = window.LottoTabs;
    const drawHorizontalTracks = [scenarioGrid, slotGrid].filter(Boolean);
    const excludeNumberValues = new Set();
    let lastGeneratedDraws = [];
    let lastPremiumDraws = [];
    let currentRemainingRatio = 1;
    let currentRemainingCombos = 0;
    let currentExcludedCombos = 0;

    // Weekly tab uses embedded layout directly in the DOM.
    let weeklyStatusEl = null;
    let weeklyThisRoundEl = null;
    let weeklyThisDateEl = null;
    let weeklyLatestRoundEl = null;
    let weeklyLatestDateEl = null;
    let weeklyLatestNumbers = [];
    let weeklyLatestBonusEl = null;
    let weeklyLatestFirstTotalEl = null;
    let weeklyLatestFirstEachEl = null;
    let weeklyLatestFirstWinnersEl = null;
    let weeklyRoundSelect = null;
    let weeklyRoundHint = null;
    let weeklyNextDrawEl = null;
    let weeklyCountdownEl = null;
    let weeklyCountdownSubEl = null;
    let weeklyCountdownDaysEl = null;
    let weeklyCountdownHoursEl = null;
    let weeklyCountdownMinutesEl = null;
    let weeklyCountdownSecondsEl = null;
    let weeklyExpectedAmountEl = null;
    let weeklyExpectedNoteEl = null;
    let dashThisRoundEl = null;
    let dashThisDateEl = null;
    let dashLatestRoundEl = null;
    let dashLatestDateEl = null;
    let dashLatestNumbers = [];
    let dashLatestBonusEl = null;
    let dashLatestFirstTotalEl = null;
    let dashLatestFirstEachEl = null;
    let dashLatestFirstWinnersEl = null;
    let dashCountdownDaysEl = null;
    let dashCountdownHoursEl = null;
    let dashCountdownMinutesEl = null;
    let dashCountdownSecondsEl = null;
    let dashExpectedAmountEl = null;
    let dashBuyBtn = null;
    let recentRoundsEl = null;
    let roundSearchInput = null;
    let roundSearchBtn = null;

    function injectRuleSamples() {
        ruleCards.forEach(card => {
            const input = card.querySelector('input.rule-input');
            const body = card.querySelector('.rule-body');
            if (!input || !body || body.querySelector('.rule-sample')) {
                return;
            }
            const sample = RULE_SAMPLE_MAP[input.value];
            if (!sample || !sample.length) {
                return;
            }
            const wrapper = document.createElement('div');
            wrapper.className = 'rule-sample';
            const label = document.createElement('span');
            label.className = 'rule-sample-label';
            label.textContent = '예시';
            wrapper.appendChild(label);
            sample.forEach(number => {
                const ball = document.createElement('span');
                ball.className = `sample-ball ${getSampleBallClass(number)}`;
                ball.textContent = String(number);
                wrapper.appendChild(ball);
            });
            body.appendChild(wrapper);
        });
    }
    let compareInput = null;
    let compareBonusInput = null;
    let compareBtn = null;
    let compareResult = null;
    let recentCountSelect = null;
    let trendChart = null;
    const qrStatusEl = document.getElementById('qr-status');
    const qrVideoEl = document.getElementById('qr-video');
    const qrCanvasEl = document.getElementById('qr-canvas');
    const qrStartBtn = document.getElementById('qr-start-btn');
    const qrStopBtn = document.getElementById('qr-stop-btn');
    const qrResultBadgeEl = document.getElementById('qr-result-badge');
    const qrTicketNumbersEl = document.getElementById('qr-ticket-numbers');
    const qrMatchResultEl = document.getElementById('qr-match-result');
    const qrPayloadEl = document.getElementById('qr-payload');
    const qrOpenRoundBtn = document.getElementById('qr-open-round-btn');
    const qrCopyNumbersBtn = document.getElementById('qr-copy-numbers-btn');
    const appToastEl = document.getElementById('app-toast');
    const dashWinRoundLabelEl = document.getElementById('dash-win-round-label');
    const dashWinStatusEl = document.getElementById('dash-win-status');
    const dashWinTotalGeneratedEl = document.getElementById('dash-win-total-generated');
    const dashWinTotalWinnersEl = document.getElementById('dash-win-total-winners');
    const dashWinRateEl = document.getElementById('dash-win-rate');
    const dashWinRankEls = {
        1: document.getElementById('dash-win-rank-1'),
        2: document.getElementById('dash-win-rank-2'),
        3: document.getElementById('dash-win-rank-3'),
        4: document.getElementById('dash-win-rank-4'),
        5: document.getElementById('dash-win-rank-5')
    };
    const dashSyncStatusEl = document.getElementById('dash-sync-status');
    const dashSyncTimeEl = document.getElementById('dash-sync-time');
    const dashMembershipChipEl = document.getElementById('dash-membership-chip');
    const dashActivityChipEl = document.getElementById('dash-activity-chip');
    const drawMembershipStatusEl = document.getElementById('draw-membership-status');
    const drawMembershipNoteEl = document.getElementById('draw-membership-note');
    const drawSelectionSummaryEl = document.getElementById('draw-selection-summary');
    const drawFilterDetailEl = document.getElementById('draw-filter-detail');
    const drawBottomGenerateBarEl = document.getElementById('draw-bottom-generate-bar');
    const drawBottomGenerateSummaryEl = document.getElementById('draw-bottom-generate-summary');
    const drawBottomGenerateDetailEl = document.getElementById('draw-bottom-generate-detail');
    const drawBottomGenerateContentEl = document.getElementById('draw-bottom-generate-content');
    const drawBottomGenerateToggleBtn = document.getElementById('draw-bottom-generate-toggle');
    const drawGeneratorSectionEl = document.getElementById('generator');
    let currentWeeklyData = null;
    let latestAvailableRound = null;
    const roundMetaByNo = new Map();
    let mainInfoCache = {
        ts: 0,
        rounds: []
    };
    let mainInfoInflight = null;
    let lastWeeklyRenderedAt = 0;
    let lastWeeklyRenderMode = 'live';
    let lastWeeklyRenderSource = 'proxy';
    let firebaseReady = false;
    let authStateResolved = false;
    let firebaseAuth = null;
    let firebaseDb = null;
    let currentUser = null;
    let currentUserProfile = null;
    let nicknameSaveInFlight = false;
    let qrStream = null;
    let qrScanRafId = null;
    let qrCanvasCtx = null;
    let qrLastPayload = '';
    let qrBarcodeDetector = null;
    let qrLastNumbers = [];
    let qrLastMatchedRound = null;
    let weeklyNextDrawOverride = null;
    let weeklyExpectedOverride = null;
    let weeklyExpectedUpdatedAt = 0;
    let toastHideTimer = 0;
    let welcomeModalTimer = 0;
    let revealObserver = null;
    const DRAW_ENTRY_LOCAL_KEY = 'lotto_guest_tracking_id';
    const GENERATION_STATS_KEY = 'lotto_generation_stats';
    const RULES_UPDATED_AT_KEY = 'lotto_rules_updated_at';
    const CUSTOM_PRESET_UPDATED_AT_KEY = 'lotto_custom_preset_updated_at';
    const ONBOARDING_SEEN_KEY = 'lotto_onboarding_seen_at';

    const tabController = createTabController({
        tabButtons,
        tabPanels,
        tabLinks,
        defaultTab: 'dashboard',
        onWillChange(tabId) {
            if (tabId !== 'draw') {
                setRulePickerOpen(false);
            }
        },
        onDidChange({ tabId, targetPanel }) {
            syncNavTabLinks(tabId);
            syncActiveTabState(tabId);
            refreshRevealMotion(targetPanel);
            if (tabId === 'draw') {
                scheduleDrawHorizontalWidthSync();
            }
            if (tabId === 'qr') {
                startQrScanner();
            }
            if (tabId !== 'qr' && qrStream) {
                stopQrScanner('QR 탭을 벗어나 스캔을 중지했습니다.');
            }
        },
        onLinkNavigate() {
            syncMenuState(false);
        }
    });
    const { setActiveTab, syncInitialTab } = tabController;
    let guestTrackingId = '';
    let lastWinDashboardRound = null;

    function getRevealTargets(root = document) {
        return Array.from(root.querySelectorAll([
            '.dash-intro-head',
            '.dash-ops-card',
            '.dashboard-win-summary',
            '#tab-dashboard .result-infoWrap',
            '.draw-studio-header',
            '.draw-panel',
            '.draw-metric-card',
            '.premium-product-card',
            '.draw-premium-lock',
            '.mypage-hero-card',
            '.mypage-status-kpi',
            '#tab-mypage .info-card',
            '#tab-mypage .auth-card',
            '.weekly-feature-card',
            '.info-card',
            '.onboarding-benefit-card'
        ].join(',')));
    }

    function syncActiveTabState(tabId = getCurrentActiveTabId()) {
        if (!body) {
            return;
        }
        body.dataset.activeTab = String(tabId || 'dashboard');
    }

    function setupRevealMotion() {
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const targets = getRevealTargets();
        if (!targets.length) {
            return;
        }
        targets.forEach((element, index) => {
            element.classList.add('reveal-item');
            element.style.setProperty('--reveal-delay', `${Math.min(index * 28, 220)}ms`);
        });
        if (prefersReducedMotion || typeof window.IntersectionObserver !== 'function') {
            targets.forEach(element => {
                element.classList.add('is-visible');
            });
            return;
        }
        if (revealObserver) {
            revealObserver.disconnect();
        }
        revealObserver = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -12% 0px'
        });
        targets.forEach(element => {
            if (!element.classList.contains('is-visible')) {
                revealObserver.observe(element);
            }
        });
    }

    function refreshRevealMotion(root = null) {
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const targetRoot = root instanceof Element ? root : document.getElementById(`tab-${getCurrentActiveTabId()}`);
        if (!targetRoot) {
            return;
        }
        const targets = getRevealTargets(targetRoot);
        targets.forEach((element, index) => {
            element.classList.add('reveal-item');
            element.style.setProperty('--reveal-delay', `${Math.min(index * 34, 240)}ms`);
            if (prefersReducedMotion) {
                element.classList.add('is-visible');
            } else if (revealObserver && !element.classList.contains('is-visible')) {
                revealObserver.observe(element);
            }
        });
    }

    function bindWeeklyElements(root) {
        weeklyStatusEl = root.getElementById('weekly-status');
        weeklyThisRoundEl = root.getElementById('thsLtEpsd');
        weeklyThisDateEl = root.getElementById('thsLtRflYmd');
        weeklyLatestRoundEl = root.getElementById('pstLtEpsd');
        weeklyLatestDateEl = root.getElementById('pstLtRflYmd');
        weeklyLatestNumbers = [
            root.getElementById('tm1WnNo'),
            root.getElementById('tm2WnNo'),
            root.getElementById('tm3WnNo'),
            root.getElementById('tm4WnNo'),
            root.getElementById('tm5WnNo'),
            root.getElementById('tm6WnNo')
        ];
        weeklyLatestBonusEl = root.getElementById('bnsWnNo');
        weeklyLatestFirstTotalEl = root.getElementById('pstRnk1SumWnAmt');
        weeklyLatestFirstEachEl = root.getElementById('pstRnk1WnAmt');
        weeklyLatestFirstWinnersEl = root.getElementById('pstRnk1WnNope');
        weeklyRoundSelect = root.getElementById('weekly-round-select');
        weeklyRoundHint = root.getElementById('weekly-round-hint');
        weeklyNextDrawEl = root.getElementById('weekly-next-draw');
        weeklyCountdownEl = root.getElementById('weekly-countdown');
        weeklyCountdownSubEl = root.getElementById('weekly-countdown-sub');
        weeklyCountdownDaysEl = root.getElementById('DD');
        weeklyCountdownHoursEl = root.getElementById('HH');
        weeklyCountdownMinutesEl = root.getElementById('MM');
        weeklyCountdownSecondsEl = root.getElementById('SS');
        weeklyExpectedAmountEl = root.getElementById('rnk1ExpcAmt');
        weeklyExpectedNoteEl = root.getElementById('weekly-expected-note');
        recentRoundsEl = root.getElementById('recent-rounds');
        roundSearchInput = root.getElementById('round-search-input');
        roundSearchBtn = root.getElementById('round-search-btn');
        compareInput = root.getElementById('compare-input');
        compareBonusInput = root.getElementById('compare-bonus');
        compareBtn = root.getElementById('compare-btn');
        compareResult = root.getElementById('compare-result');
        recentCountSelect = root.getElementById('recent-count');
        trendChart = root.getElementById('trend-chart');
    }

    function bindDashboardElements(root) {
        dashThisRoundEl = root.getElementById('dash-thsLtEpsd');
        dashThisDateEl = root.getElementById('dash-thsLtRflYmd');
        dashLatestRoundEl = root.getElementById('dash-pstLtEpsd');
        dashLatestDateEl = root.getElementById('dash-pstLtRflYmd');
        dashLatestNumbers = [
            root.getElementById('dash-tm1WnNo'),
            root.getElementById('dash-tm2WnNo'),
            root.getElementById('dash-tm3WnNo'),
            root.getElementById('dash-tm4WnNo'),
            root.getElementById('dash-tm5WnNo'),
            root.getElementById('dash-tm6WnNo')
        ];
        dashLatestBonusEl = root.getElementById('dash-bnsWnNo');
        dashLatestFirstTotalEl = root.getElementById('dash-pstRnk1SumWnAmt');
        dashLatestFirstEachEl = root.getElementById('dash-pstRnk1WnAmt');
        dashLatestFirstWinnersEl = root.getElementById('dash-pstRnk1WnNope');
        dashCountdownDaysEl = root.getElementById('dash-DD');
        dashCountdownHoursEl = root.getElementById('dash-HH');
        dashCountdownMinutesEl = root.getElementById('dash-MM');
        dashCountdownSecondsEl = root.getElementById('dash-SS');
        dashExpectedAmountEl = root.getElementById('dash-rnk1ExpcAmt');
        dashBuyBtn = root.getElementById('dash-btnBuyLt645');
        const dashWnStrcBtn = root.getElementById('dash-btnWnStrc');
        const dashPrchsBtn = root.getElementById('dash-btnPrchsMthd');
        const dashWnStrcDiv = root.getElementById('dash-wnStrcDiv');
        const dashPrchsDiv = root.getElementById('dash-prchsMthdDiv');
        if (dashBuyBtn) {
            dashBuyBtn.type = 'button';
            dashBuyBtn.addEventListener('click', event => {
                event.preventDefault();
                setActiveTab('draw', true);
            });
        }
        if (dashWnStrcBtn && dashWnStrcDiv) {
            dashWnStrcBtn.addEventListener('click', event => {
                event.preventDefault();
                dashWnStrcDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        if (dashPrchsBtn && dashPrchsDiv) {
            dashPrchsBtn.addEventListener('click', event => {
                event.preventDefault();
                dashPrchsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    function normalizeRelativeResourceUrls(rootId, { rewriteSrcset = false } = {}) {
        const root = document.getElementById(rootId);
        if (!root) {
            return;
        }
        const prefix = 'https://www.dhlottery.co.kr';
        root.querySelectorAll('[src]').forEach(el => {
            const src = el.getAttribute('src');
            if (src && src.startsWith('/')) {
                el.setAttribute('src', `${prefix}${src}`);
            }
        });
        root.querySelectorAll('a[href]').forEach(el => {
            const href = el.getAttribute('href');
            if (href && href.startsWith('/')) {
                el.setAttribute('href', `${prefix}${href}`);
            }
        });
        if (!rewriteSrcset) {
            return;
        }
        root.querySelectorAll('[srcset]').forEach(el => {
            const srcset = el.getAttribute('srcset');
            if (!srcset) {
                return;
            }
            const rewritten = srcset
                .split(',')
                .map(item => {
                    const [urlPart, size] = item.trim().split(/\s+/, 2);
                    if (urlPart && urlPart.startsWith('/')) {
                        return `${prefix}${urlPart}${size ? ` ${size}` : ''}`;
                    }
                    return item.trim();
                })
                .join(', ');
            el.setAttribute('srcset', rewritten);
        });
    }

    function normalizeWeeklyLinks() {
        normalizeRelativeResourceUrls('tab-weekly');
    }

    function normalizeDashboardLinks() {
        normalizeRelativeResourceUrls('tab-dashboard', { rewriteSrcset: true });
    }

    function initWeeklyIntroUi() {
        const root = document.getElementById('tab-weekly');
        if (!root) {
            return;
        }
        root.querySelectorAll('.draw-tab-container').forEach(container => {
            const tabs = Array.from(container.querySelectorAll('.draw-tab-li'));
            const panels = Array.from(container.querySelectorAll('.draw-tab-box'));
            const setTab = tabId => {
                tabs.forEach(tab => {
                    const isActive = tab.id === tabId;
                    tab.classList.toggle('tagTab', isActive);
                    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                });
                panels.forEach(panel => {
                    const isActive = panel.getAttribute('aria-labelledby') === tabId;
                    panel.classList.toggle('tagTab', isActive);
                    panel.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                });
            };
            tabs.forEach(tab => {
                tab.addEventListener('click', () => setTab(tab.id));
                const btn = tab.querySelector('button');
                if (btn) {
                    btn.addEventListener('click', () => setTab(tab.id));
                }
            });
        });

        const popupBtn = root.querySelector('.btn-popup');
        const popupWrap = root.querySelector('.popup-wrap');
        const popupBg = popupWrap ? popupWrap.querySelector('.popup-bg') : null;
        const popupClose = popupWrap ? popupWrap.querySelector('.btn-pop-close') : null;
        const openPopup = () => {
            if (!popupWrap) {
                return;
            }
            popupWrap.style.display = 'block';
        };
        const closePopup = () => {
            if (!popupWrap) {
                return;
            }
            popupWrap.style.display = 'none';
        };
        if (popupBtn) {
            popupBtn.addEventListener('click', openPopup);
        }
        if (popupBg) {
            popupBg.addEventListener('click', closePopup);
        }
        if (popupClose) {
            popupClose.addEventListener('click', closePopup);
        }

        const toggleBtn = root.querySelector('.btn-toggle');
        const toggleContent = root.querySelector('.toggle-content');
        if (toggleBtn && toggleContent) {
            toggleBtn.addEventListener('click', () => {
                const isOpen = toggleContent.style.display === 'block';
                toggleContent.style.display = isOpen ? 'none' : 'block';
            });
        }

        const jumpMap = {
            btnWnStrc: 'wnStrcDiv',
            btnPrchsMthd: 'prchsMthdDiv'
        };
        Object.keys(jumpMap).forEach(btnId => {
            const btn = root.querySelector(`#${btnId}`);
            const targetId = jumpMap[btnId];
            if (!btn || !targetId) {
                return;
            }
            btn.addEventListener('click', () => {
                const target = root.querySelector(`#${targetId}`) || document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    bindWeeklyElements(document);
    bindDashboardElements(document);
    normalizeWeeklyLinks();
    initWeeklyIntroUi();
    normalizeDashboardLinks();

    // 네트워크/초기화 오류와 무관하게 회차 리스트는 먼저 표시한다.
    latestAvailableRound = estimateLatestRound();
    initRoundSelect(latestAvailableRound);
    syncRoundSearchDefault(latestAvailableRound, { force: true });
    const initialCached = getCachedWeekly();
    if (initialCached?.data) {
        renderTrendChart([initialCached.data]);
    }
    // 첫 진입 시 기본 선택된 최신 회차를 즉시 조회한다.
    loadRound(latestAvailableRound);
    // 첫 진입 시 최근 회차 추이도 백그라운드에서 즉시 로드한다.
    loadRecentRounds(latestAvailableRound).catch(error => {
        logProxyError('initialRecentRounds', error, { latestRound: latestAvailableRound });
    });
    updateWeeklyCountdownDisplay();
    updateWeeklyNextDrawDisplay();
    window.setInterval(() => {
        updateWeeklyCountdownDisplay();
        updateWeeklyNextDrawDisplay();
    }, 1000);

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            handleDrawGenerationRequest('panel');
        });
    }

    if (drawCopyAllBtn) {
        drawCopyAllBtn.addEventListener('click', async () => {
            await copyAllGeneratedNumbers();
        });
    }

    drawServiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.drawService === 'premium' ? 'premium' : 'self';
            setDrawServiceMode(mode);
        });
    });

    if (premiumGenerateBtn) {
        premiumGenerateBtn.addEventListener('click', () => {
            if (!isPremiumMember()) {
                updatePremiumCopyStatus('월정액 이용권이 필요합니다. 먼저 가입/로그인 후 이용권을 시작해 주세요.', true);
                if (!isMember()) {
                    openAuthModal();
                }
                return;
            }
            const recommendations = generatePremiumRecommendations(5);
            renderPremiumNumbers(recommendations);
            updatePremiumCopyStatus('추천번호를 갱신했습니다.');
        });
    }

    if (premiumCopyAllBtn) {
        premiumCopyAllBtn.addEventListener('click', async () => {
            await copyAllPremiumNumbers();
        });
    }

    if (premiumUpgradeBtn) {
        premiumUpgradeBtn.addEventListener('click', event => {
            if (!isMember()) {
                event.preventDefault();
                openAuthModal();
                return;
            }
            event.preventDefault();
            setActiveTab('draw', true);
            setDrawServiceMode('premium');
            showActionPopup('플랜을 선택하면 프리미엄 추천을 바로 사용할 수 있습니다.');
        });
    }

    premiumPlanBuyButtons.forEach(button => {
        button.addEventListener('click', async event => {
            event.preventDefault();
            const plan = String(button.dataset.premiumPlan || '').toLowerCase();
            const planMetaMap = {
                starter: { name: 'STARTER', price: '월 4,900원' },
                standard: { name: 'STANDARD', price: '월 9,900원' },
                master: { name: 'MASTER', price: '월 19,900원' }
            };
            const planMeta = planMetaMap[plan] || { name: '선택 플랜', price: '가격 정보 준비 중' };
            if (!isMember()) {
                openAuthModal();
                return;
            }
            await setMembershipTier(plan);
            setActiveTab('draw', true);
            setDrawServiceMode('premium');
            showActionPopup(`${planMeta.name} 플랜이 활성화되었습니다. ${planMeta.price} 구성을 기준으로 프리미엄 추천을 바로 사용할 수 있습니다.`);
        });
    });

    if (drawCountSelect) {
        drawCountSelect.addEventListener('change', () => {
            syncDrawCountChips();
            refreshGuestLimitMessage();
            updateDrawContextUi();
        });
    }

    if (drawCountChips.length && drawCountSelect) {
        drawCountChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const targetValue = String(chip.dataset.drawCount || '');
                if (!targetValue || !drawCountSelect.querySelector(`option[value="${targetValue}"]`)) {
                    return;
                }
                drawCountSelect.value = targetValue;
                syncDrawCountChips(true);
                refreshGuestLimitMessage();
                updateDrawContextUi();
            });
        });
        syncDrawCountChips();
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = body.classList.contains('menu-open');
            syncMenuState(!isOpen);
        });
    }

    if (roundSearchBtn) {
        roundSearchBtn.addEventListener('click', () => {
            const fallbackRound = latestAvailableRound || estimateLatestRound();
            const value = roundSearchInput ? Number(roundSearchInput.value) : 0;
            if (!value && fallbackRound) {
                syncRoundSearchDefault(fallbackRound, { force: true });
                loadRound(fallbackRound);
                return;
            }
            if (!value) {
                updateCompareResult('회차 번호를 입력해 주세요.');
                return;
            }
            loadRound(value);
        });
    }
    if (roundSearchInput) {
        roundSearchInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (roundSearchBtn) {
                    roundSearchBtn.click();
                }
            }
        });
    }

    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            handleCompare();
        });
    }

    if (generateCtaBtn) {
        generateCtaBtn.addEventListener('click', () => {
            handleDrawGenerationRequest('cta');
        });
    }

    if (recentCountSelect) {
        recentCountSelect.addEventListener('change', () => {
            if (latestAvailableRound) {
                loadRecentRounds(latestAvailableRound);
            }
        });
    }

    if (storeOpenOfficialBtn) {
        storeOpenOfficialBtn.addEventListener('click', () => {
            window.open('https://www.dhlottery.co.kr/prchsplcsrch/home', '_blank', 'noopener');
        });
    }

    if (qrStartBtn) {
        qrStartBtn.addEventListener('click', () => {
            startQrScanner();
        });
    }

    if (qrStopBtn) {
        qrStopBtn.addEventListener('click', () => {
            stopQrScanner('스캔이 중지되었습니다.');
        });
    }

    if (qrOpenRoundBtn) {
        qrOpenRoundBtn.addEventListener('click', () => {
            const round = qrLastMatchedRound || currentWeeklyData?.drwNo;
            if (!round) {
                if (qrStatusEl) {
                    qrStatusEl.textContent = '먼저 QR을 스캔하거나 기준 회차를 불러와 주세요.';
                }
                return;
            }
            setActiveTab('dashboard', true);
            loadRound(Number(round));
        });
    }

    if (qrCopyNumbersBtn) {
        qrCopyNumbersBtn.addEventListener('click', async () => {
            if (!qrLastNumbers.length) {
                if (qrStatusEl) {
                    qrStatusEl.textContent = '복사할 번호가 없습니다. QR을 먼저 스캔해 주세요.';
                }
                return;
            }
            const text = qrLastNumbers.join(', ');
            if (compareInput) {
                compareInput.value = text;
            }
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                }
                if (qrStatusEl) {
                    qrStatusEl.textContent = '번호를 복사했습니다. 이번주 탭에서 바로 비교할 수 있습니다.';
                }
            } catch {
                if (qrStatusEl) {
                    qrStatusEl.textContent = '번호를 입력칸에 채웠습니다. 이번주 탭에서 확인해 주세요.';
                }
            }
        });
    }

    tabController.bind();

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            syncMenuState(false);
        });
    });

    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const preset = button.dataset.preset;
            applyPreset(preset);
        });
    });

    strategyButtons.forEach(button => {
        if (button.classList.contains('draw-scenario-card')) {
            return;
        }
        button.addEventListener('click', () => {
            const strategy = button.dataset.strategy;
            applyStrategy(strategy);
        });
    });

    // Scenario cards are handled here only; avoid duplicate bindings (inline/global) across input types.
    scenarioCards.forEach(card => {
        let pointerStart = null;

        const clearPointerStart = () => {
            pointerStart = null;
        };

        card.removeAttribute('onclick');
        card.addEventListener('pointerdown', event => {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }
            pointerStart = {
                x: event.clientX,
                y: event.clientY,
                pointerType: event.pointerType || ''
            };
        }, { passive: true });
        card.addEventListener('pointerup', event => {
            if (!pointerStart) {
                return;
            }
            const dx = Math.abs(event.clientX - pointerStart.x);
            const dy = Math.abs(event.clientY - pointerStart.y);
            const pointerType = event.pointerType || pointerStart.pointerType || '';
            const isTap = dx <= SCENARIO_TAP_THRESHOLD_PX && dy <= SCENARIO_TAP_THRESHOLD_PX;
            clearPointerStart();
            if (!isTap || !pointerType || pointerType === 'mouse') {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            activateScenarioSelection(card.dataset.strategy);
        });
        card.addEventListener('pointercancel', clearPointerStart, { passive: true });
        card.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            activateScenarioSelection(card.dataset.strategy);
        });
    });

    window.applyStrategyFromUI = applyStrategy;

    horizontalGestureTracks.forEach(track => {
        const pointerStarts = new Map();
        let touchStartX = 0;
        let touchStartY = 0;
        let touchDragging = false;
        let touchTracking = false;
        let suppressNextClick = false;
        let suppressTimerId = 0;

        const suppressClick = () => {
            suppressNextClick = true;
            if (suppressTimerId) {
                window.clearTimeout(suppressTimerId);
            }
            suppressTimerId = window.setTimeout(() => {
                suppressNextClick = false;
                suppressTimerId = 0;
            }, SCENARIO_CLICK_SUPPRESS_MS);
        };

        track.addEventListener('pointerdown', event => {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }
            pointerStarts.set(event.pointerId, {
                x: event.clientX,
                y: event.clientY,
                dragged: false
            });
        }, { passive: true });

        track.addEventListener('pointermove', event => {
            const start = pointerStarts.get(event.pointerId);
            if (!start || start.dragged) {
                return;
            }
            const dx = Math.abs(event.clientX - start.x);
            const dy = Math.abs(event.clientY - start.y);
            if (dx > SCENARIO_DRAG_THRESHOLD_PX && dx > dy) {
                start.dragged = true;
                suppressClick();
            }
        }, { passive: true });

        const clearPointer = event => {
            const start = pointerStarts.get(event.pointerId);
            if (start?.dragged) {
                suppressClick();
            }
            pointerStarts.delete(event.pointerId);
        };

        track.addEventListener('pointerup', clearPointer, { passive: true });
        track.addEventListener('pointercancel', clearPointer, { passive: true });
        track.addEventListener('lostpointercapture', clearPointer, { passive: true });

        track.addEventListener('touchstart', event => {
            const touch = event.touches && event.touches[0];
            if (!touch) {
                return;
            }
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            touchDragging = false;
            touchTracking = true;
        }, { passive: true });

        track.addEventListener('touchmove', event => {
            if (!touchTracking) {
                return;
            }
            const touch = event.touches && event.touches[0];
            if (!touch) {
                return;
            }
            const dx = Math.abs(touch.clientX - touchStartX);
            const dy = Math.abs(touch.clientY - touchStartY);
            if (!touchDragging && dx > SCENARIO_DRAG_THRESHOLD_PX && dx > dy) {
                touchDragging = true;
                suppressClick();
            }
        }, { passive: true });

        const clearTouch = () => {
            if (touchDragging) {
                suppressClick();
            }
            touchTracking = false;
            touchDragging = false;
        };

        track.addEventListener('touchend', clearTouch, { passive: true });
        track.addEventListener('touchcancel', clearTouch, { passive: true });

        track.addEventListener('click', event => {
            if (suppressNextClick) {
                event.preventDefault();
                event.stopPropagation();
                suppressNextClick = false;
                if (suppressTimerId) {
                    window.clearTimeout(suppressTimerId);
                    suppressTimerId = 0;
                }
            }
        }, true);
    });

    groupLevelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const token = button.dataset.groupLevel || '';
            const [group, rawLevel] = token.split(':');
            const level = Number(rawLevel);
            if (!group || !Number.isFinite(level)) {
                return;
            }
            applyGroupLevel(group, level);
        });
    });

    slotSaveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const slot = Number(button.dataset.slotSave);
            if (!Number.isFinite(slot)) {
                return;
            }
            saveSlotPreset(slot);
        });
    });

    slotApplyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const slot = Number(button.dataset.slotApply);
            if (!Number.isFinite(slot)) {
                return;
            }
            applySlotPreset(slot);
        });
    });

    mypageSlotApplyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const slot = Number(button.dataset.mypageSlotApply);
            if (!Number.isFinite(slot)) {
                return;
            }
            setActiveTab('draw', true);
            setDrawServiceMode('self');
            applySlotPreset(slot);
        });
    });

    if (saveRulesBtn) {
        saveRulesBtn.addEventListener('click', () => {
            const selected = ruleInputs.filter(input => input.checked).map(input => input.value);
            localStorage.setItem('lotto_rules', JSON.stringify(selected));
            localStorage.setItem(RULES_UPDATED_AT_KEY, new Date().toISOString());
            updateRulesStatus('선택한 규칙을 저장했습니다.');
            updateMypageSummaryUi();
        });
    }

    if (loadRulesBtn) {
        loadRulesBtn.addEventListener('click', () => {
            applySavedRules(true);
        });
    }

    if (customSaveBtn) {
        customSaveBtn.addEventListener('click', () => {
            const selected = ruleInputs.filter(input => input.checked).map(input => input.value);
            localStorage.setItem('lotto_custom_preset', JSON.stringify(selected));
            localStorage.setItem(CUSTOM_PRESET_UPDATED_AT_KEY, new Date().toISOString());
            updateRulesStatus('내 프리셋을 저장했습니다.');
            updateMypageSummaryUi();
        });
    }

    if (toggleSlotsBtn && slotPanel && slotGrid) {
        toggleSlotsBtn.addEventListener('click', () => {
            const collapsed = slotPanel.classList.toggle('is-collapsed');
            toggleSlotsBtn.textContent = collapsed ? '더보기' : '접기';
            toggleSlotsBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            scheduleDrawHorizontalWidthSync();
        });
    }

    if (toggleScenariosBtn && scenarioPanel && scenarioGrid) {
        toggleScenariosBtn.addEventListener('click', () => {
            const collapsed = scenarioPanel.classList.toggle('is-collapsed');
            toggleScenariosBtn.textContent = collapsed ? '더보기' : '접기';
            toggleScenariosBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            scheduleDrawHorizontalWidthSync();
        });
    }

    if (customApplyBtn) {
        customApplyBtn.addEventListener('click', () => {
            const saved = localStorage.getItem('lotto_custom_preset');
            if (!saved) {
                updateRulesStatus('저장된 내 프리셋이 없습니다.');
                return;
            }
            rememberDrawInteraction({
                type: 'preset',
                label: '내 프리셋',
                selected: true
            });
            clearActiveStrategySelection();
            const ids = JSON.parse(saved);
            setRulesByIds(ids);
            syncGroupLevelButtons();
            updateRulesStatus('내 프리셋을 적용했습니다.');
            updateMypageSummaryUi();
        });
    }

    authButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const provider = button.dataset.auth;
            if (provider === 'google') {
                const ok = await signInWithGoogle();
                if (ok) {
                    closeAuthModal();
                }
                return;
            }
            updateRulesStatus('카카오 로그인은 아직 연결 전입니다. 현재는 구글 로그인만 테스트 가능합니다.');
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = '카카오는 Firebase 기본 Provider가 아니어서 별도 OAuth 연동이 필요합니다.';
            }
        });
    });

    if (welcomeAuthBtn) {
        welcomeAuthBtn.addEventListener('click', () => {
            closeWelcomeModal({ remember: true });
            openAuthModal();
        });
    }

    if (welcomeBrowseBtn) {
        welcomeBrowseBtn.addEventListener('click', () => {
            closeWelcomeModal({ remember: true });
            showActionPopup('가입 없이도 바로 이용할 수 있습니다. 필요할 때 로그인으로 전환하면 이력과 추천 기능이 이어집니다.');
        });
    }

    welcomeDismissButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeWelcomeModal({ remember: true });
        });
    });

    if (welcomeModal) {
        welcomeModal.addEventListener('click', event => {
            if (event.target === welcomeModal) {
                closeWelcomeModal({ remember: true });
            }
        });
    }

    authEntryLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            openAuthModal();
        });
    });

    authLogoutButtons.forEach(button => {
        button.addEventListener('click', async () => {
            await signOutFirebaseUser();
        });
    });

    if (mypagePlanManageBtn) {
        mypagePlanManageBtn.addEventListener('click', () => {
            if (!isMember()) {
                openAuthModal();
                return;
            }
            setActiveTab('draw', true);
            setDrawServiceMode('premium');
            showActionPopup('원하는 플랜을 선택하거나 현재 활성화된 플랜으로 추천번호를 생성할 수 있습니다.');
        });
    }

    if (mypagePlanCancelBtn) {
        mypagePlanCancelBtn.addEventListener('click', async () => {
            await setMembershipTier('free');
            showActionPopup('무료 플랜으로 전환했습니다.');
        });
    }

    if (nicknameOpenModalBtn) {
        nicknameOpenModalBtn.addEventListener('click', () => {
            openNicknameModal();
        });
    }
    if (nicknameModalCloseBtn) {
        nicknameModalCloseBtn.addEventListener('click', () => {
            closeNicknameModal();
        });
    }
    if (nicknameModalCancelBtn) {
        nicknameModalCancelBtn.addEventListener('click', () => {
            closeNicknameModal();
        });
    }
    if (nicknameModalSaveBtn) {
        nicknameModalSaveBtn.addEventListener('click', async () => {
            await submitNicknameChangeFromModal();
        });
    }
    if (nicknameModalInputEl) {
        nicknameModalInputEl.addEventListener('keydown', async event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                await submitNicknameChangeFromModal();
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                closeNicknameModal();
            }
        });
    }
    if (nicknameModal) {
        nicknameModal.addEventListener('click', event => {
            if (event.target === nicknameModal) {
                closeNicknameModal();
            }
        });
    }

    if (window.visualViewport && typeof window.visualViewport.addEventListener === 'function') {
        window.visualViewport.addEventListener('resize', scheduleDrawHorizontalWidthSync, { passive: true });
    }
    window.addEventListener('resize', scheduleDrawHorizontalWidthSync, { passive: true });
    window.addEventListener('scroll', scheduleDrawHorizontalWidthSync, { passive: true });
    window.addEventListener('orientationchange', () => {
        window.setTimeout(scheduleDrawHorizontalWidthSync, 120);
    }, { passive: true });

    if (authClose) {
        authClose.addEventListener('click', () => {
            closeAuthModal();
        });
    }

    if (authModal) {
        authModal.addEventListener('click', event => {
            if (event.target === authModal) {
                closeAuthModal();
            }
        });
    }

    groupSelectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const group = button.dataset.group;
            const groupInputs = ruleInputs.filter(input => {
                const card = input.closest('.rule-card');
                return card && card.dataset.group === group;
            });
            if (!groupInputs.length) {
                return;
            }
            const allChecked = groupInputs.every(input => input.checked);
            groupInputs.forEach(input => {
                input.checked = !allChecked;
            });
            rememberDrawInteraction({
                type: 'group',
                label: `${group} ${allChecked ? '해제' : '선택'}`,
                selected: !allChecked
            });
            clearActiveStrategySelection();
            updateSelectionCount();
            updateCombinedEstimates();
            syncGroupLevelButtons();
        });
    });

    if (toggleRulesBtn && rulesSection) {
        toggleRulesBtn.addEventListener('click', () => {
            const collapsed = rulesSection.classList.toggle('rules-collapsed');
            toggleRulesBtn.textContent = collapsed ? '모든 규칙 펼치기' : '간단히 보기';
            applyRulePickerFilter();
        });
    }

    ruleInputs.forEach(input => {
        input.addEventListener('change', () => {
            const sourceCard = input.closest('.rule-card');
            rememberDrawInteraction({
                type: 'rule',
                value: input.value,
                label: sourceCard?.dataset.title || sourceCard?.querySelector('.rule-title')?.textContent || '규칙',
                selected: Boolean(input.checked)
            });
            if (input.value === 'exclude_number' && !input.checked && excludeNumberValues.size) {
                clearExcludeNumberSelection({ clearStorage: true });
            }
            clearActiveStrategySelection();
            updateSelectionCount();
            updateCombinedEstimates();
            syncGroupLevelButtons();
        });
    });

    if (selectedRulesListEl) {
        selectedRulesListEl.addEventListener('click', event => {
            const button = event.target.closest('.draw-selected-chip');
            if (!button) {
                return;
            }
            const value = button.dataset.value;
            if (!value) {
                return;
            }
            const targetInput = ruleInputs.find(input => input.value === value);
            if (targetInput) {
                targetInput.checked = false;
                targetInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }

    if (drawSelectionDockPreviewEl) {
        drawSelectionDockPreviewEl.addEventListener('click', event => {
            const button = event.target.closest('.draw-selection-dock-chip');
            if (!button) {
                return;
            }
            const value = button.dataset.value;
            if (!value) {
                return;
            }
            const targetInput = ruleInputs.find(input => input.value === value);
            if (targetInput) {
                targetInput.checked = false;
                targetInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }

    function setDrawSelectionDockCollapsed(collapsed) {
        const shouldCollapse = Boolean(collapsed);
        isDrawSelectionDockCollapsed = shouldCollapse;
        if (drawSelectionDockEl) {
            drawSelectionDockEl.classList.toggle('is-collapsed', shouldCollapse);
        }
        if (drawSelectionDockBodyEl) {
            drawSelectionDockBodyEl.hidden = shouldCollapse;
        }
        if (drawSelectionDockToggleBtn) {
            drawSelectionDockToggleBtn.textContent = shouldCollapse ? '펼치기' : '접기';
            drawSelectionDockToggleBtn.setAttribute('aria-expanded', String(!shouldCollapse));
            drawSelectionDockToggleBtn.setAttribute(
                'aria-label',
                shouldCollapse ? '적용 필터 펼치기' : '적용 필터 접기'
            );
        }
    }

    function setDrawBottomGenerateCollapsed(collapsed) {
        const shouldCollapse = Boolean(collapsed);
        isDrawBottomGenerateCollapsed = shouldCollapse;
        if (drawBottomGenerateBarEl) {
            drawBottomGenerateBarEl.classList.toggle('is-collapsed', shouldCollapse);
        }
        if (drawBottomGenerateContentEl) {
            drawBottomGenerateContentEl.hidden = shouldCollapse;
        }
        if (drawBottomGenerateToggleBtn) {
            drawBottomGenerateToggleBtn.textContent = shouldCollapse ? '펼치기' : '접기';
            drawBottomGenerateToggleBtn.setAttribute('aria-expanded', String(!shouldCollapse));
            drawBottomGenerateToggleBtn.setAttribute(
                'aria-label',
                shouldCollapse ? '번호 생성 바 펼치기' : '번호 생성 바 접기'
            );
        }
        if (drawTabPanel) {
            drawTabPanel.classList.toggle('has-generate-cta-collapsed', shouldCollapse);
        }
    }

    function clearSelectedRules() {
        rememberDrawInteraction({
            type: 'clear',
            label: '전체 해제',
            selected: false
        });
        activeStrategy = '';
        setRulesByIds([]);
        syncStrategyButtons('clear');
        syncGroupLevelButtons();
    }

    if (selectedClearBtn) {
        selectedClearBtn.addEventListener('click', () => {
            clearSelectedRules();
        });
    }

    if (drawSelectionDockClearBtn) {
        drawSelectionDockClearBtn.addEventListener('click', () => {
            clearSelectedRules();
        });
    }

    if (drawSelectionDockToggleBtn) {
        drawSelectionDockToggleBtn.addEventListener('click', () => {
            if (!drawSelectionDockEl || !drawSelectionDockEl.classList.contains('has-selection')) {
                return;
            }
            setDrawSelectionDockCollapsed(!isDrawSelectionDockCollapsed);
        });
    }

    if (drawBottomGenerateToggleBtn) {
        drawBottomGenerateToggleBtn.addEventListener('click', () => {
            if (!drawBottomGenerateBarEl || !drawBottomGenerateBarEl.classList.contains('is-visible')) {
                return;
            }
            setDrawBottomGenerateCollapsed(!isDrawBottomGenerateCollapsed);
        });
    }

    if (openRulePickerBtn) {
        openRulePickerBtn.addEventListener('click', () => {
            setRulePickerOpen(true);
        });
    }

    if (closeRulePickerBtn) {
        closeRulePickerBtn.addEventListener('click', () => {
            setRulePickerOpen(false);
        });
    }

    if (rulePickerBackdrop) {
        rulePickerBackdrop.addEventListener('click', () => {
            setRulePickerOpen(false);
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            setRulePickerOpen(false);
        }
    });

    if (rulePickerSearch) {
        rulePickerSearch.addEventListener('input', () => {
            applyRulePickerFilter();
        });
    }

    if (rulePickerGroup) {
        rulePickerGroup.addEventListener('change', () => {
            applyRulePickerFilter();
        });
    }

    try {
        guestTrackingId = getOrCreateGuestTrackingId();
        initFirebase();
        syncMenuState(false);
        setupExcludeNumberControl();
        resetDrawSelectionsForEntry();
        injectRuleSamples();
        updateRulesStatus('');
        updateSelectionCount();
        computeBaseOdds();
        updateCombinedEstimates();
        updateScenarioMetrics();
        renderSlotPresets();
        syncGroupLevelButtons();
        populateRulePickerGroups();
        applyRulePickerFilter();
        setupRuleDetails();
        syncInitialTab();
        syncNavTabLinks(getCurrentActiveTabId());
        syncActiveTabState(getCurrentActiveTabId());
        setupRevealMotion();
        refreshRevealMotion(document.getElementById(`tab-${getCurrentActiveTabId()}`));
        scheduleWelcomeModal();
        window.addEventListener('message', event => {
            if (!event || !event.data || event.data.type !== 'switch-tab') {
                return;
            }
            const target = String(event.data.tab || '').trim();
            if (!target) {
                return;
            }
            setActiveTab(target, true);
        });
        if (rulesSection) {
            rulesSection.classList.add('rules-collapsed');
        }
        if (toggleRulesBtn) {
            toggleRulesBtn.textContent = '모든 규칙 펼치기';
        }
        applyRulePickerFilter();
        if (guestLimitEl) {
            guestLimitEl.textContent = '미로그인 사용자는 하루 50회까지 가능 (1회 1세트).';
            refreshGuestLimitMessage();
        }
        updatePremiumMembershipUi();
        setDrawServiceMode(getStoredDrawServiceMode());
        updateDrawContextUi();
        updateDashboardSummaryUi();
        updateMypageSummaryUi();
    } catch (error) {
        console.error('초기화 오류', error);
    }
    updateScenarioMetrics();
    fetchLatestDraw();
    fetchWeeklyIntroInfo();
    window.setInterval(() => {
        fetchWeeklyIntroInfo();
    }, 10000);

    function focusGeneratedNumbers() {
        const target = numbersContainer?.querySelector('.number-row') || drawGeneratorSectionEl;
        if (!target || typeof target.scrollIntoView !== 'function') {
            return;
        }
        window.requestAnimationFrame(() => {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    function handleDrawGenerationRequest(source = 'panel') {
        const activeRules = getActiveRules();
        if (!activeRules.length) {
            updateRulesStatus('필터를 하나 이상 선택한 뒤 번호를 생성해 주세요.');
            setDrawCopyStatus('선택된 필터가 없습니다. 필터를 먼저 선택해 주세요.', true);
            showActionPopup('필터를 먼저 선택해 주세요.');
            return false;
        }
        try {
            if (!canGuestGenerate()) {
                showActionPopup('로그인 후 2세트 이상 생성과 제한 해제를 사용할 수 있습니다.');
                openAuthModal();
                return false;
            }
            const generatedCount = generateAndDisplayNumbers({
                source,
                activeRules
            });
            if (!generatedCount) {
                if (source === 'cta') {
                    focusGeneratedNumbers();
                    showActionPopup('조건이 너무 좁아 번호를 만들지 못했습니다. 필터를 조금 줄여 보세요.');
                }
                return false;
            }
            incrementGuestCount();
            if (source === 'cta') {
                focusGeneratedNumbers();
                showActionPopup(`${generatedCount}세트 생성 완료`);
            }
            return true;
        } catch (error) {
            console.error('번호 생성 실패', error);
            setDrawCopyStatus('번호 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', true);
            showActionPopup('번호 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            return false;
        }
    }

    function generateAndDisplayNumbers(options = {}) {
        const drawCount = parseInt(drawCountSelect.value, 10);
        const activeRules = Array.isArray(options.activeRules) ? options.activeRules : getActiveRules();
        const draws = [];
        for (let i = 0; i < drawCount; i += 1) {
            const numbers = generateNumbersWithRules(activeRules);
            draws.push(numbers);
        }
        return displayNumbers(draws, {
            source: options.source || 'panel',
            ruleIds: activeRules.map(rule => rule.id)
        });
    }

    function getActiveRules() {
        const activeIds = new Set(ruleInputs.filter(input => input.checked).map(input => input.value));
        return RULES.filter(rule => activeIds.has(rule.id));
    }

    function generateNumbersWithRules(activeRules) {
        const maxAttempts = 5000;
        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
            const numbers = generateUniqueNumbers(6, 1, 45).sort((a, b) => a - b);
            if (!shouldExclude(numbers, activeRules)) {
                return numbers;
            }
        }
        return [];
    }

    function shouldExclude(numbers, activeRules) {
        if (numbers.length === 0) {
            return true;
        }
        return activeRules.some(rule => rule.exclude(numbers, excludeNumberValues));
    }

    function generateUniqueNumbers(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }

    function displayNumbers(draws, options = {}) {
        numbersContainer.innerHTML = '';
        lastGeneratedDraws = [];
        draws.forEach((numbers, index) => {
            const row = document.createElement('div');
            row.classList.add('number-row');

            const label = document.createElement('div');
            label.classList.add('row-label');
            label.textContent = `세트 ${index + 1}`;
            row.appendChild(label);

            if (numbers.length === 0) {
                const error = document.createElement('div');
                error.classList.add('error-text');
                error.textContent = '유효한 조합을 찾지 못했습니다. 규칙 수를 줄여 보세요.';
                row.appendChild(error);
                numbersContainer.appendChild(row);
                return;
            }

            numbers.forEach(number => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = number;
                row.appendChild(numberElement);
            });

            lastGeneratedDraws.push({
                setNo: index + 1,
                numbers: [...numbers]
            });
            numbersContainer.appendChild(row);
        });
        setDrawCopyButtonState(lastGeneratedDraws.length > 0);
        if (!lastGeneratedDraws.length) {
            setDrawCopyStatus('유효한 조합을 찾지 못했습니다. 필터를 조금 줄여 보세요.', true);
            return 0;
        }
        setDrawCopyStatus(`총 ${lastGeneratedDraws.length}세트를 생성했습니다. 아래 결과를 확인해 주세요.`);
        if (lastGeneratedDraws.length) {
            recordGenerationStats({
                sourceMode: 'self',
                setCount: lastGeneratedDraws.length,
                round: getTargetRoundForEntries()
            });
            persistGeneratedEntries(lastGeneratedDraws, {
                sourceMode: 'self',
                ruleIds: options.ruleIds
            });
        }
        return lastGeneratedDraws.length;
    }

    function syncDrawCountChips(shouldCenterActive = false) {
        if (!drawCountSelect || !drawCountChips.length) {
            return;
        }
        const selected = String(drawCountSelect.value || '1');
        drawCountChips.forEach(chip => {
            const isActive = String(chip.dataset.drawCount || '') === selected;
            chip.classList.toggle('is-active', isActive);
            chip.setAttribute('aria-pressed', String(isActive));
            if (isActive && shouldCenterActive) {
                const scroller = chip.closest('.draw-count-scroller');
                if (scroller) {
                    const targetLeft = chip.offsetLeft - (scroller.clientWidth - chip.clientWidth) / 2;
                    scroller.scrollTo({
                        left: Math.max(0, targetLeft),
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    function setDrawCopyButtonState(enabled) {
        if (!drawCopyAllBtn) {
            return;
        }
        drawCopyAllBtn.disabled = !enabled;
    }

    function setDrawCopyStatus(message, isError = false) {
        if (!drawCopyStatusEl) {
            return;
        }
        drawCopyStatusEl.textContent = message;
        drawCopyStatusEl.classList.toggle('is-error', Boolean(isError));
    }

    async function copyAllGeneratedNumbers() {
        if (!lastGeneratedDraws.length) {
            setDrawCopyStatus('복사할 번호가 없습니다. 먼저 번호를 생성해 주세요.', true);
            setDrawCopyButtonState(false);
            return;
        }
        const text = lastGeneratedDraws
            .map(item => `세트 ${item.setNo}: ${item.numbers.join(', ')}`)
            .join('\n');
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.top = '-9999px';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                const copied = document.execCommand('copy');
                document.body.removeChild(textarea);
                if (!copied) {
                    throw new Error('execCommand copy failed');
                }
            }
            setDrawCopyStatus(`총 ${lastGeneratedDraws.length}세트를 복사했습니다.`);
        } catch (error) {
            console.error('번호 전체복사 실패', error);
            setDrawCopyStatus('복사에 실패했습니다. 다시 시도해 주세요.', true);
        }
    }

    function getStoredDrawServiceMode() {
        return 'self';
    }

    function getMembershipTier() {
        if (currentUserProfile && typeof currentUserProfile.membershipTier === 'string') {
            return currentUserProfile.membershipTier.toLowerCase();
        }
        const savedTier = localStorage.getItem('lotto_membership_tier');
        if (savedTier) {
            return savedTier.toLowerCase();
        }
        return 'free';
    }

    function getOrCreateGuestTrackingId() {
        try {
            const stored = localStorage.getItem(DRAW_ENTRY_LOCAL_KEY);
            if (stored && /^[a-z0-9_-]{12,80}$/i.test(stored)) {
                return stored;
            }
            const next = `guest_${createClientNonce(20)}`;
            localStorage.setItem(DRAW_ENTRY_LOCAL_KEY, next);
            return next;
        } catch (error) {
            console.warn('guest tracking id storage unavailable', error);
            return `guest_${createClientNonce(20)}`;
        }
    }

    function createClientNonce(length = 16) {
        const size = Math.max(8, Number(length) || 16);
        const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
        if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
            const values = new Uint8Array(size);
            window.crypto.getRandomValues(values);
            return Array.from(values, value => alphabet[value % alphabet.length]).join('');
        }
        let text = '';
        for (let i = 0; i < size; i += 1) {
            text += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return text;
    }

    function readStoredRuleIds(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) {
                return [];
            }
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('저장된 규칙 로드 실패', error);
            return [];
        }
    }

    function getGenerationStats() {
        try {
            const raw = localStorage.getItem(GENERATION_STATS_KEY);
            if (!raw) {
                return {
                    sessions: 0,
                    totalSets: 0,
                    lastSourceMode: 'self',
                    lastRound: 0,
                    lastGeneratedAt: ''
                };
            }
            const parsed = JSON.parse(raw);
            return {
                sessions: Number(parsed.sessions || 0),
                totalSets: Number(parsed.totalSets || 0),
                lastSourceMode: parsed.lastSourceMode === 'premium' ? 'premium' : 'self',
                lastRound: Number(parsed.lastRound || 0),
                lastGeneratedAt: parsed.lastGeneratedAt ? String(parsed.lastGeneratedAt) : ''
            };
        } catch (error) {
            console.warn('생성 통계 로드 실패', error);
            return {
                sessions: 0,
                totalSets: 0,
                lastSourceMode: 'self',
                lastRound: 0,
                lastGeneratedAt: ''
            };
        }
    }

    function saveGenerationStats(stats) {
        try {
            localStorage.setItem(GENERATION_STATS_KEY, JSON.stringify(stats));
        } catch (error) {
            console.warn('생성 통계 저장 실패', error);
        }
    }

    function recordGenerationStats({ sourceMode = 'self', setCount = 0, round = 0 } = {}) {
        const current = getGenerationStats();
        const next = {
            sessions: current.sessions + 1,
            totalSets: current.totalSets + Math.max(0, Number(setCount) || 0),
            lastSourceMode: sourceMode === 'premium' ? 'premium' : 'self',
            lastRound: Number(round) > 0 ? Number(round) : current.lastRound,
            lastGeneratedAt: new Date().toISOString()
        };
        saveGenerationStats(next);
        updateDashboardSummaryUi();
        updateMypageSummaryUi();
    }

    function formatRelativeTime(value) {
        const date = value instanceof Date ? value : new Date(value);
        const millis = date.getTime();
        if (!Number.isFinite(millis)) {
            return '-';
        }
        const diff = Date.now() - millis;
        if (diff < 60 * 1000) {
            return '방금 전';
        }
        if (diff < 60 * 60 * 1000) {
            return `${Math.floor(diff / (60 * 1000))}분 전`;
        }
        if (diff < 24 * 60 * 60 * 1000) {
            return `${Math.floor(diff / (60 * 60 * 1000))}시간 전`;
        }
        return formatSlotDate(date.toISOString());
    }

    function getMembershipPlanMeta(tier = getMembershipTier()) {
        const normalized = String(tier || 'free').trim().toLowerCase();
        const planMap = {
            free: {
                id: 'free',
                label: 'FREE',
                description: '직접 선택과 저장 기능을 바로 사용할 수 있어요.',
                nextLabel: '추천 플랜 보기',
                note: '직접 선택 사용 중'
            },
            starter: {
                id: 'starter',
                label: 'STARTER',
                description: '주 1회 추천 3세트와 최근 4주 기록을 제공해요.',
                nextLabel: '주 1회 추천',
                note: '입문 플랜 사용 중'
            },
            standard: {
                id: 'standard',
                label: 'STANDARD',
                description: '주 2회 추천 5세트와 최근 12주 기록을 제공해요.',
                nextLabel: '주 2회 추천',
                note: '표준 플랜 사용 중'
            },
            master: {
                id: 'master',
                label: 'MASTER',
                description: '주 3회 추천과 심화 리포트를 함께 제공해요.',
                nextLabel: '주 3회 추천',
                note: '집중 관리 플랜 사용 중'
            },
            premium: {
                id: 'premium',
                label: 'PREMIUM',
                description: '추천 번호와 전체 복사 기능을 바로 사용할 수 있어요.',
                nextLabel: '프리미엄 사용 중',
                note: '프리미엄 기능 사용 중'
            }
        };
        return planMap[normalized] || planMap.free;
    }

    function updateDashboardSummaryUi() {
        if (dashSyncStatusEl) {
            if (currentWeeklyData && Number(currentWeeklyData.drwNo) > 0) {
                const label = lastWeeklyRenderMode === 'cached' ? '캐시 반영' : '실시간 반영';
                dashSyncStatusEl.textContent = `${currentWeeklyData.drwNo}회 ${label}`;
            } else {
                dashSyncStatusEl.textContent = '최신 회차를 확인하는 중입니다.';
            }
        }
        if (dashSyncTimeEl) {
            if (lastWeeklyRenderedAt) {
                const sourceLabel = lastWeeklyRenderSource === 'main-info' ? '공식 메인 정보' : '공식 회차 데이터';
                dashSyncTimeEl.textContent = `${formatRelativeTime(lastWeeklyRenderedAt)} · ${sourceLabel}`;
            } else {
                dashSyncTimeEl.textContent = '공식 데이터를 불러오면 상태가 즉시 반영됩니다.';
            }
        }
        if (dashMembershipChipEl) {
            dashMembershipChipEl.textContent = isMember() ? getMembershipPlanMeta().label : '로그인 전';
        }
        if (dashActivityChipEl) {
            const stats = getGenerationStats();
            if (stats.totalSets > 0) {
                const modeLabel = stats.lastSourceMode === 'premium' ? '추천' : '직접선택';
                dashActivityChipEl.textContent = `누적 ${formatNumber(stats.totalSets)}세트 · 최근 ${modeLabel}`;
            } else {
                dashActivityChipEl.textContent = '아직 생성 이력이 없습니다.';
            }
        }
    }

    function updateDrawContextUi() {
        const plan = getMembershipPlanMeta();
        if (drawMembershipStatusEl) {
            if (!isMember()) {
                drawMembershipStatusEl.textContent = '로그인 필요';
            } else if (isPremiumMember()) {
                drawMembershipStatusEl.textContent = `${plan.label} 활성화`;
            } else {
                drawMembershipStatusEl.textContent = 'FREE 이용 중';
            }
        }
        if (drawMembershipNoteEl) {
            if (!isMember()) {
                drawMembershipNoteEl.textContent = '로그인 후 이용권을 시작하면 추천번호를 바로 받을 수 있습니다.';
            } else if (isPremiumMember()) {
                drawMembershipNoteEl.textContent = `${plan.label} 플랜으로 추천번호와 전체복사를 바로 사용할 수 있습니다.`;
            } else {
                drawMembershipNoteEl.textContent = '현재는 직접 선택 모드입니다. 필요할 때만 월정액 추천으로 전환할 수 있습니다.';
            }
        }
        const selectedCount = ruleInputs.filter(input => input.checked).length;
        const hasSelection = selectedCount > 0;
        if (drawSelectionSummaryEl) {
            drawSelectionSummaryEl.textContent = selectedCount ? `${selectedCount}개 필터 선택됨` : '아직 선택된 필터가 없습니다.';
        }
        if (generateBtn) {
            generateBtn.hidden = !hasSelection;
            generateBtn.disabled = !hasSelection;
        }
        if (drawCopyAllBtn) {
            drawCopyAllBtn.hidden = !hasSelection && !lastGeneratedDraws.length;
        }
        if (drawGenerateHintEl) {
            drawGenerateHintEl.hidden = hasSelection;
        }
        if (drawActionButtonsEl) {
            drawActionButtonsEl.classList.toggle('is-generate-hidden', !hasSelection);
        }
        const isSelfMode = !drawTabPanel || drawTabPanel.getAttribute('data-service-mode') !== 'premium';
        const shouldShowBottomGenerateBar = isSelfMode && hasSelection;
        if (drawBottomGenerateBarEl) {
            const wasVisible = drawBottomGenerateBarEl.classList.contains('is-visible');
            drawBottomGenerateBarEl.classList.toggle('has-selection', shouldShowBottomGenerateBar);
            drawBottomGenerateBarEl.classList.toggle('is-visible', shouldShowBottomGenerateBar);
            if (!shouldShowBottomGenerateBar || !wasVisible) {
                setDrawBottomGenerateCollapsed(false);
            } else {
                setDrawBottomGenerateCollapsed(isDrawBottomGenerateCollapsed);
            }
        }
        if (drawBottomGenerateToggleBtn) {
            drawBottomGenerateToggleBtn.hidden = !shouldShowBottomGenerateBar;
        }
        if (drawTabPanel) {
            drawTabPanel.classList.toggle('has-generate-cta', shouldShowBottomGenerateBar);
            if (!shouldShowBottomGenerateBar) {
                drawTabPanel.classList.remove('has-generate-cta-collapsed');
            }
        }
        const drawCount = Math.max(1, parseInt(drawCountSelect?.value || '1', 10) || 1);
        if (drawBottomGenerateSummaryEl) {
            drawBottomGenerateSummaryEl.textContent = selectedCount
                ? `${drawCount}세트 · ${selectedCount}개 필터 반영`
                : '필터 선택 후 생성';
        }
        if (drawBottomGenerateDetailEl) {
            if (!selectedCount) {
                drawBottomGenerateDetailEl.textContent = '필터를 하나 이상 고르면 여기서 바로 번호를 생성할 수 있습니다.';
            } else {
                const remainPct = Number.isFinite(currentRemainingRatio)
                    ? Math.max(0, Math.min(100, Math.round(currentRemainingRatio * 1000) / 10))
                    : 100;
                const remainingValue = Number.isFinite(currentRemainingCombos) ? formatNumber(currentRemainingCombos) : '-';
                drawBottomGenerateDetailEl.textContent = `남은 조합 ${remainingValue}개 · 생존 비중 ${remainPct}% 기준으로 생성합니다.`;
            }
        }
        if (drawFilterDetailEl) {
            if (!selectedCount) {
                drawFilterDetailEl.textContent = '시나리오 또는 규칙을 추가해 조합을 좁혀보세요.';
                return;
            }
            const remainPct = Number.isFinite(currentRemainingRatio)
                ? Math.max(0, Math.min(100, Math.round(currentRemainingRatio * 1000) / 10))
                : 100;
            const remainingValue = Number.isFinite(currentRemainingCombos) ? formatNumber(currentRemainingCombos) : '-';
            const excludedValue = Number.isFinite(currentExcludedCombos) ? formatNumber(currentExcludedCombos) : '-';
            drawFilterDetailEl.textContent = `남은 조합 ${remainingValue}개 · 제외 ${excludedValue}개 · 생존 비중 ${remainPct}%`;
        }
    }

    function updateMypageSummaryUi() {
        const plan = getMembershipPlanMeta();
        const stats = getGenerationStats();
        const savedRules = readStoredRuleIds('lotto_rules');
        const customPreset = readStoredRuleIds('lotto_custom_preset');
        const savedRulesUpdatedAt = localStorage.getItem(RULES_UPDATED_AT_KEY) || '';
        const customPresetUpdatedAt = localStorage.getItem(CUSTOM_PRESET_UPDATED_AT_KEY) || '';
        const slotPresets = getSlotPresets();
        const activeSlots = Object.values(slotPresets).filter(value => Array.isArray(value && value.ids) && value.ids.length).length;
        const latestSlot = Object.values(slotPresets)
            .filter(value => value && value.savedAt)
            .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())[0] || null;
        const strongestPresetCount = Math.max(savedRules.length, customPreset.length);
        const latestPresetAt = [savedRulesUpdatedAt, customPresetUpdatedAt]
            .filter(Boolean)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] || '';

        if (mypageProfileEmailEl) {
            if (currentUser && currentUser.email) {
                mypageProfileEmailEl.textContent = currentUser.email;
            } else if (isMember() && currentUser) {
                mypageProfileEmailEl.textContent = currentUser.uid;
            } else {
                mypageProfileEmailEl.textContent = '로그인해 주세요';
            }
        }
        if (mypageMembershipTierEl) {
            mypageMembershipTierEl.textContent = isMember() ? plan.label : 'FREE';
        }
        if (mypageMembershipTierSummaryEl) {
            mypageMembershipTierSummaryEl.textContent = isMember() ? plan.label : 'FREE';
        }
        if (mypageMembershipDescEl) {
            mypageMembershipDescEl.textContent = isMember()
                ? plan.description
                : '로그인하면 추천 플랜과 저장한 기록을 바로 이어서 볼 수 있어요.';
        }
        if (mypageMembershipNextEl) {
            mypageMembershipNextEl.textContent = isMember() ? plan.nextLabel : '로그인 후 시작';
        }
        if (mypagePlanNoteEl) {
            if (!isMember()) {
                mypagePlanNoteEl.textContent = '로그인하면 바로 시작';
            } else if (isPremiumMember()) {
                mypagePlanNoteEl.textContent = '추천 플랜 사용 중';
            } else {
                mypagePlanNoteEl.textContent = '직접 선택 사용 중';
            }
        }
        if (mypagePlanManageBtn) {
            mypagePlanManageBtn.textContent = isMember() ? '플랜 관리' : '로그인하고 시작';
        }
        if (mypagePlanCancelBtn) {
            mypagePlanCancelBtn.hidden = !isPremiumMember();
        }
        if (mypagePresetBadgeEl) {
            mypagePresetBadgeEl.textContent = `${strongestPresetCount}개`;
        }
        if (mypagePresetSummaryEl) {
            if (strongestPresetCount) {
                mypagePresetSummaryEl.textContent = `규칙 ${savedRules.length}개 · 내 프리셋 ${customPreset.length}개`;
            } else {
                mypagePresetSummaryEl.textContent = '아직 저장한 규칙이 없어요';
            }
        }
        if (mypagePresetUpdatedEl) {
            mypagePresetUpdatedEl.textContent = latestPresetAt ? formatRelativeTime(latestPresetAt) : '아직 저장 없음';
        }
        if (mypageSlotSummaryEl) {
            mypageSlotSummaryEl.textContent = activeSlots ? `보관함 ${activeSlots}칸 사용 중` : '비어 있어요';
        }
        if (mypageSlotUpdatedEl) {
            mypageSlotUpdatedEl.textContent = latestSlot && latestSlot.savedAt
                ? `최근 저장 ${formatSlotDate(latestSlot.savedAt)}`
                : '보관함 1~3 상태가 여기에 보여요.';
        }
        if (mypageStatsGeneratedEl) {
            mypageStatsGeneratedEl.textContent = `${formatNumber(stats.totalSets || 0)}세트`;
        }
        if (mypageStatsRoundEl) {
            const round = Number(stats.lastRound || getTargetRoundForEntries() || 0);
            mypageStatsRoundEl.textContent = round > 0 ? `${round}회` : '-';
        }
        if (mypageStatsModeEl) {
            mypageStatsModeEl.textContent = stats.lastSourceMode === 'premium' ? '자동 추천' : '직접 선택';
        }
    }

    function getTargetRoundForEntries() {
        const weeklyRoundText = weeklyThisRoundEl ? String(weeklyThisRoundEl.textContent || '') : '';
        const weeklyRoundNumber = Number((weeklyRoundText.match(/\d+/) || [])[0] || 0);
        if (Number.isFinite(weeklyRoundNumber) && weeklyRoundNumber > 0) {
            return weeklyRoundNumber;
        }
        if (Number.isFinite(Number(latestAvailableRound)) && Number(latestAvailableRound) > 0) {
            return Number(latestAvailableRound) + 1;
        }
        if (currentWeeklyData && Number.isFinite(Number(currentWeeklyData.drwNo)) && Number(currentWeeklyData.drwNo) > 0) {
            return Number(currentWeeklyData.drwNo) + 1;
        }
        return Number(estimateLatestRound()) + 1;
    }

    function normalizeEntryNumbers(numbers) {
        if (!Array.isArray(numbers)) {
            return [];
        }
        const normalized = Array.from(
            new Set(
                numbers
                    .map(value => Number(value))
                    .filter(value => Number.isInteger(value) && value >= 1 && value <= 45)
            )
        ).sort((a, b) => a - b);
        return normalized.length === 6 ? normalized : [];
    }

    async function persistGeneratedEntries(draws, options = {}) {
        if (!firebaseDb || !window.firebase || !window.firebase.firestore || !Array.isArray(draws) || !draws.length) {
            return;
        }
        try {
            const targetRound = getTargetRoundForEntries();
            const userType = isMember() ? 'member' : 'guest';
            const membershipTier = isMember() ? getMembershipTier() : 'guest';
            const generationId = `gen_${Date.now()}_${createClientNonce(10)}`;
            const sourceMode = options.sourceMode === 'premium' ? 'premium' : 'self';
            const ruleIds = Array.isArray(options.ruleIds)
                ? Array.from(new Set(options.ruleIds.map(value => String(value || '').trim()).filter(Boolean)))
                : [];
            const serverNow = window.firebase.firestore.FieldValue.serverTimestamp();
            const batch = firebaseDb.batch();
            let writeCount = 0;

            draws.forEach((draw, index) => {
                const normalizedNumbers = normalizeEntryNumbers(draw && draw.numbers);
                if (!normalizedNumbers.length) {
                    return;
                }
                const ref = firebaseDb.collection('draw_entries').doc();
                const strategy = draw && draw.strategy ? String(draw.strategy).trim() : '';
                batch.set(ref, {
                    round: Number(targetRound),
                    numbers: normalizedNumbers,
                    numbersKey: normalizedNumbers.join('-'),
                    setNo: Number(draw && draw.setNo ? draw.setNo : index + 1),
                    sourceMode,
                    strategy: strategy || null,
                    userType,
                    membershipTier,
                    uid: currentUser ? currentUser.uid : null,
                    guestTrackingId: userType === 'guest' ? guestTrackingId : null,
                    generationId,
                    ruleIds,
                    ruleCount: ruleIds.length,
                    createdAt: serverNow
                });
                writeCount += 1;
            });

            if (!writeCount) {
                return;
            }
            await batch.commit();
            loadMypageDrawHistory(true);
        } catch (error) {
            console.warn('번호 저장 실패(draw_entries)', error);
        }
    }

    function getHistoryOwnerKey() {
        if (isMember() && currentUser && currentUser.uid) {
            return `member:${currentUser.uid}`;
        }
        return `guest:${guestTrackingId || ''}`;
    }

    function getTimestampMillis(value) {
        if (!value) {
            return 0;
        }
        if (typeof value.toMillis === 'function') {
            return Number(value.toMillis()) || 0;
        }
        if (value.seconds != null) {
            return Number(value.seconds) * 1000 + Math.floor(Number(value.nanoseconds || 0) / 1000000);
        }
        const date = new Date(value);
        const millis = date.getTime();
        return Number.isFinite(millis) ? millis : 0;
    }

    function formatHistoryDateTime(value) {
        const millis = getTimestampMillis(value);
        if (!millis) {
            return '-';
        }
        const date = new Date(millis);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    async function loadMypageDrawHistory(force = false) {
        if (!mypageHistoryListEl) {
            return;
        }
        if (!firebaseDb) {
            mypageHistoryListEl.innerHTML = `
                <li>
                    <span class="info-label">Firebase 연결 후 이력을 확인할 수 있습니다.</span>
                    <strong>-</strong>
                </li>
            `;
            return;
        }
        const ownerKey = getHistoryOwnerKey();
        if (!force && mypageHistoryListEl.dataset.ownerKey === ownerKey && mypageHistoryListEl.dataset.loaded === 'true') {
            return;
        }
        mypageHistoryListEl.dataset.ownerKey = ownerKey;
        mypageHistoryListEl.dataset.loaded = 'false';
        mypageHistoryListEl.innerHTML = `
            <li>
                <span class="info-label">이력을 불러오는 중...</span>
                <strong>-</strong>
            </li>
        `;
        try {
            let query = null;
            if (isMember() && currentUser && currentUser.uid) {
                query = firebaseDb.collection('draw_entries').where('uid', '==', currentUser.uid);
            } else {
                if (!guestTrackingId) {
                    guestTrackingId = getOrCreateGuestTrackingId();
                }
                query = firebaseDb.collection('draw_entries').where('guestTrackingId', '==', guestTrackingId);
            }
            const snapshot = await query.get();
            const groupedMap = new Map();
            snapshot.docs.forEach(doc => {
                const data = doc.data() || {};
                const key = String(data.generationId || doc.id);
                const existing = groupedMap.get(key);
                if (!existing) {
                    groupedMap.set(key, {
                        generationId: key,
                        createdAt: data.createdAt || null,
                        sourceMode: data.sourceMode || 'self',
                        round: Number(data.round || 0),
                        setCount: 1
                    });
                    return;
                }
                existing.setCount += 1;
                if (getTimestampMillis(data.createdAt) > getTimestampMillis(existing.createdAt)) {
                    existing.createdAt = data.createdAt || existing.createdAt;
                }
            });
            const rows = Array.from(groupedMap.values())
                .sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt))
                .slice(0, 20);
            if (!rows.length) {
                mypageHistoryListEl.innerHTML = `
                    <li>
                        <span class="info-label">아직 활동이 없어요.</span>
                        <strong>첫 생성 후 표시</strong>
                    </li>
                `;
                if (mypageHistoryBadgeEl) {
                    mypageHistoryBadgeEl.textContent = '최근 20건';
                }
                mypageHistoryListEl.dataset.loaded = 'true';
                return;
            }
            mypageHistoryListEl.innerHTML = rows.map(row => {
                const when = formatHistoryDateTime(row.createdAt);
                const setCount = Number(row.setCount || 0) > 0 ? Number(row.setCount) : 1;
                const modeText = row.sourceMode === 'premium' ? '자동 추천' : '직접 선택';
                const roundText = Number(row.round || 0) > 0 ? `${Number(row.round)}회` : '-';
                return `
                    <li>
                        <span class="info-label">${when}</span>
                        <strong>${modeText} · ${roundText} · ${setCount}세트</strong>
                    </li>
                `;
            }).join('');
            if (mypageHistoryBadgeEl) {
                mypageHistoryBadgeEl.textContent = `최근 ${rows.length}건`;
            }
            mypageHistoryListEl.dataset.loaded = 'true';
        } catch (error) {
            console.warn('마이페이지 추첨 이력 로드 실패', error);
            mypageHistoryListEl.innerHTML = `
                <li>
                    <span class="info-label">불러오지 못했어요.</span>
                    <strong>다시 시도해 주세요</strong>
                </li>
            `;
        }
    }

    function setLastWeekDashboardFallback(message) {
        if (dashWinStatusEl) {
            dashWinStatusEl.textContent = message;
        }
        if (dashWinTotalGeneratedEl) {
            dashWinTotalGeneratedEl.textContent = '-';
        }
        if (dashWinTotalWinnersEl) {
            dashWinTotalWinnersEl.textContent = '-';
        }
        if (dashWinRateEl) {
            dashWinRateEl.textContent = '-';
        }
        Object.values(dashWinRankEls).forEach(el => {
            if (el) {
                el.textContent = '0';
            }
        });
    }

    function getRankNumberByTicket(numbers, winningNumbers, bonusNumber) {
        const winSet = new Set(winningNumbers);
        const matchCount = numbers.filter(value => winSet.has(value)).length;
        const bonusMatch = numbers.includes(bonusNumber);
        const rankLabel = getRank(matchCount, bonusMatch);
        if (rankLabel === '1등') {
            return 1;
        }
        if (rankLabel === '2등') {
            return 2;
        }
        if (rankLabel === '3등') {
            return 3;
        }
        if (rankLabel === '4등') {
            return 4;
        }
        if (rankLabel === '5등') {
            return 5;
        }
        return 0;
    }

    async function loadLastWeekWinDashboard(roundData, options = {}) {
        if (!dashWinStatusEl || !dashWinRoundLabelEl) {
            return;
        }
        if (!firebaseDb) {
            setLastWeekDashboardFallback('Firebase 연결 후 집계를 표시할 수 있습니다.');
            return;
        }
        if (!roundData || !Number.isFinite(Number(roundData.drwNo))) {
            setLastWeekDashboardFallback('최근 당첨 회차를 불러오는 중입니다.');
            return;
        }
        const roundNo = Number(roundData.drwNo);
        if (!options.force && lastWinDashboardRound === roundNo) {
            return;
        }
        lastWinDashboardRound = roundNo;
        dashWinRoundLabelEl.textContent = `지난주 ${roundNo}회`;
        dashWinStatusEl.textContent = `${roundNo}회 생성번호 당첨 집계를 계산 중입니다...`;
        try {
            const snapshot = await firebaseDb.collection('draw_entries').where('round', '==', roundNo).get();
            const winningNumbers = [
                Number(roundData.drwtNo1),
                Number(roundData.drwtNo2),
                Number(roundData.drwtNo3),
                Number(roundData.drwtNo4),
                Number(roundData.drwtNo5),
                Number(roundData.drwtNo6)
            ].filter(value => Number.isInteger(value) && value >= 1 && value <= 45);
            const bonusNumber = Number(roundData.bnusNo);
            if (winningNumbers.length !== 6 || !Number.isInteger(bonusNumber)) {
                setLastWeekDashboardFallback('당첨 번호 데이터가 완전하지 않아 집계할 수 없습니다.');
                return;
            }
            const rankCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            let totalGenerated = 0;
            let totalWinners = 0;
            snapshot.forEach(doc => {
                const data = doc.data() || {};
                const numbers = normalizeEntryNumbers(data.numbers);
                if (numbers.length !== 6) {
                    return;
                }
                totalGenerated += 1;
                const rankNo = getRankNumberByTicket(numbers, winningNumbers, bonusNumber);
                if (rankNo >= 1 && rankNo <= 5) {
                    rankCounts[rankNo] += 1;
                    totalWinners += 1;
                }
            });
            const winRate = totalGenerated > 0 ? (totalWinners / totalGenerated) * 100 : 0;
            if (dashWinTotalGeneratedEl) {
                dashWinTotalGeneratedEl.textContent = formatNumber(totalGenerated);
            }
            if (dashWinTotalWinnersEl) {
                dashWinTotalWinnersEl.textContent = formatNumber(totalWinners);
            }
            if (dashWinRateEl) {
                dashWinRateEl.textContent = `${winRate.toFixed(2)}%`;
            }
            Object.entries(rankCounts).forEach(([rank, count]) => {
                const el = dashWinRankEls[Number(rank)];
                if (el) {
                    el.textContent = formatNumber(count);
                }
            });
            dashWinStatusEl.textContent = totalGenerated
                ? `${roundNo}회 기준 ${formatNumber(totalGenerated)}세트 중 ${formatNumber(totalWinners)}세트가 5등 이상 당첨되었습니다.`
                : `${roundNo}회 기준 집계 대상 생성번호가 아직 없습니다.`;
        } catch (error) {
            console.warn('지난주 당첨 대시보드 집계 실패', error);
            setLastWeekDashboardFallback('집계 데이터 조회에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
    }

    function isPremiumMember() {
        if (!isMember()) {
            return false;
        }
        return getMembershipPlanMeta().id !== 'free';
    }

    function hasSeenWelcomeModal() {
        try {
            return Boolean(localStorage.getItem(ONBOARDING_SEEN_KEY));
        } catch (error) {
            console.warn('온보딩 표시 상태 조회 실패', error);
            return false;
        }
    }

    function rememberWelcomeModalSeen() {
        try {
            localStorage.setItem(ONBOARDING_SEEN_KEY, new Date().toISOString());
        } catch (error) {
            console.warn('온보딩 표시 상태 저장 실패', error);
        }
    }

    function closeWelcomeModal(options = {}) {
        const { remember = false } = options;
        if (welcomeModalTimer) {
            window.clearTimeout(welcomeModalTimer);
            welcomeModalTimer = 0;
        }
        if (remember) {
            rememberWelcomeModalSeen();
        }
        if (!welcomeModal) {
            return;
        }
        welcomeModal.classList.add('hidden');
    }

    function openWelcomeModal() {
        if (!welcomeModal || isMember() || hasSeenWelcomeModal()) {
            return;
        }
        closeAuthModal();
        welcomeModal.classList.remove('hidden');
    }

    function scheduleWelcomeModal() {
        if (!welcomeModal || isMember() || hasSeenWelcomeModal()) {
            return;
        }
        if (firebaseReady && !authStateResolved) {
            if (welcomeModalTimer) {
                window.clearTimeout(welcomeModalTimer);
            }
            welcomeModalTimer = window.setTimeout(() => {
                welcomeModalTimer = 0;
                scheduleWelcomeModal();
            }, 300);
            return;
        }
        if (welcomeModalTimer) {
            window.clearTimeout(welcomeModalTimer);
        }
        welcomeModalTimer = window.setTimeout(() => {
            welcomeModalTimer = 0;
            if (isMember() || hasSeenWelcomeModal()) {
                return;
            }
            openWelcomeModal();
        }, 1200);
    }

    function setDrawServiceMode(mode) {
        const nextMode = mode === 'premium' ? 'premium' : 'self';
        if (drawTabPanel) {
            drawTabPanel.setAttribute('data-service-mode', nextMode);
        }
        drawServiceButtons.forEach(button => {
            const selected = button.dataset.drawService === nextMode;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-selected', String(selected));
        });
        drawModeOnlyPanels.forEach(panel => {
            const only = panel.dataset.drawModeOnly === 'premium' ? 'premium' : 'self';
            panel.hidden = only !== nextMode;
        });
        if (nextMode !== 'self') {
            setRulePickerOpen(false);
        }
        updatePremiumMembershipUi();
        scheduleDrawHorizontalWidthSync();
    }

    function updatePremiumMembershipUi() {
        const plan = getMembershipPlanMeta();
        const premium = isPremiumMember();
        if (premiumBadgeEl) {
            premiumBadgeEl.textContent = premium ? plan.label : 'FREE';
            premiumBadgeEl.classList.toggle('is-premium', premium);
        }
        if (premiumLockEl) {
            premiumLockEl.classList.toggle('is-hidden', premium);
        }
        if (premiumGenerateBtn) {
            premiumGenerateBtn.disabled = !premium;
        }
        if (premiumUpgradeBtn) {
            if (!isMember()) {
                premiumUpgradeBtn.textContent = '가입/로그인 후 시작하기';
            } else if (premium) {
                premiumUpgradeBtn.textContent = `${plan.label} 이용중`;
            } else {
                premiumUpgradeBtn.textContent = '플랜 선택하기';
            }
        }
        if (!premium) {
            lastPremiumDraws = [];
            setPremiumCopyButtonState(false);
            if (premiumNumbersContainer) {
                premiumNumbersContainer.innerHTML = '<div class="premium-empty-state">아직 추천번호가 없습니다. 플랜을 활성화한 뒤 이번 회차 추천을 받아보세요.</div>';
            }
            if (!lastPremiumDraws.length) {
                updatePremiumCopyStatus('월정액 이용권 활성화 시 추천번호를 제공합니다.');
            }
        } else if (!lastPremiumDraws.length) {
            updatePremiumCopyStatus(`${plan.label} 플랜 활성화 완료. 추천번호 받기로 이번 회차 세트를 생성해 보세요.`);
        }
        updateDrawContextUi();
        updateDashboardSummaryUi();
        updateMypageSummaryUi();
    }

    async function setMembershipTier(tier) {
        const nextTier = ['starter', 'standard', 'master', 'premium'].includes(String(tier || '').toLowerCase())
            ? String(tier).toLowerCase()
            : 'free';
        localStorage.setItem('lotto_membership_tier', nextTier);
        if (currentUserProfile) {
            currentUserProfile = {
                ...currentUserProfile,
                membershipTier: nextTier,
                subscriptionUpdatedAt: new Date().toISOString()
            };
        }
        if (firebaseDb && currentUser) {
            try {
                await firebaseDb.collection('users').doc(currentUser.uid).set({
                    membershipTier: nextTier,
                    subscriptionStatus: nextTier === 'free' ? 'inactive' : 'active',
                    subscriptionUpdatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                await ensureUserProfile();
            } catch (error) {
                console.warn('멤버십 상태 저장 실패', error);
            }
        }
        updatePremiumMembershipUi();
    }

    function generatePremiumRecommendations(count) {
        const drawCount = Math.max(1, Number(count) || 5);
        const strategyOrder = ['balanced', 'expanded', 'sum_balance', 'digit_focus', 'light', 'aggressive'];
        const draws = [];
        for (let i = 0; i < drawCount; i += 1) {
            const strategy = strategyOrder[i % strategyOrder.length];
            const ids = PRESETS[strategy] || [];
            const activeRules = RULES.filter(rule => ids.includes(rule.id));
            let numbers = generateNumbersWithRules(activeRules);
            if (!numbers.length) {
                numbers = generateUniqueNumbers(6, 1, 45).sort((a, b) => a - b);
            }
            draws.push({
                setNo: i + 1,
                strategy: PRESETS_LABEL[strategy] || strategy,
                numbers
            });
        }
        return draws;
    }

    function renderPremiumNumbers(draws) {
        if (!premiumNumbersContainer) {
            return;
        }
        premiumNumbersContainer.innerHTML = '';
        lastPremiumDraws = [];
        draws.forEach(item => {
            if (!Array.isArray(item.numbers) || item.numbers.length !== 6) {
                return;
            }
            const row = document.createElement('div');
            row.className = 'premium-number-row';
            const meta = document.createElement('div');
            meta.className = 'premium-row-meta';
            meta.innerHTML = `<strong>추천 ${item.setNo}</strong><span>${escapeHtml(item.strategy)}</span>`;
            const balls = document.createElement('div');
            balls.className = 'premium-number-balls';
            item.numbers.forEach(number => {
                const ball = document.createElement('span');
                ball.className = 'premium-number-ball';
                ball.textContent = String(number);
                balls.appendChild(ball);
            });
            const tag = document.createElement('span');
            tag.className = 'premium-row-tag';
            tag.textContent = 'CURATED';
            row.appendChild(meta);
            row.appendChild(balls);
            row.appendChild(tag);
            premiumNumbersContainer.appendChild(row);
            lastPremiumDraws.push({
                setNo: item.setNo,
                numbers: [...item.numbers]
            });
        });
        setPremiumCopyButtonState(lastPremiumDraws.length > 0);
        if (lastPremiumDraws.length) {
            recordGenerationStats({
                sourceMode: 'premium',
                setCount: lastPremiumDraws.length,
                round: getTargetRoundForEntries()
            });
            persistGeneratedEntries(draws, {
                sourceMode: 'premium'
            });
        }
    }

    function setPremiumCopyButtonState(enabled) {
        if (!premiumCopyAllBtn) {
            return;
        }
        premiumCopyAllBtn.disabled = !enabled;
    }

    function updatePremiumCopyStatus(message, isError = false) {
        if (!premiumCopyStatusEl) {
            return;
        }
        premiumCopyStatusEl.textContent = message;
        premiumCopyStatusEl.classList.toggle('is-error', Boolean(isError));
    }

    async function copyAllPremiumNumbers() {
        if (!lastPremiumDraws.length) {
            updatePremiumCopyStatus('복사할 추천번호가 없습니다. 먼저 추천번호를 받아보세요.', true);
            setPremiumCopyButtonState(false);
            return;
        }
        const text = lastPremiumDraws
            .map(item => `추천 ${item.setNo}: ${item.numbers.join(', ')}`)
            .join('\n');
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.top = '-9999px';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                const copied = document.execCommand('copy');
                document.body.removeChild(textarea);
                if (!copied) {
                    throw new Error('execCommand copy failed');
                }
            }
            updatePremiumCopyStatus(`추천번호 ${lastPremiumDraws.length}세트를 복사했습니다.`);
        } catch (error) {
            console.error('추천번호 전체복사 실패', error);
            updatePremiumCopyStatus('복사에 실패했습니다. 다시 시도해 주세요.', true);
        }
    }

    function initFirebase() {
        if (typeof window.firebase === 'undefined') {
            authStateResolved = true;
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = 'Firebase SDK 로딩 실패: 네트워크 또는 스크립트 로딩 상태를 확인하세요.';
            }
            return;
        }

        const config = window.LOTTO_FIREBASE_CONFIG || {};
        if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
            authStateResolved = true;
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = 'firebase-config.js에 Firebase 웹 앱 설정값을 입력해 주세요.';
            }
            return;
        }

        try {
            if (!window.firebase.apps.length) {
                window.firebase.initializeApp(config);
            }
            firebaseAuth = window.firebase.auth();
            firebaseDb = window.firebase.firestore();
            firebaseReady = true;
            firebaseAuth.onAuthStateChanged(async user => {
                authStateResolved = true;
                currentUser = user || null;
                try {
                    if (currentUser) {
                        await ensureUserProfile();
                    } else {
                        currentUserProfile = null;
                    }
                } catch (error) {
                    console.error('프로필 로드 실패', error);
                    if (nicknameStatusEl) {
                        nicknameStatusEl.textContent = '프로필을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.';
                    }
                }
                updateAuthUi();
                refreshGuestLimitMessage();
                loadMypageDrawHistory(true);
                if (currentWeeklyData) {
                    loadLastWeekWinDashboard(currentWeeklyData, { force: true });
                }
            });
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = '로그인 준비가 끝났어요. 바로 계속할 수 있어요.';
            }
        } catch (error) {
            firebaseReady = false;
            authStateResolved = true;
            console.error('Firebase 초기화 실패', error);
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = '로그인 준비에 실패했어요. 설정을 다시 확인해 주세요.';
            }
        }
        updateAuthUi();
    }

    function isMember() {
        return Boolean(currentUser);
    }

    function updateAuthUi() {
        const member = isMember();
        if (member) {
            closeWelcomeModal();
        }
        authLogoutButtons.forEach(button => {
            button.disabled = !member;
            button.hidden = !member;
        });
        authEntryLinks.forEach(link => {
            link.hidden = member;
        });
        if (nicknameOpenModalBtn) {
            nicknameOpenModalBtn.disabled = !member || nicknameSaveInFlight;
        }
        if (nicknameModalInputEl) {
            nicknameModalInputEl.disabled = !member || nicknameSaveInFlight;
        }
        if (nicknameModalSaveBtn) {
            nicknameModalSaveBtn.disabled = !member || nicknameSaveInFlight;
        }
        if (nicknameModalCancelBtn) {
            nicknameModalCancelBtn.disabled = nicknameSaveInFlight;
        }
        if (!member) {
            closeNicknameModal(true);
        }
        renderNicknameUi();
        updatePremiumMembershipUi();
        loadMypageDrawHistory();
        if (!firebaseAuthStatusEl) {
            return;
        }
        if (!firebaseReady) {
            return;
        }
        if (member) {
            const nickname = currentUserProfile && currentUserProfile.nickname ? currentUserProfile.nickname : '';
            if (nickname) {
                firebaseAuthStatusEl.textContent = `가입 완료(로그인): ${nickname}`;
            } else {
                const displayName = currentUser.displayName || currentUser.email || currentUser.uid;
                firebaseAuthStatusEl.textContent = `가입 완료(로그인): ${displayName}`;
            }
            return;
        }
        firebaseAuthStatusEl.textContent = '로그인하면 저장한 정보가 바로 이어져요.';
    }

    async function signInWithGoogle() {
        if (!firebaseReady || !firebaseAuth) {
            updateRulesStatus('Firebase 설정이 필요합니다. firebase-config.js 값을 먼저 입력하세요.');
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = 'Firebase 설정 미완료';
            }
            return false;
        }
        const provider = new window.firebase.auth.GoogleAuthProvider();
        try {
            await firebaseAuth.signInWithPopup(provider);
            updateRulesStatus('구글 가입/로그인 성공');
            return true;
        } catch (error) {
            console.error('구글 로그인 실패', error);
            updateRulesStatus('구글 로그인 실패: Authorized domains와 Provider 활성화 상태를 확인하세요.');
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = `로그인 실패: ${error.code || 'unknown_error'}`;
            }
            return false;
        }
    }

    async function signOutFirebaseUser() {
        if (!firebaseReady || !firebaseAuth) {
            return;
        }
        try {
            await firebaseAuth.signOut();
            currentUserProfile = null;
            updateRulesStatus('로그아웃되었습니다.');
            showActionPopup('로그아웃되었습니다.');
        } catch (error) {
            console.error('로그아웃 실패', error);
            updateRulesStatus('로그아웃 실패');
            showActionPopup('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
    }

    function showActionPopup(message) {
        if (!appToastEl) {
            window.alert(message);
            return;
        }
        appToastEl.classList.remove('is-visible');
        void appToastEl.offsetWidth;
        appToastEl.textContent = String(message || '');
        appToastEl.hidden = false;
        appToastEl.classList.add('is-visible');
        if (toastHideTimer) {
            window.clearTimeout(toastHideTimer);
        }
        toastHideTimer = window.setTimeout(() => {
            appToastEl.classList.remove('is-visible');
            appToastEl.hidden = true;
        }, 2600);
    }

    function openNicknameModal() {
        if (!isMember()) {
            openAuthModal();
            return;
        }
        if (!nicknameModal) {
            return;
        }
        nicknameModal.classList.remove('hidden');
        if (nicknameModalInputEl) {
            nicknameModalInputEl.value = '';
            requestAnimationFrame(() => nicknameModalInputEl.focus());
        }
    }

    function closeNicknameModal(force = false) {
        if (!nicknameModal || (nicknameSaveInFlight && !force)) {
            return;
        }
        nicknameModal.classList.add('hidden');
        if (nicknameModalInputEl) {
            nicknameModalInputEl.value = '';
        }
    }

    async function submitNicknameChangeFromModal() {
        if (!nicknameModalInputEl) {
            return;
        }
        await changeNickname(nicknameModalInputEl.value);
    }

    async function ensureUserProfile() {
        if (!firebaseDb || !currentUser) {
            return;
        }
        const profileRef = firebaseDb.collection('users').doc(currentUser.uid);
        const nowMonthKey = getMonthKey(new Date());
        const serverNow = window.firebase.firestore.FieldValue.serverTimestamp();
        const snap = await profileRef.get();

        if (!snap.exists) {
            const nickname = createRandomNickname8();
            const initialProfile = {
                uid: currentUser.uid,
                email: currentUser.email || '',
                nickname,
                membershipTier: getMembershipTier() || 'free',
                createdAt: serverNow,
                updatedAt: serverNow,
                nicknameUpdatedAt: serverNow,
                nicknameChangeMonth: nowMonthKey,
                nicknameChangeCount: 0
            };
            await profileRef.set(initialProfile);
            currentUserProfile = initialProfile;
            if (nicknameStatusEl) {
                nicknameStatusEl.textContent = `가입이 완료됐어요. 자동 닉네임 '${nickname}'이 만들어졌습니다.`;
            }
            return;
        }

        const profile = snap.data() || {};
        const updates = {};
        if (!profile.nickname) {
            updates.nickname = createRandomNickname8();
            updates.nicknameUpdatedAt = serverNow;
        }
        if (!profile.nicknameChangeMonth || profile.nicknameChangeMonth !== nowMonthKey) {
            updates.nicknameChangeMonth = nowMonthKey;
            updates.nicknameChangeCount = 0;
        }
        if (Object.keys(updates).length) {
            updates.updatedAt = serverNow;
            await profileRef.update(updates);
        }
        currentUserProfile = { ...profile, ...updates };
    }

    function renderNicknameUi() {
        const member = isMember();
        if (mypageAuthBadgeEl) {
            mypageAuthBadgeEl.textContent = member ? '로그인됨' : '미로그인';
        }
        if (mypageNicknameDisplayEl) {
            if (!member) {
                mypageNicknameDisplayEl.textContent = '첫 로그인 후 자동으로 정해져요';
            } else if (currentUserProfile && currentUserProfile.nickname) {
                mypageNicknameDisplayEl.textContent = currentUserProfile.nickname;
            } else {
                mypageNicknameDisplayEl.textContent = '닉네임 불러오는 중...';
            }
        }
        const remaining = getNicknameRemainingChanges();
        if (nicknameStatusEl && !member) {
            nicknameStatusEl.textContent = '첫 로그인하면 닉네임이 자동으로 만들어지고, 이후 월 2번까지 바꿀 수 있어요.';
        } else if (nicknameStatusEl && member) {
            nicknameStatusEl.textContent = `이번 달 닉네임 변경 가능 횟수는 ${remaining}회 남았어요.`;
        }
    }

    async function changeNickname(rawNickname) {
        if (!isMember() || !firebaseDb || !currentUser) {
            return;
        }
        const nextNickname = String(rawNickname || '').trim();
        if (!nextNickname) {
            showActionPopup('변경할 닉네임을 입력해 주세요.');
            return;
        }
        if (nextNickname.length < 2 || nextNickname.length > 20) {
            showActionPopup('닉네임은 2자 이상 20자 이하로 입력해 주세요.');
            return;
        }
        if (currentUserProfile && currentUserProfile.nickname === nextNickname) {
            showActionPopup('현재 닉네임과 동일합니다.');
            return;
        }
        nicknameSaveInFlight = true;
        updateAuthUi();
        const profileRef = firebaseDb.collection('users').doc(currentUser.uid);
        const currentMonth = getMonthKey(new Date());
        const serverNow = window.firebase.firestore.FieldValue.serverTimestamp();
        try {
            await firebaseDb.runTransaction(async transaction => {
                const doc = await transaction.get(profileRef);
                if (!doc.exists) {
                    throw new Error('profile_not_found');
                }
                const data = doc.data() || {};
                let month = data.nicknameChangeMonth || currentMonth;
                let count = Number(data.nicknameChangeCount || 0);
                if (month !== currentMonth) {
                    month = currentMonth;
                    count = 0;
                }
                if (count >= 2) {
                    throw new Error('nickname_limit_exceeded');
                }
                transaction.update(profileRef, {
                    nickname: nextNickname,
                    nicknameUpdatedAt: serverNow,
                    updatedAt: serverNow,
                    nicknameChangeMonth: month,
                    nicknameChangeCount: count + 1
                });
            });
            await ensureUserProfile();
            closeNicknameModal(true);
            renderNicknameUi();
            showActionPopup('닉네임이 변경되었습니다.');
        } catch (error) {
            console.error('닉네임 변경 실패', error);
            if (String(error && error.message) === 'nickname_limit_exceeded') {
                showActionPopup('닉네임은 월 최대 2회만 변경할 수 있습니다.');
            } else {
                showActionPopup('닉네임 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.');
            }
        } finally {
            nicknameSaveInFlight = false;
            updateAuthUi();
        }
    }

    function getMonthKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    }

    function getNicknameRemainingChanges() {
        if (!currentUserProfile) {
            return 2;
        }
        const currentMonth = getMonthKey(new Date());
        if (currentUserProfile.nicknameChangeMonth !== currentMonth) {
            return 2;
        }
        const used = Number(currentUserProfile.nicknameChangeCount || 0);
        return Math.max(0, 2 - used);
    }

    function createRandomNickname8() {
        const parts = ['행운', '반짝', '폭죽', '달빛', '행성', '구름', '번개', '호랑', '토끼', '고양', '사자', '펭귄', '비밀', '요정', '탐험', '모험', '별빛', '초코', '포도', '사탕'];
        let nickname = '';
        for (let i = 0; i < 4; i += 1) {
            nickname += parts[Math.floor(Math.random() * parts.length)];
        }
        return nickname.slice(0, 8);
    }

    function refreshGuestLimitMessage() {
        if (guestLimitEl) {
            canGuestGenerate();
        }
    }

    function canGuestGenerate() {
        if (!guestLimitEl) {
            return true;
        }
        const drawCount = parseInt(drawCountSelect.value, 10);
        if (isMember()) {
            guestLimitEl.textContent = '가입 완료(로그인) 상태: 제한 없이 이용 가능합니다.';
            if (guestBannerEl) {
                guestBannerEl.textContent = '가입 완료(로그인) 상태입니다. 모든 기능을 제한 없이 이용할 수 있습니다.';
            }
            return true;
        }
        const limit = 50;
        const todayKey = getTodayKey();
        const countKey = `guest_count_${todayKey}`;
        const current = Number(localStorage.getItem(countKey) || 0);
        if (drawCount > 1) {
            guestLimitEl.textContent = '미로그인 사용자는 1회 1세트만 가능합니다. 로그인 후 이용해 주세요.';
            if (guestBannerEl) {
                guestBannerEl.textContent = '미로그인 제한으로 1회 1세트만 가능합니다. 로그인하면 가입 완료로 처리되어 제한이 해제됩니다.';
            }
            return false;
        }
        if (current >= limit) {
            guestLimitEl.textContent = '미로그인 사용자 하루 50회 제한을 초과했습니다. 로그인 후 이용해 주세요.';
            if (guestBannerEl) {
                guestBannerEl.textContent = '미로그인 사용자 하루 50회 제한을 초과했습니다. 로그인 후 이용해 주세요.';
            }
            return false;
        }
        guestLimitEl.textContent = `미로그인 사용자 남은 횟수: ${limit - current}회 (1회 1세트)`;
        if (guestBannerEl) {
            guestBannerEl.textContent = `미로그인 사용자 남은 횟수: ${limit - current}회 (1회 1세트)`;
        }
        return true;
    }

    function incrementGuestCount() {
        if (!guestLimitEl) {
            return;
        }
        if (isMember()) {
            return;
        }
        const todayKey = getTodayKey();
        const countKey = `guest_count_${todayKey}`;
        const current = Number(localStorage.getItem(countKey) || 0);
        const next = current + 1;
        localStorage.setItem(countKey, String(next));
        guestLimitEl.textContent = `미로그인 사용자 남은 횟수: ${Math.max(0, 50 - next)}회 (1회 1세트)`;
        if (guestBannerEl) {
            guestBannerEl.textContent = `미로그인 사용자 남은 횟수: ${Math.max(0, 50 - next)}회 (1회 1세트)`;
        }
    }

    function openAuthModal() {
        if (!authModal) {
            return;
        }
        closeWelcomeModal({ remember: true });
        authModal.classList.remove('hidden');
    }

    function closeAuthModal() {
        if (!authModal) {
            return;
        }
        authModal.classList.add('hidden');
    }

    function getTodayKey() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}${mm}${dd}`;
    }

    function getViewportWidth() {
        const visualWidth = Number(window.visualViewport && window.visualViewport.width);
        if (Number.isFinite(visualWidth) && visualWidth > 0) {
            return visualWidth;
        }
        const innerWidth = Number(window.innerWidth);
        if (Number.isFinite(innerWidth) && innerWidth > 0) {
            return innerWidth;
        }
        return Number(document.documentElement && document.documentElement.clientWidth) || 0;
    }

    function scheduleDrawHorizontalWidthSync() {
        if (drawWidthSyncRafId) {
            window.cancelAnimationFrame(drawWidthSyncRafId);
        }
        drawWidthSyncRafId = window.requestAnimationFrame(() => {
            drawWidthSyncRafId = 0;
            const viewportWidth = Math.floor(getViewportWidth());
            syncDrawFlowLayout(viewportWidth);
            syncDrawHorizontalCardWidths(viewportWidth);
            syncDrawSelectionDockLayout(viewportWidth);
        });
    }

    function syncDrawFlowLayout(forcedViewportWidth) {
        if (!scenarioPanel || !slotPanel || !drawSelectedBoardEl || !rulePickerPanel || !drawStudioBodyEl) {
            return;
        }
        if (
            drawSelectedBoardEl.parentElement === slotPanel.parentElement
            && drawSelectedBoardEl.nextElementSibling !== slotPanel
        ) {
            drawSelectedBoardEl.insertAdjacentElement('afterend', slotPanel);
        }
        const viewportWidth = Number.isFinite(forcedViewportWidth) && forcedViewportWidth > 0
            ? forcedViewportWidth
            : Math.floor(getViewportWidth());
        if (viewportWidth <= 960) {
            if (scenarioPanel.nextElementSibling !== rulePickerPanel) {
                scenarioPanel.insertAdjacentElement('afterend', rulePickerPanel);
            }
            return;
        }
        if (drawStudioBodyEl.nextElementSibling !== rulePickerPanel) {
            drawStudioBodyEl.insertAdjacentElement('afterend', rulePickerPanel);
        }
    }

    function resetDrawSelectionDockLayout() {
        if (drawTabPanel) {
            drawTabPanel.style.removeProperty('--draw-dock-width');
            drawTabPanel.style.removeProperty('--draw-dock-top');
        }
        if (drawSelectionDockPlaceholderEl) {
            drawSelectionDockPlaceholderEl.style.removeProperty('width');
            drawSelectionDockPlaceholderEl.style.removeProperty('height');
        }
    }

    function syncDrawSelectionDockLayout(forcedViewportWidth) {
        if (!drawSelectionDockEl || !drawTabPanel) {
            return;
        }
        if (siteHeaderEl) {
            const headerHeight = Math.ceil(siteHeaderEl.getBoundingClientRect().height || 0);
            drawTabPanel.style.setProperty('--site-header-height', `${headerHeight}px`);
            const pageScrollTop = Math.max(
                Number(window.scrollY) || 0,
                Number(document.documentElement && document.documentElement.scrollTop) || 0
            );
            const dockTop = pageScrollTop > Math.max(24, headerHeight - 4) ? 0 : headerHeight;
            drawTabPanel.style.setProperty('--draw-dock-top', `${dockTop}px`);
        }
        const viewportWidth = Number.isFinite(forcedViewportWidth) && forcedViewportWidth > 0
            ? forcedViewportWidth
            : Math.floor(getViewportWidth());
        if (viewportWidth <= 768) {
            if (drawSelectionDockPlaceholderEl) {
                drawSelectionDockPlaceholderEl.style.removeProperty('width');
                drawSelectionDockPlaceholderEl.style.height = '0px';
            }
            if (drawTabPanel) {
                drawTabPanel.style.removeProperty('--draw-dock-width');
            }
            return;
        }
        if (viewportWidth <= 960 || !drawSelectedBoardEl) {
            resetDrawSelectionDockLayout();
            return;
        }
        const boardRect = drawSelectedBoardEl.getBoundingClientRect();
        if (boardRect.width <= 0 || boardRect.height <= 0) {
            resetDrawSelectionDockLayout();
            return;
        }
        const dockWidth = Math.round(boardRect.width);
        drawTabPanel.style.setProperty('--draw-dock-width', `${dockWidth}px`);
        if (drawSelectionDockPlaceholderEl) {
            drawSelectionDockPlaceholderEl.style.width = `${dockWidth}px`;
            drawSelectionDockPlaceholderEl.style.height = '0px';
        }
    }

    function syncDrawHorizontalCardWidths(forcedViewportWidth) {
        if (!drawTabPanel || !drawHorizontalTracks.length) {
            return;
        }
        const viewportWidth = Number.isFinite(forcedViewportWidth) && forcedViewportWidth > 0
            ? forcedViewportWidth
            : Math.floor(getViewportWidth());
        if (!viewportWidth) {
            return;
        }
        drawTabPanel.style.setProperty('--draw-viewport-width', `${viewportWidth}px`);
        const mobile = viewportWidth <= 960;
        if (!mobile) {
            drawHorizontalTracks.forEach(track => {
                track.style.removeProperty('--draw-card-width');
                track.style.removeProperty('--draw-track-width');
            });
            return;
        }
        const narrowMobile = viewportWidth <= 640;
        const maxCardWidth = narrowMobile ? 250 : 280;
        const sideGap = narrowMobile ? 10 : 12;
        const minCardWidth = 180;
        drawHorizontalTracks.forEach(track => {
            const trackWidth = Math.floor(track.clientWidth || track.getBoundingClientRect().width || viewportWidth);
            if (!trackWidth) {
                return;
            }
            const cardWidth = Math.max(minCardWidth, Math.min(maxCardWidth, trackWidth - sideGap));
            track.style.setProperty('--draw-track-width', `${trackWidth}px`);
            track.style.setProperty('--draw-card-width', `${cardWidth}px`);
        });
    }

    function escapeHtml(value) {
        return String(value || '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    async function startQrScanner() {
        if (!qrVideoEl || !qrStatusEl) {
            return;
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            qrStatusEl.textContent = '현재 브라우저에서는 카메라 스캔을 지원하지 않습니다.';
            return;
        }
        if (qrStream) {
            qrStatusEl.textContent = 'QR 스캔이 이미 실행 중입니다. 코드를 프레임 안에 맞춰 주세요.';
            return;
        }
        try {
            qrStatusEl.textContent = '카메라를 준비하는 중입니다. 권한 요청을 허용해 주세요.';
            qrResultBadgeEl.textContent = '스캔 중';
            qrResultBadgeEl.classList.remove('muted');
            qrStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });
            qrVideoEl.srcObject = qrStream;
            await qrVideoEl.play();
            qrStatusEl.textContent = 'QR 코드를 프레임 중앙에 맞춰 주세요.';
            qrLastPayload = '';
            qrLastNumbers = [];
            qrLastMatchedRound = null;
            runQrScanLoop();
        } catch (error) {
            logProxyError('startQrScanner', error);
            qrResultBadgeEl.textContent = '오류';
            qrResultBadgeEl.classList.add('muted');
            qrStatusEl.textContent = '카메라를 열지 못했습니다. 브라우저의 카메라 권한을 확인해 주세요.';
        }
    }

    function stopQrScanner(statusMessage = 'QR 스캔이 중지되었습니다.') {
        if (qrScanRafId) {
            window.cancelAnimationFrame(qrScanRafId);
            qrScanRafId = null;
        }
        if (qrVideoEl) {
            qrVideoEl.pause();
            qrVideoEl.srcObject = null;
        }
        if (qrStream) {
            qrStream.getTracks().forEach(track => track.stop());
            qrStream = null;
        }
        if (qrStatusEl) {
            qrStatusEl.textContent = statusMessage;
        }
        if (qrResultBadgeEl) {
            qrResultBadgeEl.textContent = '대기 중';
            qrResultBadgeEl.classList.add('muted');
        }
    }

    function runQrScanLoop() {
        if (!qrVideoEl || !qrCanvasEl || !qrStream) {
            return;
        }
        qrScanRafId = window.requestAnimationFrame(async () => {
            if (!qrVideoEl.videoWidth || !qrVideoEl.videoHeight) {
                runQrScanLoop();
                return;
            }
            qrCanvasEl.width = qrVideoEl.videoWidth;
            qrCanvasEl.height = qrVideoEl.videoHeight;
            if (!qrCanvasCtx) {
                qrCanvasCtx = qrCanvasEl.getContext('2d', { willReadFrequently: true });
            }
            if (!qrCanvasCtx) {
                runQrScanLoop();
                return;
            }
            qrCanvasCtx.drawImage(qrVideoEl, 0, 0, qrCanvasEl.width, qrCanvasEl.height);
            const payload = await decodeQrFromCanvas();
            if (payload && payload !== qrLastPayload) {
                qrLastPayload = payload;
                await processDecodedQr(payload);
            }
            runQrScanLoop();
        });
    }

    async function decodeQrFromCanvas() {
        if (!qrCanvasEl) {
            return '';
        }
        if (!qrBarcodeDetector && 'BarcodeDetector' in window) {
            try {
                qrBarcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
            } catch {
                qrBarcodeDetector = null;
            }
        }
        if (qrBarcodeDetector) {
            try {
                const codes = await qrBarcodeDetector.detect(qrCanvasEl);
                if (codes && codes.length && codes[0].rawValue) {
                    return String(codes[0].rawValue);
                }
            } catch {
                // ignore and try fallback
            }
        }
        if (typeof window.jsQR === 'function' && qrCanvasCtx) {
            const imageData = qrCanvasCtx.getImageData(0, 0, qrCanvasEl.width, qrCanvasEl.height);
            const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert'
            });
            if (code && code.data) {
                return String(code.data);
            }
        }
        return '';
    }

    async function processDecodedQr(payload) {
        if (!qrStatusEl || !qrPayloadEl || !qrTicketNumbersEl || !qrMatchResultEl) {
            return;
        }
        qrPayloadEl.textContent = payload || '-';
        qrStatusEl.textContent = 'QR을 인식했습니다. 당첨번호를 비교 중입니다.';
        const numbers = extractTicketNumbersFromQr(payload);
        qrLastNumbers = numbers.slice();
        renderQrNumbers(numbers);

        if (numbers.length < 6) {
            qrLastMatchedRound = null;
            qrMatchResultEl.textContent = 'QR에서 로또 번호 6개를 인식하지 못했습니다. QR을 가까이 비추고 다시 스캔해 주세요.';
            qrResultBadgeEl.textContent = '재시도';
            qrResultBadgeEl.classList.remove('muted');
            return;
        }

        const roundHint = extractRoundHintFromQr(payload);
        let drawData = currentWeeklyData;
        if (roundHint && Number.isFinite(roundHint)) {
            try {
                const hinted = await fetchDrawData(roundHint);
                if (hinted && hinted.returnValue === 'success') {
                    drawData = hinted;
                }
            } catch (error) {
                logProxyError('qrRoundHint', error, { roundHint });
            }
        }
        if (!drawData || drawData.returnValue !== 'success') {
            qrLastMatchedRound = null;
            qrMatchResultEl.textContent = '비교할 회차 데이터를 아직 준비하지 못했습니다. 회차를 불러온 뒤 다시 스캔해 주세요.';
            qrResultBadgeEl.textContent = '대기';
            qrResultBadgeEl.classList.add('muted');
            return;
        }

        const winning = new Set([
            drawData.drwtNo1,
            drawData.drwtNo2,
            drawData.drwtNo3,
            drawData.drwtNo4,
            drawData.drwtNo5,
            drawData.drwtNo6
        ].map(Number));
        const matchCount = numbers.filter(number => winning.has(number)).length;
        const bonusMatch = numbers.includes(Number(drawData.bnusNo));
        const rank = getRank(matchCount, bonusMatch);
        const roundLabel = `${drawData.drwNo}회`;
        qrLastMatchedRound = Number(drawData.drwNo);
        qrMatchResultEl.textContent = `${roundLabel} 기준 일치 ${matchCount}개${bonusMatch ? ' + 보너스' : ''} → ${rank}`;
        qrResultBadgeEl.textContent = matchCount >= 3 ? '확인 완료' : '미당첨';
        qrResultBadgeEl.classList.remove('muted');
        qrStatusEl.textContent = '스캔이 완료되었습니다. 아래 버튼으로 다음 동작을 선택하세요.';
    }

    function extractTicketNumbersFromQr(payload) {
        const matches = String(payload || '').match(/\d+/g) || [];
        const unique = [];
        matches.forEach(token => {
            const value = Number(token);
            if (!Number.isInteger(value) || value < 1 || value > 45) {
                return;
            }
            if (!unique.includes(value)) {
                unique.push(value);
            }
        });
        if (unique.length < 6) {
            return [];
        }
        return unique.slice(0, 6).sort((a, b) => a - b);
    }

    function extractRoundHintFromQr(payload) {
        const text = String(payload || '');
        try {
            const parsed = new URL(text);
            const queryRound = Number(parsed.searchParams.get('drwNo') || parsed.searchParams.get('round'));
            if (Number.isInteger(queryRound) && queryRound > 0) {
                return queryRound;
            }
        } catch {
            // not a URL
        }
        const match = text.match(/(?:drwNo|round|회차)\D{0,3}(\d{1,4})/i);
        if (!match) {
            return null;
        }
        const round = Number(match[1]);
        return Number.isInteger(round) && round > 0 ? round : null;
    }

    function renderQrNumbers(numbers) {
        if (!qrTicketNumbersEl) {
            return;
        }
        if (!numbers || !numbers.length) {
            qrTicketNumbersEl.textContent = '-';
            return;
        }
        qrTicketNumbersEl.innerHTML = '';
        numbers.forEach(number => {
            const chip = document.createElement('span');
            chip.className = 'qr-num-chip';
            chip.textContent = String(number);
            qrTicketNumbersEl.appendChild(chip);
        });
    }

    function syncMenuState(open) {
        if (!menuToggle || !mobileMenu) {
            return;
        }
        body.classList.toggle('menu-open', open);
        menuToggle.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
        mobileMenu.setAttribute('aria-hidden', String(!open));
        if (menuToggleText) {
            menuToggleText.textContent = open ? '닫기' : '메뉴';
        }
    }

    function syncNavTabLinks(activeTabId) {
        navTabLinks.forEach(link => {
            const active = String(link.dataset.tabLink || '') === String(activeTabId || '');
            link.classList.toggle('is-active', active);
            if (active) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function getCurrentActiveTabId() {
        const activeButton = tabButtons.find(button =>
            button.classList.contains('is-active') || button.getAttribute('aria-selected') === 'true'
        );
        return activeButton ? String(activeButton.dataset.tab || 'dashboard') : 'dashboard';
    }

    async function fetchLatestDraw() {
        const hasWeeklyUi = Boolean(
            weeklyLatestRoundEl ||
            weeklyThisRoundEl ||
            weeklyExpectedAmountEl ||
            weeklyLatestNumbers.some(Boolean)
        );
        if (!hasWeeklyUi) {
            return;
        }
        if (weeklyStatusEl) {
            weeklyStatusEl.textContent = '최신 회차 데이터를 확인하고 있습니다. 잠시만 기다려 주세요.';
        }

        const cached = getCachedWeekly();
        let hasCached = false;
        if (cached && cached.data) {
            renderWeeklyData(cached.data, { cached: true });
            hasCached = true;
        }

        const estimatedRound = estimateLatestRound();
        latestAvailableRound = estimatedRound;
        if (weeklyThisRoundEl && !weeklyThisRoundEl.textContent.trim()) {
            weeklyThisRoundEl.textContent = `${estimatedRound + 1}회`;
        }
        syncRoundSearchDefault(estimatedRound);
        initRoundSelect(estimatedRound);
        const maxAttempts = 12;
        const roundsToTry = buildRoundCandidates(estimatedRound, cached?.data?.drwNo);
        for (let index = 0; index < Math.min(maxAttempts, roundsToTry.length); index += 1) {
            const round = roundsToTry[index];
            try {
                const data = await fetchDrawData(round);
                if (data && data.returnValue === 'success') {
                    renderWeeklyData(data, { cached: false });
                    cacheWeekly(data);
                    initRoundSelect(data.drwNo);
                    latestAvailableRound = data.drwNo;
                    syncRoundSearchDefault(data.drwNo, { force: true });
                    loadRecentRounds(data.drwNo);
                    return;
                }
            } catch (error) {
                logProxyError('fetchLatestDraw', error, { round });
            }
        }

        if (weeklyStatusEl) {
            weeklyStatusEl.textContent = '최신 회차 연결이 지연되고 있습니다. 새로고침하거나 잠시 후 다시 시도해 주세요.';
        }
        if (hasCached) {
            if (weeklyStatusEl) {
                weeklyStatusEl.textContent = '실시간 연결이 지연되어 마지막 저장 데이터를 표시합니다.';
            }
            if (cached?.data?.drwNo) {
                initRoundSelect(cached.data.drwNo);
                latestAvailableRound = cached.data.drwNo;
                syncRoundSearchDefault(cached.data.drwNo, { force: true });
                loadRecentRounds(cached.data.drwNo);
            }
        }
    }

    function estimateLatestRound() {
        const firstDraw = new Date(Date.UTC(2002, 11, 7, 11, 35, 0));
        const now = getKstNow();
        const diffMs = now - firstDraw;
        const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
        const estimated = Math.max(1, weeks + 1);
        const drawTimeThisWeek = getLatestSaturdayDrawTime(now);
        if (now < drawTimeThisWeek) {
            return Math.max(1, estimated - 1);
        }
        return estimated;
    }

    function buildRoundCandidates(estimated, cachedRound) {
        const candidates = [];
        const maxRound = Math.max(estimated, cachedRound || 0);
        for (let offset = 0; offset <= 10; offset += 1) {
            candidates.push(Math.max(1, maxRound - offset));
        }
        return Array.from(new Set(candidates));
    }

    function getKstNow() {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
        return new Date(utc + 9 * 60 * 60 * 1000);
    }

    function getLatestSaturdayDrawTime(kstNow) {
        const day = kstNow.getDay();
        const saturdayOffset = (day >= 6 ? day - 6 : day + 1);
        const saturday = new Date(kstNow);
        saturday.setDate(kstNow.getDate() - saturdayOffset);
        saturday.setHours(20, 35, 0, 0);
        return saturday;
    }

    function getNextSaturdayDrawTime(kstNow) {
        const latestSaturday = getLatestSaturdayDrawTime(kstNow);
        if (kstNow >= latestSaturday) {
            latestSaturday.setDate(latestSaturday.getDate() + 7);
        }
        return latestSaturday;
    }

    function updateWeeklyCountdownDisplay() {
        if (!weeklyCountdownEl && !weeklyCountdownDaysEl) {
            return;
        }
        const now = getKstNow();
        const nextDraw = weeklyNextDrawOverride ? new Date(weeklyNextDrawOverride) : getNextSaturdayDrawTime(now);
        const diffMs = Math.max(0, nextDraw.getTime() - now.getTime());
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const pad = value => String(value).padStart(2, '0');
        if (weeklyCountdownEl) {
            weeklyCountdownEl.textContent = `${days}일 ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
        if (weeklyCountdownDaysEl) {
            weeklyCountdownDaysEl.textContent = String(days);
        }
        if (weeklyCountdownHoursEl) {
            weeklyCountdownHoursEl.textContent = pad(hours);
        }
        if (weeklyCountdownMinutesEl) {
            weeklyCountdownMinutesEl.textContent = pad(minutes);
        }
        if (weeklyCountdownSecondsEl) {
            weeklyCountdownSecondsEl.textContent = pad(seconds);
        }
        if (dashCountdownDaysEl) {
            dashCountdownDaysEl.textContent = String(days);
        }
        if (dashCountdownHoursEl) {
            dashCountdownHoursEl.textContent = pad(hours);
        }
        if (dashCountdownMinutesEl) {
            dashCountdownMinutesEl.textContent = pad(minutes);
        }
        if (dashCountdownSecondsEl) {
            dashCountdownSecondsEl.textContent = pad(seconds);
        }
        if (weeklyCountdownSubEl) {
            weeklyCountdownSubEl.textContent = `다음 추첨: ${formatKstDateTime(nextDraw)} (KST)`;
        }
        if (weeklyThisDateEl && !weeklyThisDateEl.textContent.trim()) {
            weeklyThisDateEl.textContent = formatShortDate(nextDraw);
        }
        if (dashThisDateEl && !dashThisDateEl.textContent.trim()) {
            dashThisDateEl.textContent = formatShortDate(nextDraw);
        }
    }

    function updateWeeklyNextDrawDisplay() {
        if (!weeklyNextDrawEl) {
            return;
        }
        const now = getKstNow();
        const nextDraw = weeklyNextDrawOverride ? new Date(weeklyNextDrawOverride) : getNextSaturdayDrawTime(now);
        const diffMs = Math.max(0, nextDraw.getTime() - now.getTime());
        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        const days = Math.floor(totalMinutes / (60 * 24));
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
        const minutes = totalMinutes % 60;
        weeklyNextDrawEl.textContent = `${days}일 ${hours}시간 ${minutes}분`;
    }

    function applyWeeklyExpectedAmount(value, note) {
        if (!weeklyExpectedAmountEl) {
            return;
        }
        weeklyExpectedAmountEl.textContent = value == null ? '-' : formatCurrency(value);
        if (weeklyExpectedNoteEl) {
            weeklyExpectedNoteEl.textContent = note || '공식 예상';
        }
    }

    function normalizeAmount(value) {
        if (value == null) {
            return null;
        }
        const digits = String(value).replace(/[^\d]/g, '');
        if (!digits) {
            return null;
        }
        const amount = Number(digits);
        return Number.isFinite(amount) ? amount : null;
    }

    async function fetchIntroMirrorResult(path) {
        const targetUrl = `https://www.dhlottery.co.kr${path}`;
        const proxyUrl = `/mirror/proxy?url=${encodeURIComponent(targetUrl)}`;
        const response = await fetch(proxyUrl, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`mirror response ${response.status}`);
        }
        const payload = await response.json();
        return payload?.data?.result || null;
    }

    async function fetchIntroMirrorResultWithRetry(path, retries = 2) {
        let lastError = null;
        for (let attempt = 0; attempt <= retries; attempt += 1) {
            try {
                return await fetchIntroMirrorResult(path);
            } catch (error) {
                lastError = error;
            }
        }
        throw lastError || new Error('mirror retry failed');
    }

    async function fetchWeeklyIntroInfo() {
        let expected = null;
        let current = null;

        try {
            const response = await fetch('/api/lt645-intro', { cache: 'no-store' });
            if (response.ok) {
                const payload = await response.json();
                if (payload && payload.returnValue === 'success') {
                    expected = payload.expected || null;
                    current = payload.current || null;
                }
            }
        } catch (error) {
            console.warn('intro info fetch failed', error);
        }

        if (!expected || !current) {
            try {
                const [fallbackExpected, fallbackCurrent] = await Promise.all([
                    expected ? Promise.resolve(expected) : fetchIntroMirrorResultWithRetry('/lt645/selectRnk1ExpcAmt.do', 2),
                    current ? Promise.resolve(current) : fetchIntroMirrorResultWithRetry('/lt645/selectThsLt645Info.do', 2)
                ]);
                expected = expected || fallbackExpected;
                current = current || fallbackCurrent;
            } catch (error) {
                console.warn('intro info fallback fetch failed', error);
            }
        }

        const expectedAmount = normalizeAmount(expected?.rnk1ExpcAmt);
        if (expectedAmount != null) {
            weeklyExpectedOverride = expectedAmount;
            weeklyExpectedUpdatedAt = Date.now();
            applyWeeklyExpectedAmount(weeklyExpectedOverride, '공식 예상');
        }
        if (expectedAmount != null && dashExpectedAmountEl) {
            dashExpectedAmountEl.textContent = formatCurrency(expectedAmount);
        }
        if (current?.ltEpsd && weeklyThisRoundEl) {
            weeklyThisRoundEl.textContent = `${current.ltEpsd}회`;
        }
        if (current?.ltEpsd && dashThisRoundEl) {
            dashThisRoundEl.textContent = `${current.ltEpsd}회`;
        }
        if (current?.ltRflYmd && weeklyThisDateEl) {
            weeklyThisDateEl.textContent = formatShortDate(current.ltRflYmd);
        }
        if (current?.ltRflYmd && dashThisDateEl) {
            dashThisDateEl.textContent = formatShortDate(current.ltRflYmd);
        }
        if (current?.ltRflYmd && current?.ltRflHh != null && current?.ltRflMm != null) {
            const date = new Date(`${String(current.ltRflYmd).slice(0, 4)}-${String(current.ltRflYmd).slice(4, 6)}-${String(current.ltRflYmd).slice(6, 8)}T00:00:00+09:00`);
            date.setHours(Number(current.ltRflHh));
            date.setMinutes(Number(current.ltRflMm));
            date.setSeconds(0);
            weeklyNextDrawOverride = date;
            updateWeeklyCountdownDisplay();
            updateWeeklyNextDrawDisplay();
            if (weeklyCountdownSubEl && current?.ltEpsd) {
                weeklyCountdownSubEl.textContent = `제${current.ltEpsd}회 추첨: ${formatKstDateTime(date)} (KST)`;
            }
        }
        if (current?.ltEpsd) {
            const resolvedLatestRound = Math.max(1, Number(current.ltEpsd) - 1);
            if (resolvedLatestRound > 0) {
                const previousLatestRound = Number(latestAvailableRound || 0);
                latestAvailableRound = resolvedLatestRound;
                initRoundSelect(resolvedLatestRound);
                syncRoundSearchDefault(resolvedLatestRound, { force: previousLatestRound !== resolvedLatestRound });
                if (!currentWeeklyData || Number(currentWeeklyData.drwNo || 0) < resolvedLatestRound) {
                    fetchLatestDraw();
                }
            }
        }
        updateDrawContextUi();
        updateDashboardSummaryUi();
        updateMypageSummaryUi();
    }

    function annotateDrawDataSource(data, source) {
        if (!data || typeof data !== 'object') {
            return data;
        }
        return {
            ...data,
            _source: source
        };
    }

    function mapMainInfoItemToDrawData(item) {
        if (!item || !Number(item.ltEpsd)) {
            return null;
        }
        const dateRaw = String(item.ltRflYmd || '').replace(/[^\d]/g, '');
        return annotateDrawDataSource({
            returnValue: 'success',
            drwNo: Number(item.ltEpsd),
            drwNoDate: dateRaw.length === 8 ? `${dateRaw.slice(0, 4)}-${dateRaw.slice(4, 6)}-${dateRaw.slice(6, 8)}` : '',
            drwtNo1: Number(item.tm1WnNo),
            drwtNo2: Number(item.tm2WnNo),
            drwtNo3: Number(item.tm3WnNo),
            drwtNo4: Number(item.tm4WnNo),
            drwtNo5: Number(item.tm5WnNo),
            drwtNo6: Number(item.tm6WnNo),
            bnusNo: Number(item.bnsWnNo),
            firstPrzwnerCo: Number(item.rnk1WnNope || 0),
            firstWinamnt: Number(item.rnk1WnAmt || 0),
            firstAccumamnt: Number(item.rnk1SumWnAmt || 0),
            totSellamnt: Number(item.rlvtEpsdSumNtslAmt || 0)
        }, 'main-info');
    }

    async function fetchRecentMainInfoRounds(force = false) {
        const maxAge = 1000 * 60;
        if (!force && mainInfoCache.rounds.length && Date.now() - mainInfoCache.ts < maxAge) {
            return mainInfoCache.rounds;
        }
        if (!force && mainInfoInflight) {
            return mainInfoInflight;
        }
        const targetUrl = '/mirror/proxy?url=https%3A%2F%2Fwww.dhlottery.co.kr%2FselectMainInfo.do';
        mainInfoInflight = fetch(targetUrl, { cache: 'no-store' })
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`main info ${response.status}`);
                }
                const payload = await response.json();
                const list = payload?.data?.result?.pstLtEpstInfo?.lt645;
                const rounds = Array.isArray(list)
                    ? list.map(mapMainInfoItemToDrawData).filter(Boolean)
                    : [];
                mainInfoCache = {
                    ts: Date.now(),
                    rounds
                };
                return rounds;
            })
            .finally(() => {
                mainInfoInflight = null;
            });
        return mainInfoInflight;
    }

    async function fetchDrawDataFromMainInfo(round) {
        const rounds = await fetchRecentMainInfoRounds();
        const targetRound = Number(round);
        return rounds.find(item => Number(item.drwNo) === targetRound) || null;
    }

    async function fetchDrawData(round) {
        const proxyBase = window.LOTTO_PROXY_URL || '/api/lotto';
        const url = `${proxyBase}?drwNo=${round}`;
        let lastError = null;
        try {
            const controller = new AbortController();
            const timeoutId = window.setTimeout(() => controller.abort(), 6000);
            const response = await fetch(url, {
                cache: 'no-store',
                signal: controller.signal
            });
            window.clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`응답 실패: ${response.status}`);
            }
            const payload = await response.json();
            if (payload && payload.returnValue === 'success') {
                return annotateDrawDataSource(payload, 'proxy');
            }
            lastError = new Error(payload?.message || '유효한 응답이 아닙니다.');
        } catch (error) {
            lastError = error;
        }
        const fallback = await fetchDrawDataFromMainInfo(round).catch(error => {
            logProxyError('fetchDrawDataFromMainInfo', error, { round });
            return null;
        });
        if (fallback) {
            return fallback;
        }
        throw lastError || new Error('회차 데이터를 불러오지 못했습니다.');
    }

    function renderWeeklyData(data, { cached }) {
        rememberRoundMeta(data);
        currentWeeklyData = data;
        lastWeeklyRenderedAt = Date.now();
        lastWeeklyRenderMode = cached ? 'cached' : 'live';
        lastWeeklyRenderSource = data && data._source ? data._source : 'proxy';
        const numbers = [
            data.drwtNo1,
            data.drwtNo2,
            data.drwtNo3,
            data.drwtNo4,
            data.drwtNo5,
            data.drwtNo6
        ].filter(Boolean);

        if (weeklyLatestRoundEl) {
            weeklyLatestRoundEl.textContent = `${data.drwNo}회`;
        }
        if (weeklyLatestDateEl) {
            weeklyLatestDateEl.textContent = data.drwNoDate ? `${formatShortDate(data.drwNoDate)} 추첨` : '';
        }
        if (dashLatestRoundEl) {
            dashLatestRoundEl.textContent = `${data.drwNo}회`;
        }
        if (dashLatestDateEl) {
            dashLatestDateEl.textContent = data.drwNoDate ? `${formatShortDate(data.drwNoDate)} 추첨` : '';
        }
        weeklyLatestNumbers.forEach((el, index) => {
            const value = numbers[index];
            if (!el) {
                return;
            }
            el.textContent = value || '-';
            applyBallStyle(el, value);
        });
        dashLatestNumbers.forEach((el, index) => {
            const value = numbers[index];
            if (!el) {
                return;
            }
            el.textContent = value || '-';
            applyBallStyle(el, value);
        });
        if (weeklyLatestBonusEl) {
            weeklyLatestBonusEl.textContent = data.bnusNo || '-';
            applyBallStyle(weeklyLatestBonusEl, data.bnusNo);
        }
        if (dashLatestBonusEl) {
            dashLatestBonusEl.textContent = data.bnusNo || '-';
            applyBallStyle(dashLatestBonusEl, data.bnusNo);
        }
        if (weeklyLatestFirstTotalEl) {
            const total = data.firstAccumamnt || (data.firstWinamnt && data.firstPrzwnerCo ? data.firstWinamnt * data.firstPrzwnerCo : null);
            weeklyLatestFirstTotalEl.textContent = formatCurrency(total);
        }
        if (weeklyLatestFirstEachEl) {
            weeklyLatestFirstEachEl.textContent = formatEokAmount(data.firstWinamnt);
        }
        if (weeklyLatestFirstWinnersEl) {
            weeklyLatestFirstWinnersEl.textContent = formatNumber(data.firstPrzwnerCo || 0);
        }
        if (dashLatestFirstTotalEl) {
            const total = data.firstAccumamnt || (data.firstWinamnt && data.firstPrzwnerCo ? data.firstWinamnt * data.firstPrzwnerCo : null);
            dashLatestFirstTotalEl.textContent = formatCurrency(total);
        }
        if (dashLatestFirstEachEl) {
            dashLatestFirstEachEl.textContent = formatEokAmount(data.firstWinamnt);
        }
        if (dashLatestFirstWinnersEl) {
            dashLatestFirstWinnersEl.textContent = formatNumber(data.firstPrzwnerCo || 0);
        }
        updateWeeklyNextDrawDisplay();
        if (weeklyRoundHint) {
            weeklyRoundHint.textContent = `선택된 회차: ${data.drwNo}회`;
        }

        if (weeklyExpectedOverride != null) {
            applyWeeklyExpectedAmount(weeklyExpectedOverride, '공식 예상');
        } else {
            applyWeeklyExpectedAmount(null, '공식 예상 조회중');
        }
        if (dashExpectedAmountEl && weeklyExpectedOverride != null) {
            dashExpectedAmountEl.textContent = formatCurrency(weeklyExpectedOverride);
        } else if (dashExpectedAmountEl) {
            dashExpectedAmountEl.textContent = '-';
        }
        if (weeklyStatusEl) {
            weeklyStatusEl.textContent = `${data.drwNo}회차 당첨 정보가 반영되었습니다.${cached ? ' (캐시)' : ''}`;
        }
        loadLastWeekWinDashboard(data);

        if (weeklyThisRoundEl && !weeklyThisRoundEl.textContent.trim()) {
            weeklyThisRoundEl.textContent = `${Number(data.drwNo) + 1}회`;
        }
        if (weeklyThisDateEl && !weeklyThisDateEl.textContent.trim()) {
            weeklyThisDateEl.textContent = formatShortDate(getNextSaturdayDrawTime(getKstNow()));
        }
        if (dashThisRoundEl && !dashThisRoundEl.textContent.trim()) {
            dashThisRoundEl.textContent = `${Number(data.drwNo) + 1}회`;
        }
        if (dashThisDateEl && !dashThisDateEl.textContent.trim()) {
            dashThisDateEl.textContent = formatShortDate(getNextSaturdayDrawTime(getKstNow()));
        }
        updateDrawContextUi();
        updateDashboardSummaryUi();
        updateMypageSummaryUi();
    }

    function formatCurrency(value) {
        if (!value && value !== 0) {
            return '-';
        }
        return `${formatNumber(value)}원`;
    }

    function formatShortDate(value) {
        if (!value) {
            return '';
        }
        if (value instanceof Date) {
            const year = value.getFullYear();
            const month = String(value.getMonth() + 1).padStart(2, '0');
            const day = String(value.getDate()).padStart(2, '0');
            return `${year}.${month}.${day}`;
        }
        const digits = String(value).replace(/[^\d]/g, '');
        if (digits.length === 8) {
            return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
        }
        return String(value);
    }

    function formatEokAmount(value) {
        if (!value && value !== 0) {
            return '-';
        }
        const eok = Math.round((Number(value) / 100000000) * 10) / 10;
        return Number.isInteger(eok) ? String(eok) : eok.toFixed(1).replace(/\.0$/, '');
    }

    function applyBallStyle(el, value) {
        if (!el) {
            return;
        }
        el.classList.remove('ball-1', 'ball-2', 'ball-3', 'ball-4', 'ball-5');
        const num = Number(value);
        if (!Number.isFinite(num)) {
            return;
        }
        if (num <= 10) {
            el.classList.add('ball-1');
        } else if (num <= 20) {
            el.classList.add('ball-2');
        } else if (num <= 30) {
            el.classList.add('ball-3');
        } else if (num <= 40) {
            el.classList.add('ball-4');
        } else {
            el.classList.add('ball-5');
        }
    }

    function updateRulesStatus(message) {
        if (!rulesStatus) {
            return;
        }
        rulesStatus.textContent = message;
        if (message) {
            window.clearTimeout(updateRulesStatus.timerId);
            updateRulesStatus.timerId = window.setTimeout(() => {
                rulesStatus.textContent = '';
            }, 2400);
        }
    }

    function updateExcludeNumberLabel() {
        const count = excludeNumberValues.size;
        const label = count ? `숫자 제외 (${count}개)` : '숫자 제외';
        if (excludeNumberTitle) {
            excludeNumberTitle.textContent = label;
        }
        if (excludeNumberCard) {
            excludeNumberCard.dataset.title = label;
        }
        if (excludeNumberRule) {
            excludeNumberRule.checked = count > 0;
        }
    }

    function clearExcludeNumberSelection(options = {}) {
        const { clearStorage = false } = options;
        excludeNumberValues.clear();
        if (excludeNumberGrid) {
            excludeNumberGrid.querySelectorAll('button.is-active').forEach(button => {
                button.classList.remove('is-active');
            });
        }
        if (clearStorage) {
            localStorage.removeItem('lotto_exclude_numbers');
        }
        updateExcludeNumberLabel();
    }

    function getExcludeRangeClass(num) {
        if (num <= 10) {
            return 'range-1';
        }
        if (num <= 20) {
            return 'range-2';
        }
        if (num <= 30) {
            return 'range-3';
        }
        if (num <= 40) {
            return 'range-4';
        }
        return 'range-5';
    }

    function setupExcludeNumberControl() {
        if (!excludeNumberGrid) {
            return;
        }
        excludeNumberGrid.innerHTML = '';
        for (let i = 1; i <= 45; i += 1) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `exclude-number-ball ${getExcludeRangeClass(i)}`;
            button.textContent = String(i);
            button.dataset.number = String(i);
            excludeNumberGrid.appendChild(button);
        }

        const saved = localStorage.getItem('lotto_exclude_numbers');
        if (saved) {
            try {
                const values = JSON.parse(saved);
                if (Array.isArray(values)) {
                    values.forEach(value => {
                        const num = Number(value);
                        if (Number.isFinite(num) && num >= 1 && num <= 45) {
                            excludeNumberValues.add(num);
                        }
                    });
                }
            } catch (error) {
                localStorage.removeItem('lotto_exclude_numbers');
            }
        }

        excludeNumberGrid.querySelectorAll('button').forEach(button => {
            const num = Number(button.dataset.number);
            if (excludeNumberValues.has(num)) {
                button.classList.add('is-active');
            }
            button.addEventListener('click', event => {
                // Buttons are rendered inside a <label>; prevent label toggle side-effects.
                event.preventDefault();
                event.stopPropagation();
                if (excludeNumberValues.has(num)) {
                    excludeNumberValues.delete(num);
                    button.classList.remove('is-active');
                } else {
                    excludeNumberValues.add(num);
                    button.classList.add('is-active');
                }
                updateExcludeNumberLabel();
                if (excludeNumberValues.size) {
                    localStorage.setItem('lotto_exclude_numbers', JSON.stringify(Array.from(excludeNumberValues)));
                } else {
                    localStorage.removeItem('lotto_exclude_numbers');
                }
                rememberDrawInteraction({
                    type: 'rule',
                    value: 'exclude_number',
                    label: `제외수 ${num}번`,
                    selected: excludeNumberValues.has(num)
                });
                clearActiveStrategySelection();
                updateSelectionCount();
                updateCombinedEstimates();
                updateScenarioMetrics();
            });
        });

        updateExcludeNumberLabel();
    }

    function setRulesByIds(ids) {
        const selected = new Set(Array.isArray(ids) ? ids : []);
        ruleInputs.forEach(input => {
            input.checked = selected.has(input.value);
        });
        updateSelectionCount();
        updateCombinedEstimates();
    }

    function applyStrategy(strategy) {
        const presetIds = PRESETS[strategy] || [];
        if (strategy === 'clear') {
            rememberDrawInteraction({
                type: 'clear',
                label: '전체 해제',
                selected: false
            });
            activeStrategy = '';
            setRulesByIds([]);
            updateRulesStatus('전략을 초기화했습니다.');
            syncStrategyButtons('clear');
            syncGroupLevelButtons();
            return;
        }
        if (strategy && strategy === activeStrategy) {
            rememberDrawInteraction({
                type: 'scenario',
                value: strategy,
                label: PRESETS_LABEL[strategy] || '전략',
                selected: false
            });
            activeStrategy = '';
            setRulesByIds([]);
            updateRulesStatus('전략을 해제했습니다.');
            syncStrategyButtons('');
            syncGroupLevelButtons();
            return;
        }
        rememberDrawInteraction({
            type: 'scenario',
            value: strategy,
            label: PRESETS_LABEL[strategy] || '전략',
            selected: true
        });
        activeStrategy = strategy || '';
        setRulesByIds(presetIds);
        updateRulesStatus(`${PRESETS_LABEL[strategy] || '전략'}을 적용했습니다.`);
        syncStrategyButtons(strategy);
        syncGroupLevelButtons();
    }

    function applyGroupLevel(group, level) {
        const cards = ruleCards.filter(card => card.dataset.group === group);
        if (!cards.length) {
            return;
        }
        const essential = cards.filter(card => !card.classList.contains('is-advanced'));
        const advanced = cards.filter(card => card.classList.contains('is-advanced'));
        const essentialInputs = essential.map(card => card.querySelector('.rule-input')).filter(Boolean);
        const advancedInputs = advanced.map(card => card.querySelector('.rule-input')).filter(Boolean);
        const ordered = [...essentialInputs, ...advancedInputs];

        let targetCount = 0;
        if (level === 1) {
            targetCount = Math.max(1, Math.ceil(essentialInputs.length * 0.35));
        } else if (level === 2) {
            targetCount = Math.max(1, Math.ceil(essentialInputs.length * 0.7));
        } else if (level >= 3) {
            targetCount = ordered.length;
        }

        ordered.forEach((input, index) => {
            input.checked = index < targetCount;
        });
        rememberDrawInteraction({
            type: 'group-level',
            label: `${group} ${level}단계`,
            selected: targetCount > 0
        });
        clearActiveStrategySelection();
        updateSelectionCount();
        updateCombinedEstimates();
        syncGroupLevelButtons();
    }

    function syncStrategyButtons(activeStrategy) {
        strategyButtons.forEach(button => {
            const isActive = activeStrategy && button.dataset.strategy === activeStrategy;
            button.classList.toggle('is-active', Boolean(isActive));
            button.setAttribute('aria-pressed', String(Boolean(isActive)));
        });
    }

    function syncGroupLevelButtons() {
        const groupCardsMap = new Map();
        ruleCards.forEach(card => {
            const group = card.dataset.group;
            if (!group) {
                return;
            }
            if (!groupCardsMap.has(group)) {
                groupCardsMap.set(group, []);
            }
            groupCardsMap.get(group).push(card);
        });

        groupLevelButtons.forEach(button => {
            const token = button.dataset.groupLevel || '';
            const [group, rawLevel] = token.split(':');
            const level = Number(rawLevel);
            const cards = groupCardsMap.get(group) || [];
            const inputs = cards.map(card => card.querySelector('.rule-input')).filter(Boolean);
            const checkedCount = inputs.filter(input => input.checked).length;
            const total = inputs.length;
            let currentLevel = 0;
            if (checkedCount > 0 && total > 0) {
                const ratio = checkedCount / total;
                if (ratio <= 0.4) {
                    currentLevel = 1;
                } else if (ratio <= 0.8) {
                    currentLevel = 2;
                } else {
                    currentLevel = 3;
                }
            }
            button.classList.toggle('is-active', currentLevel === level);
        });
    }

    function getSlotPresets() {
        try {
            const raw = localStorage.getItem('lotto_strategy_slots');
            if (!raw) {
                return {};
            }
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch {
            return {};
        }
    }

    function saveSlotPresets(slots) {
        localStorage.setItem('lotto_strategy_slots', JSON.stringify(slots));
    }

    function renderSlotPresets() {
        const slots = getSlotPresets();
        [1, 2, 3].forEach(slot => {
            const el = slotMetaEls[slot];
            if (!el) {
                return;
            }
            const data = slots[String(slot)];
            if (!data || !Array.isArray(data.ids) || !data.ids.length) {
                el.textContent = '비어있음';
                return;
            }
            const label = data.savedAt ? formatSlotDate(data.savedAt) : '저장됨';
            el.textContent = `${data.ids.length}개 규칙 · ${label}`;
        });
    }

    function formatSlotDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return '저장됨';
        }
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${mm}.${dd} ${hh}:${min}`;
    }

    function saveSlotPreset(slot) {
        const slots = getSlotPresets();
        const ids = ruleInputs.filter(input => input.checked).map(input => input.value);
        slots[String(slot)] = {
            ids,
            savedAt: new Date().toISOString()
        };
        saveSlotPresets(slots);
        renderSlotPresets();
        updateRulesStatus(`${slot}번 보관함에 저장했습니다.`);
        updateMypageSummaryUi();
    }

    function applySlotPreset(slot) {
        const slots = getSlotPresets();
        const data = slots[String(slot)];
        if (!data || !Array.isArray(data.ids)) {
            updateRulesStatus(`${slot}번 보관함이 비어 있습니다.`);
            return;
        }
        setRulesByIds(data.ids);
        syncStrategyButtons('');
        syncGroupLevelButtons();
        updateRulesStatus(`${slot}번 보관함을 적용했습니다.`);
        updateMypageSummaryUi();
    }

    function applyPreset(preset) {
        const presetIds = PRESETS[preset] || [];
        if (preset === 'clear') {
            rememberDrawInteraction({
                type: 'clear',
                label: '전체 해제',
                selected: false
            });
            activeStrategy = '';
            setRulesByIds([]);
            updateRulesStatus('모든 선택을 해제했습니다.');
            syncStrategyButtons('clear');
            syncGroupLevelButtons();
            return;
        }
        rememberDrawInteraction({
            type: 'scenario',
            value: preset,
            label: PRESETS_LABEL[preset] || preset,
            selected: true
        });
        activeStrategy = preset || '';
        setRulesByIds(presetIds);
        updateRulesStatus(`${PRESETS_LABEL[preset]} 규칙을 적용했습니다.`);
        syncStrategyButtons(preset);
        syncGroupLevelButtons();
        updateMypageSummaryUi();
    }

    function resetDrawSelectionsForEntry() {
        clearExcludeNumberSelection();
        rememberDrawInteraction(null);
        activeStrategy = '';
        setDrawSelectionDockCollapsed(false);
        setDrawBottomGenerateCollapsed(false);
        syncStrategyButtons('');
        setRulesByIds([]);
        syncGroupLevelButtons();
        setDrawCopyButtonState(false);
        setDrawCopyStatus('');
    }

    function applySavedRules(fromButton = false) {
        const saved = localStorage.getItem('lotto_rules');
        if (!saved) {
            if (fromButton) {
                updateRulesStatus('저장된 규칙이 없습니다.');
            }
            return;
        }
        try {
            const savedIdsRaw = JSON.parse(saved);
            const savedIds = Array.isArray(savedIdsRaw) ? savedIdsRaw : [];
            rememberDrawInteraction({
                type: 'preset',
                label: '저장 규칙',
                selected: savedIds.length > 0
            });
            clearActiveStrategySelection();
            setRulesByIds(savedIds);
            syncGroupLevelButtons();
            if (fromButton) {
                updateRulesStatus('저장된 규칙을 불러왔습니다.');
            }
            updateMypageSummaryUi();
        } catch (error) {
            console.warn('저장된 규칙 파싱 실패', error);
            localStorage.removeItem('lotto_rules');
            if (fromButton) {
                updateRulesStatus('저장된 규칙이 손상되어 초기화했습니다.');
            }
        }
    }

    function updateSelectionCount() {
        if (!rulesSelectedCount || !rulesVisibleCount) {
            return;
        }
        const selectedCount = ruleInputs.filter(input => input.checked).length;
        const totalCount = ruleCards.length;
        const visibleCount = ruleCards.filter(card => isCardVisibleInPicker(card)).length;
        rulesSelectedCount.textContent = `${selectedCount}개`;
        rulesVisibleCount.textContent = `표시: ${visibleCount}/${totalCount}`;
        ruleCards.forEach(card => {
            const input = card.querySelector('.rule-input');
            card.classList.toggle('is-checked', input && input.checked);
        });
        renderSelectedRules();
        updateGroupButtons();
        updateDrawContextUi();
        updateMypageSummaryUi();
    }

    function renderSelectedRules() {
        if (!selectedRulesListEl || !selectedRulesEmptyEl) {
            return;
        }
        selectedRulesListEl.innerHTML = '';
        const selectedCards = ruleCards.filter(card => {
            const input = card.querySelector('.rule-input');
            return input && input.checked;
        });
        updateDrawSelectionDock(selectedCards);
        scheduleDrawHorizontalWidthSync();
        if (!selectedCards.length) {
            selectedRulesEmptyEl.hidden = false;
            return;
        }
        selectedRulesEmptyEl.hidden = true;
        const grouped = new Map();
        selectedCards.forEach(card => {
            const input = card.querySelector('.rule-input');
            if (!input) {
                return;
            }
            const title = card.dataset.title
                || card.querySelector('.rule-title')?.textContent
                || '규칙';
            const group = (card.dataset.group || '기타').trim() || '기타';
            if (!grouped.has(group)) {
                grouped.set(group, []);
            }
            grouped.get(group).push({
                value: input.value,
                title
            });
        });

        grouped.forEach((items, group) => {
            const section = document.createElement('section');
            section.className = 'draw-selected-group';

            const header = document.createElement('div');
            header.className = 'draw-selected-group-header';
            header.innerHTML = `<strong>${escapeHtml(group)}</strong><span>${items.length}개</span>`;
            section.appendChild(header);

            const chips = document.createElement('div');
            chips.className = 'draw-selected-group-chips';
            items.forEach(item => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'draw-selected-chip';
                chip.dataset.value = item.value;
                chip.innerHTML = `<strong>${escapeHtml(item.title)}</strong><span>제거</span>`;
                chips.appendChild(chip);
            });

            section.appendChild(chips);
            selectedRulesListEl.appendChild(section);
        });
    }

    function rememberDrawInteraction(detail) {
        lastDrawInteraction = detail ? { ...detail, at: Date.now() } : null;
    }

    function clearActiveStrategySelection() {
        activeStrategy = '';
        syncStrategyButtons('');
    }

    function activateScenarioSelection(strategy) {
        if (!strategy) {
            return;
        }
        const now = Date.now();
        if (lastScenarioActivation.strategy === strategy && now - lastScenarioActivation.at < 320) {
            return;
        }
        lastScenarioActivation = {
            strategy,
            at: now
        };
        applyStrategy(strategy);
    }

    function describeDrawInteraction() {
        if (!lastDrawInteraction || !lastDrawInteraction.label) {
            return '';
        }
        if (lastDrawInteraction.type === 'scenario') {
            return lastDrawInteraction.selected
                ? `최근 시나리오: ${lastDrawInteraction.label}`
                : `최근 해제: ${lastDrawInteraction.label}`;
        }
        if (lastDrawInteraction.type === 'rule') {
            return `최근 ${lastDrawInteraction.selected ? '선택' : '해제'}: ${lastDrawInteraction.label}`;
        }
        if (lastDrawInteraction.type === 'group') {
            return `최근 그룹 변경: ${lastDrawInteraction.label}`;
        }
        if (lastDrawInteraction.type === 'group-level') {
            return `최근 단계 적용: ${lastDrawInteraction.label}`;
        }
        if (lastDrawInteraction.type === 'preset') {
            return `최근 적용: ${lastDrawInteraction.label}`;
        }
        if (lastDrawInteraction.type === 'clear') {
            return '최근 동작: 전체 해제';
        }
        return `최근 변경: ${lastDrawInteraction.label}`;
    }

    function updateDrawSelectionDock(selectedCards) {
        if (!drawSelectionDockEl || !drawSelectionDockTitleEl || !drawSelectionDockMetaEl || !drawSelectionDockPreviewEl) {
            return;
        }
        const items = Array.isArray(selectedCards) ? selectedCards : [];
        if (drawTabPanel) {
            drawTabPanel.classList.toggle('has-selection-dock', items.length > 0);
        }
        const hasScenario = Boolean(activeStrategy && activeStrategy !== 'clear');
        const recentText = describeDrawInteraction();
        if (drawSelectionDockScenarioEl) {
            drawSelectionDockScenarioEl.textContent = hasScenario
                ? `${PRESETS_LABEL[activeStrategy] || activeStrategy} 시나리오`
                : (items.length ? '수동 조정 중' : '직접 선택');
            drawSelectionDockScenarioEl.classList.toggle('is-active', hasScenario);
        }
        if (drawSelectionDockStatEl) {
            drawSelectionDockStatEl.textContent = items.length ? `${items.length}개 선택` : '선택 없음';
        }
        if (!items.length) {
            drawSelectionDockEl.classList.remove('has-selection');
            setDrawSelectionDockCollapsed(false);
            drawSelectionDockTitleEl.textContent = lastDrawInteraction?.type === 'clear' ? '필터를 모두 해제했습니다.' : '아직 필터 없음';
            drawSelectionDockMetaEl.textContent = recentText || '시나리오 또는 규칙을 선택하면 여기서 계속 보입니다.';
            if (drawSelectionDockMetricsEl) {
                drawSelectionDockMetricsEl.hidden = true;
            }
            drawSelectionDockPreviewEl.hidden = true;
            drawSelectionDockPreviewEl.innerHTML = '';
            if (drawSelectionDockToggleBtn) {
                drawSelectionDockToggleBtn.hidden = true;
            }
            if (drawSelectionDockClearBtn) {
                drawSelectionDockClearBtn.hidden = true;
            }
            return;
        }

        drawSelectionDockEl.classList.add('has-selection');
        drawSelectionDockTitleEl.textContent = hasScenario
            ? `${PRESETS_LABEL[activeStrategy] || activeStrategy} · ${items.length}개 필터 적용 중`
            : `${items.length}개 필터 적용 중`;
        const remainPct = Number.isFinite(currentRemainingRatio)
            ? Math.max(0, Math.min(100, Math.round(currentRemainingRatio * 1000) / 10))
            : 100;
        const remainingValue = Number.isFinite(currentRemainingCombos) ? formatNumber(currentRemainingCombos) : '-';
        const benefitPct = Number.isFinite(currentRemainingRatio)
            ? Math.max(0, Math.round((1 - Math.max(0.000001, Math.min(1, currentRemainingRatio))) * 100))
            : 0;
        drawSelectionDockMetaEl.textContent = recentText || '선택 내용과 확률 변화가 여기서 계속 갱신됩니다.';
        if (drawSelectionDockMetricsEl) {
            drawSelectionDockMetricsEl.hidden = false;
        }
        if (drawSelectionDockRemainingEl) {
            drawSelectionDockRemainingEl.textContent = `${remainingValue}개`;
        }
        if (drawSelectionDockRatioEl) {
            drawSelectionDockRatioEl.textContent = `${remainPct}%`;
        }
        if (drawSelectionDockBenefitEl) {
            drawSelectionDockBenefitEl.textContent = benefitPct > 0 ? `유리 ${benefitPct}%` : '변화 없음';
        }
        if (drawSelectionDockToggleBtn) {
            drawSelectionDockToggleBtn.hidden = false;
        }
        if (drawSelectionDockClearBtn) {
            drawSelectionDockClearBtn.hidden = false;
        }

        const prioritizedValue = lastDrawInteraction?.type === 'rule' && lastDrawInteraction.selected
            ? lastDrawInteraction.value
            : '';
        const orderedItems = items.slice().sort((leftCard, rightCard) => {
            const leftValue = leftCard.querySelector('.rule-input')?.value || '';
            const rightValue = rightCard.querySelector('.rule-input')?.value || '';
            if (leftValue === prioritizedValue) {
                return -1;
            }
            if (rightValue === prioritizedValue) {
                return 1;
            }
            return 0;
        });
        const previewItems = orderedItems.slice(0, 8).map(card => {
            const input = card.querySelector('.rule-input');
            return {
                value: input ? input.value : '',
                title: card.dataset.title || card.querySelector('.rule-title')?.textContent || '규칙',
                isFresh: Boolean(prioritizedValue && input && input.value === prioritizedValue)
            };
        }).filter(item => item.value);

        const moreCount = items.length - previewItems.length;
        drawSelectionDockPreviewEl.hidden = false;
        drawSelectionDockPreviewEl.innerHTML = previewItems
            .map(item => (
                `<button type="button" class="draw-selection-dock-chip${item.isFresh ? ' is-fresh' : ''}" data-value="${escapeHtml(item.value)}">${escapeHtml(item.title)}</button>`
            ))
            .join('')
            + (moreCount > 0 ? `<span class="draw-selection-dock-more">+${moreCount}</span>` : '');
        setDrawSelectionDockCollapsed(isDrawSelectionDockCollapsed);
    }

    function updateGroupButtons() {
        groupSelectButtons.forEach(button => {
            const group = button.dataset.group;
            const groupInputs = ruleInputs.filter(input => {
                const card = input.closest('.rule-card');
                return card && card.dataset.group === group;
            });
            if (!groupInputs.length) {
                button.disabled = true;
                return;
            }
            button.disabled = false;
            const allChecked = groupInputs.every(input => input.checked);
            button.textContent = allChecked ? '선택 해제' : '모두 선택';
        });
    }

    function setRulePickerOpen(isOpen) {
        if (!rulePickerPanel || !rulePickerBackdrop) {
            return;
        }
        if (rulePickerPanel.classList.contains('inline')) {
            rulePickerPanel.classList.add('is-open');
            rulePickerPanel.setAttribute('aria-hidden', 'false');
            rulePickerBackdrop.hidden = true;
            body.classList.remove('rule-picker-open');
            return;
        }
        rulePickerPanel.classList.toggle('is-open', Boolean(isOpen));
        rulePickerPanel.setAttribute('aria-hidden', String(!isOpen));
        rulePickerBackdrop.hidden = !isOpen;
        body.classList.toggle('rule-picker-open', Boolean(isOpen));
        if (isOpen && rulePickerSearch) {
            window.setTimeout(() => {
                rulePickerSearch.focus();
            }, 40);
        }
    }

    function populateRulePickerGroups() {
        if (!rulePickerGroup) {
            return;
        }
        const seen = new Set(['']);
        const options = ['<option value="">전체 카테고리</option>'];
        ruleGroups.forEach(groupEl => {
            const group = groupEl.dataset.group;
            if (!group || seen.has(group)) {
                return;
            }
            seen.add(group);
            options.push(`<option value="${escapeHtml(group)}">${escapeHtml(group)}</option>`);
        });
        rulePickerGroup.innerHTML = options.join('');
    }

    function isCardVisibleInPicker(card) {
        if (!card || card.classList.contains('is-filter-hidden')) {
            return false;
        }
        if (rulesSection && rulesSection.classList.contains('rules-collapsed') && card.classList.contains('is-advanced')) {
            return false;
        }
        return true;
    }

    function applyRulePickerFilter() {
        const keyword = (rulePickerSearch?.value || '').trim().toLowerCase();
        const group = (rulePickerGroup?.value || '').trim();
        ruleCards.forEach(card => {
            const title = (card.dataset.title || card.querySelector('.rule-title')?.textContent || '').toLowerCase();
            const desc = (card.querySelector('.rule-desc')?.textContent || '').toLowerCase();
            const cardGroup = card.dataset.group || '';
            const matchesKeyword = !keyword || title.includes(keyword) || desc.includes(keyword);
            const matchesGroup = !group || group === cardGroup;
            card.classList.toggle('is-filter-hidden', !(matchesKeyword && matchesGroup));
        });
        ruleGroups.forEach(groupEl => {
            const cards = Array.from(groupEl.querySelectorAll('.rule-card'));
            const hasVisibleCard = cards.some(card => isCardVisibleInPicker(card));
            groupEl.classList.toggle('is-empty', !hasVisibleCard);
        });
        updateSelectionCount();
    }

    const detailSheet = document.getElementById('detail-sheet');
    const detailSheetTitle = detailSheet ? detailSheet.querySelector('h4') : null;
    const detailSheetText = detailSheet ? detailSheet.querySelector('p') : null;
    const detailSheetClose = detailSheet ? detailSheet.querySelector('.sheet-close') : null;

    if (detailSheetClose) {
        detailSheetClose.addEventListener('click', () => {
            closeDetailSheet();
        });
    }

    function openDetailSheet(title, text) {
        if (!detailSheet || !detailSheetTitle || !detailSheetText) {
            return;
        }
        detailSheetTitle.textContent = title;
        detailSheetText.textContent = text;
        detailSheet.classList.add('is-open');
    }

    function closeDetailSheet() {
        if (!detailSheet) {
            return;
        }
        detailSheet.classList.remove('is-open');
    }

    function setupRuleDetails() {
        ruleCards.forEach(card => {
            const input = card.querySelector('.rule-input');
            const body = card.querySelector('.rule-body');
            if (!input || !body) {
                return;
            }
            const detail = RULE_DETAILS[input.value];
            if (!detail) {
                return;
            }
            const button = document.createElement('button');
            button.className = 'detail-toggle';
            button.type = 'button';
            button.textContent = '자세히';

            const text = document.createElement('div');
            text.className = 'detail-text';
            text.textContent = detail;

            button.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 640px)').matches) {
                    openDetailSheet(card.dataset.title || '규칙 상세', detail);
                    return;
                }
                text.classList.toggle('is-open');
                button.textContent = text.classList.contains('is-open') ? '닫기' : '자세히';
            });

            body.appendChild(button);
            body.appendChild(text);
        });
    }

    function updateCombinedEstimates() {
        if (!remainingCombosEl || !excludedCombosEl) {
            return;
        }
        const activeRules = getActiveRules();
        const remainingRatio = getEstimatedRemainingRatio(activeRules);
        const remainingCombos = Math.max(1, Math.round(TOTAL_COMBOS * remainingRatio));
        const excludedCombos = Math.max(0, TOTAL_COMBOS - remainingCombos);
        currentRemainingRatio = remainingRatio;
        currentRemainingCombos = remainingCombos;
        currentExcludedCombos = excludedCombos;
        remainingCombosEl.textContent = `${formatNumber(remainingCombos)}개`;
        excludedCombosEl.textContent = `제외: ${formatNumber(excludedCombos)}개`;
        if (remainingMeterFill) {
            const pct = Math.max(0, Math.min(100, Math.round(remainingRatio * 1000) / 10));
            remainingMeterFill.style.width = `${pct}%`;
        }
        if (remainingMeterLabel) {
            const pctLabel = Math.max(0, Math.min(100, Math.round(remainingRatio * 1000) / 10));
            remainingMeterLabel.textContent = `남은 조합 비중: ${pctLabel}%`;
        }
        updateAdjustedOdds(remainingRatio);
        updateDrawContextUi();
    }

    function computeBaseOdds() {
        const total = TOTAL_COMBOS;
        const odds = {
            1: total,
            2: Math.round(total / 6),
            3: Math.round(total / 228),
            4: Math.round(total / (combination(6, 4) * combination(39, 2))),
            5: Math.round(total / (combination(6, 3) * combination(39, 3)))
        };
        Object.entries(odds).forEach(([rank, value]) => {
            if (oddsBaseEls[rank]) {
                oddsBaseEls[rank].textContent = `1 / ${formatNumber(Math.round(value))}`;
            }
        });
        updateAdjustedOdds(1);
    }

    function updateAdjustedOdds(ratio) {
        const clampRatio = Math.min(1, Math.max(0.000001, ratio));
        const total = TOTAL_COMBOS;
        const baseOdds = {
            1: total,
            2: Math.round(total / 6),
            3: Math.round(total / 228),
            4: Math.round(total / (combination(6, 4) * combination(39, 2))),
            5: Math.round(total / (combination(6, 3) * combination(39, 3)))
        };
        if (oddsBenefitSummaryEl) {
            const benefitPct = Math.round((1 - clampRatio) * 100);
            oddsBenefitSummaryEl.textContent = benefitPct > 0 ? `유리 ${benefitPct}%` : '변화 없음';
        }
        Object.entries(baseOdds).forEach(([rank, value]) => {
            const adjusted = Math.max(1, Math.round(value * clampRatio));
            if (oddsAdjEls[rank]) {
                oddsAdjEls[rank].textContent = `1 / ${formatNumber(adjusted)}`;
            }
            if (oddsBarEls[rank]) {
                const width = Math.max(2, Math.round(clampRatio * 1000) / 10);
                oddsBarEls[rank].style.width = `${width}%`;
            }
            if (oddsDeltaEls[rank]) {
                if (clampRatio === 1) {
                    oddsDeltaEls[rank].textContent = '변화 없음';
                    oddsDeltaEls[rank].dataset.trend = 'neutral';
                } else {
                    const betterPct = Math.round((1 - clampRatio) * 100);
                    oddsDeltaEls[rank].textContent = `유리 ${betterPct}%`;
                    oddsDeltaEls[rank].dataset.trend = 'up';
                }
            }
        });
    }

    function getEstimatedRemainingRatio(activeRules) {
        if (!activeRules.length) {
            return 1;
        }
        let ratio = 1;
        activeRules.forEach(rule => {
            if (rule.id === 'exclude_number') {
                ratio *= getExcludeNumberRemainingRatio();
                return;
            }
            const stat = RULE_STATS[rule.id];
            if (stat) {
                ratio *= (1 - stat.ratio);
            }
        });
        return Math.max(0.000001, ratio);
    }

    function getExcludeNumberRemainingRatio() {
        const excludeCount = excludeNumberValues.size;
        if (!excludeCount) {
            return 1;
        }
        const remainingPool = 45 - excludeCount;
        if (remainingPool < 6) {
            return 0.000001;
        }
        const remainingCombos = combination(remainingPool, 6);
        return Math.max(0.000001, remainingCombos / TOTAL_COMBOS);
    }

    function formatNumber(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function formatImproveFactor(ratio) {
        if (!Number.isFinite(ratio) || ratio <= 0) {
            return '-';
        }
        const factor = 1 / ratio;
        if (!Number.isFinite(factor)) {
            return '-';
        }
        return `${Number(factor.toFixed(1)).toString()}배`;
    }

    function getEstimatedRatioByIds(ids) {
        if (!ids || !ids.length) {
            return 1;
        }
        let ratio = 1;
        ids.forEach(id => {
            const stat = RULE_STATS[id];
            if (stat) {
                ratio *= (1 - stat.ratio);
            }
        });
        return Math.max(0.000001, ratio);
    }

    function updateScenarioMetrics() {
        if (!scenarioCards.length) {
            return;
        }
        const SCENARIO_METRICS = {
            light: { excludedPct: 8.0 },
            balanced: { excludedPct: 18.0 },
            aggressive: { excludedPct: 28.0 },
            conservative: { excludedPct: 6.0 },
            expanded: { excludedPct: 22.0 },
            range_focus: { excludedPct: 20.0 },
            sum_balance: { excludedPct: 12.0 },
            digit_focus: { excludedPct: 24.0 },
            prime_focus: { excludedPct: 26.0 },
            clear: { excludedPct: 0 }
        };
        scenarioCards.forEach(card => {
            const strategy = card.dataset.strategy;
            const ids = PRESETS[strategy] || [];
            const fallbackRatio = getEstimatedRatioByIds(ids);
            const fixed = SCENARIO_METRICS[strategy];
            const excludedPct = fixed ? fixed.excludedPct : Math.max(0, Math.min(100, Math.round((1 - fallbackRatio) * 1000) / 10));
            const ratio = fixed ? Math.max(0.000001, 1 - excludedPct / 100) : fallbackRatio;
            const remainingCombos = Math.max(1, Math.round(TOTAL_COMBOS * ratio));
            const excludedCombos = Math.max(0, TOTAL_COMBOS - remainingCombos);
            const excludedEl = card.querySelector('[data-metric="excluded"]');
            const improveEl = card.querySelector('[data-metric="improve"]');
            if (excludedEl) {
                excludedEl.textContent = `예상 제외: ${formatNumber(excludedCombos)}개`;
            }
            if (improveEl) {
                const remainPct = Math.max(0, Math.min(100, Math.round(ratio * 1000) / 10));
                improveEl.textContent = `제외 비중: ${excludedPct}% · 남는 비중: ${remainPct}%`;
            }
        });
    }

    function formatKstDateTime(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    }

    function cacheRoundOnly(data) {
        try {
            const payload = {
                data,
                ts: Date.now()
            };
            localStorage.setItem(`lotto_round_${data.drwNo}`, JSON.stringify(payload));
        } catch (error) {
            console.warn('캐시 저장 실패', error);
        }
    }

    function cacheWeekly(data) {
        try {
            const payload = {
                data,
                ts: Date.now()
            };
            localStorage.setItem('lotto_weekly_cache', JSON.stringify(payload));
            localStorage.setItem('lotto_last_round', String(data.drwNo));
            cacheRoundOnly(data);
        } catch (error) {
            console.warn('캐시 저장 실패', error);
        }
    }

    function getCachedWeekly() {
        try {
            const raw = localStorage.getItem('lotto_weekly_cache');
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.data) {
                return null;
            }
            const age = Date.now() - Number(parsed.ts || 0);
            const maxAge = 1000 * 60 * 30;
            if (age > maxAge) {
                return { data: parsed.data, stale: true };
            }
            return { data: parsed.data, stale: false };
        } catch (error) {
            console.warn('캐시 로드 실패', error);
            return null;
        }
    }

    function getCachedRound(round) {
        try {
            const raw = localStorage.getItem(`lotto_round_${round}`);
            if (!raw) {
                return null;
            }
            return JSON.parse(raw);
        } catch (error) {
            console.warn('회차 캐시 로드 실패', error);
            return null;
        }
    }

    function initRoundSelect(latestRound) {
        if (!weeklyRoundSelect) {
            return;
        }
        const normalizedLatestRound = Math.max(1, Math.trunc(Number(latestRound) || 1));
        const rounds = [];
        for (let round = normalizedLatestRound; round >= 1; round -= 1) {
            rounds.push(round);
        }
        weeklyRoundSelect.innerHTML = '';
        rounds.forEach(round => {
            const option = document.createElement('option');
            option.value = String(round);
            option.textContent = formatRoundOptionLabel(round);
            weeklyRoundSelect.appendChild(option);
        });
        weeklyRoundSelect.value = String(normalizedLatestRound);
        if (weeklyRoundHint) {
            weeklyRoundHint.textContent = `최신 당첨 회차: ${normalizedLatestRound}회`;
        }
        weeklyRoundSelect.onchange = () => {
            const round = Number(weeklyRoundSelect.value);
            if (!round) {
                return;
            }
            loadRound(round);
        };
    }

    function rememberRoundMeta(data) {
        if (!data || !Number.isFinite(Number(data.drwNo))) {
            return;
        }
        const round = Number(data.drwNo);
        const normalizedDate = normalizeRoundDate(data.drwNoDate);
        if (normalizedDate) {
            roundMetaByNo.set(round, normalizedDate);
            refreshRoundSelectLabels();
        }
    }

    function normalizeRoundDate(value) {
        const raw = String(value || '').trim();
        if (!raw) {
            return '';
        }
        const digits = raw.replace(/[^\d]/g, '');
        if (!/^\d{8}$/.test(digits)) {
            return '';
        }
        return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
    }

    function formatRoundOptionLabel(round) {
        const roundNo = Number(round);
        const date = roundMetaByNo.get(roundNo) || estimateRoundDateLabel(roundNo);
        return date ? `${roundNo}회차(${date})` : `${roundNo}회차`;
    }

    function estimateRoundDateLabel(round) {
        if (!Number.isFinite(round) || round < 1) {
            return '';
        }
        // 1회 추첨일(2002-12-07)을 기준으로 주 단위 계산
        const firstDrawUtcMs = Date.UTC(2002, 11, 7);
        const targetUtcMs = firstDrawUtcMs + (Math.trunc(round) - 1) * 7 * 24 * 60 * 60 * 1000;
        const target = new Date(targetUtcMs);
        const yyyy = target.getUTCFullYear();
        const mm = String(target.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(target.getUTCDate()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd}`;
    }

    function refreshRoundSelectLabels() {
        if (!weeklyRoundSelect) {
            return;
        }
        Array.from(weeklyRoundSelect.options).forEach(option => {
            const round = Number(option.value);
            if (Number.isFinite(round) && round > 0) {
                option.textContent = formatRoundOptionLabel(round);
            }
        });
    }

    function syncRoundSearchDefault(round, { force = false } = {}) {
        if (!roundSearchInput || !Number.isFinite(round) || round < 1) {
            return;
        }
        const normalized = String(Math.trunc(round));
        const current = (roundSearchInput.value || '').trim();
        if (force || !current) {
            roundSearchInput.value = normalized;
        }
    }

    async function loadRound(round) {
        const hasWeeklyUi = Boolean(
            weeklyLatestRoundEl ||
            weeklyThisRoundEl ||
            weeklyExpectedAmountEl ||
            weeklyLatestNumbers.some(Boolean)
        );
        if (!hasWeeklyUi) {
            return;
        }
        if (weeklyStatusEl) {
            weeklyStatusEl.textContent = `${round}회차 데이터를 조회하고 있습니다.`;
        }
        const cached = getCachedRound(round);
        if (cached && cached.data) {
            renderWeeklyData(cached.data, { cached: true });
            if (trendChart && (trendChart.classList.contains('is-empty') || !trendChart.children.length)) {
                renderTrendChart([cached.data]);
            }
        }
        try {
            const data = await fetchDrawData(round);
            if (data && data.returnValue === 'success') {
                renderWeeklyData(data, { cached: false });
                if (Number(data.drwNo) === Number(latestAvailableRound)) {
                    cacheWeekly(data);
                } else {
                    cacheRoundOnly(data);
                }
                if (trendChart && (trendChart.classList.contains('is-empty') || !trendChart.children.length)) {
                    renderTrendChart([data]);
                }
                updateRecentActive(round);
            } else if (weeklyStatusEl) {
                weeklyStatusEl.textContent = '해당 회차 데이터가 아직 공개되지 않았습니다.';
            }
        } catch (error) {
            logProxyError('loadRound', error, { round });
            if (!cached && weeklyStatusEl) {
                weeklyStatusEl.textContent = '회차 조회에 실패했습니다. 네트워크를 확인하고 다시 시도해 주세요.';
            }
        }
    }

    async function loadRecentRounds(latestRound) {
        if (!recentRoundsEl) {
            return;
        }
        const count = getRecentCount();
        const rounds = [];
        for (let i = 0; i < count; i += 1) {
            rounds.push(Math.max(1, latestRound - i));
        }
        recentRoundsEl.innerHTML = '';
        recentRoundsEl.classList.add('is-loading');
        const cards = rounds.map(round => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'recent-card';
            card.dataset.round = String(round);
            card.innerHTML = `
                <div class="recent-title">
                    <span>${round}회</span>
                    <span class="recent-date">불러오는 중</span>
                </div>
                <div class="recent-numbers"></div>
            `;
            card.addEventListener('click', () => {
                loadRound(round);
            });
            recentRoundsEl.appendChild(card);
            return { card, round };
        });
        updateRecentActive(latestRound);
        const chartData = [];
        for (const item of cards) {
            const data = await hydrateRecentCard(item.card, item.round);
            if (data) {
                chartData.push(data);
            }
        }
        if (!chartData.length && currentWeeklyData) {
            chartData.push(currentWeeklyData);
        }
        renderTrendChart(chartData);
        recentRoundsEl.classList.remove('is-loading');
        if (!recentRoundsEl.children.length) {
            recentRoundsEl.innerHTML = '<div class="recent-empty">최근 회차 정보를 불러오지 못했습니다.</div>';
        }
    }

    async function hydrateRecentCard(card, round) {
        const cached = getCachedRound(round);
        if (cached && cached.data) {
            fillRecentCard(card, cached.data);
        }
        try {
            const data = await fetchDrawData(round);
            if (data && data.returnValue === 'success') {
                fillRecentCard(card, data);
                cacheRoundOnly(data);
                return data;
            }
        } catch (error) {
            logProxyError('recentCard', error, { round });
        }
        if (!cached?.data) {
            fillRecentCard(card, { drwNo: round, drwNoDate: '-', drwtNo1: '-', drwtNo2: '-', drwtNo3: '-', drwtNo4: '-', drwtNo5: '-', drwtNo6: '-' });
        }
        return cached?.data || null;
    }

    function fillRecentCard(card, data) {
        rememberRoundMeta(data);
        const dateEl = card.querySelector('.recent-date');
        const numbersEl = card.querySelector('.recent-numbers');
        if (dateEl) {
            dateEl.textContent = data.drwNoDate || '-';
        }
        if (numbersEl) {
            numbersEl.innerHTML = '';
            [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6]
                .filter(Boolean)
                .forEach(value => {
                    const el = document.createElement('div');
                    el.className = 'number';
                    el.textContent = value;
                    numbersEl.appendChild(el);
                });
        }
    }

    function updateRecentActive(round) {
        if (!recentRoundsEl) {
            return;
        }
        Array.from(recentRoundsEl.querySelectorAll('.recent-card')).forEach(card => {
            card.classList.toggle('is-active', card.dataset.round === String(round));
        });
    }

    function renderTrendChart(dataList) {
        if (!trendChart) {
            return;
        }
        if (!dataList.length) {
            trendChart.classList.add('is-empty');
            trendChart.innerHTML = '<div class="trend-empty">최근 회차 데이터를 불러오는 중입니다.</div>';
            return;
        }
        const byRoundAsc = dataList
            .filter(Boolean)
            .map(data => ({
                ...data,
                firstWinamntNum: Number(data.firstWinamnt || 0),
                firstPrzwnerCoNum: Number(data.firstPrzwnerCo || 0)
            }))
            .filter(data => Number.isFinite(data.firstWinamntNum) && data.firstWinamntNum > 0)
            .sort((a, b) => a.drwNo - b.drwNo);
        if (!byRoundAsc.length) {
            trendChart.classList.add('is-empty');
            trendChart.innerHTML = '<div class="trend-empty">표시할 당첨금 데이터가 부족합니다. 회차를 변경해 주세요.</div>';
            return;
        }
        trendChart.classList.remove('is-empty');
        const rows = byRoundAsc.slice().sort((a, b) => b.drwNo - a.drwNo);
        const latest = byRoundAsc[byRoundAsc.length - 1];
        const previous = byRoundAsc.length > 1 ? byRoundAsc[byRoundAsc.length - 2] : null;
        const peak = byRoundAsc.reduce((best, current) => (current.firstWinamntNum > best.firstWinamntNum ? current : best), byRoundAsc[0]);
        const average = Math.round(
            byRoundAsc.reduce((sum, item) => sum + item.firstWinamntNum, 0) / byRoundAsc.length
        );
        const changeRate = previous && previous.firstWinamntNum > 0
            ? ((latest.firstWinamntNum - previous.firstWinamntNum) / previous.firstWinamntNum) * 100
            : null;
        const maxValue = Math.max(...byRoundAsc.map(item => item.firstWinamntNum), 1);

        trendChart.innerHTML = `
            <div class="trend-insight-grid">
                <div class="trend-metric">
                    <span class="trend-metric-label">최신 1등 당첨금</span>
                    <strong>${formatKrwCompact(latest.firstWinamntNum)}</strong>
                    <span class="trend-metric-sub">${latest.drwNo}회</span>
                </div>
                <div class="trend-metric">
                    <span class="trend-metric-label">최근 최대 당첨금</span>
                    <strong>${formatKrwCompact(peak.firstWinamntNum)}</strong>
                    <span class="trend-metric-sub">${peak.drwNo}회</span>
                </div>
                <div class="trend-metric">
                    <span class="trend-metric-label">최근 평균 당첨금</span>
                    <strong>${formatKrwCompact(average)}</strong>
                    <span class="trend-metric-sub">${byRoundAsc.length}회 평균</span>
                </div>
                <div class="trend-metric">
                    <span class="trend-metric-label">직전 회차 대비</span>
                    <strong>${formatChangePercent(changeRate)}</strong>
                    <span class="trend-metric-sub">${previous ? `${previous.drwNo}회 대비` : '비교 데이터 없음'}</span>
                </div>
            </div>
            <div class="trend-rows"></div>
        `;

        const rowsEl = trendChart.querySelector('.trend-rows');
        rows.forEach(item => {
            const ratio = Math.max(0.08, item.firstWinamntNum / maxValue);
            const perWinner = item.firstPrzwnerCoNum > 0
                ? Math.round(item.firstWinamntNum / item.firstPrzwnerCoNum)
                : item.firstWinamntNum;
            const row = document.createElement('div');
            row.className = 'trend-row';
            row.innerHTML = `
                <div class="trend-row-head">
                    <span class="trend-round">${item.drwNo}회 ${normalizeRoundDate(item.drwNoDate) || ''}</span>
                    <strong class="trend-amount">${formatKrwCompact(item.firstWinamntNum)}</strong>
                </div>
                <div class="trend-track"><div class="trend-fill" style="width:${Math.round(ratio * 100)}%"></div></div>
                <div class="trend-row-sub">당첨자 ${formatNumber(item.firstPrzwnerCoNum || 0)}명 · 1인당 약 ${formatKrwCompact(perWinner)}</div>
            `;
            rowsEl.appendChild(row);
        });
    }

    function formatKrwCompact(value) {
        const amount = Number(value || 0);
        if (!Number.isFinite(amount) || amount <= 0) {
            return '-';
        }
        if (amount >= 100000000) {
            return `${(amount / 100000000).toFixed(1)}억원`;
        }
        if (amount >= 10000) {
            return `${Math.round(amount / 10000).toLocaleString('ko-KR')}만원`;
        }
        return `${formatNumber(Math.round(amount))}원`;
    }

    function formatChangePercent(value) {
        if (!Number.isFinite(value)) {
            return '-';
        }
        const sign = value > 0 ? '+' : '';
        return `${sign}${value.toFixed(1)}%`;
    }

    function getRecentCount() {
        if (!recentCountSelect) {
            return 8;
        }
        const value = Number(recentCountSelect.value);
        return Number.isFinite(value) ? value : 8;
    }

    function handleCompare() {
        if (!compareInput || !compareResult) {
            return;
        }
        if (!currentWeeklyData) {
            updateCompareResult('회차 정보를 불러온 뒤 비교할 수 있습니다.');
            return;
        }
        const raw = compareInput.value || '';
        const nums = raw
            .split(/[,\s]+/)
            .map(value => Number(value))
            .filter(value => Number.isInteger(value));
        const unique = Array.from(new Set(nums));
        if (unique.length !== 6 || unique.some(n => n < 1 || n > 45)) {
            updateCompareResult('1~45 사이의 숫자 6개를 중복 없이 입력해 주세요.');
            return;
        }
        const bonus = compareBonusInput ? Number(compareBonusInput.value) : 0;
        const winning = new Set([
            currentWeeklyData.drwtNo1,
            currentWeeklyData.drwtNo2,
            currentWeeklyData.drwtNo3,
            currentWeeklyData.drwtNo4,
            currentWeeklyData.drwtNo5,
            currentWeeklyData.drwtNo6
        ]);
        const matchCount = unique.filter(n => winning.has(n)).length;
        const bonusMatch = bonus ? bonus === currentWeeklyData.bnusNo : false;
        const rank = getRank(matchCount, bonusMatch);
        updateCompareResult(`일치 ${matchCount}개${bonusMatch ? ' + 보너스' : ''} → ${rank}`);
    }

    function getRank(matchCount, bonusMatch) {
        if (matchCount === 6) {
            return '1등';
        }
        if (matchCount === 5 && bonusMatch) {
            return '2등';
        }
        if (matchCount === 5) {
            return '3등';
        }
        if (matchCount === 4) {
            return '4등';
        }
        if (matchCount === 3) {
            return '5등';
        }
        return '아쉽게도 미당첨';
    }

    function updateCompareResult(message) {
        if (compareResult) {
            compareResult.textContent = message;
        }
    }

    function logProxyError(stage, error, meta = {}) {
        console.warn(`[lotto-proxy] ${stage}`, { error, ...meta });
    }

});
