document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.querySelector('.numbers-container');
    const generateBtn = document.getElementById('generate-btn');
    const generateCtaBtn = document.querySelector('[data-generate-cta]');
    const drawCountSelect = document.getElementById('draw-count');
    const drawCountChips = Array.from(document.querySelectorAll('.draw-count-chip[data-draw-count]'));
    const drawCopyAllBtn = document.getElementById('draw-copy-all-btn');
    const drawCopyStatusEl = document.getElementById('draw-copy-status');
    const insightsUpdatedEl = document.getElementById('insights-updated');
    const insightSelectedRulesEl = document.getElementById('insight-selected-rules');
    const insightRemainingRatioEl = document.getElementById('insight-remaining-ratio');
    const insightBenefitEl = document.getElementById('insight-benefit');
    const insightMeterFillEl = document.getElementById('insight-meter-fill');
    const insightMeterLabelEl = document.getElementById('insight-meter-label');
    const insightRemainingCombosEl = document.getElementById('insight-remaining-combos');
    const insightExcludedCombosEl = document.getElementById('insight-excluded-combos');
    const insightOddsEls = {
        1: document.getElementById('insight-odds-1'),
        2: document.getElementById('insight-odds-2'),
        3: document.getElementById('insight-odds-3'),
        4: document.getElementById('insight-odds-4'),
        5: document.getElementById('insight-odds-5')
    };
    const insightScenarioListEl = document.getElementById('insight-scenario-list');
    const insightGeneratedListEl = document.getElementById('insight-generated-list');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const ruleInputs = Array.from(document.querySelectorAll('.rules-grid input[type="checkbox"]'));
    const excludeNumberGrid = document.getElementById('exclude-number-grid');
    const excludeNumberCard = document.getElementById('exclude-number-card');
    const excludeNumberTitle = document.getElementById('exclude-number-title');
    const excludeNumberRule = document.getElementById('exclude-number-rule');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll('a')) : [];
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
    const scenarioTracks = Array.from(document.querySelectorAll('.scenario-cards'));
    const SCENARIO_DRAG_THRESHOLD_PX = 12;
    const SCENARIO_CLICK_SUPPRESS_MS = 220;
    let suppressScenarioClickUntil = 0;
    let drawWidthSyncRafId = 0;
    let activeStrategy = '';
    // Filled later with Object.assign to avoid temporal-dead-zone access during early init.
    const PRESETS = {};
    const PRESETS_LABEL = {};
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
    const authModal = document.getElementById('auth-modal');
    const authButtons = Array.from(document.querySelectorAll('[data-auth]'));
    const authEntryLinks = Array.from(document.querySelectorAll('[data-open-auth]'));
    const authLogoutButtons = Array.from(document.querySelectorAll('[data-logout]'));
    const authClose = authModal ? authModal.querySelector('.modal-close') : null;
    const firebaseAuthStatusEl = document.getElementById('firebase-auth-status');
    const mypageAuthBadgeEl = document.getElementById('mypage-auth-badge');
    const mypageNicknameDisplayEl = document.getElementById('mypage-nickname-display');
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

    const RULE_SAMPLE_MAP = {
        all_odd: [1, 3, 5, 7, 9, 11],
        all_even: [2, 4, 6, 8, 10, 12],
        five_odd_one_even: [1, 3, 5, 7, 9, 12],
        five_even_one_odd: [2, 4, 6, 8, 10, 13],
        four_odd_two_even: [1, 3, 5, 7, 10, 12],
        four_even_two_odd: [2, 4, 6, 8, 11, 13],
        multiples_of_2_4_plus: [2, 4, 6, 8, 11, 13],
        multiples_of_2_5_plus: [2, 4, 6, 8, 10, 13],
        multiples_of_3_3_plus: [3, 6, 9, 12, 22, 31],
        multiples_of_4_3_plus: [4, 8, 12, 19, 27, 33],
        multiples_of_5_3_plus: [5, 10, 15, 22, 31, 37],
        multiples_of_6_3_plus: [6, 12, 18, 25, 33, 41],
        multiples_of_7_3_plus: [7, 14, 21, 26, 34, 42],
        consecutive_3_plus: [4, 5, 6, 18, 29, 41],
        consecutive_4_plus: [9, 10, 11, 12, 25, 38],
        same_last_digit_3_plus: [1, 11, 21, 4, 18, 33],
        same_last_digit_4_plus: [2, 12, 22, 32, 7, 19],
        last_digit_2_plus: [3, 13, 24, 35, 7, 18],
        last_digit_zero_2_plus: [10, 20, 28, 33, 41, 5],
        last_digit_five_2_plus: [5, 15, 23, 34, 42, 45],
        same_decade_4_plus: [1, 4, 7, 9, 12, 33],
        same_decade_5_plus: [2, 4, 6, 8, 9, 21],
        all_low_or_high: [1, 4, 7, 12, 18, 22],
        low_or_high_5_plus: [1, 3, 8, 12, 18, 24],
        low_1_15_4_plus: [1, 4, 7, 11, 22, 33],
        mid_16_30_4_plus: [16, 19, 22, 28, 7, 41],
        high_31_45_4_plus: [31, 34, 38, 41, 9, 20],
        tight_range: [5, 7, 9, 12, 18, 22],
        extreme_sum: [1, 3, 5, 7, 9, 11],
        sum_low_100: [1, 5, 7, 12, 20, 24],
        sum_high_180: [30, 31, 32, 33, 34, 35],
        prime_4_plus: [2, 3, 5, 7, 11, 20],
        prime_5_plus: [2, 3, 5, 7, 11, 26],
        prime_1_or_less: [4, 8, 12, 16, 18, 23],
        prime_0: [4, 8, 12, 16, 18, 22]
    };

    function getSampleBallClass(number) {
        if (number <= 10) {
            return 'range-1';
        }
        if (number <= 20) {
            return 'range-2';
        }
        if (number <= 30) {
            return 'range-3';
        }
        if (number <= 40) {
            return 'range-4';
        }
        return 'range-5';
    }

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
    const storeStatusEl = document.getElementById('store-status');
    const storeLocateBtn = document.getElementById('store-locate-btn');
    const storeRetryBtn = document.getElementById('store-retry-btn');
    const storeRadiusSelect = document.getElementById('store-radius');
    const storeMapEl = document.getElementById('store-map');
    const storeTableBodyEl = document.getElementById('store-table-body');
    const storeTableEmptyEl = document.getElementById('store-table-empty');
    const storeGridEl = document.getElementById('store-grid');
    const storeGridEmptyEl = document.getElementById('store-grid-empty');
    const storeNearestRouteBtn = document.getElementById('store-nearest-route-btn');
    const storeSwitchQrBtn = document.getElementById('store-switch-qr-btn');
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
    let currentWeeklyData = null;
    let latestAvailableRound = null;
    const roundMetaByNo = new Map();
    let storeMap = null;
    let storeMarkersLayer = null;
    let storeUserMarker = null;
    let storeLastPosition = null;
    let storeLastResults = [];
    let storeAutoLoaded = false;
    let storeLocateInFlight = false;
    let firebaseReady = false;
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
    const DRAW_ENTRY_LOCAL_KEY = 'lotto_guest_tracking_id';
    let guestTrackingId = '';

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

    function normalizeWeeklyLinks() {
        const root = document.getElementById('tab-weekly');
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
    }

    function normalizeDashboardLinks() {
        const root = document.getElementById('tab-dashboard');
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

    const TOTAL_COMBOS = Number(combination(45, 6));
    const RULE_STATS = {
        all_odd: { ratio: 0.012025, excluded: 97944 },
        all_even: { ratio: 0.00951, excluded: 77460 },
        five_odd_one_even: { ratio: 0.09058, excluded: 737780 },
        five_even_one_odd: { ratio: 0.073665, excluded: 600006 },
        four_odd_two_even: { ratio: 0.251035, excluded: 2044695 },
        four_even_two_odd: { ratio: 0.228525, excluded: 1861350 },
        multiples_of_2_4_plus: { ratio: 0.3117, excluded: 2538815 },
        multiples_of_3_3_plus: { ratio: 0.31203, excluded: 2541503 },
        multiples_of_4_3_plus: { ratio: 0.14519, excluded: 1182581 },
        multiples_of_5_3_plus: { ratio: 0.08387, excluded: 683126 },
        multiples_of_6_3_plus: { ratio: 0.03924, excluded: 319612 },
        multiples_of_7_3_plus: { ratio: 0.02339, excluded: 190513 },
        consecutive_3_plus: { ratio: 0.056345, excluded: 458933 },
        consecutive_4_plus: { ratio: 0.00392, excluded: 31929 },
        same_last_digit_3_plus: { ratio: 0.089535, excluded: 729268 },
        same_last_digit_4_plus: { ratio: 0.003015, excluded: 24557 },
        last_digit_2_plus: { ratio: 0.79074, excluded: 6440625 },
        last_digit_zero_2_plus: { ratio: 0.08012, excluded: 652582 },
        last_digit_five_2_plus: { ratio: 0.12398, excluded: 1009825 },
        same_decade_4_plus: { ratio: 0.06101, excluded: 496930 },
        same_decade_5_plus: { ratio: 0.004055, excluded: 33028 },
        all_low_or_high: { ratio: 0.02172, excluded: 176911 },
        low_or_high_5_plus: { ratio: 0.187055, excluded: 1523574 },
        low_1_15_4_plus: { ratio: 0.08482, excluded: 690864 },
        mid_16_30_4_plus: { ratio: 0.08415, excluded: 685407 },
        high_31_45_4_plus: { ratio: 0.083835, excluded: 682841 },
        tight_range: { ratio: 0.040695, excluded: 331463 },
        extreme_sum: { ratio: 0.045385, excluded: 369664 },
        sum_low_100: { ratio: 0.10913, excluded: 888870 },
        sum_high_180: { ratio: 0.085025, excluded: 692534 },
        prime_4_plus: { ratio: 0.065145, excluded: 530610 },
        prime_5_plus: { ratio: 0.00799, excluded: 65065 },
        prime_1_or_less: { ratio: 0.38143, excluded: 3106770 },
        prime_0: { ratio: 0.089945, excluded: 732607 },
        multiples_of_2_5_plus: { ratio: 0.082585, excluded: 672660 }
    };

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            if (!canGuestGenerate()) {
                openAuthModal();
                return;
            }
            generateAndDisplayNumbers();
            incrementGuestCount();
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
            showActionPopup('월정액 결제 연동 전입니다. 결제 연동 후 이용권 시작 버튼에 연결됩니다.');
        });
    }

    premiumPlanBuyButtons.forEach(button => {
        button.addEventListener('click', event => {
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
            showActionPopup(`${planMeta.name} (${planMeta.price}) 결제 연동은 준비 중입니다. 결제 연결 후 활성화됩니다.`);
        });
    });

    if (drawCountSelect) {
        drawCountSelect.addEventListener('change', () => {
            syncDrawCountChips();
            refreshGuestLimitMessage();
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
            });
        });
        syncDrawCountChips();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', nextTheme);
            syncThemeToggle();
        });
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
            if (generateBtn) {
                generateBtn.click();
            } else if (typeof generateAndDisplayNumbers === 'function') {
                generateAndDisplayNumbers();
            }
        });
    }

    if (recentCountSelect) {
        recentCountSelect.addEventListener('change', () => {
            if (latestAvailableRound) {
                loadRecentRounds(latestAvailableRound);
            }
        });
    }

    if (storeLocateBtn) {
        storeLocateBtn.addEventListener('click', () => {
            locateAndLoadStores();
        });
    }

    if (storeRetryBtn) {
        storeRetryBtn.addEventListener('click', () => {
            if (storeLastPosition) {
                loadNearbyStores(storeLastPosition);
                return;
            }
            locateAndLoadStores();
        });
    }

    if (storeRadiusSelect) {
        storeRadiusSelect.addEventListener('change', () => {
            if (storeLastPosition) {
                loadNearbyStores(storeLastPosition);
            }
        });
    }

    if (storeNearestRouteBtn) {
        storeNearestRouteBtn.addEventListener('click', () => {
            if (!storeLastResults.length) {
                if (storeStatusEl) {
                    storeStatusEl.textContent = '먼저 현재 위치로 판매점을 조회한 뒤 길찾기를 이용해 주세요.';
                }
                return;
            }
            const nearest = storeLastResults[0];
            const url = `https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}`;
            window.location.assign(url);
        });
    }

    if (storeSwitchQrBtn) {
        storeSwitchQrBtn.addEventListener('click', () => {
            setActiveTab('qr', true);
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

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveTab(button.dataset.tab, true);
        });
    });

    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            setActiveTab(link.dataset.tabLink, false);
            syncMenuState(false);
        });
    });

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
        card.removeAttribute('onclick');
        card.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            if (Date.now() < suppressScenarioClickUntil) {
                return;
            }
            applyStrategy(card.dataset.strategy);
        });
    });

    window.applyStrategyFromUI = applyStrategy;

    scenarioTracks.forEach(track => {
        const pointerStarts = new Map();
        let touchStartX = 0;
        let touchStartY = 0;
        let touchDragging = false;
        let touchTracking = false;

        const suppressClick = () => {
            suppressScenarioClickUntil = Math.max(
                suppressScenarioClickUntil,
                Date.now() + SCENARIO_CLICK_SUPPRESS_MS
            );
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
            if (Date.now() < suppressScenarioClickUntil) {
                event.preventDefault();
                event.stopPropagation();
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

    if (saveRulesBtn) {
        saveRulesBtn.addEventListener('click', () => {
            const selected = ruleInputs.filter(input => input.checked).map(input => input.value);
            localStorage.setItem('lotto_rules', JSON.stringify(selected));
            updateRulesStatus('선택한 규칙을 저장했습니다.');
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
            updateRulesStatus('내 프리셋을 저장했습니다.');
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
            const ids = JSON.parse(saved);
            setRulesByIds(ids);
            syncStrategyButtons('');
            syncGroupLevelButtons();
            updateRulesStatus('내 프리셋을 적용했습니다.');
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
            updateSelectionCount();
            updateCombinedEstimates();
            syncStrategyButtons('');
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
            if (input.value === 'exclude_number' && !input.checked && excludeNumberValues.size) {
                excludeNumberValues.clear();
                if (excludeNumberGrid) {
                    excludeNumberGrid.querySelectorAll('button.is-active').forEach(button => {
                        button.classList.remove('is-active');
                    });
                }
                localStorage.removeItem('lotto_exclude_numbers');
                updateExcludeNumberLabel();
            }
            updateSelectionCount();
            updateCombinedEstimates();
            syncStrategyButtons('');
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

    if (selectedClearBtn) {
        selectedClearBtn.addEventListener('click', () => {
            setRulesByIds([]);
            syncStrategyButtons('clear');
            syncGroupLevelButtons();
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
        initFirebase();
        guestTrackingId = getOrCreateGuestTrackingId();
        syncThemeToggle();
        syncMenuState(false);
        setupExcludeNumberControl();
        applySavedRules();
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
    } catch (error) {
        console.error('초기화 오류', error);
    }
    updateScenarioMetrics();
    fetchLatestDraw();
    fetchWeeklyIntroInfo();
    window.setInterval(() => {
        fetchWeeklyIntroInfo();
    }, 10000);

    function generateAndDisplayNumbers() {
        const drawCount = parseInt(drawCountSelect.value, 10);
        const activeRules = getActiveRules();
        const draws = [];
        for (let i = 0; i < drawCount; i += 1) {
            const numbers = generateNumbersWithRules(activeRules);
            draws.push(numbers);
        }
        displayNumbers(draws, {
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
        return activeRules.some(rule => rule.exclude(numbers));
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
        setDrawCopyStatus('');
        if (lastGeneratedDraws.length) {
            persistGeneratedEntries(lastGeneratedDraws, {
                sourceMode: 'self',
                ruleIds: options.ruleIds
            });
        }
        refreshInsightsDashboard();
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
        const saved = localStorage.getItem('lotto_draw_service_mode');
        return saved === 'premium' ? 'premium' : 'self';
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
        } catch (error) {
            console.warn('번호 저장 실패(draw_entries)', error);
        }
    }

    function isPremiumMember() {
        if (!isMember()) {
            return false;
        }
        return getMembershipTier() === 'premium';
    }

    function setDrawServiceMode(mode) {
        const nextMode = mode === 'premium' ? 'premium' : 'self';
        localStorage.setItem('lotto_draw_service_mode', nextMode);
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
        const premium = isPremiumMember();
        if (premiumBadgeEl) {
            premiumBadgeEl.textContent = premium ? 'PREMIUM' : 'FREE';
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
                premiumUpgradeBtn.textContent = '월정액 이용중';
            } else {
                premiumUpgradeBtn.textContent = '월정액 시작하기';
            }
        }
        if (!premium) {
            setPremiumCopyButtonState(false);
            if (!lastPremiumDraws.length) {
                updatePremiumCopyStatus('월정액 이용권 활성화 시 추천번호를 제공합니다.');
            }
        }
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
            persistGeneratedEntries(draws, {
                sourceMode: 'premium'
            });
        }
        refreshInsightsDashboard();
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
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = 'Firebase SDK 로딩 실패: 네트워크 또는 스크립트 로딩 상태를 확인하세요.';
            }
            return;
        }

        const config = window.LOTTO_FIREBASE_CONFIG || {};
        if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
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
                        nicknameStatusEl.textContent = '프로필을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.';
                    }
                }
                updateAuthUi();
                refreshGuestLimitMessage();
            });
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = 'Firebase 연결 완료. 구글 로그인으로 가입을 시작하세요.';
            }
        } catch (error) {
            firebaseReady = false;
            console.error('Firebase 초기화 실패', error);
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = 'Firebase 초기화 실패: 설정값/도메인/콘솔 오류를 확인하세요.';
            }
        }
        updateAuthUi();
    }

    function isMember() {
        return Boolean(currentUser);
    }

    function updateAuthUi() {
        const member = isMember();
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
        firebaseAuthStatusEl.textContent = '로그아웃 상태입니다. 구글 로그인을 진행하세요.';
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
        window.alert(message);
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
                createdAt: serverNow,
                updatedAt: serverNow,
                nicknameUpdatedAt: serverNow,
                nicknameChangeMonth: nowMonthKey,
                nicknameChangeCount: 0
            };
            await profileRef.set(initialProfile);
            currentUserProfile = initialProfile;
            if (nicknameStatusEl) {
                nicknameStatusEl.textContent = `가입 완료: 자동 닉네임 '${nickname}'이(가) 생성되었습니다.`;
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
            mypageAuthBadgeEl.textContent = member ? '가입완료' : '미로그인';
        }
        if (mypageNicknameDisplayEl) {
            if (!member) {
                mypageNicknameDisplayEl.textContent = '첫 로그인 시 8자리 랜덤 닉네임 자동 부여';
            } else if (currentUserProfile && currentUserProfile.nickname) {
                mypageNicknameDisplayEl.textContent = currentUserProfile.nickname;
            } else {
                mypageNicknameDisplayEl.textContent = '닉네임 불러오는 중...';
            }
        }
        const remaining = getNicknameRemainingChanges();
        if (nicknameStatusEl && !member) {
            nicknameStatusEl.textContent = '닉네임은 회원가입(첫 로그인) 시 자동 생성되며 월 최대 2회 변경할 수 있습니다.';
        } else if (nicknameStatusEl && member) {
            nicknameStatusEl.textContent = `닉네임은 이번 달에 최대 2회까지 변경할 수 있습니다. (남은 횟수 ${remaining}회)`;
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

    function syncThemeToggle() {
        if (!themeToggle) {
            return;
        }
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? '라이트 모드' : '다크 모드');
        themeToggle.setAttribute('title', currentTheme === 'dark' ? '라이트 모드' : '다크 모드');
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
            syncDrawHorizontalCardWidths();
        });
    }

    function syncDrawHorizontalCardWidths() {
        if (!drawTabPanel || !drawHorizontalTracks.length) {
            return;
        }
        const viewportWidth = Math.floor(getViewportWidth());
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

    function syncInitialTab() {
        if (!tabButtons.length || !tabPanels.length) {
            return;
        }
        const hash = window.location.hash;
        if (hash && hash.startsWith('#tab-')) {
            const target = hash.replace('#tab-', '');
            setActiveTab(target, false, false);
        } else {
            setActiveTab('dashboard', false, false);
        }
    }

    function setActiveTab(tabId, focusPanel, updateHash = true) {
        if (!tabId) {
            return;
        }
        if (tabId !== 'draw') {
            setRulePickerOpen(false);
        }
        const targetPanelId = `tab-${tabId}`;
        const targetPanel = tabPanels.find(panel => panel.id === targetPanelId);
        if (!targetPanel) {
            return;
        }
        tabButtons.forEach(button => {
            const isActive = button.dataset.tab === tabId;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', String(isActive));
        });
        tabPanels.forEach(panel => {
            panel.classList.toggle('is-active', panel.id === targetPanelId);
        });
        tabLinks.forEach(link => {
            link.classList.toggle('is-active', link.dataset.tabLink === tabId);
        });
        if (updateHash) {
            history.replaceState(null, '', `#${targetPanelId}`);
        }
        if (tabId === 'store') {
            window.setTimeout(() => {
                if (storeMap && typeof storeMap.invalidateSize === 'function') {
                    storeMap.invalidateSize();
                }
            }, 80);
            if (!storeAutoLoaded && !storeLocateInFlight && !storeLastPosition) {
                storeAutoLoaded = true;
                locateAndLoadStores();
            }
        }
        if (tabId === 'draw') {
            scheduleDrawHorizontalWidthSync();
        }
        if (tabId === 'insights') {
            refreshInsightsDashboard();
        }
        if (tabId === 'qr') {
            startQrScanner();
        }
        if (tabId !== 'qr' && qrStream) {
            stopQrScanner('QR 탭을 벗어나 스캔을 중지했습니다.');
        }
        if (focusPanel) {
            targetPanel.focus({ preventScroll: true });
            targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function locateAndLoadStores() {
        if (!storeStatusEl) {
            return;
        }
        if (storeLocateInFlight) {
            return;
        }
        if (!navigator.geolocation) {
            storeStatusEl.textContent = '현재 브라우저에서는 위치 조회를 지원하지 않습니다.';
            return;
        }
        storeLocateInFlight = true;
        storeStatusEl.textContent = '현재 위치 확인 중입니다. 위치 권한을 허용해 주세요.';
        navigator.geolocation.getCurrentPosition(
            position => {
                storeLocateInFlight = false;
                storeLastPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                loadNearbyStores(storeLastPosition);
            },
            error => {
                storeLocateInFlight = false;
                storeAutoLoaded = false;
                const message = mapGeoError(error);
                storeStatusEl.textContent = message;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    }

    async function loadNearbyStores(position) {
        if (!position || !Number.isFinite(position.lat) || !Number.isFinite(position.lng)) {
            return;
        }
        if (!storeStatusEl) {
            return;
        }
        storeStatusEl.textContent = '주변 판매점을 조회하고 있습니다. 잠시만 기다려 주세요.';
        const map = ensureStoreMap(position);
        if (map) {
            map.setView([position.lat, position.lng], 15);
            if (storeUserMarker) {
                storeUserMarker.setLatLng([position.lat, position.lng]);
            } else {
                storeUserMarker = window.L.marker([position.lat, position.lng], {
                    icon: window.L.divIcon({
                        className: 'user-pin leaflet-div-icon',
                        iconSize: [14, 14],
                        iconAnchor: [7, 7]
                    }),
                    title: '현재 위치'
                }).addTo(map).bindPopup('현재 위치');
            }
        }

        const radius = getStoreRadius();
        try {
            const stores = await fetchNearbyStores(position, radius);
            renderStoreResults(stores, position);
            storeStatusEl.textContent = stores.length
                ? `반경 ${Math.round(radius / 1000 * 10) / 10}km 내 판매점 ${stores.length}곳을 찾았습니다. 하단 버튼으로 길찾기 또는 QR 스캔으로 이동하세요.`
                : '주변 판매점이 적게 검색되었습니다. 반경을 3km 이상으로 넓혀 다시 조회해 주세요.';
        } catch (error) {
            logProxyError('storeFinder', error, { position, radius });
            renderStoreResults([], position);
            const detail = error && error.message ? ` (${error.message})` : '';
            storeStatusEl.textContent = `판매점 데이터를 불러오지 못했습니다. API 경로 또는 네트워크를 확인해 주세요.${detail}`;
        }
    }

    function ensureStoreMap(center) {
        if (!storeMapEl) {
            if (storeStatusEl) {
                storeStatusEl.textContent = '지도를 초기화하지 못했습니다. 페이지를 새로고침해 주세요.';
            }
            return null;
        }
        if (!window.L) {
            if (storeMapEl) {
                storeMapEl.innerHTML = '<div class="store-empty">지도를 불러오지 못했습니다. 목록/그리드는 정상 조회됩니다.</div>';
            }
            return null;
        }
        if (!storeMap) {
            storeMap = window.L.map(storeMapEl, {
                zoomControl: true
            }).setView([center.lat, center.lng], 14);
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap'
            }).addTo(storeMap);
            storeMarkersLayer = window.L.layerGroup().addTo(storeMap);
        }
        return storeMap;
    }

    async function fetchNearbyStores(position, radius) {
        const proxyCandidates = getStoreProxyCandidates();
        const params = new URLSearchParams({
            lat: String(position.lat),
            lng: String(position.lng),
            radius: String(radius)
        });
        const errors = [];

        for (const proxyBase of proxyCandidates) {
            const url = `${proxyBase}?${params.toString()}`;
            try {
                const payload = await fetchStoreProxyPayload(url);
                const list = Array.isArray(payload.stores) ? payload.stores : [];
                return list
                    .map(item => ({
                        name: item.name || '복권 판매점',
                        address: item.address || '',
                        lat: Number(item.lat),
                        lng: Number(item.lng),
                        distance: Number.isFinite(Number(item.distance))
                            ? Number(item.distance)
                            : distanceInMeters(position.lat, position.lng, Number(item.lat), Number(item.lng))
                    }))
                    .filter(item => Number.isFinite(item.lat) && Number.isFinite(item.lng))
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 30);
            } catch (error) {
                errors.push(`${proxyBase}: ${error && error.message ? error.message : String(error)}`);
            }
        }

        throw new Error(errors.join(' | ') || 'store proxy unavailable');
    }

    async function fetchStoreProxyPayload(url) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 8000);
        try {
            const response = await fetch(url, {
                cache: 'no-store',
                signal: controller.signal
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const payload = await response.json();
            if (!payload || payload.returnValue !== 'success') {
                throw new Error(payload?.message || 'invalid payload');
            }
            return payload;
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function getStoreProxyCandidates() {
        const raw = [
            window.STORE_PROXY_URL,
            '/api/stores',
            '/functions/api/stores',
            '/.netlify/functions/stores'
        ];
        return raw
            .map(value => String(value || '').trim())
            .filter(Boolean)
            .filter((value, index, arr) => arr.indexOf(value) === index);
    }

    function renderStoreResults(stores, position) {
        storeLastResults = Array.isArray(stores) ? stores : [];
        if (storeMarkersLayer) {
            storeMarkersLayer.clearLayers();
        }
        if (storeTableBodyEl) {
            storeTableBodyEl.innerHTML = '';
        }
        if (storeTableEmptyEl) {
            storeTableEmptyEl.hidden = true;
        }
        if (storeGridEl) {
            storeGridEl.innerHTML = '';
        }
        if (storeGridEmptyEl) {
            storeGridEmptyEl.hidden = true;
        }
        if (!stores.length) {
            if (storeTableEmptyEl) {
                storeTableEmptyEl.hidden = false;
            }
            if (storeGridEmptyEl) {
                storeGridEmptyEl.hidden = false;
            }
            return;
        }
        stores.forEach((store, index) => {
            if (storeMarkersLayer) {
                window.L.marker([store.lat, store.lng], {
                    icon: window.L.divIcon({
                        className: 'store-pin leaflet-div-icon',
                        iconSize: [14, 14],
                        iconAnchor: [7, 7]
                    }),
                    title: store.name
                })
                    .addTo(storeMarkersLayer)
                    .bindPopup(`${escapeHtml(store.name)}<br>${escapeHtml(store.address || '')}<br>${formatDistance(store.distance)}`);
            }
            if (!storeTableBodyEl) {
                return;
            }
            const row = document.createElement('tr');
            row.tabIndex = 0;
            const routeUrl = getRouteUrl(store);
            row.innerHTML = `
                <td class="store-rank">${index + 1}</td>
                <td><strong>${escapeHtml(store.name)}</strong></td>
                <td>${escapeHtml(store.address || '주소 정보 없음')}</td>
                <td class="store-distance">${formatDistance(store.distance)}</td>
                <td class="store-action"><button type="button" class="store-route-btn">길찾기</button></td>
            `;
            row.addEventListener('click', () => {
                if (storeMap) {
                    storeMap.setView([store.lat, store.lng], 17);
                }
            });
            row.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    row.click();
                }
            });
            const routeBtn = row.querySelector('.store-route-btn');
            if (routeBtn) {
                routeBtn.addEventListener('click', event => {
                    event.stopPropagation();
                    window.location.assign(routeUrl);
                });
            }
            storeTableBodyEl.appendChild(row);

            if (storeGridEl) {
                const card = document.createElement('div');
                card.className = 'store-card';
                card.innerHTML = `
                    <strong>${escapeHtml(store.name)}</strong>
                    <div class="store-meta">${escapeHtml(store.address || '주소 정보 없음')}</div>
                    <div class="store-distance">${formatDistance(store.distance)}</div>
                    <button type="button" class="store-route-btn">길찾기</button>
                `;
                card.addEventListener('click', () => {
                    if (storeMap) {
                        storeMap.setView([store.lat, store.lng], 17);
                    }
                });
                const cardBtn = card.querySelector('.store-route-btn');
                if (cardBtn) {
                    cardBtn.addEventListener('click', event => {
                        event.stopPropagation();
                        window.location.assign(routeUrl);
                    });
                }
                storeGridEl.appendChild(card);
            }
        });

        if (storeMap && stores.length) {
            const bounds = window.L.latLngBounds([
                [position.lat, position.lng],
                ...stores.map(store => [store.lat, store.lng])
            ]);
            storeMap.fitBounds(bounds, { padding: [24, 24], maxZoom: 16 });
            window.setTimeout(() => {
                storeMap.invalidateSize();
            }, 60);
        }
    }

    function getRouteUrl(store) {
        return `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    }

    function getStoreRadius() {
        const value = Number(storeRadiusSelect ? storeRadiusSelect.value : 2000);
        if (!Number.isFinite(value) || value <= 0) {
            return 2000;
        }
        return value;
    }

    function formatDistance(meters) {
        if (!Number.isFinite(meters) || meters < 0) {
            return '-';
        }
        if (meters < 1000) {
            return `${Math.round(meters)}m`;
        }
        return `${(meters / 1000).toFixed(2)}km`;
    }

    function distanceInMeters(lat1, lon1, lat2, lon2) {
        const toRad = degree => degree * (Math.PI / 180);
        const earth = 6371000;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2
            + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        return 2 * earth * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function mapGeoError(error) {
        if (!error || typeof error.code !== 'number') {
            return '위치 정보를 가져오지 못했습니다.';
        }
        if (error.code === 1) {
            return '위치 권한이 거부되었습니다. 브라우저 권한을 허용해 주세요.';
        }
        if (error.code === 2) {
            return '현재 위치를 확인할 수 없습니다. GPS/네트워크 상태를 확인해 주세요.';
        }
        if (error.code === 3) {
            return '위치 요청 시간이 초과되었습니다. 다시 시도해 주세요.';
        }
        return '위치 정보를 가져오지 못했습니다.';
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
        menuToggle.setAttribute('aria-expanded', String(open));
        mobileMenu.setAttribute('aria-hidden', String(!open));
        menuToggle.textContent = open ? '닫기' : '메뉴';
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
    }

    async function fetchDrawData(round) {
        const proxyBase = window.LOTTO_PROXY_URL || '/api/lotto';
        const url = `${proxyBase}?drwNo=${round}`;
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
        return response.json();
    }

    function renderWeeklyData(data, { cached }) {
        rememberRoundMeta(data);
        currentWeeklyData = data;
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
            setRulesByIds([]);
            updateRulesStatus('전략을 초기화했습니다.');
            syncStrategyButtons('clear');
            syncGroupLevelButtons();
            activeStrategy = '';
            return;
        }
        if (strategy && strategy === activeStrategy) {
            setRulesByIds([]);
            updateRulesStatus('전략을 해제했습니다.');
            syncStrategyButtons('');
            syncGroupLevelButtons();
            activeStrategy = '';
            return;
        }
        setRulesByIds(presetIds);
        updateRulesStatus(`${PRESETS_LABEL[strategy] || '전략'}을 적용했습니다.`);
        syncStrategyButtons(strategy);
        syncGroupLevelButtons();
        activeStrategy = strategy || '';
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
        updateSelectionCount();
        updateCombinedEstimates();
        syncStrategyButtons('');
        syncGroupLevelButtons();
        activeStrategy = '';
    }

    function syncStrategyButtons(activeStrategy) {
        strategyButtons.forEach(button => {
            const isActive = activeStrategy && button.dataset.strategy === activeStrategy;
            button.classList.toggle('is-active', Boolean(isActive));
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
    }

    function applyPreset(preset) {
        const presetIds = PRESETS[preset] || [];
        if (preset === 'clear') {
            setRulesByIds([]);
            updateRulesStatus('모든 선택을 해제했습니다.');
            syncStrategyButtons('clear');
            syncGroupLevelButtons();
            return;
        }
        setRulesByIds(presetIds);
        updateRulesStatus(`${PRESETS_LABEL[preset]} 규칙을 적용했습니다.`);
        syncStrategyButtons(preset);
        syncGroupLevelButtons();
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
            setRulesByIds(savedIds);
            syncStrategyButtons('');
            syncGroupLevelButtons();
            if (fromButton) {
                updateRulesStatus('저장된 규칙을 불러왔습니다.');
            }
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
        refreshInsightsDashboard();
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
        refreshInsightsDashboard();
    }

    function refreshInsightsDashboard() {
        if (!insightSelectedRulesEl) {
            return;
        }
        const selectedCount = ruleInputs.filter(input => input.checked).length;
        const ratioPct = Math.max(0, Math.min(100, Math.round(currentRemainingRatio * 1000) / 10));
        const benefitPct = Math.max(0, Math.min(100, Math.round((1 - currentRemainingRatio) * 100)));

        insightSelectedRulesEl.textContent = `${selectedCount}개`;
        if (insightRemainingRatioEl) {
            insightRemainingRatioEl.textContent = `${ratioPct}%`;
        }
        if (insightBenefitEl) {
            insightBenefitEl.textContent = benefitPct > 0 ? `유리 ${benefitPct}%` : '변화 없음';
        }
        if (insightMeterFillEl) {
            insightMeterFillEl.style.width = `${ratioPct}%`;
        }
        if (insightMeterLabelEl) {
            insightMeterLabelEl.textContent = `남은 조합 비중: ${ratioPct}%`;
        }
        if (insightRemainingCombosEl) {
            insightRemainingCombosEl.textContent = `${formatNumber(Math.max(1, currentRemainingCombos || TOTAL_COMBOS))}개`;
        }
        if (insightExcludedCombosEl) {
            insightExcludedCombosEl.textContent = `${formatNumber(Math.max(0, currentExcludedCombos))}개`;
        }

        const baseOdds = {
            1: TOTAL_COMBOS,
            2: Math.round(TOTAL_COMBOS / 6),
            3: Math.round(TOTAL_COMBOS / 228),
            4: Math.round(TOTAL_COMBOS / (combination(6, 4) * combination(39, 2))),
            5: Math.round(TOTAL_COMBOS / (combination(6, 3) * combination(39, 3)))
        };
        Object.entries(baseOdds).forEach(([rank, base]) => {
            const el = insightOddsEls[rank];
            if (!el) {
                return;
            }
            const adjusted = Math.max(1, Math.round(base * Math.max(0.000001, currentRemainingRatio)));
            el.textContent = `${rank}등: 1 / ${formatNumber(base)} → 1 / ${formatNumber(adjusted)}`;
        });

        if (insightScenarioListEl) {
            const scenarios = Object.entries(PRESETS)
                .filter(([key]) => key !== 'clear')
                .map(([key, ids]) => {
                    const ratio = getEstimatedRatioByIds(ids);
                    const excluded = Math.max(0, TOTAL_COMBOS - Math.round(TOTAL_COMBOS * ratio));
                    return {
                        key,
                        label: PRESETS_LABEL[key] || key,
                        excluded
                    };
                })
                .sort((a, b) => b.excluded - a.excluded)
                .slice(0, 4);

            insightScenarioListEl.innerHTML = scenarios.length
                ? scenarios.map(item => `<li><strong>${escapeHtml(item.label)}</strong><span>${formatNumber(item.excluded)} 제외</span></li>`).join('')
                : '<li><strong>데이터 준비중</strong><span>시나리오 계산 대기</span></li>';
        }

        if (insightGeneratedListEl) {
            if (!lastGeneratedDraws.length) {
                insightGeneratedListEl.textContent = '아직 생성된 번호가 없습니다.';
            } else {
                insightGeneratedListEl.textContent = lastGeneratedDraws
                    .map(item => `세트 ${item.setNo}: ${item.numbers.join(', ')}`)
                    .join('\n');
            }
        }

        if (insightsUpdatedEl) {
            const now = new Date();
            insightsUpdatedEl.textContent = `마지막 갱신: ${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        }
    }

    function formatKstDateTime(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    }

    function cacheWeekly(data) {
        try {
            const payload = {
                data,
                ts: Date.now()
            };
            localStorage.setItem('lotto_weekly_cache', JSON.stringify(payload));
            localStorage.setItem('lotto_last_round', String(data.drwNo));
            localStorage.setItem(`lotto_round_${data.drwNo}`, JSON.stringify(payload));
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
                cacheWeekly(data);
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
                cacheWeekly(data);
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


    function combination(n, k) {
        let result = 1;
        for (let i = 1; i <= k; i += 1) {
            result = (result * (n - (k - i))) / i;
        }
        return Math.round(result);
    }

    const RULES = [
        {
            id: 'all_odd',
            exclude: numbers => numbers.every(number => number % 2 === 1)
        },
        {
            id: 'all_even',
            exclude: numbers => numbers.every(number => number % 2 === 0)
        },
        {
            id: 'five_odd_one_even',
            exclude: numbers => countBy(numbers, number => number % 2 === 1) === 5
        },
        {
            id: 'five_even_one_odd',
            exclude: numbers => countBy(numbers, number => number % 2 === 0) === 5
        },
        {
            id: 'four_odd_two_even',
            exclude: numbers => countBy(numbers, number => number % 2 === 1) === 4
        },
        {
            id: 'four_even_two_odd',
            exclude: numbers => countBy(numbers, number => number % 2 === 0) === 4
        },
        {
            id: 'multiples_of_2_4_plus',
            exclude: numbers => countMultiples(numbers, 2) >= 4
        },
        {
            id: 'multiples_of_2_5_plus',
            exclude: numbers => countMultiples(numbers, 2) >= 5
        },
        {
            id: 'multiples_of_3_3_plus',
            exclude: numbers => countMultiples(numbers, 3) >= 3
        },
        {
            id: 'multiples_of_4_3_plus',
            exclude: numbers => countMultiples(numbers, 4) >= 3
        },
        {
            id: 'multiples_of_5_3_plus',
            exclude: numbers => countMultiples(numbers, 5) >= 3
        },
        {
            id: 'multiples_of_6_3_plus',
            exclude: numbers => countMultiples(numbers, 6) >= 3
        },
        {
            id: 'multiples_of_7_3_plus',
            exclude: numbers => countMultiples(numbers, 7) >= 3
        },
        {
            id: 'consecutive_3_plus',
            exclude: numbers => longestConsecutiveRun(numbers) >= 3
        },
        {
            id: 'consecutive_4_plus',
            exclude: numbers => longestConsecutiveRun(numbers) >= 4
        },
        {
            id: 'same_last_digit_3_plus',
            exclude: numbers => maxSameLastDigit(numbers) >= 3
        },
        {
            id: 'same_last_digit_4_plus',
            exclude: numbers => maxSameLastDigit(numbers) >= 4
        },
        {
            id: 'last_digit_2_plus',
            exclude: numbers => maxSameLastDigit(numbers) >= 2
        },
        {
            id: 'last_digit_zero_2_plus',
            exclude: numbers => countBy(numbers, number => number % 10 === 0) >= 2
        },
        {
            id: 'last_digit_five_2_plus',
            exclude: numbers => countBy(numbers, number => number % 10 === 5) >= 2
        },
        {
            id: 'same_decade_4_plus',
            exclude: numbers => maxInSameDecade(numbers) >= 4
        },
        {
            id: 'same_decade_5_plus',
            exclude: numbers => maxInSameDecade(numbers) >= 5
        },
        {
            id: 'all_low_or_high',
            exclude: numbers => numbers.every(number => number <= 22) || numbers.every(number => number >= 23)
        },
        {
            id: 'low_or_high_5_plus',
            exclude: numbers => Math.max(countLow(numbers), countHigh(numbers)) >= 5
        },
        {
            id: 'low_1_15_4_plus',
            exclude: numbers => countBy(numbers, number => number <= 15) >= 4
        },
        {
            id: 'mid_16_30_4_plus',
            exclude: numbers => countBy(numbers, number => number >= 16 && number <= 30) >= 4
        },
        {
            id: 'high_31_45_4_plus',
            exclude: numbers => countBy(numbers, number => number >= 31) >= 4
        },
        {
            id: 'tight_range',
            exclude: numbers => (numbers[numbers.length - 1] - numbers[0]) < 20
        },
        {
            id: 'extreme_sum',
            exclude: numbers => {
                const sum = numbers.reduce((acc, number) => acc + number, 0);
                return sum <= 80 || sum >= 200;
            }
        },
        {
            id: 'sum_low_100',
            exclude: numbers => numbers.reduce((acc, number) => acc + number, 0) <= 100
        },
        {
            id: 'sum_high_180',
            exclude: numbers => numbers.reduce((acc, number) => acc + number, 0) >= 180
        },
        {
            id: 'prime_4_plus',
            exclude: numbers => countPrimes(numbers) >= 4
        },
        {
            id: 'prime_5_plus',
            exclude: numbers => countPrimes(numbers) >= 5
        },
        {
            id: 'prime_1_or_less',
            exclude: numbers => countPrimes(numbers) <= 1
        },
        {
            id: 'prime_0',
            exclude: numbers => countPrimes(numbers) === 0
        },
        {
            id: 'exclude_number',
            exclude: numbers => {
                if (!excludeNumberValues.size) {
                    return false;
                }
                return numbers.some(number => excludeNumberValues.has(number));
            }
        }
    ];

    Object.assign(PRESETS, {
        light: [
            'all_odd',
            'all_even',
            'consecutive_4_plus',
            'same_last_digit_4_plus',
            'extreme_sum'
        ],
        conservative: [
            'all_odd',
            'all_even',
            'same_last_digit_4_plus'
        ],
        balanced: [
            'five_odd_one_even',
            'five_even_one_odd',
            'multiples_of_2_4_plus',
            'multiples_of_3_3_plus',
            'same_decade_4_plus',
            'tight_range'
        ],
        expanded: [
            'same_decade_4_plus',
            'tight_range',
            'last_digit_2_plus',
            'same_last_digit_3_plus',
            'consecutive_3_plus'
        ],
        aggressive: [
            'four_odd_two_even',
            'four_even_two_odd',
            'multiples_of_4_3_plus',
            'multiples_of_5_3_plus',
            'multiples_of_6_3_plus',
            'consecutive_3_plus',
            'same_last_digit_3_plus',
            'all_low_or_high',
            'low_or_high_5_plus',
            'prime_4_plus'
        ],
        range_focus: [
            'same_decade_5_plus',
            'tight_range',
            'all_low_or_high',
            'low_or_high_5_plus'
        ],
        sum_balance: [
            'sum_low_100',
            'sum_high_180',
            'extreme_sum'
        ],
        digit_focus: [
            'last_digit_zero_2_plus',
            'last_digit_five_2_plus',
            'same_last_digit_3_plus'
        ],
        prime_focus: [
            'prime_0',
            'prime_1_or_less',
            'prime_4_plus'
        ]
    });

    Object.assign(PRESETS_LABEL, {
        light: '보수형',
        conservative: '편중 최소형',
        balanced: '균형형',
        expanded: '분포 강화형',
        aggressive: '공격형',
        range_focus: '구간 집중형',
        sum_balance: '합계 안정형',
        digit_focus: '끝자리 집중형',
        prime_focus: '소수 집중형'
    });

    refreshInsightsDashboard();

    const RULE_DETAILS = {
        all_odd: '6개 숫자가 전부 홀수인 조합을 제외합니다.',
        all_even: '6개 숫자가 전부 짝수인 조합을 제외합니다.',
        five_odd_one_even: '홀수가 5개로 과도하게 치우친 조합을 제외합니다.',
        five_even_one_odd: '짝수가 5개로 과도하게 치우친 조합을 제외합니다.',
        four_odd_two_even: '홀수가 4개로 우세한 조합을 제외합니다.',
        four_even_two_odd: '짝수가 4개로 우세한 조합을 제외합니다.',
        multiples_of_2_4_plus: '짝수가 4개 이상 포함된 조합을 제외합니다.',
        multiples_of_2_5_plus: '짝수가 5개 이상 포함된 조합을 제외합니다.',
        multiples_of_3_3_plus: '3의 배수가 3개 이상인 조합을 제외합니다.',
        multiples_of_4_3_plus: '4의 배수가 3개 이상인 조합을 제외합니다.',
        multiples_of_5_3_plus: '5의 배수가 3개 이상인 조합을 제외합니다.',
        multiples_of_6_3_plus: '6의 배수가 3개 이상인 조합을 제외합니다.',
        multiples_of_7_3_plus: '7의 배수가 3개 이상인 조합을 제외합니다.',
        consecutive_3_plus: '연속된 숫자가 3개 이상인 조합을 제외합니다.',
        consecutive_4_plus: '연속된 숫자가 4개 이상인 조합을 제외합니다.',
        same_last_digit_3_plus: '끝자리 숫자가 3개 이상 같은 조합을 제외합니다.',
        same_last_digit_4_plus: '끝자리 숫자가 4개 이상 같은 조합을 제외합니다.',
        last_digit_2_plus: '끝자리 숫자가 2개 이상 반복되는 조합을 제외합니다.',
        last_digit_zero_2_plus: '끝자리가 0인 숫자가 2개 이상인 조합을 제외합니다.',
        last_digit_five_2_plus: '끝자리가 5인 숫자가 2개 이상인 조합을 제외합니다.',
        same_decade_4_plus: '같은 10단위 구간이 4개 이상인 조합을 제외합니다.',
        same_decade_5_plus: '같은 10단위 구간이 5개 이상인 조합을 제외합니다.',
        all_low_or_high: '1-22 또는 23-45에 모두 몰린 조합을 제외합니다.',
        low_or_high_5_plus: '저/고 구간 중 한쪽이 5개 이상인 조합을 제외합니다.',
        low_1_15_4_plus: '1-15 구간이 4개 이상인 조합을 제외합니다.',
        mid_16_30_4_plus: '16-30 구간이 4개 이상인 조합을 제외합니다.',
        high_31_45_4_plus: '31-45 구간이 4개 이상인 조합을 제외합니다.',
        tight_range: '최대-최소 범위가 20 미만인 조합을 제외합니다.',
        extreme_sum: '6개 합계가 너무 낮거나 높은 조합을 제외합니다.',
        sum_low_100: '6개 합계가 100 이하인 조합을 제외합니다.',
        sum_high_180: '6개 합계가 180 이상인 조합을 제외합니다.',
        prime_4_plus: '소수가 4개 이상 포함된 조합을 제외합니다.',
        prime_5_plus: '소수가 5개 이상 포함된 조합을 제외합니다.',
        prime_1_or_less: '소수가 1개 이하인 조합을 제외합니다.',
        prime_0: '소수가 하나도 없는 조합을 제외합니다.',
        exclude_number: '선택한 번호가 포함된 조합을 모두 제외합니다.'
    };


    function countBy(numbers, predicate) {
        return numbers.reduce((count, number) => (predicate(number) ? count + 1 : count), 0);
    }

    function countMultiples(numbers, divisor) {
        return countBy(numbers, number => number % divisor === 0);
    }

    function countLow(numbers) {
        return countBy(numbers, number => number <= 22);
    }

    function countHigh(numbers) {
        return countBy(numbers, number => number >= 23);
    }

    function countPrimes(numbers) {
        const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]);
        return countBy(numbers, number => primes.has(number));
    }

    function longestConsecutiveRun(numbers) {
        let longest = 1;
        let current = 1;
        for (let i = 1; i < numbers.length; i += 1) {
            if (numbers[i] === numbers[i - 1] + 1) {
                current += 1;
                longest = Math.max(longest, current);
            } else {
                current = 1;
            }
        }
        return longest;
    }

    function maxSameLastDigit(numbers) {
        const counts = new Map();
        numbers.forEach(number => {
            const key = number % 10;
            counts.set(key, (counts.get(key) || 0) + 1);
        });
        return Math.max(...counts.values());
    }

    function maxInSameDecade(numbers) {
        const counts = new Map();
        numbers.forEach(number => {
            const key = Math.floor(number / 10);
            counts.set(key, (counts.get(key) || 0) + 1);
        });
        return Math.max(...counts.values());
    }
});
