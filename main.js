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
    const bottomTabBarEl = document.querySelector('.bottom-tab-bar');
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }
    const ruleInputs = Array.from(document.querySelectorAll('.rule-input[type="checkbox"]'));
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
    const drawSelectionDockOddsEl = document.getElementById('draw-selection-dock-odds');
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
    const drawSelectionDockOddsValueEls = {
        1: document.getElementById('draw-dock-odds-1'),
        2: document.getElementById('draw-dock-odds-2'),
        3: document.getElementById('draw-dock-odds-3'),
        4: document.getElementById('draw-dock-odds-4'),
        5: document.getElementById('draw-dock-odds-5')
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
    let isDrawAdvancedOpen = false;
    const storeOpenOfficialBtn = document.getElementById('store-open-official-btn');
    const lockerHistoryChipEl = document.getElementById('locker-history-chip');
    const lockerHistoryListEl = document.getElementById('locker-history-list');
    const lockerPlanChipEl = document.getElementById('locker-plan-chip');
    const lockerPlanNoteEl = document.getElementById('locker-plan-note');
    const lockerPlanHistoryListEl = document.getElementById('locker-plan-history-list');
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
    const drawBuilderEl = drawTabPanel ? drawTabPanel.querySelector('.draw-builder') : null;
    const drawSelectedBoardEl = document.querySelector('#tab-draw .draw-selected-board');
    const drawActionButtonsEl = drawTabPanel ? drawTabPanel.querySelector('.draw-action-buttons') : null;
    const drawServiceButtons = Array.from(document.querySelectorAll('.draw-service-btn[data-draw-service]'));
    const drawModeOnlyPanels = Array.from(document.querySelectorAll('[data-draw-mode-only]'));
    const drawQuickStartCardEl = document.getElementById('draw-quickstart-card');
    const drawQuickSummaryTitleEl = document.getElementById('draw-quick-summary-title');
    const drawQuickSummaryNoteEl = document.getElementById('draw-quick-summary-note');
    const drawQuickAdvancedBtn = document.getElementById('draw-quick-advanced-btn');
    const drawQuickGeneratorSlotEl = document.getElementById('draw-quick-generator-slot');
    const drawQuickOptionButtons = Array.from(document.querySelectorAll('.draw-quick-option[data-quick-strategy]'));
    const drawQuickCustomBtn = document.querySelector('.draw-quick-option[data-quick-action="customize"]');
    const drawAdvancedShellEl = document.getElementById('draw-advanced-shell');
    const drawAdvancedContentEl = document.getElementById('draw-advanced-content');
    const toggleScenariosBtn = document.getElementById('toggle-scenarios');
    const premiumBadgeEl = document.getElementById('draw-premium-badge');
    const premiumLockEl = document.getElementById('draw-premium-lock');
    const premiumUpgradeBtn = document.getElementById('premium-upgrade-btn');
    const premiumPlanBuyButtons = Array.from(document.querySelectorAll('.premium-plan-buy[data-premium-plan]'));
    const premiumGenerateBtn = document.getElementById('premium-generate-btn');
    const premiumCopyAllBtn = document.getElementById('premium-copy-all-btn');
    const premiumNumbersContainer = document.getElementById('premium-numbers-container');
    const premiumCopyStatusEl = document.getElementById('premium-copy-status');
    const drawPremiumCompareSectionEl = document.getElementById('draw-premium-compare-section');
    const drawPremiumResultsSectionEl = document.getElementById('draw-premium-results-section');
    const openRulePickerBtn = document.getElementById('open-rule-picker');
    const closeRulePickerBtn = document.getElementById('close-rule-picker');
    const rulePickerPanel = document.getElementById('rule-picker-panel');
    const rulePickerBackdrop = document.getElementById('rule-picker-backdrop');
    const rulePickerSearch = document.getElementById('rule-picker-search');
    const rulePickerGroup = document.getElementById('rule-picker-group');
    const rulesSection = document.getElementById('rules');
    const guestLimitEl = document.getElementById('guest-limit');
    const guestBannerEl = document.getElementById('guest-banner');
    const drawWizardPanels = Array.from(document.querySelectorAll('[data-draw-wizard-step]'));
    const drawWizardPanelsEl = drawTabPanel ? drawTabPanel.querySelector('.draw-funnel-panels') : null;
    const drawWizardStageEl = drawTabPanel ? drawTabPanel.querySelector('.draw-funnel-stage') : null;
    const drawWizardStartPanelEl = drawTabPanel ? drawTabPanel.querySelector('[data-draw-wizard-step="start"]') : null;
    const drawWizardProgressLabelEl = document.getElementById('draw-wizard-progress-label');
    const drawWizardProgressCountEl = document.getElementById('draw-wizard-progress-count');
    const drawWizardDashboardEl = document.getElementById('draw-wizard-dashboard');
    const drawWizardDashboardStepEl = document.getElementById('draw-wizard-dashboard-step');
    const drawWizardDashboardTitleEl = document.getElementById('draw-wizard-dashboard-title');
    const drawWizardDashboardCopyEl = document.getElementById('draw-wizard-dashboard-copy');
    const drawWizardDashboardOddsEl = document.getElementById('draw-wizard-dashboard-odds');
    const drawWizardDashboardOddsNoteEl = document.getElementById('draw-wizard-dashboard-odds-note');
    const drawWizardDashboardGaugeEl = document.getElementById('draw-wizard-dashboard-gauge');
    const drawWizardDashboardImpactEl = document.getElementById('draw-wizard-dashboard-impact');
    const drawWizardDashboardImpactNoteEl = document.getElementById('draw-wizard-dashboard-impact-note');
    const drawWizardDashboardMeterFillEl = document.getElementById('draw-wizard-dashboard-meter-fill');
    const drawWizardDashboardSelectionEl = document.getElementById('draw-wizard-dashboard-selection');
    const drawWizardDashboardSelectionNoteEl = document.getElementById('draw-wizard-dashboard-selection-note');
    const drawWizardDashboardSelectionVisualEl = document.getElementById('draw-wizard-dashboard-selection-visual');
    const drawWizardDashboardVisualLabelEl = document.getElementById('draw-wizard-dashboard-visual-label');
    const drawWizardDashboardVisualNoteEl = document.getElementById('draw-wizard-dashboard-visual-note');
    const drawWizardScreenTitleEl = document.getElementById('draw-wizard-screen-title');
    const drawWizardScreenCopyEl = document.getElementById('draw-wizard-screen-copy');
    const drawWizardSelectionChipsEl = document.getElementById('draw-wizard-selection-chips');
    const drawWizardRuleKickerEl = document.getElementById('draw-wizard-rule-kicker');
    const drawWizardRuleProgressEl = document.getElementById('draw-wizard-rule-progress');
    const drawWizardRuleTitleEl = document.getElementById('draw-wizard-rule-title');
    const drawWizardRuleCopyEl = document.getElementById('draw-wizard-rule-copy');
    const drawWizardWarningTitleEl = document.getElementById('draw-wizard-warning-title');
    const drawWizardWarningBodyEl = document.getElementById('draw-wizard-warning-body');
    const drawWizardNavEl = document.getElementById('draw-wizard-nav');
    const drawWizardPrevBtn = document.getElementById('draw-wizard-prev-btn');
    const drawWizardNextBtn = document.getElementById('draw-wizard-next-btn');
    const drawWizardNavTitleEl = document.getElementById('draw-wizard-nav-title');
    const drawWizardNavNoteEl = document.getElementById('draw-wizard-nav-note');
    const drawWizardStartBtn = document.getElementById('draw-wizard-start-btn');
    const drawWizardResumeCardEl = document.getElementById('draw-wizard-resume-card');
    const drawWizardResumeBtn = document.getElementById('draw-wizard-resume-btn');
    const drawWizardRestartBtn = document.getElementById('draw-wizard-restart-btn');
    const drawWizardResumeTitleEl = document.getElementById('draw-wizard-resume-title');
    const drawWizardResumeNoteEl = document.getElementById('draw-wizard-resume-note');
    const drawWizardDetailGroupsEl = document.getElementById('draw-wizard-detail-groups');
    const drawWizardDetailNoteEl = document.getElementById('draw-wizard-detail-note');
    const drawWizardScrollGuideEl = document.getElementById('draw-wizard-scroll-guide');
    const drawWizardExcludeKickerEl = document.getElementById('draw-wizard-exclude-kicker');
    const drawWizardExcludeSummaryEl = document.getElementById('draw-wizard-exclude-summary');
    const drawWizardReviewOverviewEl = document.getElementById('draw-wizard-review-overview');
    const drawWizardReviewSummaryEl = document.getElementById('draw-wizard-review-summary');
    const drawWizardReviewGroupsEl = document.getElementById('draw-wizard-review-groups');
    const drawWizardReviewExcludesEl = document.getElementById('draw-wizard-review-excludes');
    const drawWizardResultTitleEl = document.getElementById('draw-wizard-result-title');
    const drawWizardResultCopyEl = document.getElementById('draw-wizard-result-copy');
    const drawWizardSelfResultShellEl = document.getElementById('draw-wizard-self-result-shell');
    const drawWizardResultStageEl = document.getElementById('draw-wizard-result-stage');
    const drawWizardResultStageStateEl = document.getElementById('draw-wizard-result-stage-state');
    const drawWizardResultStageMetaEl = document.getElementById('draw-wizard-result-stage-meta');
    const drawWizardResultExcludeStripEl = document.getElementById('draw-wizard-result-exclude-strip');
    const drawWizardResultReelsEl = document.getElementById('draw-wizard-result-reels');
    const drawWizardRerunBtn = document.getElementById('draw-wizard-rerun-btn');
    const drawWizardEditBtn = document.getElementById('draw-wizard-edit-btn');
    const welcomeModal = document.getElementById('welcome-modal');
    const onboardingCarouselEl = document.getElementById('onboarding-carousel');
    const onboardingCarouselTrackEl = document.getElementById('onboarding-carousel-track');
    const onboardingSlideEls = Array.from(document.querySelectorAll('.onboarding-slide[data-onboarding-slide]'));
    const onboardingNavButtons = Array.from(document.querySelectorAll('[data-onboarding-nav]'));
    const onboardingDotButtons = Array.from(document.querySelectorAll('[data-onboarding-dot]'));
    const welcomeAuthBtn = document.querySelector('[data-welcome-action="auth"]');
    const welcomeBrowseBtn = document.querySelector('[data-welcome-action="browse"]');
    const welcomeDismissButtons = Array.from(document.querySelectorAll('[data-welcome-close]'));
    const authModal = document.getElementById('auth-modal');
    const inAppBrowserModal = document.getElementById('inapp-browser-modal');
    const inAppBrowserCloseBtn = document.getElementById('inapp-browser-close');
    const inAppBrowserDescEl = document.getElementById('inapp-browser-desc');
    const inAppBrowserHintEl = document.getElementById('inapp-browser-hint');
    const inAppBrowserStatusEl = document.getElementById('inapp-browser-status');
    const inAppBrowserOpenExternalBtn = document.getElementById('inapp-browser-open-external');
    const inAppBrowserOpenChromeBtn = document.getElementById('inapp-browser-open-chrome');
    const inAppBrowserOpenSafariBtn = document.getElementById('inapp-browser-open-safari');
    const inAppBrowserOpenSamsungBtn = document.getElementById('inapp-browser-open-samsung');
    const inAppBrowserCopyBtn = document.getElementById('inapp-browser-copy-link');
    const authButtons = Array.from(document.querySelectorAll('[data-auth]'));
    const authEntryLinks = Array.from(document.querySelectorAll('[data-open-auth]'));
    const authLogoutButtons = Array.from(document.querySelectorAll('[data-logout]'));
    const authClose = authModal ? authModal.querySelector('.modal-close') : null;
    const firebaseAuthStatusEl = document.getElementById('firebase-auth-status');
    const mypageAuthSectionEl = document.querySelector('#tab-mypage #auth');
    const mypageAuthBadgeEl = document.getElementById('mypage-auth-badge');
    const mypageNicknameDisplayEl = document.getElementById('mypage-nickname-display');
    const mypageHistoryListEl = document.getElementById('mypage-history-list');
    const mypageHistoryBadgeEl = document.getElementById('mypage-history-badge');
    const mypageProfileTitleEl = document.getElementById('mypage-profile-title');
    const mypageProfileEmailEl = document.getElementById('mypage-profile-email');
    const mypageMembershipTierEl = document.getElementById('mypage-membership-tier');
    const mypageMembershipTierSummaryEl = document.getElementById('mypage-membership-tier-summary');
    const mypageMembershipDescEl = document.getElementById('mypage-membership-desc');
    const mypageMembershipNextEl = document.getElementById('mypage-membership-next');
    const mypagePlanHeadingEl = document.getElementById('mypage-plan-heading');
    const mypagePlanNoteEl = document.getElementById('mypage-plan-note');
    const mypagePlanSetCountEl = document.getElementById('mypage-plan-set-count');
    const mypagePlanCopyAccessEl = document.getElementById('mypage-plan-copy-access');
    const mypagePlanGuideEl = document.getElementById('mypage-plan-guide');
    const mypagePlanFlowEl = document.getElementById('mypage-plan-flow');
    const mypagePlanOffersSectionEl = document.getElementById('mypage-plan-offers');
    const mypagePlanManageBtn = document.getElementById('mypage-plan-manage-btn');
    const mypagePlanCancelBtn = document.getElementById('mypage-plan-cancel-btn');
    const mypageShellFooterEl = document.querySelector('#tab-mypage .mypage-shell-footer');
    const mypageSupportFormEl = document.getElementById('mypage-support-form');
    const mypageSupportSenderEl = document.getElementById('mypage-support-sender');
    const mypageSupportSubjectEl = document.getElementById('mypage-support-subject');
    const mypageSupportMessageEl = document.getElementById('mypage-support-message');
    const mypageSupportStatusEl = document.getElementById('mypage-support-status');
    const mypageSupportSubmitBtn = document.getElementById('mypage-support-submit');
    const mypagePlanOfferCards = Array.from(document.querySelectorAll('.mypage-plan-offer-card[data-premium-plan-card]'));
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
    const PLAN_WEEKLY_HISTORY_LIMIT = 6;
    const LOCKER_PREVIEW_ENTRY_LIMIT = 1;
    const PLAN_LOCKER_PREVIEW_ENTRY_LIMIT = 1;
    const RECOMMENDATION_STRATEGY_ORDER = ['balanced', 'expanded', 'sum_balance', 'digit_focus', 'light', 'aggressive', 'range_focus', 'prime_focus', 'conservative'];
    const excludeNumberValues = new Set();
    let lastGeneratedDraws = [];
    let drawWizardResultRevealToken = 0;
    let drawWizardResultPlayedToken = 0;
    let drawWizardResultTimers = [];
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
    let dashRibbonRoundEl = null;
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
    let dashRibbonCountdownDaysEl = null;
    let dashRibbonCountdownHoursEl = null;
    let dashRibbonCountdownMinutesEl = null;
    let dashRibbonCountdownSecondsEl = null;
    let dashExpectedRankEls = [];
    let dashExpectedRankMetaEls = [];
    let dashExpectedAmountEl = null;
    let dash2MeWeekEl = null;
    let dash2MeSavedEl = null;
    let dash2MeRemainingEl = null;
    let dash2MePlanEl = null;
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
    const analysisRecentCountSelectEl = document.getElementById('analysis-recent-count');
    const analysisRecentRoundsEl = document.getElementById('analysis-recent-rounds');
    const analysisTrendChartEl = document.getElementById('analysis-trend-chart');
    const analysisTrendBadgeEl = document.getElementById('analysis-trend-badge');
    const analysisCompareInputEl = document.getElementById('analysis-compare-input');
    const analysisCompareBonusInputEl = document.getElementById('analysis-compare-bonus');
    const analysisCompareBtnEl = document.getElementById('analysis-compare-btn');
    const analysisCompareResultEl = document.getElementById('analysis-compare-result');
    const analysisCurrentRoundEl = document.getElementById('analysis-current-round');
    const analysisCurrentDateEl = document.getElementById('analysis-current-date');
    const analysisCountdownEl = document.getElementById('analysis-countdown');
    const analysisExpectedAmountEl = document.getElementById('analysis-expected-amount');
    const analysisLatestRoundEl = document.getElementById('analysis-latest-round');
    const analysisLatestDateEl = document.getElementById('analysis-latest-date');
    const analysisLatestNumberEls = [
        document.getElementById('analysis-num-1'),
        document.getElementById('analysis-num-2'),
        document.getElementById('analysis-num-3'),
        document.getElementById('analysis-num-4'),
        document.getElementById('analysis-num-5'),
        document.getElementById('analysis-num-6')
    ];
    const analysisBonusEl = document.getElementById('analysis-bonus');
    const analysisLatestTotalEl = document.getElementById('analysis-latest-total');
    const analysisLatestWinnersEl = document.getElementById('analysis-latest-winners');
    const analysisTrendWindowEl = document.getElementById('analysis-trend-window');
    const analysisTrendSummaryEl = document.getElementById('analysis-trend-summary');
    const analysisLatestPrizeChipEl = document.getElementById('analysis-latest-prize-chip');
    const analysisPeakPrizeChipEl = document.getElementById('analysis-peak-prize-chip');
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
    const helpChatWidgetEl = document.getElementById('help-chat-widget');
    const helpChatPanelEl = document.getElementById('help-chat-panel');
    const helpChatHeaderEl = helpChatPanelEl ? helpChatPanelEl.querySelector('.help-chat-header') : null;
    const helpChatBodyEl = document.getElementById('help-chat-body');
    const helpChatFormEl = document.getElementById('help-chat-form');
    const helpChatInputEl = document.getElementById('help-chat-input');
    const helpChatSendBtn = document.getElementById('help-chat-send');
    const helpChatCloseBtn = document.getElementById('help-chat-close');
    const helpChatFabEl = document.getElementById('help-chat-fab');
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
    let recentRoundDataList = [];
    const roundMetaByNo = new Map();
    let mainInfoCache = {
        ts: 0,
        rounds: []
    };
    let mainInfoInflight = null;
    // Keep the dashboard populated when hosting rewrites return HTML for API routes.
    const EMBEDDED_DRAW_FALLBACKS = {
        1215: {
            returnValue: 'success',
            drwNo: 1215,
            drwNoDate: '2026-03-14',
            drwtNo1: 13,
            drwtNo2: 15,
            drwtNo3: 19,
            drwtNo4: 21,
            drwtNo5: 44,
            drwtNo6: 45,
            bnusNo: 39,
            firstPrzwnerCo: 16,
            firstWinamnt: 1998542133,
            firstAccumamnt: 31976674128
        },
        1214: {
            returnValue: 'success',
            drwNo: 1214,
            drwNoDate: '2026-03-07',
            drwtNo1: 10,
            drwtNo2: 15,
            drwtNo3: 19,
            drwtNo4: 27,
            drwtNo5: 30,
            drwtNo6: 33,
            bnusNo: 14,
            firstPrzwnerCo: 12,
            firstWinamnt: 2431577188,
            firstAccumamnt: 29178926256
        },
        1213: {
            returnValue: 'success',
            drwNo: 1213,
            drwNoDate: '2026-02-28',
            drwtNo1: 5,
            drwtNo2: 11,
            drwtNo3: 25,
            drwtNo4: 27,
            drwtNo5: 36,
            drwtNo6: 38,
            bnusNo: 2,
            firstPrzwnerCo: 18,
            firstWinamnt: 1740011646,
            firstAccumamnt: 31320209628
        }
    };
    let lastWeeklyRenderedAt = 0;
    let lastWeeklyRenderMode = 'live';
    let lastWeeklyRenderSource = 'proxy';
    let firebaseReady = false;
    let authStateResolved = false;
    let firebaseAuth = null;
    let firebaseDb = null;
    let authPersistenceReady = Promise.resolve();
    let currentUser = null;
    let currentUserProfile = null;
    let authActionInFlight = false;
    let googleRedirectResultChecked = false;
    let nicknameSaveInFlight = false;
    let mypageSupportSubmitInFlight = false;
    let mypageSupportStatusTone = 'default';
    let mypageSupportStatusMessage = '';
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
    let welcomeModalDismissedInSession = false;
    let onboardingSlideIndex = 0;
    let revealObserver = null;
    let helpChatInitialized = false;
    let helpChatReplyTimer = 0;
    let helpChatTypingMessageEl = null;
    let helpChatDragState = null;
    let helpChatCustomPosition = null;
    let helpChatSuppressFabClickUntil = 0;
    let drawWizardScrollGuideTimer = 0;
    let drawWizardScrollGuideRafId = 0;
    const DRAW_ENTRY_LOCAL_KEY = 'lotto_guest_tracking_id';
    const GENERATION_STATS_KEY = 'lotto_generation_stats';
    const GENERATED_HISTORY_LOCAL_KEY = 'lotto_generated_history_v1';
    const RULES_UPDATED_AT_KEY = 'lotto_rules_updated_at';
    const CUSTOM_PRESET_UPDATED_AT_KEY = 'lotto_custom_preset_updated_at';
    const DRAW_WIZARD_DRAFT_KEY = 'lotto_draw_wizard_draft';
    const DRAW_WIZARD_RESUME_ENABLED = false;
    const DRAW_WIZARD_SCROLL_HINT_KEY = 'lotto_draw_scroll_hint_seen_v1';
    const HELP_CHAT_POSITION_KEY = 'lotto_help_chat_position_v1';
    const ONBOARDING_SKIP_TODAY_KEY = 'lotto_onboarding_skip_today';
    const GOOGLE_REDIRECT_STATE_KEY = 'lotto_google_redirect_state';
    const GOOGLE_REDIRECT_PENDING_TTL_MS = 10 * 60 * 1000;
    const KAKAO_INAPP_NOTICE_DISMISSED_KEY = 'lotto_kakao_inapp_notice_dismissed';
    const MEMBERSHIP_STATE_LOCAL_KEY = 'lotto_membership_state_v1';
    const PLAN_DAILY_USAGE_KEY = 'lotto_plan_daily_usage_v1';
    const HELP_CHAT_PROMPTS = {
        app: '이 앱이 뭐야?',
        draw: '번호는 어떻게 생성해?',
        filters: '필터는 왜 고르지?',
        login: '로그인은 왜 필요해?',
        plan: '플랜 차이 알려줘',
        dashboard: '대시보드는 뭐야?',
        locker: '보관함은 뭐야?'
    };
    let googleRedirectFlowPending = readGoogleRedirectPendingState();
    let drawWizardScrollHintSeen = readDrawWizardScrollHintSeen();
    const DRAW_WIZARD_RULE_GROUP_INFO = {
        '홀짝 비율': {
            title: '홀짝 비율 제외하기',
            copy: '빼고 싶은 홀짝 패턴만 눌러보세요.'
        },
        '배수 분포': {
            title: '배수 패턴 제외하기',
            copy: '빼고 싶은 배수 패턴만 고르면 됩니다.'
        },
        '연속/반복': {
            title: '연속수 패턴 제외하기',
            copy: '연속수나 반복 패턴만 간단히 덜어내세요.'
        },
        '끝자리 분포': {
            title: '끝자리 패턴 제외하기',
            copy: '끝자리 몰림 패턴만 골라서 제외하세요.'
        },
        '구간 분포': {
            title: '구간 분포 제외하기',
            copy: '특정 구간에 몰린 조합만 정리해 보세요.'
        },
        '구간 세분': {
            title: '세부 구간 제외하기',
            copy: '저중고 구간 쏠림만 빠르게 걸러내세요.'
        },
        '합계/소수': {
            title: '합계와 소수 제외하기',
            copy: '합계와 소수 쏠림만 마지막으로 조정하세요.'
        }
    };
    const DRAW_WIZARD_STEP_META = {
        start: {
            title: '규칙 라이브러리를 단계별로 고르고 마지막에 바로 추첨합니다',
            copy: '복잡한 설정 화면 대신, 규칙 라이브러리 항목을 그룹별 스텝으로 나눠서 하나씩 선택합니다.',
            navTitle: '소개',
            navNote: '시작하기를 누르면 첫 번째 규칙 그룹부터 바로 보여줍니다.',
            nextLabel: '시작하기'
        },
        rules: {
            title: '규칙 라이브러리 선택',
            copy: '현재 그룹에서 제외할 규칙을 골라주세요. 필요 없다면 선택 없이 다음으로 넘어가도 됩니다.',
            navTitle: '규칙 선택',
            navNote: '규칙 라이브러리 항목을 그룹별로 순서대로 고릅니다.'
        },
        exclude: {
            title: '8단계에서 직접 제외수를 추가합니다',
            copy: '규칙 라이브러리 선택이 끝났다면 마지막 8단계에서 직접 제외할 숫자를 고를 수 있습니다.',
            navTitle: '8단계',
            navNote: '직접 제외수는 선택 사항이지만 생성 직전에 바로 반영됩니다.'
        },
        review: {
            title: '추첨 전 확인',
            copy: '조건을 보고 바로 추첨합니다.',
            navTitle: '추첨 전 확인',
            navNote: '조건 확인 후 추첨'
        },
        result: {
            title: '추첨 결과가 준비됐습니다',
            copy: '같은 조건으로 다시 추첨하거나 이전 단계로 돌아가 선택을 바꿀 수 있습니다.',
            navTitle: '결과 확인',
            navNote: '복사 또는 다시 추첨으로 바로 이어갈 수 있습니다.'
        }
    };
    const DRAW_WIZARD_RULE_OVERRIDES = {
        all_odd: {
            title: '6개 모두 홀수',
            desc: '홀수만 6개로 구성된 조합 제외'
        },
        all_even: {
            title: '6개 모두 짝수',
            desc: '짝수만 6개로 구성된 조합 제외'
        },
        five_odd_one_even: {
            title: '5개 홀수 + 1개 짝수',
            desc: '홀수 편중 조합 제외'
        },
        five_even_one_odd: {
            title: '5개 짝수 + 1개 홀수',
            desc: '짝수 편중 조합 제외'
        },
        four_odd_two_even: {
            title: '4개 홀수 + 2개 짝수',
            desc: '홀수가 더 많은 조합 제외'
        },
        four_even_two_odd: {
            title: '4개 짝수 + 2개 홀수',
            desc: '짝수가 더 많은 조합 제외'
        }
    };
    const DRAW_WIZARD_STATIC_GROUP_RULES = {
        '홀짝 비율': [
            { id: 'all_odd', title: '6개 모두 홀수', desc: '홀수만 6개로 구성된 조합 제외' },
            { id: 'all_even', title: '6개 모두 짝수', desc: '짝수만 6개로 구성된 조합 제외' },
            { id: 'five_odd_one_even', title: '5개 홀수 + 1개 짝수', desc: '홀수 편중 조합 제외' },
            { id: 'five_even_one_odd', title: '5개 짝수 + 1개 홀수', desc: '짝수 편중 조합 제외' },
            { id: 'four_odd_two_even', title: '4개 홀수 + 2개 짝수', desc: '홀수가 더 많은 조합 제외' },
            { id: 'four_even_two_odd', title: '4개 짝수 + 2개 홀수', desc: '짝수가 더 많은 조합 제외' }
        ]
    };
    let drawWizardState = null;
    let drawWizardResumeState = null;
    let drawWizardLastViewKey = '';
    let drawWizardTransitionDirection = 'forward';

    const tabController = createTabController({
        tabButtons,
        tabPanels,
        tabLinks,
        defaultTab: 'dashboard',
        onWillChange(tabId) {
            if (tabId !== 'draw') {
                setRulePickerOpen(false);
                if (getCurrentActiveTabId() === 'draw' && !isMember()) {
                    resetDrawWizardSessionState({
                        clearDraft: true,
                        render: true
                    });
                }
            }
        },
        onDidChange({ tabId, targetPanel }) {
            syncNavTabLinks(tabId);
            syncActiveTabState(tabId);
            refreshRevealMotion(targetPanel);
            if (tabId === 'dashboard') {
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(scrollDashboardViewportToTop);
                });
                renderDash2MeStats();
            }
            if (tabId === 'dashboard' && currentWeeklyData) {
                loadLastWeekWinDashboard(currentWeeklyData);
            }
            if (tabId === 'draw') {
                scheduleDrawHorizontalWidthSync();
            }
            if (tabId === 'store') {
                refreshRemoteDrawHistory({ force: true });
            }
            if (tabId === 'qr') {
                updateAnalysisSummaryUi();
                if (latestAvailableRound && analysisRecentRoundsEl && !analysisRecentRoundsEl.children.length) {
                    loadRecentRounds(latestAvailableRound).catch(error => {
                        logProxyError('analysisRecentRounds', error, { latestRound: latestAvailableRound });
                    });
                }
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
    let pendingWinDashboardRound = null;

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

    function scrollDashboardViewportToTop() {
        if (getCurrentActiveTabId() !== 'dashboard') {
            return;
        }
        const dashboardPanel = document.getElementById('tab-dashboard');
        if (!dashboardPanel) {
            return;
        }
        const headerHeight = siteHeaderEl ? Math.ceil(siteHeaderEl.getBoundingClientRect().height) : 0;
        const top = window.scrollY + dashboardPanel.getBoundingClientRect().top - headerHeight - 8;
        window.scrollTo({
            top: Math.max(0, Math.round(top)),
            behavior: 'auto'
        });
    }

    function setupRevealMotion() {
        const targets = getRevealTargets();
        if (!targets.length) {
            return;
        }
        if (revealObserver) {
            revealObserver.disconnect();
            revealObserver = null;
        }
        targets.forEach(element => {
            element.classList.add('reveal-item');
            element.classList.add('is-visible');
            element.style.removeProperty('--reveal-delay');
        });
    }

    function refreshRevealMotion(root = null) {
        const targetRoot = root instanceof Element ? root : document.getElementById(`tab-${getCurrentActiveTabId()}`);
        if (!targetRoot) {
            return;
        }
        const targets = getRevealTargets(targetRoot);
        targets.forEach(element => {
            element.classList.add('reveal-item');
            element.classList.add('is-visible');
            element.style.removeProperty('--reveal-delay');
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
        dashRibbonRoundEl = root.getElementById('dash-ribbon-round');
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
        dashRibbonCountdownDaysEl = root.getElementById('dash-ribbon-DD');
        dashRibbonCountdownHoursEl = root.getElementById('dash-ribbon-HH');
        dashRibbonCountdownMinutesEl = root.getElementById('dash-ribbon-MM');
        dashRibbonCountdownSecondsEl = root.getElementById('dash-ribbon-SS');
        dashExpectedRankEls = [
            root.getElementById('dash-rnk1ExpcAmt'),
            root.getElementById('dash-rnk2ExpcAmt'),
            root.getElementById('dash-rnk3ExpcAmt'),
            root.getElementById('dash-rnk4ExpcAmt'),
            root.getElementById('dash-rnk5ExpcAmt')
        ];
        dashExpectedRankMetaEls = [
            root.getElementById('dash-rnk1ExpcMeta'),
            root.getElementById('dash-rnk2ExpcMeta'),
            root.getElementById('dash-rnk3ExpcMeta'),
            root.getElementById('dash-rnk4ExpcMeta'),
            root.getElementById('dash-rnk5ExpcMeta')
        ];
        dashExpectedAmountEl = dashExpectedRankEls[0] || null;
        dash2MeWeekEl = root.getElementById('dash2-me-week');
        dash2MeSavedEl = root.getElementById('dash2-me-saved');
        dash2MeRemainingEl = root.getElementById('dash2-me-remaining');
        dash2MePlanEl = root.getElementById('dash2-me-plan');
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
        if (currentWeeklyData) {
            renderWeeklyData(currentWeeklyData, { cached: lastWeeklyRenderMode !== 'live' });
        }
    }

    function getRecentRoundContainers() {
        return [recentRoundsEl, analysisRecentRoundsEl].filter(Boolean);
    }

    function getTrendChartTargets() {
        return [trendChart, analysisTrendChartEl].filter(Boolean);
    }

    function syncRecentCountControls(nextValue) {
        const value = String(nextValue || getRecentCount());
        [recentCountSelect, analysisRecentCountSelectEl].forEach(select => {
            if (select) {
                select.value = value;
            }
        });
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
                updatePremiumCopyStatus('추천 플랜을 먼저 고르면 세트를 바로 확인할 수 있습니다.', true);
                if (!isMember()) {
                    openAuthModal();
                }
                return;
            }
            const plan = getMembershipPlanMeta();
            const recommendationCount = getRecommendedSetCount(plan.id);
            const recommendations = generatePremiumRecommendations(recommendationCount);
            renderPremiumNumbers(recommendations);
            updatePremiumCopyStatus(`${plan.label} 기준 추천 ${recommendationCount}세트를 불러왔습니다.`);
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
            openPremiumPlanWorkspace({
                focusResults: false
            });
            showActionPopup('추천 플랜을 고르면 이번 회차 추천 세트를 바로 확인할 수 있습니다.');
        });
    }

    premiumPlanBuyButtons.forEach(button => {
        button.addEventListener('click', async event => {
            event.preventDefault();
            const plan = String(button.dataset.premiumPlan || '').toLowerCase();
            const planMetaMap = {
                gold: { name: 'GOLD', price: '첫 달 0원 · 2개월차부터 월 9,900원 자동결제' },
                platinum: { name: 'PLATINUM', price: '첫 달 0원 · 2개월차부터 월 14,900원 자동결제' },
                master: { name: 'MASTER', price: '첫 달 0원 · 2개월차부터 월 19,900원 자동결제' }
            };
            const planMeta = planMetaMap[plan] || { name: '선택 플랜', price: '가격 정보 준비 중' };
            if (!isMember()) {
                openAuthModal();
                return;
            }
            await setMembershipTier(plan);
            openPremiumPlanWorkspace({
                focusResults: true
            });
            showActionPopup(`${planMeta.name} 구성을 선택했습니다. ${planMeta.price} 기준으로 추천 ${getRecommendedSetCount(plan)}세트를 바로 확인할 수 있습니다.`);
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

    if (analysisCompareBtnEl) {
        analysisCompareBtnEl.addEventListener('click', () => {
            handleCompareWithRefs({
                inputEl: analysisCompareInputEl,
                bonusEl: analysisCompareBonusInputEl,
                resultEl: analysisCompareResultEl
            });
        });
    }

    if (generateCtaBtn) {
        generateCtaBtn.addEventListener('click', () => {
            handleDrawGenerationRequest('cta');
        });
    }

    if (recentCountSelect) {
        recentCountSelect.addEventListener('change', () => {
            syncRecentCountControls(recentCountSelect.value);
            if (latestAvailableRound) {
                loadRecentRounds(latestAvailableRound);
            }
        });
    }

    if (analysisRecentCountSelectEl) {
        analysisRecentCountSelectEl.addEventListener('change', () => {
            syncRecentCountControls(analysisRecentCountSelectEl.value);
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

    if (lockerHistoryListEl) {
        lockerHistoryListEl.addEventListener('click', event => {
            const button = event.target instanceof Element ? event.target.closest('[data-locker-copy]') : null;
            if (!button) {
                return;
            }
            copyLockerSession(String(button.dataset.lockerCopy || ''));
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
            persistSelectedRules();
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
            toggleScenariosBtn.textContent = collapsed ? '펼치기' : '접기';
            toggleScenariosBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            scheduleDrawHorizontalWidthSync();
        });
    }

    drawQuickOptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const strategy = String(button.dataset.quickStrategy || '').trim();
            if (!strategy) {
                return;
            }
            applyStrategy(strategy);
            updateRulesStatus(`${PRESETS_LABEL[strategy] || '추천 방식'}을 적용했습니다. 이제 바로 번호 추천을 받을 수 있습니다.`);
            syncDrawQuickStartUi();
        });
    });

    if (drawQuickCustomBtn) {
        drawQuickCustomBtn.addEventListener('click', () => {
            setDrawAdvancedOpen(true, {
                scroll: true,
                focusTarget: drawAdvancedShellEl
            });
            setRulePickerOpen(true);
            updateRulesStatus('세부 필터를 직접 고르는 화면을 열었습니다.');
        });
    }

    if (drawQuickAdvancedBtn) {
        drawQuickAdvancedBtn.addEventListener('click', () => {
            setDrawAdvancedOpen(!isDrawAdvancedOpen, {
                scroll: !isDrawAdvancedOpen
            });
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
            if (provider === 'kakao') {
                const ok = await signInWithKakao();
                if (ok) {
                    closeAuthModal();
                }
                return;
            }
            updateRulesStatus('지원하지 않는 로그인 수단입니다.');
        });
    });

    if (welcomeAuthBtn) {
        welcomeAuthBtn.addEventListener('click', () => {
            closeWelcomeModal();
            openAuthModal();
        });
    }

    if (welcomeBrowseBtn) {
        welcomeBrowseBtn.addEventListener('click', () => {
            closeWelcomeModal();
            showActionPopup('가입 없이도 바로 이용할 수 있습니다. 필요할 때 로그인으로 전환하면 이력과 추천 기능이 이어집니다.');
        });
    }

    welcomeDismissButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = String(button.dataset.welcomeClose || '').trim().toLowerCase();
            closeWelcomeModal({
                dismissToday: action === 'today'
            });
        });
    });

    if (welcomeModal) {
        syncWelcomeModalViewportLayout();
        welcomeModal.addEventListener('click', event => {
            if (event.target === welcomeModal) {
                closeWelcomeModal();
            }
        });
        if (window.visualViewport && typeof window.visualViewport.addEventListener === 'function') {
            window.visualViewport.addEventListener('resize', syncWelcomeModalViewportLayout, { passive: true });
            window.visualViewport.addEventListener('scroll', syncWelcomeModalViewportLayout, { passive: true });
        }
        window.addEventListener('resize', syncWelcomeModalViewportLayout, { passive: true });
        window.addEventListener('orientationchange', () => {
            window.setTimeout(syncWelcomeModalViewportLayout, 140);
        }, { passive: true });
    }

    onboardingNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = button.dataset.onboardingNav === 'next' ? 1 : -1;
            setOnboardingSlide(onboardingSlideIndex + direction);
        });
    });

    onboardingDotButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = Number(button.dataset.onboardingDot);
            if (!Number.isFinite(index)) {
                return;
            }
            setOnboardingSlide(index);
        });
    });

    if (onboardingCarouselTrackEl) {
        let touchStartX = 0;
        let touchStartY = 0;
        onboardingCarouselTrackEl.addEventListener('touchstart', event => {
            const touch = event.touches && event.touches[0];
            if (!touch) {
                return;
            }
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }, { passive: true });

        onboardingCarouselTrackEl.addEventListener('touchend', event => {
            const touch = event.changedTouches && event.changedTouches[0];
            if (!touch) {
                return;
            }
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            if (Math.abs(deltaX) < 36 || Math.abs(deltaX) <= Math.abs(deltaY)) {
                return;
            }
            setOnboardingSlide(onboardingSlideIndex + (deltaX < 0 ? 1 : -1));
        }, { passive: true });
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

    if (mypageSupportFormEl) {
        mypageSupportFormEl.addEventListener('submit', submitMypageSupportInquiry);
    }

    [mypageSupportSubjectEl, mypageSupportMessageEl].filter(Boolean).forEach(field => {
        field.addEventListener('input', () => {
            if (mypageSupportStatusTone !== 'default' || mypageSupportStatusMessage) {
                resetMypageSupportStatus();
            }
        });
    });

    if (mypagePlanManageBtn) {
        mypagePlanManageBtn.addEventListener('click', () => {
            if (!mypagePlanOffersSectionEl) return;
            
            const isHidden = mypagePlanOffersSectionEl.hidden;
            mypagePlanOffersSectionEl.hidden = !isHidden;
            
            if (isHidden) {
                // Scroll to plans
                window.requestAnimationFrame(() => {
                    mypagePlanOffersSectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                mypagePlanManageBtn.textContent = '플랜 닫기';
            } else {
                mypagePlanManageBtn.textContent = '플랜 보기';
            }
        });
    }


    if (mypagePlanCancelBtn) {
        mypagePlanCancelBtn.addEventListener('click', async () => {
            const result = await setMembershipTier('free');
            if (!result.changed) {
                showActionPopup('이미 FREE 플랜을 이용 중입니다.');
                return;
            }
            if (result.mode === 'downgrade') {
                showActionPopup(`FREE 전환을 예약했습니다. ${formatMembershipDate(result.effectiveAt)}부터 FREE가 적용됩니다.`);
                return;
            }
            showActionPopup('FREE 플랜으로 전환했습니다.');
        });
    }

    // Membership Purchase Button Listeners
    document.addEventListener('click', async (e) => {
        const buyBtn = e.target.closest('.premium-plan-buy');
        if (!buyBtn) return;

        const card = buyBtn.closest('[data-premium-plan-card]');
        if (!card) return;

        const tier = normalizeMembershipTier(card.dataset.premiumPlanCard);
        const plan = getMembershipPlanMeta(tier);

        if (!isMember()) {
            const confirmed = await showActionConfirm(
                '로그인 필요',
                `${plan.label} 멤버십은 로그인 후 이용 가능합니다. 로그인 화면으로 이동할까요?`,
                '로그인하기',
                '닫기'
            );
            if (confirmed) {
                openAuthModal();
            }
            return;
        }

        const membershipState = getMembershipState();
        const currentPlan = getMembershipPlanMeta(membershipState.membershipTier);
        const scheduledPlan = membershipState.scheduledMembershipTier
            ? getMembershipPlanMeta(membershipState.scheduledMembershipTier)
            : null;
        const changeMode = getMembershipChangeMode(currentPlan.id, tier, membershipState.scheduledMembershipTier);

        if (changeMode === 'current') {
            showActionPopup(`이미 ${plan.label} 멤버십을 이용 중입니다.`);
            return;
        }

        let confirmTitle = '멤버십 플랜 변경';
        let confirmBody = '';
        let confirmAction = '변경하기';

        if (changeMode === 'retain') {
            confirmTitle = '예약 변경 취소';
            confirmBody = scheduledPlan
                ? `현재 ${currentPlan.label} 플랜은 ${formatMembershipDate(membershipState.subscriptionEndsAt)}까지 이용 중이며, ${scheduledPlan.label} 변경이 예약되어 있습니다.
예약을 취소하고 ${currentPlan.label} 플랜을 유지할까요?`
                : `${currentPlan.label} 플랜을 계속 유지할까요?`;
            confirmAction = '예약 취소';
        } else if (changeMode === 'downgrade') {
            const scheduledDate = formatMembershipDate(membershipState.subscriptionEndsAt);
            confirmBody = `${currentPlan.label} 플랜은 ${scheduledDate}까지 이용하고, ${plan.label} 플랜은 ${scheduledDate}부터 적용됩니다.
다운그레이드는 다음 자동결제일부터 반영됩니다.`;
            confirmAction = '예약하기';
        } else {
            const previewEnd = addMonthsPreserveClock(new Date(), 1) || new Date();
            confirmBody = `${plan.label} 멤버십으로 ${changeMode === 'upgrade' ? '즉시 업그레이드' : '시작'}하시겠습니까?
첫 달 결제는 0원이며, ${formatMembershipDate(previewEnd)}부터 ${formatMembershipRecurringPrice(plan)} 자동결제됩니다.
현재 오픈이벤트가는 정가 ${formatNumber(plan.originalPrice || 0)}원에서 ${formatNumber(plan.price || 0)}원으로 적용됩니다.`;
            confirmAction = changeMode === 'upgrade' ? '첫 달 0원 업그레이드' : '첫 달 0원 시작';
        }

        const confirmed = await showActionConfirm(
            confirmTitle,
            confirmBody,
            confirmAction,
            '취소'
        );

        if (confirmed) {
            const result = await setMembershipTier(tier);
            if (result.mode === 'retain') {
                showActionPopup(`예약된 플랜 변경을 취소했습니다. ${currentPlan.label} 플랜을 계속 이용합니다.`);
            } else if (result.mode === 'downgrade') {
                showActionPopup(`${plan.label} 변경을 예약했습니다. ${formatMembershipDate(result.effectiveAt)}부터 적용됩니다.`);
            } else if (result.changed) {
                showActionPopup(`${plan.label} 멤버십이 시작되었습니다. 첫 달 결제는 0원이며 ${formatMembershipDate(result.state.subscriptionEndsAt)}부터 ${formatMembershipRecurringPrice(plan)} 자동결제됩니다.`);
            }
            if (mypagePlanOffersSectionEl) {
                mypagePlanOffersSectionEl.hidden = true;
                if (mypagePlanManageBtn) mypagePlanManageBtn.textContent = '플랜 보기';
            }
        }
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
        window.visualViewport.addEventListener('scroll', scheduleDrawHorizontalWidthSync, { passive: true });
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

    if (inAppBrowserCloseBtn) {
        inAppBrowserCloseBtn.addEventListener('click', () => {
            closeInAppBrowserModal();
        });
    }

    if (inAppBrowserModal) {
        inAppBrowserModal.addEventListener('click', event => {
            if (event.target === inAppBrowserModal) {
                closeInAppBrowserModal();
            }
        });
    }

    if (inAppBrowserOpenExternalBtn) {
        inAppBrowserOpenExternalBtn.addEventListener('click', () => {
            openCurrentPageInExternalBrowser('external');
        });
    }

    if (inAppBrowserOpenChromeBtn) {
        inAppBrowserOpenChromeBtn.addEventListener('click', () => {
            openCurrentPageInExternalBrowser('chrome');
        });
    }

    if (inAppBrowserOpenSafariBtn) {
        inAppBrowserOpenSafariBtn.addEventListener('click', () => {
            openCurrentPageInExternalBrowser('safari');
        });
    }

    if (inAppBrowserOpenSamsungBtn) {
        inAppBrowserOpenSamsungBtn.addEventListener('click', () => {
            openCurrentPageInExternalBrowser('samsung');
        });
    }

    if (inAppBrowserCopyBtn) {
        inAppBrowserCopyBtn.addEventListener('click', async () => {
            await copyCurrentPageLink();
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

    function collapseDrawFiltersForResults() {
        if (!drawSelectionDockEl || !drawSelectionDockEl.classList.contains('has-selection')) {
            return;
        }
        setDrawSelectionDockCollapsed(true);
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
            setDrawAdvancedOpen(true, {
                scroll: true,
                focusTarget: rulePickerPanel
            });
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

    // Initialize Firebase and basic dependencies immediately
    initFirebase();

    try {
        guestTrackingId = getOrCreateGuestTrackingId();
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
        if (getCurrentActiveTabId() === 'dashboard') {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(scrollDashboardViewportToTop);
            });
        }
        setupRevealMotion();
        refreshRevealMotion(document.getElementById(`tab-${getCurrentActiveTabId()}`));
        setOnboardingSlide(0);
        scheduleWelcomeModal();
        scheduleInAppBrowserPrompt();
        initializeHelpChat();
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
            guestLimitEl.textContent = 'FREE는 하루 5조합까지 가능합니다.';
            refreshGuestLimitMessage();
        }
        updatePremiumMembershipUi();
        setupSimplifiedDrawExperience();
            setDrawServiceMode(getStoredDrawServiceMode());
            updateDrawContextUi();
            updateDashboardSummaryUi();
            updateMypageSummaryUi();
            updateAnalysisSummaryUi();
            refreshRemoteDrawHistory({ force: true });
        } catch (error) {
            console.error('초기화 오류', error);
        }
        
        initializeDrawWizard();
        updateScenarioMetrics();
    fetchLatestDraw();
    fetchWeeklyIntroInfo();
    window.setInterval(() => {
        fetchWeeklyIntroInfo();
    }, 10000);

    function focusGeneratedNumbers(options = {}) {
        const { collapseFilters = false } = options;
        const scrollToGeneratedRow = () => {
            const target = numbersContainer?.querySelector('.number-row') || drawGeneratorSectionEl;
            if (!target) {
                return;
            }
            const headerHeight = siteHeaderEl ? Math.ceil(siteHeaderEl.getBoundingClientRect().height) : 0;
            const selectionDockHeight = (
                drawSelectionDockEl
                && drawSelectionDockEl.classList.contains('has-selection')
                && drawTabPanel
                && drawTabPanel.classList.contains('has-selection-dock')
            ) ? Math.ceil(drawSelectionDockEl.getBoundingClientRect().height) : 0;
            const offset = headerHeight + selectionDockHeight + 16;
            const top = window.scrollY + target.getBoundingClientRect().top - offset;
            window.scrollTo({
                top: Math.max(0, Math.round(top)),
                behavior: 'smooth'
            });
        };
        if (collapseFilters) {
            collapseDrawFiltersForResults();
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(scrollToGeneratedRow);
            });
            return;
        }
        window.requestAnimationFrame(scrollToGeneratedRow);
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
            if (isAuthStatePending()) {
                refreshGuestLimitMessage();
                showActionPopup('로그인 상태를 확인하는 중입니다. 잠시만 기다려 주세요.');
                return false;
            }
            if (!canGuestGenerate()) {
                const snapshot = getGenerationLimitSnapshot();
                if (!isMember()) {
                    showActionPopup(`FREE는 하루 ${snapshot.limit}조합까지 가능합니다. 로그인 후 첫 달 0원으로 유료 플랜을 시작하면 더 많이 생성할 수 있습니다.`);
                    openAuthModal();
                } else if (snapshot.plan.id === 'free') {
                    showActionPopup(`FREE는 하루 ${snapshot.limit}조합까지 가능합니다. GOLD / PLATINUM / MASTER는 첫 달 0원으로 바로 시작할 수 있습니다.`);
                } else {
                    const remainingText = snapshot.remaining > 0
                        ? ` 지금은 최대 ${snapshot.remaining}조합까지 생성할 수 있습니다.`
                        : ' 오늘 한도를 모두 사용했습니다.';
                    showActionPopup(`${snapshot.plan.label}는 하루 ${snapshot.limit}조합까지 가능합니다.${remainingText}`);
                }
                return false;
            }
            const generatedCount = generateAndDisplayNumbers({
                source,
                activeRules
            });
            if (!generatedCount) {
                if (source === 'cta') {
                    focusGeneratedNumbers({
                        collapseFilters: true
                    });
                    showActionPopup('조건이 너무 좁아 번호를 만들지 못했습니다. 필터를 조금 줄여 보세요.');
                }
                return false;
            }
            incrementGuestCount(generatedCount);
            if (source === 'cta') {
                focusGeneratedNumbers({
                    collapseFilters: true
                });
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

    function generateNumbersWithRules(activeRules, options = {}) {
        const randomFn = typeof options.randomFn === 'function' ? options.randomFn : Math.random;
        const baseExcludedNumbers = options.excludedNumbers instanceof Set ? options.excludedNumbers : excludeNumberValues;
        const excludedNumbers = hasExcludeNumberAccess() ? baseExcludedNumbers : new Set();
        const maxAttempts = 5000;
        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
            const numbers = generateUniqueNumbers(6, 1, 45, randomFn).sort((a, b) => a - b);
            if (!shouldExclude(numbers, activeRules, excludedNumbers)) {
                return numbers;
            }
        }
        return [];
    }

    function shouldExclude(numbers, activeRules, excludedNumbers = excludeNumberValues) {
        if (numbers.length === 0) {
            return true;
        }
        const rules = Array.isArray(activeRules) ? activeRules : [];
        return rules.some(rule => rule.exclude(numbers, excludedNumbers));
    }

    function generateUniqueNumbers(count, min, max, randomFn = Math.random) {
        const numbers = new Set();
        while (numbers.size < count) {
            const nextRandom = Number(randomFn());
            const normalizedRandom = Number.isFinite(nextRandom)
                ? Math.min(0.999999999, Math.max(0, nextRandom))
                : Math.random();
            const randomNumber = Math.floor(normalizedRandom * (max - min + 1)) + min;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }

    function getRuleDisplayName(ruleId) {
        const targetId = String(ruleId || '').trim();
        if (!targetId) {
            return '';
        }
        const input = ruleInputs.find(item => item && item.value === targetId);
        const card = input ? input.closest('.rule-card') : null;
        const title = card?.dataset.title || card?.querySelector('.rule-title')?.textContent || targetId;
        return String(title || '').trim();
    }

    function summarizeRuleDisplayNames(ruleIds = [], maxVisible = 2) {
        const labels = Array.from(
            new Set(
                (Array.isArray(ruleIds) ? ruleIds : [])
                    .map(getRuleDisplayName)
                    .filter(Boolean)
            )
        );
        if (!labels.length) {
            return '';
        }
        const visible = labels.slice(0, Math.max(1, Number(maxVisible) || 2));
        const extraCount = Math.max(0, labels.length - visible.length);
        return extraCount ? `${visible.join(', ')} 외 ${extraCount}개` : visible.join(', ');
    }

    function buildNumberTraitMeta(numbers) {
        if (!Array.isArray(numbers) || numbers.length !== 6) {
            return [];
        }
        const oddCount = countBy(numbers, number => number % 2 === 1);
        const evenCount = numbers.length - oddCount;
        const total = numbers.reduce((sum, value) => sum + Number(value || 0), 0);
        const consecutive = longestConsecutiveRun(numbers);
        const pieces = [
            `홀짝 ${oddCount}:${evenCount}`,
            `합 ${total}`
        ];
        if (consecutive >= 2) {
            pieces.push(`연속 ${consecutive}`);
        }
        return pieces;
    }

    function buildNumberTraitSummary(numbers) {
        return buildNumberTraitMeta(numbers).join(' · ');
    }

    function buildGeneratedReasonText(numbers, ruleIds = []) {
        const ruleSummary = summarizeRuleDisplayNames(ruleIds);
        const traits = buildNumberTraitSummary(numbers);
        const intro = ruleSummary
            ? `${ruleSummary} 기준을 반영한 조합`
            : '선택 기준을 반영한 조합';
        return traits ? `${intro} · ${traits}` : intro;
    }

    function buildPremiumReasonText(item) {
        const strategyLabel = String(item && item.strategy ? item.strategy : '').trim() || '추천 기준';
        const traits = buildNumberTraitSummary(item && item.numbers);
        const intro = `${strategyLabel} 기준으로 선별한 추천 조합`;
        return traits ? `${intro} · ${traits}` : intro;
    }

    function clearDrawWizardResultTimers() {
        drawWizardResultTimers.forEach(timerId => {
            window.clearTimeout(timerId);
        });
        drawWizardResultTimers = [];
    }

    function queueDrawWizardResultTimer(callback, delay = 0) {
        const timerId = window.setTimeout(() => {
            drawWizardResultTimers = drawWizardResultTimers.filter(id => id !== timerId);
            callback();
        }, Math.max(0, delay));
        drawWizardResultTimers.push(timerId);
        return timerId;
    }

    function getDrawWizardResultStatusText(drawCount = lastGeneratedDraws.length) {
        const excludeCount = normalizeDrawWizardExcludeNumbers(drawWizardState?.excludeNumbers).length;
        return excludeCount
            ? `제외수 ${excludeCount}개 반영 · ${drawCount}세트`
            : `${drawCount}세트 추첨 완료`;
    }

    function renderDrawWizardResultStage(draws = lastGeneratedDraws) {
        if (!drawWizardResultStageEl || !drawWizardResultStageStateEl || !drawWizardResultStageMetaEl || !drawWizardResultReelsEl) {
            return;
        }
        const previewNumbers = Array.isArray(draws?.[0]?.numbers) ? draws[0].numbers : [];
        const excludeNumbers = normalizeDrawWizardExcludeNumbers(drawWizardState?.excludeNumbers);
        drawWizardResultStageEl.dataset.state = 'idle';
        drawWizardResultStageStateEl.textContent = '추첨 준비';
        drawWizardResultStageMetaEl.textContent = `${Math.max(1, draws.length || 1)}세트`;
        drawWizardResultReelsEl.innerHTML = Array.from({ length: 6 }, (_, index) => {
            const finalNumber = Number(previewNumbers[index] || 0);
            const spinNumbers = generateUniqueNumbers(3, 1, 45)
                .map(value => String(value).padStart(2, '0'))
                .join(' ');
            return `
                <div class="draw-wizard-result-slot" data-slot-index="${index}" data-ball-range="${escapeHtml(getBallRange(finalNumber))}">
                    <span class="draw-wizard-result-slot-spin">${escapeHtml(spinNumbers)}</span>
                    <span class="draw-wizard-result-slot-value"></span>
                </div>
            `;
        }).join('');
    }

    function finalizeDrawWizardResultExperience(draws = lastGeneratedDraws) {
        renderDrawWizardResultStage(draws);
        if (drawWizardResultStageEl) {
            drawWizardResultStageEl.dataset.state = 'done';
        }
        if (drawWizardResultStageStateEl) {
            drawWizardResultStageStateEl.textContent = '추첨 완료';
        }
        if (drawWizardResultStageMetaEl) {
            drawWizardResultStageMetaEl.textContent = `${Math.max(1, draws.length || 1)}세트`;
        }
        if (drawWizardResultReelsEl) {
            drawWizardResultReelsEl.querySelectorAll('.draw-wizard-result-slot').forEach(slot => {
                slot.classList.add('is-revealed');
                const slotValue = slot.querySelector('.draw-wizard-result-slot-value');
                const previewNumbers = Array.isArray(draws?.[0]?.numbers) ? draws[0].numbers : [];
                const idx = parseInt(slot.dataset.slotIndex, 10);
                if (slotValue && previewNumbers[idx]) {
                    slotValue.textContent = String(previewNumbers[idx]);
                }
            });
        }
        if (numbersContainer) {
            numbersContainer.querySelectorAll('.number-row--wizard-result').forEach(row => {
                row.classList.add('is-revealed');
            });
        }
        setDrawCopyStatus(getDrawWizardResultStatusText(draws.length || 0));
    }

    function startDrawWizardResultExperience(draws = lastGeneratedDraws) {
        if (!drawWizardResultStageEl || !Array.isArray(draws) || !draws.length) {
            return;
        }
        clearDrawWizardResultTimers();
        renderDrawWizardResultStage(draws);
        const slots = Array.from(drawWizardResultReelsEl?.querySelectorAll('.draw-wizard-result-slot') || []);
        const rows = Array.from(numbersContainer?.querySelectorAll('.number-row--wizard-result') || []);
        rows.forEach(row => row.classList.remove('is-revealed'));
        slots.forEach(slot => slot.classList.remove('is-revealed'));
        drawWizardResultStageEl.dataset.state = 'spinning';
        if (drawWizardResultStageStateEl) {
            drawWizardResultStageStateEl.textContent = '번호 추첨 중';
        }
        if (drawWizardResultStageMetaEl) {
            drawWizardResultStageMetaEl.textContent = `${draws.length}세트`;
        }
        const previewNumbers = Array.isArray(draws?.[0]?.numbers) ? draws[0].numbers : [];
        const slotStartDelay = 260;
        slots.forEach((slot, index) => {
            queueDrawWizardResultTimer(() => {
                slot.classList.add('is-revealed');
                const slotValue = slot.querySelector('.draw-wizard-result-slot-value');
                if (slotValue && previewNumbers[index]) {
                    slotValue.textContent = String(previewNumbers[index]);
                }
            }, slotStartDelay + index * 180);
        });
        const rowStartDelay = slotStartDelay + slots.length * 180 + 180;
        rows.forEach((row, index) => {
            queueDrawWizardResultTimer(() => {
                row.classList.add('is-revealed');
            }, rowStartDelay + index * 170);
        });
        queueDrawWizardResultTimer(() => {
            drawWizardResultStageEl.dataset.state = 'done';
            if (drawWizardResultStageStateEl) {
                drawWizardResultStageStateEl.textContent = '추첨 완료';
            }
            if (drawWizardResultStageMetaEl) {
                drawWizardResultStageMetaEl.textContent = `${draws.length}세트`;
            }
            setDrawCopyStatus(getDrawWizardResultStatusText(draws.length));
        }, rowStartDelay + rows.length * 170);
    }

    function syncDrawWizardResultExperience(currentStep = getDrawWizardCurrentStep()) {
        if (currentStep !== 'result') {
            clearDrawWizardResultTimers();
            return;
        }
        if (!lastGeneratedDraws.length) {
            return;
        }
        if (drawWizardResultRevealToken && drawWizardResultRevealToken !== drawWizardResultPlayedToken) {
            drawWizardResultPlayedToken = drawWizardResultRevealToken;
            startDrawWizardResultExperience(lastGeneratedDraws);
            return;
        }
        clearDrawWizardResultTimers();
        finalizeDrawWizardResultExperience(lastGeneratedDraws);
    }

    function displayNumbers(draws, options = {}) {
        numbersContainer.innerHTML = '';
        lastGeneratedDraws = [];
        const isWizardResult = options.source === 'wizard';
        draws.forEach((numbers, index) => {
            const row = document.createElement('div');
            row.classList.add('number-row');
            if (isWizardResult) {
                row.classList.add('number-row--wizard-result');
            }

            const label = document.createElement('div');
            label.classList.add('row-label');
            label.textContent = isWizardResult ? `SET ${index + 1}` : `세트 ${index + 1}`;
            row.appendChild(label);

            if (numbers.length === 0) {
                const error = document.createElement('div');
                error.classList.add('error-text');
                error.textContent = '유효한 조합을 찾지 못했습니다. 규칙 수를 줄여 보세요.';
                row.appendChild(error);
                numbersContainer.appendChild(row);
                return;
            }

            const balls = document.createElement('div');
            balls.className = 'number-balls';
            numbers.forEach((number, numberIndex) => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                if (isWizardResult) {
                    numberElement.style.setProperty('--draw-ball-delay', `${numberIndex * 80}ms`);
                    numberElement.setAttribute('data-ball-range', getBallRange(number));
                }
                numberElement.textContent = number;
                balls.appendChild(numberElement);
            });
            row.appendChild(balls);

            const reason = document.createElement('div');
            reason.className = 'row-reason';
            if (isWizardResult) {
                // Simplify: Remove tags from wizard result to save space as per user request
                reason.hidden = true;
            } else {
                reason.textContent = buildGeneratedReasonText(numbers, options.ruleIds);
            }
            row.appendChild(reason);

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
        setDrawCopyStatus(
            isWizardResult
                ? getDrawWizardResultStatusText(lastGeneratedDraws.length)
                : `총 ${lastGeneratedDraws.length}세트를 생성했습니다. 아래 결과를 확인해 주세요.`
        );
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

    function getUserAgentText() {
        return navigator.userAgent || '';
    }

    function isKakaoTalkInAppBrowser() {
        return /KAKAOTALK/i.test(getUserAgentText());
    }

    function isIosDevice() {
        return /iphone|ipad|ipod/i.test(getUserAgentText());
    }

    function isAndroidDevice() {
        return /android/i.test(getUserAgentText());
    }

    function readKakaoInAppNoticeDismissed() {
        try {
            return sessionStorage.getItem(KAKAO_INAPP_NOTICE_DISMISSED_KEY) === '1';
        } catch (error) {
            console.warn('카카오 인앱브라우저 안내 상태 확인 실패', error);
            return false;
        }
    }

    function setKakaoInAppNoticeDismissed(dismissed) {
        try {
            if (dismissed) {
                sessionStorage.setItem(KAKAO_INAPP_NOTICE_DISMISSED_KEY, '1');
            } else {
                sessionStorage.removeItem(KAKAO_INAPP_NOTICE_DISMISSED_KEY);
            }
        } catch (error) {
            console.warn('카카오 인앱브라우저 안내 상태 저장 실패', error);
        }
    }

    function shouldUseExternalBrowserPrompt() {
        return isKakaoTalkInAppBrowser();
    }

    function setInAppBrowserStatus(message, isError = false) {
        if (!inAppBrowserStatusEl) {
            return;
        }
        const text = String(message || '').trim();
        inAppBrowserStatusEl.hidden = !text;
        inAppBrowserStatusEl.textContent = text;
        inAppBrowserStatusEl.classList.toggle('is-error', Boolean(text) && isError);
    }

    function getCurrentAppUrl() {
        return String(window.location.href || '').trim();
    }

    function buildKakaoExternalOpenUrl(url) {
        return `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
    }

    function buildAndroidBrowserIntentUrl(url, packageName) {
        try {
            const target = new URL(url);
            const path = `${target.host}${target.pathname}${target.search}${target.hash}`;
            const scheme = target.protocol.replace(':', '') || 'https';
            return `intent://${path}#Intent;scheme=${scheme};package=${packageName};end`;
        } catch (error) {
            console.warn('안드로이드 브라우저 intent 생성 실패', error);
            return '';
        }
    }

    function buildChromeIosUrl(url) {
        if (!url) {
            return '';
        }
        if (url.startsWith('https://')) {
            return `googlechromes://${url.slice('https://'.length)}`;
        }
        if (url.startsWith('http://')) {
            return `googlechrome://${url.slice('http://'.length)}`;
        }
        return '';
    }

    function buildSafariIosUrl(url) {
        if (!url) {
            return '';
        }
        if (url.startsWith('https://')) {
            return `x-safari-https://${url.slice('https://'.length)}`;
        }
        if (url.startsWith('http://')) {
            return `x-safari-http://${url.slice('http://'.length)}`;
        }
        return '';
    }

    function updateInAppBrowserModalUi() {
        if (!inAppBrowserModal) {
            return;
        }
        const ios = isIosDevice();
        const android = isAndroidDevice();
        if (inAppBrowserDescEl) {
            inAppBrowserDescEl.textContent = ios
                ? '카카오톡 인앱브라우저에서는 Google 로그인 정책 때문에 로그인이 차단될 수 있습니다. Safari나 Chrome으로 다시 열면 정상 로그인됩니다.'
                : '카카오톡 인앱브라우저에서는 Google 로그인 정책 때문에 로그인이 차단될 수 있습니다. 기본 브라우저나 Chrome으로 다시 열면 정상 로그인됩니다.';
        }
        if (inAppBrowserHintEl) {
            inAppBrowserHintEl.textContent = ios
                ? '카카오톡 우측 상단 메뉴에서 Safari 또는 Chrome으로 열기를 눌러도 됩니다.'
                : '카카오톡 우측 상단 메뉴에서 기본 브라우저, Chrome 또는 삼성 인터넷으로 열어도 됩니다.';
        }
        if (inAppBrowserOpenSafariBtn) {
            inAppBrowserOpenSafariBtn.hidden = !ios;
        }
        if (inAppBrowserOpenSamsungBtn) {
            inAppBrowserOpenSamsungBtn.hidden = !android;
        }
        if (inAppBrowserOpenChromeBtn) {
            inAppBrowserOpenChromeBtn.hidden = !(ios || android);
        }
    }

    function closeInAppBrowserModal(options = {}) {
        const { remember = true } = options;
        if (!inAppBrowserModal) {
            return;
        }
        if (remember) {
            setKakaoInAppNoticeDismissed(true);
        }
        inAppBrowserModal.classList.add('hidden');
        setInAppBrowserStatus('');
    }

    function openInAppBrowserModal(options = {}) {
        const { force = false } = options;
        if (!inAppBrowserModal || !shouldUseExternalBrowserPrompt()) {
            return false;
        }
        if (!force && readKakaoInAppNoticeDismissed()) {
            return false;
        }
        updateInAppBrowserModalUi();
        setKakaoInAppNoticeDismissed(false);
        closeWelcomeModal({
            keepSessionClosed: false
        });
        closeAuthModal();
        inAppBrowserModal.classList.remove('hidden');
        setInAppBrowserStatus('');
        return true;
    }

    function attemptExternalBrowserNavigation(primaryUrl, fallbackUrl = '') {
        const primary = String(primaryUrl || '').trim();
        const fallback = String(fallbackUrl || '').trim();
        if (!primary) {
            setInAppBrowserStatus('열 브라우저 주소를 만들지 못했습니다. 링크 복사로 다시 시도해 주세요.', true);
            return;
        }
        setInAppBrowserStatus('브라우저를 여는 중입니다. 전환이 안 되면 링크 복사를 눌러 주세요.');
        let fallbackTimer = 0;
        const cleanup = () => {
            if (fallbackTimer) {
                window.clearTimeout(fallbackTimer);
                fallbackTimer = 0;
            }
        };
        const handleVisibility = () => {
            if (document.hidden) {
                cleanup();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility, { once: true });
        if (fallback && fallback !== primary) {
            fallbackTimer = window.setTimeout(() => {
                if (!document.hidden) {
                    window.location.href = fallback;
                }
            }, 800);
        }
        window.location.href = primary;
    }

    function openCurrentPageInExternalBrowser(target = 'external') {
        const currentUrl = getCurrentAppUrl();
        const defaultUrl = buildKakaoExternalOpenUrl(currentUrl);
        if (!currentUrl) {
            setInAppBrowserStatus('현재 페이지 주소를 찾지 못했습니다. 링크 복사로 다시 시도해 주세요.', true);
            return;
        }
        if (target === 'chrome') {
            const chromeUrl = isIosDevice()
                ? buildChromeIosUrl(currentUrl)
                : buildAndroidBrowserIntentUrl(currentUrl, 'com.android.chrome');
            attemptExternalBrowserNavigation(chromeUrl || defaultUrl, defaultUrl);
            return;
        }
        if (target === 'safari') {
            const safariUrl = buildSafariIosUrl(currentUrl);
            attemptExternalBrowserNavigation(safariUrl || defaultUrl, defaultUrl);
            return;
        }
        if (target === 'samsung') {
            const samsungUrl = buildAndroidBrowserIntentUrl(currentUrl, 'com.sec.android.app.sbrowser');
            attemptExternalBrowserNavigation(samsungUrl || defaultUrl, defaultUrl);
            return;
        }
        attemptExternalBrowserNavigation(defaultUrl);
    }

    async function copyCurrentPageLink() {
        const currentUrl = getCurrentAppUrl();
        if (!currentUrl) {
            setInAppBrowserStatus('현재 페이지 주소를 찾지 못했습니다.', true);
            return;
        }
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function' && window.isSecureContext) {
                await navigator.clipboard.writeText(currentUrl);
                setInAppBrowserStatus('링크를 복사했습니다. 외부 브라우저에 붙여 넣어 열어 주세요.');
                return;
            }
            const textarea = document.createElement('textarea');
            textarea.value = currentUrl;
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
            setInAppBrowserStatus('링크를 복사했습니다. 외부 브라우저에 붙여 넣어 열어 주세요.');
        } catch (error) {
            console.warn('현재 페이지 링크 복사 실패', error);
            setInAppBrowserStatus('링크 복사에 실패했습니다. 카카오톡 메뉴의 브라우저로 열기를 사용해 주세요.', true);
        }
    }

    function scheduleInAppBrowserPrompt() {
        if (!shouldUseExternalBrowserPrompt() || readKakaoInAppNoticeDismissed()) {
            return;
        }
        window.setTimeout(() => {
            openInAppBrowserModal();
        }, 420);
    }

    function readGoogleRedirectPendingState() {
        try {
            const raw = localStorage.getItem(GOOGLE_REDIRECT_STATE_KEY);
            if (!raw) {
                return false;
            }
            const startedAt = Number(raw);
            if (!Number.isFinite(startedAt) || startedAt <= 0) {
                localStorage.removeItem(GOOGLE_REDIRECT_STATE_KEY);
                return false;
            }
            if (Date.now() - startedAt > GOOGLE_REDIRECT_PENDING_TTL_MS) {
                localStorage.removeItem(GOOGLE_REDIRECT_STATE_KEY);
                return false;
            }
            return true;
        } catch (error) {
            console.warn('구글 리디렉션 상태 확인 실패', error);
            return false;
        }
    }

    function setGoogleRedirectPendingState(nextPending) {
        googleRedirectFlowPending = Boolean(nextPending);
        try {
            if (googleRedirectFlowPending) {
                localStorage.setItem(GOOGLE_REDIRECT_STATE_KEY, String(Date.now()));
            } else {
                localStorage.removeItem(GOOGLE_REDIRECT_STATE_KEY);
            }
        } catch (error) {
            console.warn('구글 리디렉션 상태 저장 실패', error);
        }
    }

    function hasGoogleRedirectPending() {
        if (!googleRedirectFlowPending) {
            return false;
        }
        googleRedirectFlowPending = readGoogleRedirectPendingState();
        return googleRedirectFlowPending;
    }

    function getAuthPendingStatusMessage() {
        return hasGoogleRedirectPending()
            ? '구글 로그인 결과를 확인하는 중입니다.'
            : '저장된 로그인 상태를 확인하는 중입니다.';
    }

    function isAuthStatePending() {
        return Boolean((firebaseReady && !authStateResolved) || hasGoogleRedirectPending());
    }


    function normalizeMembershipTier(value) {
        const normalized = String(value || '').trim().toLowerCase();
        return ['free', 'gold', 'platinum', 'master'].includes(normalized) ? normalized : 'free';
    }

    function normalizeScheduledMembershipTier(value) {
        const normalized = String(value || '').trim().toLowerCase();
        return ['free', 'gold', 'platinum', 'master'].includes(normalized) ? normalized : '';
    }

    function serializeMembershipDate(value) {
        const millis = getTimestampMillis(value);
        return millis > 0 ? new Date(millis).toISOString() : '';
    }

    function addMonthsPreserveClock(value, months = 1) {
        const base = value instanceof Date ? new Date(value.getTime()) : new Date(value);
        if (!Number.isFinite(base.getTime())) {
            return null;
        }
        const originalDay = base.getDate();
        const result = new Date(base.getTime());
        result.setDate(1);
        result.setMonth(result.getMonth() + Number(months || 0));
        const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
        result.setDate(Math.min(originalDay, lastDay));
        result.setHours(base.getHours(), base.getMinutes(), base.getSeconds(), base.getMilliseconds());
        return result;
    }

    function createFreeMembershipState(updatedAt = new Date()) {
        return {
            membershipTier: 'free',
            subscriptionStatus: 'inactive',
            subscriptionStartedAt: '',
            subscriptionEndsAt: '',
            scheduledMembershipTier: '',
            scheduledMembershipApplyAt: '',
            subscriptionUpdatedAt: serializeMembershipDate(updatedAt) || new Date().toISOString()
        };
    }

    function createPaidMembershipState(tier, startAt = new Date(), extras = {}) {
        const normalizedTier = normalizeMembershipTier(tier);
        if (normalizedTier === 'free') {
            return createFreeMembershipState(startAt);
        }
        const cycleStart = startAt instanceof Date ? new Date(startAt.getTime()) : new Date(startAt);
        const safeStart = Number.isFinite(cycleStart.getTime()) ? cycleStart : new Date();
        const cycleEnd = addMonthsPreserveClock(safeStart, 1) || new Date(safeStart.getTime());
        return {
            membershipTier: normalizedTier,
            subscriptionStatus: extras.subscriptionStatus || 'active',
            subscriptionStartedAt: safeStart.toISOString(),
            subscriptionEndsAt: cycleEnd.toISOString(),
            scheduledMembershipTier: normalizeScheduledMembershipTier(extras.scheduledMembershipTier),
            scheduledMembershipApplyAt: serializeMembershipDate(extras.scheduledMembershipApplyAt),
            subscriptionUpdatedAt: serializeMembershipDate(extras.subscriptionUpdatedAt) || new Date().toISOString()
        };
    }

    function resolveMembershipState(raw = null) {
        const source = raw && typeof raw === 'object' ? raw : readStoredMembershipState();
        const baseTier = normalizeMembershipTier(source.membershipTier);
        if (baseTier === 'free') {
            return createFreeMembershipState(source.subscriptionUpdatedAt || source.updatedAt || source.createdAt || new Date());
        }

        const updatedIso = serializeMembershipDate(source.subscriptionUpdatedAt || source.updatedAt || source.createdAt) || new Date().toISOString();
        let cycleStart = new Date(serializeMembershipDate(source.subscriptionStartedAt || source.subscriptionStartAt) || updatedIso);
        if (!Number.isFinite(cycleStart.getTime())) {
            cycleStart = new Date();
        }
        let cycleEnd = new Date(serializeMembershipDate(source.subscriptionEndsAt || source.subscriptionEndAt) || (addMonthsPreserveClock(cycleStart, 1)?.toISOString() || ''));
        if (!Number.isFinite(cycleEnd.getTime())) {
            cycleEnd = addMonthsPreserveClock(cycleStart, 1) || new Date(cycleStart.getTime());
        }

        let currentTier = baseTier;
        let scheduledTier = normalizeScheduledMembershipTier(source.scheduledMembershipTier || source.pendingMembershipTier);
        if (scheduledTier) {
            const currentPlan = getMembershipPlanMeta(currentTier);
            const scheduledPlan = getMembershipPlanMeta(scheduledTier);
            if (scheduledPlan.level >= currentPlan.level) {
                scheduledTier = '';
            }
        }

        let scheduledApplyIso = serializeMembershipDate(source.scheduledMembershipApplyAt || source.pendingMembershipApplyAt);
        if (scheduledTier && !scheduledApplyIso) {
            scheduledApplyIso = cycleEnd.toISOString();
        }

        const nowMs = Date.now();
        let guard = 0;
        while (guard < 24 && Number.isFinite(cycleEnd.getTime()) && nowMs >= cycleEnd.getTime()) {
            guard += 1;
            const scheduledApplyMs = getTimestampMillis(scheduledApplyIso);
            const shouldApplyScheduled = Boolean(scheduledTier && scheduledApplyMs && scheduledApplyMs <= cycleEnd.getTime() + 1000);
            if (shouldApplyScheduled) {
                if (scheduledTier === 'free') {
                    return createFreeMembershipState(cycleEnd);
                }
                currentTier = scheduledTier;
                scheduledTier = '';
                scheduledApplyIso = '';
            }
            cycleStart = new Date(cycleEnd.getTime());
            cycleEnd = addMonthsPreserveClock(cycleStart, 1) || new Date(cycleStart.getTime());
        }

        return {
            membershipTier: currentTier,
            subscriptionStatus: scheduledTier ? 'scheduled_downgrade' : 'active',
            subscriptionStartedAt: cycleStart.toISOString(),
            subscriptionEndsAt: cycleEnd.toISOString(),
            scheduledMembershipTier: scheduledTier,
            scheduledMembershipApplyAt: scheduledApplyIso,
            subscriptionUpdatedAt: updatedIso
        };
    }

    function getMembershipStatePayload(state) {
        const tier = normalizeMembershipTier(state && state.membershipTier);
        if (tier === 'free') {
            return createFreeMembershipState(state && (state.subscriptionUpdatedAt || state.updatedAt || state.createdAt || new Date()));
        }
        const startIso = serializeMembershipDate(state && (state.subscriptionStartedAt || state.subscriptionStartAt))
            || serializeMembershipDate(state && (state.subscriptionUpdatedAt || state.updatedAt || state.createdAt))
            || new Date().toISOString();
        const endIso = serializeMembershipDate(state && (state.subscriptionEndsAt || state.subscriptionEndAt))
            || (addMonthsPreserveClock(startIso, 1)?.toISOString() || '');
        return {
            membershipTier: tier,
            subscriptionStatus: state && state.subscriptionStatus === 'scheduled_downgrade' ? 'scheduled_downgrade' : 'active',
            subscriptionStartedAt: startIso,
            subscriptionEndsAt: endIso,
            scheduledMembershipTier: normalizeScheduledMembershipTier(state && state.scheduledMembershipTier),
            scheduledMembershipApplyAt: serializeMembershipDate(state && state.scheduledMembershipApplyAt),
            subscriptionUpdatedAt: serializeMembershipDate(state && (state.subscriptionUpdatedAt || state.updatedAt || state.createdAt)) || new Date().toISOString()
        };
    }

    function readStoredMembershipState() {
        try {
            const raw = localStorage.getItem(MEMBERSHIP_STATE_LOCAL_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') {
                    return parsed;
                }
            }
        } catch (error) {
            console.warn('멤버십 상태 로드 실패', error);
        }
        return {
            membershipTier: localStorage.getItem('lotto_membership_tier') || 'free'
        };
    }

    function persistLocalMembershipState(state) {
        const payload = getMembershipStatePayload(resolveMembershipState(state));
        try {
            localStorage.setItem('lotto_membership_tier', payload.membershipTier);
            localStorage.setItem(MEMBERSHIP_STATE_LOCAL_KEY, JSON.stringify(payload));
        } catch (error) {
            console.warn('멤버십 상태 저장 실패', error);
        }
    }

    function getMembershipState() {
        return resolveMembershipState(currentUserProfile || readStoredMembershipState());
    }

    function getMembershipChangeMode(currentTier, nextTier, scheduledTier = '') {
        const current = normalizeMembershipTier(currentTier);
        const next = normalizeMembershipTier(nextTier);
        if (current === next) {
            return scheduledTier ? 'retain' : 'current';
        }
        const currentPlan = getMembershipPlanMeta(current);
        const nextPlan = getMembershipPlanMeta(next);
        if (nextPlan.level > currentPlan.level) {
            return currentPlan.level === 0 ? 'activate' : 'upgrade';
        }
        return 'downgrade';
    }

    function formatMembershipDate(value) {
        const millis = getTimestampMillis(value);
        return millis > 0 ? formatShortDate(new Date(millis)) : '-';
    }

    function formatMembershipPeriod(startAt, endAt) {
        const startLabel = formatMembershipDate(startAt);
        const endLabel = formatMembershipDate(endAt);
        if (startLabel === '-' || endLabel === '-') {
            return '-';
        }
        return `${startLabel} ~ ${endLabel}`;
    }

    function getMembershipTier() {
        return getMembershipState().membershipTier;
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

    function persistSelectedRules() {
        const selected = ruleInputs.filter(input => input.checked).map(input => input.value);
        localStorage.setItem('lotto_rules', JSON.stringify(selected));
        localStorage.setItem(RULES_UPDATED_AT_KEY, new Date().toISOString());
        updateRulesStatus('선택한 규칙을 저장했습니다.');
        updateMypageSummaryUi();
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

    function readGeneratedHistorySessions() {
        try {
            const raw = localStorage.getItem(GENERATED_HISTORY_LOCAL_KEY);
            if (!raw) {
                return [];
            }
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('생성 번호 보관함 로드 실패', error);
            return [];
        }
    }

    function saveGeneratedHistorySessions(items) {
        try {
            localStorage.setItem(GENERATED_HISTORY_LOCAL_KEY, JSON.stringify(items));
        } catch (error) {
            console.warn('생성 번호 보관함 저장 실패', error);
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
                level: 0,
                price: 0,
                originalPrice: 0,
                dailyGenerationLimit: 5,
                recommendedSetCount: 0,
                weeklyLockerCount: 0,
                description: '번호 추출 하루 5조합을 제공하는 기본 플랜입니다.',
                note: 'FREE · 하루 5조합'
            },
            gold: {
                id: 'gold',
                label: 'GOLD',
                level: 1,
                price: 9900,
                originalPrice: 14900,
                dailyGenerationLimit: 15,
                recommendedSetCount: 5,
                weeklyLockerCount: 5,
                description: '하루 15조합과 골드 전용 제외수, 스튜디오 추천 5조합을 제공합니다.',
                note: '첫 달 0원 · 이후 월 9,900원 자동결제'
            },
            platinum: {
                id: 'platinum',
                label: 'PLATINUM',
                level: 2,
                price: 14900,
                originalPrice: 21900,
                dailyGenerationLimit: 30,
                recommendedSetCount: 15,
                weeklyLockerCount: 15,
                description: '하루 30조합과 골드 전용 제외수, 일주일 15조합 추천을 제공합니다.',
                note: '첫 달 0원 · 이후 월 14,900원 자동결제'
            },
            master: {
                id: 'master',
                label: 'MASTER',
                level: 3,
                price: 19900,
                originalPrice: 34900,
                dailyGenerationLimit: Number.POSITIVE_INFINITY,
                recommendedSetCount: 30,
                weeklyLockerCount: 30,
                description: '조합 무제한과 골드 전용 제외수, 일주일 30조합 추천을 제공합니다.',
                note: '첫 달 0원 · 이후 월 19,900원 자동결제'
            }
        };
        return planMap[normalized] || planMap.free;
    }

    function formatMembershipRecurringPrice(planOrTier = getMembershipPlanMeta()) {
        const plan = typeof planOrTier === 'string' ? getMembershipPlanMeta(planOrTier) : planOrTier;
        if (!plan || plan.id === 'free') {
            return '월 0원';
        }
        return `월 ${formatNumber(plan.price || 0)}원`;
    }

    function formatMembershipLaunchOffer(planOrTier = getMembershipPlanMeta()) {
        const plan = typeof planOrTier === 'string' ? getMembershipPlanMeta(planOrTier) : planOrTier;
        if (!plan || plan.id === 'free') {
            return '무료';
        }
        return `첫 달 0원 · 2개월차부터 ${formatMembershipRecurringPrice(plan)} 자동결제`;
    }

    function getGenerationAccessPlanMeta() {
        return isMember() ? getMembershipPlanMeta() : getMembershipPlanMeta('free');
    }

    function getMembershipDailyGenerationLimit(tier = getGenerationAccessPlanMeta().id) {
        const value = getMembershipPlanMeta(tier).dailyGenerationLimit;
        return Number.isFinite(value) ? Math.max(0, Number(value) || 0) : Number.POSITIVE_INFINITY;
    }

    function getDailyGenerationUsageKey(ownerKey = getHistoryOwnerKey(), dateKey = getTodayKey()) {
        return `${PLAN_DAILY_USAGE_KEY}:${ownerKey}:${dateKey}`;
    }

    function getDailyGenerationUsageCount(ownerKey = getHistoryOwnerKey(), dateKey = getTodayKey()) {
        try {
            return Math.max(0, Number(localStorage.getItem(getDailyGenerationUsageKey(ownerKey, dateKey)) || 0) || 0);
        } catch (error) {
            console.warn('일일 조합 사용량 로드 실패', error);
            return 0;
        }
    }

    function getGenerationLimitSnapshot(requestedCount = Math.max(1, parseInt(drawCountSelect?.value || '1', 10) || 1)) {
        const plan = getGenerationAccessPlanMeta();
        const limit = getMembershipDailyGenerationLimit(plan.id);
        const used = getDailyGenerationUsageCount();
        const remaining = Number.isFinite(limit) ? Math.max(0, limit - used) : Number.POSITIVE_INFINITY;
        return {
            plan,
            requestedCount: Math.max(1, Number(requestedCount) || 1),
            limit,
            used,
            remaining,
            allowed: !Number.isFinite(limit) || requestedCount <= remaining
        };
    }

    function hasExcludeNumberAccess(tier = getGenerationAccessPlanMeta().id) {
        return getMembershipPlanMeta(tier).level >= 1;
    }

    function getRecommendedSetCount(tier = getMembershipTier()) {
        return Math.max(0, Number(getMembershipPlanMeta(tier).recommendedSetCount) || 0);
    }

    function getLockerWeeklySetCount(tier = getMembershipTier()) {
        return Math.max(0, Number(getMembershipPlanMeta(tier).weeklyLockerCount) || 0);
    }

    function createSeededRandom(seedText) {
        const input = String(seedText || 'lotto-seed');
        let seed = 0;
        for (let index = 0; index < input.length; index += 1) {
            seed = Math.imul(seed ^ input.charCodeAt(index), 2654435761) >>> 0;
        }
        if (!seed) {
            seed = 0x9e3779b9;
        }
        return () => {
            seed = (seed + 0x6D2B79F5) | 0;
            let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
            return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
        };
    }

    function generateStrategyRecommendations(count, options = {}) {
        const drawCount = Math.max(1, Number(count) || 5);
        const strategyOrder = Array.isArray(options.strategyOrder) && options.strategyOrder.length
            ? options.strategyOrder
            : RECOMMENDATION_STRATEGY_ORDER;
        const randomFn = typeof options.randomFn === 'function' ? options.randomFn : Math.random;
        const baseExcludedNumbers = options.excludedNumbers instanceof Set ? options.excludedNumbers : excludeNumberValues;
        const excludedNumbers = hasExcludeNumberAccess() ? baseExcludedNumbers : new Set();
        const draws = [];
        const usedSignatures = new Set();

        for (let index = 0; index < drawCount; index += 1) {
            const strategy = strategyOrder[index % strategyOrder.length];
            const ids = PRESETS[strategy] || [];
            const activeRules = RULES.filter(rule => ids.includes(rule.id));
            let selectedNumbers = [];

            for (let attempt = 0; attempt < 24; attempt += 1) {
                let candidate = generateNumbersWithRules(activeRules, {
                    randomFn,
                    excludedNumbers
                });
                if (!candidate.length) {
                    candidate = generateUniqueNumbers(6, 1, 45, randomFn).sort((a, b) => a - b);
                }
                if (!candidate.length) {
                    continue;
                }
                selectedNumbers = candidate;
                const signature = candidate.join('-');
                if (!usedSignatures.has(signature)) {
                    usedSignatures.add(signature);
                    break;
                }
            }

            if (!selectedNumbers.length) {
                selectedNumbers = generateUniqueNumbers(6, 1, 45, randomFn).sort((a, b) => a - b);
            }

            draws.push({
                setNo: index + 1,
                strategy: PRESETS_LABEL[strategy] || strategy,
                numbers: selectedNumbers
            });
        }

        return draws.filter(item => Array.isArray(item.numbers) && item.numbers.length === 6);
    }

    function scrollIntoViewSoon(target) {
        if (!target || typeof target.scrollIntoView !== 'function') {
            return;
        }
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            });
        });
    }

    function preventDrawWizardChromeScroll(event) {
        if (event.cancelable) {
            event.preventDefault();
        }
    }

    function bindDrawWizardChromeScrollLock(element) {
        if (!element) {
            return;
        }
        element.addEventListener('wheel', preventDrawWizardChromeScroll, { passive: false });
        element.addEventListener('touchmove', preventDrawWizardChromeScroll, { passive: false });
    }

    bindDrawWizardChromeScrollLock(drawWizardDashboardEl);
    bindDrawWizardChromeScrollLock(drawWizardNavEl);

    function openPremiumPlanWorkspace(options = {}) {
        const { focusResults = false } = options;
        setActiveTab('draw', true);
        setDrawServiceMode('premium');
        const shouldFocusResults = Boolean(focusResults && isPremiumMember());
        const target = shouldFocusResults
            ? (drawPremiumResultsSectionEl || drawPremiumCompareSectionEl)
            : (drawPremiumCompareSectionEl || drawPremiumResultsSectionEl);
        scrollIntoViewSoon(target);
    }

    function setDrawAdvancedOpen(nextOpen, options = {}) {
        if (!drawAdvancedShellEl || !drawAdvancedContentEl || !drawQuickAdvancedBtn) {
            return;
        }
        const { scroll = false, focusTarget = null } = options;
        isDrawAdvancedOpen = Boolean(nextOpen);
        drawAdvancedShellEl.classList.toggle('is-open', isDrawAdvancedOpen);
        drawAdvancedContentEl.hidden = !isDrawAdvancedOpen;
        drawQuickAdvancedBtn.setAttribute('aria-expanded', String(isDrawAdvancedOpen));
        drawQuickAdvancedBtn.textContent = isDrawAdvancedOpen ? '고급 설정 접기' : '고급 설정 열기';
        scheduleDrawHorizontalWidthSync();
        if (isDrawAdvancedOpen && scroll) {
            scrollIntoViewSoon(focusTarget || drawAdvancedShellEl);
        }
    }

    function syncDrawQuickStartUi() {
        const selectedCount = ruleInputs.filter(input => input.checked).length;
        const drawCount = Math.max(1, parseInt(drawCountSelect?.value || '1', 10) || 1);
        const activeLabel = activeStrategy ? (PRESETS_LABEL[activeStrategy] || activeStrategy) : '';
        const isCustomSelection = !activeStrategy && selectedCount > 0;

        drawQuickOptionButtons.forEach(button => {
            const strategy = String(button.dataset.quickStrategy || '');
            const active = strategy === activeStrategy;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        if (drawQuickCustomBtn) {
            drawQuickCustomBtn.classList.toggle('is-active', isCustomSelection);
            drawQuickCustomBtn.setAttribute('aria-pressed', String(isCustomSelection));
        }

        if (drawQuickSummaryTitleEl) {
            if (activeLabel && selectedCount > 0) {
                drawQuickSummaryTitleEl.textContent = `${activeLabel} 기준으로 추천 준비 완료`;
            } else if (isCustomSelection) {
                drawQuickSummaryTitleEl.textContent = `직접 고른 필터 ${selectedCount}개가 적용되어 있습니다.`;
            } else {
                drawQuickSummaryTitleEl.textContent = '아직 추천 방식이 정해지지 않았습니다.';
            }
        }

        if (drawQuickSummaryNoteEl) {
            if (activeLabel && selectedCount > 0) {
                drawQuickSummaryNoteEl.textContent = `현재 ${drawCount}세트로 설정되어 있습니다. 바로 번호 추천받기를 누르면 됩니다.`;
            } else if (isCustomSelection) {
                drawQuickSummaryNoteEl.textContent = `지금은 직접 고른 필터 ${selectedCount}개 기준입니다. 세트 수를 정한 뒤 바로 번호를 받을 수 있습니다.`;
            } else {
                drawQuickSummaryNoteEl.textContent = '처음이면 균형형을 누른 뒤 바로 번호 추천받기를 누르세요.';
            }
        }
    }

    function setupSimplifiedDrawExperience() {
        if (!rulesSection || !drawQuickGeneratorSlotEl || !drawGeneratorSectionEl) {
            return;
        }

        if (drawGeneratorSectionEl.parentNode !== drawQuickGeneratorSlotEl) {
            drawQuickGeneratorSlotEl.appendChild(drawGeneratorSectionEl);
            drawGeneratorSectionEl.classList.add('draw-generator-card--primary');
        }

        if (drawAdvancedContentEl && drawAdvancedContentEl.dataset.mounted !== 'true') {
            if (drawBuilderEl && drawSelectedBoardEl && drawBuilderEl.firstElementChild !== drawSelectedBoardEl) {
                drawBuilderEl.insertBefore(drawSelectedBoardEl, drawBuilderEl.firstChild);
            }
            if (scenarioPanel && toggleScenariosBtn) {
                scenarioPanel.classList.add('is-collapsed');
                toggleScenariosBtn.textContent = '펼치기';
                toggleScenariosBtn.setAttribute('aria-expanded', 'false');
            }
            [drawStudioBodyEl, rulePickerPanel].forEach(element => {
                if (element && element.parentNode !== drawAdvancedContentEl) {
                    drawAdvancedContentEl.appendChild(element);
                }
            });
            drawAdvancedContentEl.dataset.mounted = 'true';
        }

        if (drawSelectionDockEl) {
            drawSelectionDockEl.hidden = true;
        }
        if (drawSelectionDockPlaceholderEl) {
            drawSelectionDockPlaceholderEl.hidden = true;
        }

        setDrawAdvancedOpen(false);
        if (!activeStrategy && !ruleInputs.some(input => input.checked)) {
            applyStrategy('balanced');
            updateRulesStatus('처음 쓰기 쉬운 균형형을 기본으로 준비했습니다. 바로 번호 추천받기를 누르거나 강도를 바꿔 보세요.');
        }
        syncDrawQuickStartUi();
    }

    function updateDashboardSummaryUi() {
        if (dashSyncStatusEl) {
            if (currentWeeklyData && Number(currentWeeklyData.drwNo) > 0) {
                dashSyncStatusEl.textContent = `${currentWeeklyData.drwNo}회 기준 준비 완료`;
            } else {
                dashSyncStatusEl.textContent = '회차 기준 불러오는 중';
            }
        }
        if (dashSyncTimeEl) {
            if (lastWeeklyRenderedAt) {
                let sourceLabel = '공식 데이터';
                if (lastWeeklyRenderSource === 'main-info') {
                    sourceLabel = '메인 정보';
                } else if (lastWeeklyRenderSource === 'embedded-fallback') {
                    sourceLabel = '내장 안내 데이터';
                }
                dashSyncTimeEl.textContent = `${formatRelativeTime(lastWeeklyRenderedAt)} · ${sourceLabel} 기준`;
            } else {
                dashSyncTimeEl.textContent = '공식 기준 정리 중';
            }
        }
        if (dashMembershipChipEl) {
            dashMembershipChipEl.textContent = isMember() ? getMembershipPlanMeta().label : '둘러보기';
        }
        if (dashActivityChipEl) {
            const stats = getGenerationStats();
            if (stats.totalSets > 0) {
                const modeLabel = stats.lastSourceMode === 'premium' ? '추천 플랜' : '직접 선택';
                dashActivityChipEl.textContent = `누적 ${formatNumber(stats.totalSets)}세트 · 최근 ${modeLabel}`;
            } else {
                dashActivityChipEl.textContent = '첫 생성 전';
            }
        }
    }

    function formatDisplayPercent(value) {
        const num = Number(value);
        if (!Number.isFinite(num)) return '0.0';
        // Round to 1 decimal place and cap at 99.9%
        const displayVal = Math.min(99.9, Math.round(num * 10) / 10);
        return displayVal.toFixed(1);
    }

    function updateDrawContextUi() {
        const plan = getMembershipPlanMeta();
        const authPending = isAuthStatePending();
        if (drawMembershipStatusEl) {
            if (authPending) {
                drawMembershipStatusEl.textContent = '로그인 확인 중';
            } else if (!isMember()) {
                drawMembershipStatusEl.textContent = '로그인 전';
            } else if (isPremiumMember()) {
                drawMembershipStatusEl.textContent = `${plan.label} 선택`;
            } else {
                drawMembershipStatusEl.textContent = 'FREE 사용 중';
            }
        }
        if (drawMembershipNoteEl) {
            if (authPending) {
                drawMembershipNoteEl.textContent = '저장된 로그인 상태를 확인하고 있습니다.';
            } else if (!isMember()) {
                drawMembershipNoteEl.textContent = '로그인 후 첫 달 0원으로 GOLD / PLATINUM / MASTER를 시작하고 추천 조합을 바로 확인할 수 있습니다.';
            } else if (isPremiumMember()) {
                drawMembershipNoteEl.textContent = `${plan.label} 기준 추천 ${getRecommendedSetCount(plan.id)}세트와 전체 복사를 바로 사용할 수 있습니다. ${formatMembershipLaunchOffer(plan)} 플랜입니다.`;
            } else {
                drawMembershipNoteEl.textContent = 'FREE는 하루 5조합까지 가능합니다. 필요할 때 첫 달 0원으로 유료 플랜으로 올릴 수 있습니다.';
            }
        }
        const selectedCount = ruleInputs.filter(input => input.checked).length;
        const hasSelection = selectedCount > 0;
        if (drawSelectionSummaryEl) {
            drawSelectionSummaryEl.textContent = selectedCount ? `필터 ${selectedCount}개 적용 중` : '아직 고른 기준이 없습니다.';
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
        const shouldShowBottomGenerateBar = false;
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
                const remainPct = formatDisplayPercent(Number.isFinite(currentRemainingRatio) ? currentRemainingRatio * 100 : 100);
                const remainingValue = Number.isFinite(currentRemainingCombos) ? formatNumber(currentRemainingCombos) : '-';
                drawBottomGenerateDetailEl.textContent = `남는 후보 ${remainingValue}개 · 전체의 ${remainPct}% 범위에서 생성합니다.`;
            }
        }
        if (drawFilterDetailEl) {
            if (!selectedCount) {
                drawFilterDetailEl.textContent = '빠른 선택 또는 규칙을 추가해 조합을 좁혀보세요.';
                return;
            }
            const remainPct = formatDisplayPercent(Number.isFinite(currentRemainingRatio) ? currentRemainingRatio * 100 : 100);
            const remainingValue = Number.isFinite(currentRemainingCombos) ? formatNumber(currentRemainingCombos) : '-';
            const excludedValue = Number.isFinite(currentExcludedCombos) ? formatNumber(currentExcludedCombos) : '-';
            drawFilterDetailEl.textContent = `남는 후보 ${remainingValue}개 · 제외 ${excludedValue}개 · 남은 비중 ${remainPct}%`;
        }
        syncDrawQuickStartUi();
    }

    function getDrawWizardDefaultState() {
        return {
            currentStep: 'start',
            currentGroupIndex: 0,
            selectedRuleIds: [],
            excludeNumbers: [],
            completed: false,
            updatedAt: Date.now()
        };
    }

    function getDrawWizardRuleSteps() {
        return ruleGroups.map((groupEl, index) => {
            const groupLabel = String(groupEl?.dataset.group || '').trim() || `규칙 그룹 ${index + 1}`;
            const info = DRAW_WIZARD_RULE_GROUP_INFO[groupLabel] || {
                title: `${groupLabel} 제외하기`,
                copy: '이 단계에서 제외하고 싶은 패턴을 고른 뒤 다음으로 넘어가면 됩니다.'
            };
            const staticRules = Array.isArray(DRAW_WIZARD_STATIC_GROUP_RULES[groupLabel])
                ? DRAW_WIZARD_STATIC_GROUP_RULES[groupLabel].map(rule => ({
                    id: String(rule.id || '').trim(),
                    title: String(rule.title || rule.id || '').trim(),
                    desc: String(rule.desc || '').trim(),
                    detail: String(RULE_DETAILS[rule.id] || '').trim()
                })).filter(rule => rule.id)
                : null;
            const domRules = Array.from(groupEl.querySelectorAll('.rule-card')).map(card => {
                const input = card.querySelector('.rule-input');
                if (!input) {
                    return null;
                }
                const id = String(input.value || '').trim();
                if (!id) {
                    return null;
                }
                const override = DRAW_WIZARD_RULE_OVERRIDES[id] || null;
                return {
                    id,
                    title: String(
                        override?.title
                        || card.dataset.title
                        || card.querySelector('.rule-title')?.textContent
                        || id
                    ).trim(),
                    desc: String(
                        override?.desc
                        || card.querySelector('.rule-desc')?.textContent
                        || ''
                    ).trim(),
                    detail: String(RULE_DETAILS[id] || '').trim()
                };
            }).filter(Boolean);
            const rules = staticRules && staticRules.length ? staticRules : domRules;
            return rules.length ? {
                key: `wizard-group-${index + 1}`,
                stepNumber: index + 1,
                groupLabel,
                kicker: `${index + 1}단계`,
                title: info.title || `${groupLabel} 제외하기`,
                copy: info.copy,
                rules
            } : null;
        }).filter(Boolean);
    }

    function getDrawWizardTotalSteps() {
        return getDrawWizardRuleSteps().length + 3;
    }

    function normalizeDrawWizardExcludeNumbers(values) {
        return Array.from(new Set(
            (Array.isArray(values) ? values : [])
                .map(value => Number(value))
                .filter(value => Number.isInteger(value) && value >= 1 && value <= 45)
        )).sort((left, right) => left - right);
    }

    function sanitizeDrawWizardState(raw) {
        const defaults = getDrawWizardDefaultState();
        const ruleSteps = getDrawWizardRuleSteps();
        const validRuleIds = new Set(ruleSteps.flatMap(step => step.rules.map(rule => rule.id)));
        const validSteps = new Set(['start', 'rules', 'exclude', 'review']);
        if (!raw || typeof raw !== 'object') {
            return defaults;
        }
        const currentStep = validSteps.has(String(raw.currentStep || '').trim())
            ? String(raw.currentStep || '').trim()
            : 'start';
        const currentGroupIndex = Math.max(0, Math.min(
            ruleSteps.length ? ruleSteps.length - 1 : 0,
            Number(raw.currentGroupIndex || 0) || 0
        ));
        const selectedRuleIds = Array.from(new Set(
            (Array.isArray(raw.selectedRuleIds) ? raw.selectedRuleIds : [])
                .map(value => String(value || '').trim())
                .filter(value => validRuleIds.has(value))
        ));
        return {
            currentStep,
            currentGroupIndex,
            selectedRuleIds,
            excludeNumbers: normalizeDrawWizardExcludeNumbers(raw.excludeNumbers),
            completed: false,
            updatedAt: Number(raw.updatedAt) || Date.now()
        };
    }

    function hasMeaningfulDrawWizardState(state) {
        if (!state) {
            return false;
        }
        return Boolean(
            (Array.isArray(state.selectedRuleIds) && state.selectedRuleIds.length)
            || (Array.isArray(state.excludeNumbers) && state.excludeNumbers.length)
        );
    }

    function getDrawWizardDraftStorageKey(user = currentUser) {
        const uid = user && typeof user.uid === 'string' ? user.uid.trim() : '';
        return uid ? `${DRAW_WIZARD_DRAFT_KEY}:${uid}` : '';
    }

    function clearLegacyDrawWizardDraft() {
        try {
            localStorage.removeItem(DRAW_WIZARD_DRAFT_KEY);
        } catch (error) {
            console.warn('추첨 위저드 레거시 초안 삭제 실패', error);
        }
    }

    function loadDrawWizardDraft() {
        if (!DRAW_WIZARD_RESUME_ENABLED) {
            clearDrawWizardDraft();
            return null;
        }
        if (!isMember()) {
            clearLegacyDrawWizardDraft();
            return null;
        }
        try {
            const storageKey = getDrawWizardDraftStorageKey();
            if (!storageKey) {
                clearLegacyDrawWizardDraft();
                return null;
            }
            const raw = localStorage.getItem(storageKey) || localStorage.getItem(DRAW_WIZARD_DRAFT_KEY);
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw);
            const sanitized = sanitizeDrawWizardState(parsed);
            if (hasMeaningfulDrawWizardState(sanitized)) {
                localStorage.setItem(storageKey, JSON.stringify({
                    ...sanitized,
                    updatedAt: Date.now()
                }));
                clearLegacyDrawWizardDraft();
                return sanitized;
            }
            localStorage.removeItem(storageKey);
            clearLegacyDrawWizardDraft();
            return null;
        } catch (error) {
            console.warn('추첨 위저드 초안 복원 실패', error);
            const storageKey = getDrawWizardDraftStorageKey();
            if (storageKey) {
                localStorage.removeItem(storageKey);
            }
            clearLegacyDrawWizardDraft();
            return null;
        }
    }

    function persistDrawWizardDraft() {
        if (!drawWizardState) {
            return;
        }
        if (!DRAW_WIZARD_RESUME_ENABLED) {
            clearDrawWizardDraft();
            return;
        }
        try {
            clearLegacyDrawWizardDraft();
            const storageKey = getDrawWizardDraftStorageKey();
            if (!storageKey) {
                return;
            }
            if (!hasMeaningfulDrawWizardState(drawWizardState)) {
                localStorage.removeItem(storageKey);
                return;
            }
            localStorage.setItem(storageKey, JSON.stringify({
                ...drawWizardState,
                currentStep: drawWizardState.currentStep === 'result' ? 'review' : drawWizardState.currentStep,
                updatedAt: Date.now()
            }));
        } catch (error) {
            console.warn('추첨 위저드 초안 저장 실패', error);
        }
    }

    function clearDrawWizardDraft() {
        try {
            const storageKey = getDrawWizardDraftStorageKey();
            if (storageKey) {
                localStorage.removeItem(storageKey);
            }
            clearLegacyDrawWizardDraft();
        } catch (error) {
            console.warn('추첨 위저드 초안 삭제 실패', error);
        }
    }

    function resetDrawWizardSessionState({ clearDraft = false, render = true } = {}) {
        if (!drawWizardState) {
            return;
        }
        drawWizardTransitionDirection = 'backward';
        drawWizardResumeState = null;
        drawWizardState = getDrawWizardDefaultState();
        syncDrawWizardSelections();
        if (clearDraft) {
            clearDrawWizardDraft();
        }
        if (render) {
            renderDrawWizard();
        }
    }

    function syncDrawWizardResumeStateFromAuth() {
        if (!drawWizardState) {
            return;
        }
        if (!DRAW_WIZARD_RESUME_ENABLED) {
            drawWizardResumeState = null;
            if (getDrawWizardCurrentStep() === 'start') {
                renderDrawWizard();
            }
            return;
        }
        if (!authStateResolved) {
            drawWizardResumeState = null;
            if (getDrawWizardCurrentStep() === 'start') {
                renderDrawWizard();
            }
            return;
        }
        if (!isMember()) {
            drawWizardResumeState = null;
            if (getDrawWizardCurrentStep() === 'start') {
                renderDrawWizard();
            }
            return;
        }
        if (getDrawWizardCurrentStep() !== 'start' || hasMeaningfulDrawWizardState(drawWizardState)) {
            return;
        }
        const draft = authStateResolved && isMember() ? loadDrawWizardDraft() : null;
        drawWizardResumeState = draft ? { ...draft } : null;
        renderDrawWizard();
    }

    function getDrawWizardCurrentStep() {
        if (!drawWizardState) {
            return 'start';
        }
        const validSteps = new Set(['start', 'rules', 'exclude', 'review', 'result']);
        if (!validSteps.has(drawWizardState.currentStep)) {
            drawWizardState.currentStep = 'start';
        }
        return drawWizardState.currentStep;
    }

    function getDrawWizardCurrentRuleStep() {
        const ruleSteps = getDrawWizardRuleSteps();
        if (!ruleSteps.length) {
            return null;
        }
        const index = Math.max(0, Math.min(ruleSteps.length - 1, Number(drawWizardState?.currentGroupIndex || 0) || 0));
        if (drawWizardState) {
            drawWizardState.currentGroupIndex = index;
        }
        return ruleSteps[index] || null;
    }

    function getDrawWizardExcludeStepNumber() {
        return getDrawWizardRuleSteps().length + 1;
    }

    function getDrawWizardViewMeta(stepKey = getDrawWizardCurrentStep()) {
        if (stepKey === 'rules') {
            const currentRuleStep = getDrawWizardCurrentRuleStep();
            const ruleSteps = getDrawWizardRuleSteps();
            return currentRuleStep ? {
                title: currentRuleStep.title,
                copy: currentRuleStep.copy,
                navTitle: currentRuleStep.kicker,
                navNote: `${Math.min(ruleSteps.length, drawWizardState.currentGroupIndex + 1)} / ${ruleSteps.length} 단계`
            } : DRAW_WIZARD_STEP_META.rules;
        }
        if (stepKey === 'exclude') {
            const excludeStepNumber = getDrawWizardExcludeStepNumber();
            return {
                ...DRAW_WIZARD_STEP_META.exclude,
                navTitle: `${excludeStepNumber}단계`,
                navNote: `${excludeStepNumber} / ${excludeStepNumber} 단계 · 선택 사항이지만 생성 직전에 바로 반영됩니다.`
            };
        }
        return DRAW_WIZARD_STEP_META[stepKey] || DRAW_WIZARD_STEP_META.start;
    }

    function getDrawWizardProgressInfo(stepKey = getDrawWizardCurrentStep()) {
        const ruleSteps = getDrawWizardRuleSteps();
        const currentIndex = Math.max(0, Math.min(ruleSteps.length - 1, Number(drawWizardState?.currentGroupIndex || 0) || 0));
        if (stepKey === 'result') {
            return { label: 'RESULT', count: 'DONE' };
        }
        if (stepKey === 'start') {
            return { label: 'INTRO', count: 'START' };
        }
        if (stepKey === 'rules') {
            return {
                label: `${currentIndex + 1}단계`,
                count: `${currentIndex + 1} / ${ruleSteps.length}`
            };
        }
        if (stepKey === 'exclude') {
            const excludeStepNumber = getDrawWizardExcludeStepNumber();
            return {
                label: `${excludeStepNumber}단계`,
                count: `${excludeStepNumber} / ${excludeStepNumber}`
            };
        }
        return { label: 'CHECK', count: 'REVIEW' };
    }

    function getDrawWizardRulePreviewHtml(ruleId) {
        const sample = Array.isArray(RULE_SAMPLE_MAP[ruleId]) ? RULE_SAMPLE_MAP[ruleId] : [];
        if (!sample.length) {
            return '';
        }
        return `
            <div class="draw-funnel-rule-preview" aria-hidden="true">
                <span class="draw-funnel-rule-preview-label">예시</span>
                <div class="draw-funnel-rule-preview-balls">
                    ${sample.map(number => `
                        <span class="sample-ball draw-funnel-rule-ball ${escapeHtml(getSampleBallClass(number))}">${escapeHtml(String(number))}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function getDrawWizardDerivedRuleIds() {
        if (!drawWizardState) {
            return [];
        }
        const ids = Array.from(new Set(drawWizardState.selectedRuleIds));
        if (drawWizardState.excludeNumbers.length) {
            ids.push('exclude_number');
        }
        return ids;
    }

    function getDrawWizardGroupedSelections() {
        if (!drawWizardState) {
            return [];
        }
        const selectedIds = new Set(drawWizardState.selectedRuleIds);
        return getDrawWizardRuleSteps().map(step => {
            const rules = step.rules.filter(rule => selectedIds.has(rule.id));
            return rules.length ? {
                groupLabel: step.groupLabel,
                rules
            } : null;
        }).filter(Boolean);
    }

    function applyDrawWizardExcludeNumbers(numbers = []) {
        const normalized = normalizeDrawWizardExcludeNumbers(numbers);
        excludeNumberValues.clear();
        normalized.forEach(value => excludeNumberValues.add(value));
        if (excludeNumberGrid) {
            excludeNumberGrid.querySelectorAll('button').forEach(button => {
                const value = Number(button.dataset.number || 0);
                button.classList.toggle('is-active', excludeNumberValues.has(value));
            });
        }
        updateExcludeNumberLabel();
        if (normalized.length) {
            localStorage.setItem('lotto_exclude_numbers', JSON.stringify(normalized));
        } else {
            localStorage.removeItem('lotto_exclude_numbers');
        }
    }

    function syncDrawWizardExcludeNumbersFromControl(options = {}) {
        const { commit = true } = options;
        const normalized = hasExcludeNumberAccess()
            ? Array.from(excludeNumberValues).sort((left, right) => left - right)
            : [];
        if (!drawWizardState) {
            return normalized;
        }
        drawWizardState.excludeNumbers = normalized;
        if (commit) {
            commitDrawWizardState({
                syncRules: true
            });
        }
        return normalized;
    }

    function syncDrawWizardSelections() {
        if (!drawWizardState) {
            return;
        }
        if (drawTabPanel) {
            drawTabPanel.setAttribute('data-service-mode', 'self');
            drawTabPanel.dataset.wizardMode = 'self';
        }
        clearActiveStrategySelection();
        setRulesByIds(getDrawWizardDerivedRuleIds());
        applyDrawWizardExcludeNumbers(drawWizardState.excludeNumbers);
        updateSelectionCount();
        updateCombinedEstimates();
        updateScenarioMetrics();
    }

    function commitDrawWizardState(options = {}) {
        if (!drawWizardState) {
            return;
        }
        const { syncRules = true, persist = true } = options;
        drawWizardState.updatedAt = Date.now();
        if (syncRules) {
            syncDrawWizardSelections();
        }
        renderDrawWizard();
        if (persist) {
            persistDrawWizardDraft();
        }
    }

    function getDrawWizardRestrictionState() {
        const derivedRuleIds = getDrawWizardDerivedRuleIds();
        const excludeCount = Array.isArray(drawWizardState?.excludeNumbers) ? drawWizardState.excludeNumbers.length : 0;
        if (!derivedRuleIds.length) {
            return {
                kind: 'info',
                title: '최소 1개 규칙 또는 직접 제외수를 선택해 주세요.',
                body: '규칙 라이브러리 항목이나 직접 제외수를 하나 이상 고르면 추첨을 시작할 수 있습니다.',
                blocked: true
            };
        }
        if (excludeCount > 39) {
            return {
                kind: 'danger',
                title: '직접 제외수가 너무 많습니다.',
                body: '45개 중 최소 6개는 남아 있어야 번호 1세트를 만들 수 있습니다. 직접 제외수를 조금 줄여 주세요.',
                blocked: true
            };
        }
        if (currentRemainingCombos <= 20) {
            return {
                kind: 'danger',
                title: '조건이 너무 강해서 추첨이 어려울 수 있습니다.',
                body: '선택한 규칙을 조금 줄이거나 직접 제외수를 완화한 뒤 다시 시도해 주세요.',
                blocked: true
            };
        }
        if (currentRemainingCombos <= 5000) {
            return {
                kind: 'warn',
                title: '후보가 많이 줄었습니다.',
                body: '추첨은 가능하지만 몇 개 규칙을 덜 선택하면 더 넓은 후보에서 생성할 수 있습니다.',
                blocked: false
            };
        }
        return {
            kind: 'good',
            title: '바로 추첨하기 좋은 상태입니다.',
            body: '선택한 규칙이 반영됐고 남은 후보 수도 안정적입니다.',
            blocked: false
        };
    }

    function getDrawWizardCanProceed(stepKey = getDrawWizardCurrentStep()) {
        if (!drawWizardState) {
            return false;
        }
        if (stepKey === 'review') {
            const restriction = getDrawWizardRestrictionState();
            return !restriction.blocked;
        }
        return stepKey !== 'result';
    }

    function getDrawWizardNextLabel(stepKey = getDrawWizardCurrentStep()) {
        if (!drawWizardState) {
            return '다음';
        }
        if (stepKey === 'start') {
            return '번호 생성하기';
        }
        if (stepKey === 'rules') {
            const ruleSteps = getDrawWizardRuleSteps();
            const lastIndex = Math.max(0, ruleSteps.length - 1);
            return drawWizardState.currentGroupIndex >= lastIndex
                ? `${getDrawWizardExcludeStepNumber()}단계로`
                : `${drawWizardState.currentGroupIndex + 2}단계로`;
        }
        if (stepKey === 'exclude') {
            return '최종 확인';
        }
        if (stepKey === 'review') {
            return getDrawWizardRestrictionState().blocked ? '조건 보완 필요' : '추첨 시작';
        }
        return '다음';
    }

    function renderDrawWizardSelectionChips() {
        if (!drawWizardSelectionChipsEl || !drawWizardState) {
            return;
        }
        const chips = getDrawWizardGroupedSelections().map(group => ({
            tone: 'group',
            label: `${group.groupLabel} ${group.rules.length}개`
        }));
        if (drawWizardState.excludeNumbers.length) {
            chips.push({
                tone: 'exclude',
                label: `직접 제외 ${drawWizardState.excludeNumbers.length}개`
            });
        }
        drawWizardSelectionChipsEl.innerHTML = chips.length
            ? chips.map(item => `<span class="draw-funnel-chip tone-${escapeHtml(item.tone)}">${escapeHtml(item.label)}</span>`).join('')
            : '<span class="draw-funnel-chip is-empty">아직 선택 없음</span>';
    }

    function getDrawWizardRuleImpactMeta(ruleId, { active = false } = {}) {
        const stat = RULE_STATS?.[ruleId];
        const ratio = Math.max(0, Math.min(0.95, Number(stat?.ratio) || 0));
        if (!ratio) {
            return {
                label: active ? '현재 제외' : '선택 시 제외',
                value: '변화 적음',
                bulletPrimary: active ? '현재 반영 유지' : '효과는 크지 않음',
                bulletSecondary: active ? '이미 적용됨' : '탭해서 적용'
            };
        }
        const gainPct = ((1 / (1 - ratio)) - 1) * 100;
        const currentCombos = Math.max(1, Math.round(Number(currentRemainingCombos) || TOTAL_COMBOS));
        const affectedCombos = active
            ? Math.round(currentCombos * (ratio / (1 - ratio)))
            : Math.round(currentCombos * ratio);
        return {
            label: active ? '현재 제외' : '선택 시 제외',
            value: formatDrawWizardCompactCount(affectedCombos),
            bulletPrimary: `1등 기대 +${Math.max(1, Math.round(gainPct))}%`,
            bulletSecondary: active ? '이미 적용됨' : '탭해서 적용'
        };
    }

    function getDrawWizardRuleFamilyTag(ruleId = '') {
        const id = String(ruleId || '');
        if (
            id === 'all_odd' ||
            id === 'all_even' ||
            id === 'five_odd_one_even' ||
            id === 'five_even_one_odd' ||
            id === 'four_odd_two_even' ||
            id === 'four_even_two_odd'
        ) {
            return '홀짝 편향';
        }
        if (id === 'multiples_of_2_4_plus' || id === 'multiples_of_2_5_plus') {
            return '짝수 과밀';
        }
        if (id.startsWith('multiples_of_')) {
            return '배수 편향';
        }
        if (id.startsWith('consecutive_')) {
            return '연속 패턴';
        }
        if (id.startsWith('same_last_digit_') || id.startsWith('last_digit_')) {
            return '끝수 반복';
        }
        if (id.startsWith('same_decade_')) {
            return '구간 편중';
        }
        if (
            id === 'all_low_or_high' ||
            id === 'low_or_high_5_plus' ||
            id === 'low_1_15_4_plus' ||
            id === 'mid_16_30_4_plus' ||
            id === 'high_31_45_4_plus'
        ) {
            return '구간 편향';
        }
        if (id === 'tight_range') {
            return '범위 압축';
        }
        if (id === 'extreme_sum' || id.startsWith('sum_')) {
            return '합계 편향';
        }
        if (id.startsWith('prime_')) {
            return '소수 편향';
        }
        return '패턴 필터';
    }

    function getDrawWizardRuleStrengthTag(ruleId = '', ratio = 0) {
        if (ruleId === 'tight_range' || ruleId.startsWith('sum_') || ruleId === 'extreme_sum') {
            return ratio >= 0.08 ? '극단 분포' : '정밀 필터';
        }
        if (ratio >= 0.2) {
            return '고빈도 패턴';
        }
        if (ratio >= 0.08) {
            return '반복 패턴';
        }
        if (ratio >= 0.03) {
            return '정밀 압축';
        }
        return '고급 필터';
    }

    function getDrawWizardRuleSubtitleMeta(ruleId) {
        const stat = RULE_STATS?.[ruleId];
        const ratio = Math.max(0, Math.min(0.95, Number(stat?.ratio) || 0));
        const gainPct = ratio ? Math.max(1, Math.round(((1 / (1 - ratio)) - 1) * 100)) : 0;
        return {
            accent: `1등 기대 +${gainPct}%`,
            tags: [
                getDrawWizardRuleFamilyTag(ruleId),
                getDrawWizardRuleStrengthTag(ruleId, ratio)
            ]
        };
    }

    function renderDrawWizardRuleStep() {
        if (!drawWizardDetailGroupsEl || !drawWizardDetailNoteEl || !drawWizardState) {
            return;
        }
        const currentRuleStep = getDrawWizardCurrentRuleStep();
        const ruleSteps = getDrawWizardRuleSteps();
        if (!currentRuleStep) {
            drawWizardDetailGroupsEl.innerHTML = '<div class="draw-funnel-empty-state">표시할 규칙 그룹이 없습니다.</div>';
            drawWizardDetailNoteEl.textContent = '규칙 라이브러리를 불러오지 못했습니다.';
            return;
        }
        const selectedIds = new Set(drawWizardState.selectedRuleIds);
        const selectedCount = currentRuleStep.rules.filter(rule => selectedIds.has(rule.id)).length;
        const compactRuleHeadline = (() => {
            const baseLabel = String(currentRuleStep.groupLabel || currentRuleStep.title || '')
                .replace(/\s*제외하기$/, '')
                .trim();
            return baseLabel ? `${baseLabel}만 고르세요` : '빼고 싶은 패턴만 고르세요';
        })();
        if (drawWizardRuleKickerEl) {
            drawWizardRuleKickerEl.textContent = currentRuleStep.kicker;
        }
        if (drawWizardRuleProgressEl) {
            drawWizardRuleProgressEl.textContent = `${drawWizardState.currentGroupIndex + 1} / ${ruleSteps.length}`;
        }
        if (drawWizardRuleTitleEl) {
            drawWizardRuleTitleEl.textContent = compactRuleHeadline;
        }
        if (drawWizardRuleCopyEl) {
            drawWizardRuleCopyEl.textContent = selectedCount
                ? `${selectedCount}개 선택됨`
                : '선택 없이 다음 단계로 넘어가도 됩니다.';
        }
        const currentPlan = getMembershipPlanMeta();
        const userLevel = currentPlan.level || 0;

        // Rank rules in this step by ratio (descending)
        const rulesWithStats = currentRuleStep.rules.map(rule => {
            const stat = RULE_STATS?.[rule.id];
            const ratio = Number(stat?.ratio) || 0;
            return { rule, ratio };
        }).sort((a, b) => b.ratio - a.ratio);

        drawWizardDetailGroupsEl.innerHTML = rulesWithStats.map((item, index) => {
            const rule = item.rule;
            const rank = index + 1; // 1-based rank
            const active = selectedIds.has(rule.id);
            const description = rule.desc || rule.detail || '선택 시 이 패턴을 제외합니다.';
            const impact = getDrawWizardRuleImpactMeta(rule.id, { active });
            const subtitleMeta = getDrawWizardRuleSubtitleMeta(rule.id);
            
            // Access check:
            // Rank 1 -> Master (Level 3)
            // Rank 2 -> Platinum (Level 2)
            // Rank 3+ -> All (Level 0+)
            let restricted = false;
            let requiredTier = '';
            
            if (rank === 1 && userLevel < 3) {
                restricted = true;
                requiredTier = 'MASTER';
            } else if (rank === 2 && userLevel < 2) {
                restricted = true;
                requiredTier = 'PLATINUM';
            } else if (rank === 3 && userLevel < 1) {
                restricted = true;
                requiredTier = 'GOLD';
            }

            const restrictedClass = restricted ? ' is-restricted' : '';

            return `
                <button class="draw-funnel-rule-card${active ? ' is-selected' : ''}${restrictedClass}" 
                        type="button" 
                        data-wizard-rule="${escapeHtml(rule.id)}" 
                        data-rule-rank="${rank}"
                        data-restricted="${restricted}"
                        data-required-tier="${requiredTier}"
                        aria-pressed="${String(active)}">
                    <div class="draw-funnel-rule-main">
                        <div class="draw-funnel-rule-copy">
                            <strong>${escapeHtml(rule.title)}</strong>
                            <p class="draw-funnel-rule-subtitle" title="${escapeHtml(description)}">
                                <span class="draw-funnel-rule-subtitle-accent">${escapeHtml(subtitleMeta.accent)}</span>
                                ${subtitleMeta.tags.map(tag => `<span class="draw-funnel-rule-tag">${escapeHtml(tag)}</span>`).join('')}
                            </p>
                            ${restricted ? `<span class="rule-restricted-badge" data-tier="${escapeHtml(requiredTier.toLowerCase())}">${requiredTier} 전용</span>` : ''}
                        </div>
                        <div class="draw-funnel-rule-impact">
                            <span class="draw-funnel-rule-impact-label">${escapeHtml(impact.label)}</span>
                            <strong class="draw-funnel-rule-impact-value">${escapeHtml(impact.value)}</strong>
                            <ul class="draw-funnel-rule-impact-list">
                                <li>${escapeHtml(impact.bulletPrimary)}</li>
                                <li>${escapeHtml(impact.bulletSecondary)}</li>
                            </ul>
                        </div>
                        ${getDrawWizardRulePreviewHtml(rule.id)}
                    </div>
                </button>
            `;
        }).join('');
        drawWizardDetailNoteEl.textContent = selectedCount
            ? `${selectedCount}개 선택됨`
            : '아직 선택 전';
    }

    function renderDrawWizardReview() {
        if (!drawWizardState) {
            return;
        }
        const restriction = getDrawWizardRestrictionState();
        const selectedRuleCount = drawWizardState.selectedRuleIds.length;
        const excludeNumbers = normalizeDrawWizardExcludeNumbers(drawWizardState.excludeNumbers);
        const excludeCount = excludeNumbers.length;
        const drawCount = Math.max(1, parseInt(drawCountSelect?.value, 10) || 1);
        const remainRatio = Number.isFinite(currentRemainingRatio)
            ? Math.max(0, Math.min(1, currentRemainingRatio))
            : 1;
        const remainPct = formatDisplayPercent(remainRatio * 100);
        const excludedPct = formatDisplayPercent((1 - remainRatio) * 100);
        const remainingCombos = Math.max(0, Math.round(Number(currentRemainingCombos) || TOTAL_COMBOS));
        const excludedCombos = Math.max(0, Math.round(Number(currentExcludedCombos) || 0));
        const baseFirstOdds = Number(getBaseOddsMap()?.[1]) || TOTAL_COMBOS;
        const currentFirstOdds = Math.max(1, Math.round(baseFirstOdds * (remainRatio || 1)));
        const benefitPct = formatDisplayPercent((1 - remainRatio) * 100);
        const groupedSelections = getDrawWizardGroupedSelections();
        const activeConditionCount = selectedRuleCount + (excludeCount ? 1 : 0);
        const overviewState = restriction.blocked
            ? 'warning'
            : (Number(benefitPct) > 0)
                ? 'positive'
                : 'neutral';
        const overviewStatus = restriction.blocked
            ? (activeConditionCount ? '조건 조정' : '선택 필요')
            : '추첨 전 확인';
        const overviewHeadline = `남은 후보 ${formatDrawWizardCompactCount(remainingCombos)}`;
        const overviewBadges = [
            `1등 ${formatDrawWizardCompactOddsLabel(currentFirstOdds)}`,
            `규칙 ${selectedRuleCount}`,
            `제외 ${excludeCount}`,
            `${drawCount}세트`
        ];
        if (drawWizardReviewOverviewEl) {
            const gaugeAngle = Math.max(0, Math.min(360, Math.round(Number(excludedPct) * 3.6)));
            drawWizardReviewOverviewEl.dataset.state = overviewState;
            drawWizardReviewOverviewEl.innerHTML = `
                <div class="draw-funnel-review-overview-copy">
                    <span class="draw-funnel-review-overview-kicker">${escapeHtml(overviewStatus)}</span>
                    <strong>${escapeHtml(overviewHeadline)}</strong>
                    <div class="draw-funnel-review-overview-badges">
                        ${overviewBadges.map(badge => `<span class="draw-funnel-review-overview-badge">${escapeHtml(badge)}</span>`).join('')}
                    </div>
                </div>
                <div class="draw-funnel-review-overview-gauge" style="--draw-review-angle:${gaugeAngle}deg;">
                    <div class="draw-funnel-review-overview-gauge-body">
                        <strong>${escapeHtml(`${excludedPct}%`)}</strong>
                        <span>${escapeHtml(restriction.blocked ? '제외 과다' : '제외율')}</span>
                    </div>
                </div>
            `;
        }
        if (drawWizardReviewSummaryEl) {
            const summaryRows = [
                {
                    label: '남은',
                    value: `${remainPct}%`,
                    tone: 'range'
                },
                {
                    label: '제외',
                    value: `${excludedPct}%`,
                    tone: 'exclude'
                },
                {
                    label: '규칙',
                    value: `${activeConditionCount}개`,
                    tone: 'rules'
                }
            ];
            drawWizardReviewSummaryEl.innerHTML = summaryRows.map(row => `
                <article class="draw-funnel-review-metric draw-funnel-review-metric--${escapeHtml(row.tone)}">
                    <span>${escapeHtml(row.label)}</span>
                    <strong>${escapeHtml(row.value)}</strong>
                </article>
            `).join('');
        }
        if (drawWizardReviewGroupsEl) {
            drawWizardReviewGroupsEl.innerHTML = groupedSelections.length
                ? groupedSelections.map(group => `
                    <div class="draw-funnel-review-group-card">
                        <strong>${escapeHtml(group.groupLabel)}</strong>
                        <span>${escapeHtml(String(group.rules.length))}개</span>
                    </div>
                `).join('')
                : '<div class="draw-funnel-empty-state">선택 없음</div>';
        }
        if (drawWizardReviewExcludesEl) {
            drawWizardReviewExcludesEl.innerHTML = excludeNumbers.length
                ? `
                    <div class="draw-funnel-review-exclude-balls">
                        ${excludeNumbers.map(number => `
                            <span class="exclude-number-ball ${escapeHtml(getExcludeRangeClass(number))} is-active" data-ball-range="${escapeHtml(getBallRange(number))}">${escapeHtml(String(number))}</span>
                        `).join('')}
                    </div>
                `
                : '<div class="draw-funnel-empty-state">없음</div>';
        }
    }

    function formatDrawWizardOddsLabel(value) {
        return `1 / ${formatNumber(Math.max(1, Math.round(Number(value) || 1)))}`;
    }

    function formatDrawWizardCompactOddsLabel(value) {
        return `1 / ${formatCompactOddsValue(Math.max(1, Math.round(Number(value) || 1)))}`;
    }

    function formatDrawWizardCompactCount(value) {
        const safeValue = Math.max(0, Math.round(Number(value) || 0));
        const formatUnit = (divisor, suffix) => {
            const compact = safeValue / divisor;
            const fractionDigits = compact >= 100 ? 0 : 1;
            return `${Number(compact.toFixed(fractionDigits)).toLocaleString('ko-KR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: fractionDigits
            })}${suffix}`;
        };
        if (safeValue >= 100000000) {
            return `${formatUnit(100000000, '억')}개`;
        }
        if (safeValue >= 10000) {
            return `${formatUnit(10000, '만')}개`;
        }
        return `${formatNumber(safeValue)}개`;
    }

    function readDrawWizardScrollHintSeen() {
        try {
            return localStorage.getItem(DRAW_WIZARD_SCROLL_HINT_KEY) === '1';
        } catch (error) {
            console.warn('추첨 스크롤 가이드 상태 조회 실패', error);
            return false;
        }
    }

    function rememberDrawWizardScrollHintSeen() {
        drawWizardScrollHintSeen = true;
        try {
            localStorage.setItem(DRAW_WIZARD_SCROLL_HINT_KEY, '1');
        } catch (error) {
            console.warn('추첨 스크롤 가이드 상태 저장 실패', error);
        }
    }

    function setDrawWizardScrollGuideVisible(visible) {
        if (!drawWizardScrollGuideEl) {
            return;
        }
        if (drawWizardScrollGuideTimer) {
            window.clearTimeout(drawWizardScrollGuideTimer);
            drawWizardScrollGuideTimer = 0;
        }
        drawWizardScrollGuideEl.hidden = !visible;
        drawWizardScrollGuideEl.classList.toggle('is-visible', Boolean(visible));
    }

    function hideDrawWizardScrollGuide(options = {}) {
        const { persist = false } = options;
        if (persist && !drawWizardScrollHintSeen) {
            rememberDrawWizardScrollHintSeen();
        }
        setDrawWizardScrollGuideVisible(false);
    }

    function syncDrawWizardScrollGuide(stepKey = getDrawWizardCurrentStep()) {
        if (drawWizardScrollGuideRafId) {
            window.cancelAnimationFrame(drawWizardScrollGuideRafId);
            drawWizardScrollGuideRafId = 0;
        }
        if (!drawWizardScrollGuideEl || !drawWizardDetailGroupsEl) {
            return;
        }
        if (stepKey !== 'rules' || drawWizardScrollHintSeen || Number(drawWizardState?.currentGroupIndex || 0) !== 0) {
            hideDrawWizardScrollGuide();
            return;
        }
        drawWizardScrollGuideRafId = window.requestAnimationFrame(() => {
            drawWizardScrollGuideRafId = 0;
            const canScroll = drawWizardDetailGroupsEl.scrollHeight - drawWizardDetailGroupsEl.clientHeight > 24;
            if (!canScroll || drawWizardDetailGroupsEl.scrollTop > 8) {
                hideDrawWizardScrollGuide();
                return;
            }
            rememberDrawWizardScrollHintSeen();
            setDrawWizardScrollGuideVisible(true);
            drawWizardScrollGuideTimer = window.setTimeout(() => {
                setDrawWizardScrollGuideVisible(false);
            }, 4200);
        });
    }

    function getDrawWizardSelectionVisualMarkup(activeCount = 0, excludeCount = 0) {
        const totalSlots = 6;
        const safeCount = Math.max(0, Math.min(totalSlots, Math.round(Number(activeCount) || 0)));
        const excludeSlots = Math.max(0, Math.min(safeCount, Math.round(Number(excludeCount) || 0)));
        return Array.from({ length: totalSlots }, (_, index) => {
            const active = index < safeCount;
            const exclude = active && index >= safeCount - excludeSlots;
            return `<span class="${active ? `is-active${exclude ? ' is-exclude' : ''}` : ''}"></span>`;
        }).join('');
    }

    function renderDrawWizardDashboard({
        currentStep,
        progressInfo,
        viewMeta,
        restriction,
        selectedCount,
        excludeCount
    }) {
        const showDashboard = Boolean(drawWizardDashboardEl && currentStep !== 'start' && currentStep !== 'review');
        if (drawWizardStageEl) {
            drawWizardStageEl.classList.toggle('has-dashboard', showDashboard);
        }
        if (!drawWizardDashboardEl) {
            return;
        }
        drawWizardDashboardEl.hidden = !showDashboard;
        if (!showDashboard) {
            return;
        }

        const remainingRatio = Number.isFinite(currentRemainingRatio) && currentRemainingRatio > 0
            ? currentRemainingRatio
            : 1;
        const remainingCombos = Number.isFinite(currentRemainingCombos) ? currentRemainingCombos : TOTAL_COMBOS;
        const remainingPct = formatDisplayPercent(remainingRatio * 100);
        const baseOddsMap = getBaseOddsMap();
        const baseFirstOdds = Number(baseOddsMap?.[1]) || TOTAL_COMBOS;
        const currentFirstOdds = Math.max(1, Math.round(baseFirstOdds * remainingRatio));
        const totalBenefitPct = formatDisplayPercent((1 - remainingRatio) * 100);
        const selectionTotalCount = selectedCount + excludeCount;
        const selectionExcludeVisualCount = excludeCount;
        const cumulativeReducedCombos = Number.isFinite(currentExcludedCombos) ? currentExcludedCombos : 0;

        let dashboardStep = '누적 현황';
        let dashboardTitle = `남은 후보 ${formatDrawWizardCompactCount(remainingCombos)}`;
        let dashboardCopy = selectionTotalCount
            ? `규칙 ${selectedCount}개 · 제외수 ${excludeCount}개 반영`
            : '아직 선택 전 · 기본 범위 유지';
        let oddsNote = (Number(totalBenefitPct) > 0)
            ? `1등 기대 +${totalBenefitPct}%`
            : '1등 기준 기본';
        let impactValue = (Number(totalBenefitPct) > 0) ? `+${totalBenefitPct}%` : '기본';
        let impactNote = '1등 기대';
        let selectionValue = `${remainingPct}%`;
        let selectionNote = '남은 범위';
        let visualLabel = cumulativeReducedCombos ? formatDrawWizardCompactCount(cumulativeReducedCombos) : '0개';
        let visualNote = selectionTotalCount ? '누적 제외' : '선택 없음';

        if (progressInfo?.label) {
            dashboardStep = `${progressInfo.label} · 누적 현황`;
        }
        if (currentStep === 'exclude') {
            dashboardCopy = selectionTotalCount
                ? `규칙 ${selectedCount}개 · 제외수 ${excludeCount}개 반영`
                : '직접 제외수까지 더해 범위를 줄여보세요';
        } else if (currentStep === 'review') {
            dashboardCopy = restriction.blocked
                ? '조건이 조금 강합니다 · 몇 개만 덜어내도 됩니다'
                : '이 누적 기준으로 바로 번호를 만들 수 있습니다';
        } else if (currentStep === 'result') {
            dashboardStep = '최종 결과 · 누적 현황';
            dashboardCopy = (Number(totalBenefitPct) > 0)
                ? '누적 기준이 반영된 범위에서 생성 완료'
                : '기본 범위에 가깝게 생성 완료';
        }

        if (drawWizardDashboardStepEl) {
            drawWizardDashboardStepEl.textContent = dashboardStep;
        }
        if (drawWizardDashboardTitleEl) {
            drawWizardDashboardTitleEl.textContent = dashboardTitle;
        }
        if (drawWizardDashboardCopyEl) {
            drawWizardDashboardCopyEl.textContent = dashboardCopy;
        }
        if (drawWizardDashboardOddsEl) {
            drawWizardDashboardOddsEl.textContent = formatDrawWizardCompactOddsLabel(currentFirstOdds);
        }
        if (drawWizardDashboardOddsNoteEl) {
            drawWizardDashboardOddsNoteEl.textContent = oddsNote;
        }
        if (drawWizardDashboardGaugeEl) {
            const gaugeAngle = Math.max(0, Math.min(360, Math.round(Number(totalBenefitPct) * 3.6)));
            drawWizardDashboardGaugeEl.style.setProperty('--draw-dashboard-gauge-angle', `${gaugeAngle}deg`);
        }
        if (drawWizardDashboardImpactEl) {
            drawWizardDashboardImpactEl.textContent = impactValue;
        }
        if (drawWizardDashboardImpactNoteEl) {
            drawWizardDashboardImpactNoteEl.textContent = impactNote;
        }
        if (drawWizardDashboardMeterFillEl) {
            drawWizardDashboardMeterFillEl.style.width = `${Math.max(8, remainingPct)}%`;
        }
        if (drawWizardDashboardSelectionEl) {
            drawWizardDashboardSelectionEl.textContent = selectionValue;
        }
        if (drawWizardDashboardSelectionNoteEl) {
            drawWizardDashboardSelectionNoteEl.textContent = selectionNote;
        }
        if (drawWizardDashboardSelectionVisualEl) {
            drawWizardDashboardSelectionVisualEl.innerHTML = getDrawWizardSelectionVisualMarkup(selectionTotalCount, selectionExcludeVisualCount);
        }
        if (drawWizardDashboardVisualLabelEl) {
            drawWizardDashboardVisualLabelEl.textContent = visualLabel;
        }
        if (drawWizardDashboardVisualNoteEl) {
            drawWizardDashboardVisualNoteEl.textContent = visualNote;
        }
    }

    function triggerDrawWizardTransition() {
        if (!drawWizardPanelsEl) {
            return;
        }
        const forwardClass = 'is-transition-forward';
        const backwardClass = 'is-transition-backward';
        drawWizardPanelsEl.classList.remove(forwardClass, backwardClass);
        void drawWizardPanelsEl.offsetWidth;
        drawWizardPanelsEl.classList.add(
            drawWizardTransitionDirection === 'backward' ? backwardClass : forwardClass
        );
        window.setTimeout(() => {
            drawWizardPanelsEl.classList.remove(forwardClass, backwardClass);
        }, 380);
    }

    function renderDrawWizard() {
        if (!drawWizardState || !drawWizardPanels.length) {
            return;
        }
        const currentStep = getDrawWizardCurrentStep();
        const currentViewKey = currentStep === 'rules'
            ? `rules:${Number(drawWizardState.currentGroupIndex || 0)}`
            : currentStep;
        const progressInfo = getDrawWizardProgressInfo(currentStep);
        const viewMeta = getDrawWizardViewMeta(currentStep);
        const restriction = getDrawWizardRestrictionState();
        const selectedCount = drawWizardState.selectedRuleIds.length;
        const excludeCount = drawWizardState.excludeNumbers.length;

        drawWizardPanels.forEach(panel => {
            const active = panel.dataset.drawWizardStep === currentStep;
            panel.hidden = !active;
            panel.classList.toggle('is-active', active);
            panel.setAttribute('aria-hidden', String(!active));
            panel.style.display = active ? 'grid' : 'none';
        });
        if (drawWizardProgressLabelEl) {
            drawWizardProgressLabelEl.textContent = progressInfo.label;
        }
        if (drawWizardProgressCountEl) {
            drawWizardProgressCountEl.textContent = progressInfo.count;
        }
        if (drawWizardExcludeKickerEl) {
            drawWizardExcludeKickerEl.textContent = `${getDrawWizardExcludeStepNumber()}단계`;
        }
        if (drawTabPanel) {
            drawTabPanel.classList.toggle('is-draw-intro-view', currentStep === 'start');
        }
        if (drawWizardScreenTitleEl) {
            drawWizardScreenTitleEl.textContent = viewMeta.title;
        }
        if (drawWizardScreenCopyEl) {
            drawWizardScreenCopyEl.textContent = viewMeta.copy;
        }
        if (drawWizardNavTitleEl) {
            drawWizardNavTitleEl.textContent = viewMeta.navTitle;
        }
        if (drawWizardNavNoteEl) {
            drawWizardNavNoteEl.textContent = viewMeta.navNote;
        }
        if (drawWizardNavEl) {
            drawWizardNavEl.hidden = currentStep === 'result' || currentStep === 'start';
        }
        if (drawWizardPrevBtn) {
            drawWizardPrevBtn.hidden = currentStep === 'start';
            drawWizardPrevBtn.disabled = currentStep === 'start';
        }
        if (drawWizardNextBtn) {
            drawWizardNextBtn.hidden = currentStep === 'result' || currentStep === 'start';
            drawWizardNextBtn.textContent = getDrawWizardNextLabel(currentStep);
            drawWizardNextBtn.disabled = !getDrawWizardCanProceed(currentStep);
        }
        if (drawSelectionSummaryEl) {
            drawSelectionSummaryEl.textContent = selectedCount || excludeCount
                ? `선택된 규칙 ${selectedCount}개 · 직접 제외 ${excludeCount}개`
                : '아직 선택된 규칙이 없습니다.';
        }
        if (drawFilterDetailEl) {
            drawFilterDetailEl.textContent = selectedCount || excludeCount
                ? `남은 후보 ${formatNumber(currentRemainingCombos || TOTAL_COMBOS)}개 · 제외 ${formatNumber(currentExcludedCombos || 0)}개`
                : '규칙 라이브러리 항목을 그룹별로 고르고 마지막에 바로 추첨합니다.';
        }
        if (drawWizardWarningTitleEl) {
            drawWizardWarningTitleEl.textContent = restriction.title;
        }
        if (drawWizardWarningBodyEl) {
            drawWizardWarningBodyEl.textContent = restriction.body;
        }
        renderDrawWizardDashboard({
            currentStep,
            progressInfo,
            viewMeta,
            restriction,
            selectedCount,
            excludeCount
        });
        if (drawWizardExcludeSummaryEl) {
            drawWizardExcludeSummaryEl.textContent = excludeCount
                ? drawWizardState.excludeNumbers.join(' · ')
                : '없음';
        }
        renderDrawWizardSelectionChips();
        renderDrawWizardRuleStep();
        if (currentStep === 'rules' && drawWizardDetailGroupsEl && drawWizardLastViewKey !== currentViewKey) {
            drawWizardDetailGroupsEl.scrollTop = 0;
        }
        syncDrawWizardScrollGuide(currentStep);
        renderDrawWizardReview();
        const showResumeOverlay = DRAW_WIZARD_RESUME_ENABLED
            && currentStep === 'start'
            && authStateResolved
            && isMember()
            && Boolean(drawWizardResumeState);
        if (drawWizardResumeCardEl) {
            drawWizardResumeCardEl.hidden = !showResumeOverlay;
        }
        if (drawWizardStartPanelEl) {
            drawWizardStartPanelEl.classList.toggle('has-resume-overlay', showResumeOverlay);
        }
        if (drawWizardStartBtn) {
            drawWizardStartBtn.disabled = showResumeOverlay;
        }
        if (drawWizardResumeTitleEl && drawWizardResumeState) {
            drawWizardResumeTitleEl.textContent = '지난번에 보던 단계가 남아 있습니다.';
        }
        if (drawWizardResumeNoteEl && drawWizardResumeState) {
            drawWizardResumeNoteEl.textContent = drawWizardResumeState.currentStep === 'rules'
                ? `규칙 그룹 ${Number(drawWizardResumeState.currentGroupIndex || 0) + 1}부터 그대로 이어서 진행할 수 있습니다.`
                : '이전 선택을 그대로 불러올 수 있습니다.';
        }
        if (drawWizardResultCopyEl) {
            const showWizardCopy = currentStep === 'result' && lastGeneratedDraws.length > 0;
            drawWizardResultCopyEl.textContent = '번호 복사';
            drawWizardResultCopyEl.hidden = !showWizardCopy;
            drawWizardResultCopyEl.disabled = !lastGeneratedDraws.length;
        }
        if (drawWizardSelfResultShellEl) {
            drawWizardSelfResultShellEl.hidden = false;
        }
        syncDrawWizardResultExperience(currentStep);
        if (drawWizardLastViewKey && drawWizardLastViewKey !== currentViewKey) {
            triggerDrawWizardTransition();
        }
        drawWizardLastViewKey = currentViewKey;
    }

    function moveDrawWizardStep(direction = 1) {
        if (!drawWizardState) {
            return;
        }
        drawWizardTransitionDirection = direction < 0 ? 'backward' : 'forward';
        const ruleSteps = getDrawWizardRuleSteps();
        const lastRuleIndex = Math.max(0, ruleSteps.length - 1);
        const currentStep = getDrawWizardCurrentStep();

        if (currentStep === 'start') {
            if (direction > 0) {
                drawWizardState.currentStep = ruleSteps.length ? 'rules' : 'exclude';
                drawWizardState.currentGroupIndex = 0;
            }
            commitDrawWizardState({ syncRules: false });
            return;
        }

        if (currentStep === 'rules') {
            if (direction > 0) {
                if (drawWizardState.currentGroupIndex < lastRuleIndex) {
                    drawWizardState.currentGroupIndex += 1;
                } else {
                    drawWizardState.currentStep = 'exclude';
                }
            } else if (drawWizardState.currentGroupIndex > 0) {
                drawWizardState.currentGroupIndex -= 1;
            } else {
                drawWizardState.currentStep = 'start';
            }
            commitDrawWizardState({ syncRules: false });
            return;
        }

        if (currentStep === 'exclude') {
            if (direction > 0) {
                drawWizardState.currentStep = 'review';
            } else {
                drawWizardState.currentStep = ruleSteps.length ? 'rules' : 'start';
                drawWizardState.currentGroupIndex = lastRuleIndex;
            }
            commitDrawWizardState({ syncRules: false });
            return;
        }

        if (currentStep === 'review' && direction < 0) {
            drawWizardState.currentStep = 'exclude';
            commitDrawWizardState({ syncRules: false });
        }
    }

    async function runDrawWizardGeneration() {
        if (!drawWizardState) {
            return false;
        }
        const restriction = getDrawWizardRestrictionState();
        if (restriction.blocked) {
            showActionPopup('규칙을 최소 1개 고르거나 조건을 조금 완화해 주세요.');
            renderDrawWizard();
            return false;
        }
        syncDrawWizardExcludeNumbersFromControl({
            commit: false
        });
        syncDrawWizardSelections();
        const generated = handleDrawGenerationRequest('wizard');
        if (!generated) {
            renderDrawWizard();
            return false;
        }
        drawWizardResultRevealToken = Date.now();
        drawWizardResultPlayedToken = 0;
        drawWizardState.currentStep = 'result';
        drawWizardState.completed = true;
        commitDrawWizardState({
            syncRules: false
        });
        return true;
    }

    function handleDrawWizardNext() {
        if (!drawWizardState) {
            return;
        }
        const currentStep = getDrawWizardCurrentStep();
        if (!getDrawWizardCanProceed(currentStep)) {
            showActionPopup('추첨을 시작하려면 규칙 또는 직접 제외수를 하나 이상 선택해 주세요.');
            return;
        }
        if (currentStep === 'review') {
            runDrawWizardGeneration();
            return;
        }
        moveDrawWizardStep(1);
    }

    function handleDrawWizardPrev() {
        if (!drawWizardState) {
            return;
        }
        if (getDrawWizardCurrentStep() === 'result') {
            drawWizardTransitionDirection = 'backward';
            drawWizardState.currentStep = 'review';
            drawWizardState.completed = false;
            commitDrawWizardState({
                syncRules: false
            });
            return;
        }
        moveDrawWizardStep(-1);
    }

    function initializeDrawWizard() {
        if (!drawWizardPanels.length || !drawWizardNextBtn || !drawWizardPrevBtn) {
            return;
        }
        if (drawTabPanel && drawTabPanel.dataset.wizardInitialized === 'true') {
            return;
        }
        // Initialize Wizard State (Ensure it exists even for non-members)
        if (!drawWizardState) {
            drawWizardState = getDrawWizardDefaultState();
        }
        const draft = authStateResolved && isMember() ? loadDrawWizardDraft() : null;
        drawWizardResumeState = draft ? { ...draft } : null;
        
        syncDrawWizardSelections();
        renderDrawWizard();

        if (drawWizardDetailGroupsEl) {
            // Use onclick to ensure only one listener exists and it's easier to verify
            drawWizardDetailGroupsEl.onclick = async (event) => {
                const button = event.target instanceof Element ? event.target.closest('[data-wizard-rule]') : null;
                if (!button) {
                    return;
                }

                // Plan Restriction Check
                const isRestricted = button.getAttribute('data-restricted') === 'true';
                if (isRestricted) {
                    const requiredTier = button.getAttribute('data-required-tier') || 'PREMIUM';
                    
                    if (!isMember()) {
                        const confirmed = await showActionConfirm(
                            '멤버십 전용 기능',
                            `이 필터는 ${requiredTier} 멤버십 이상 이용 가능한 프리미엄 기능입니다.\n로그인 후 더 강력한 필터 혜택을 확인해 보세요.`,
                            '로그인하기',
                            '닫기'
                        );
                        if (confirmed) {
                            openAuthModal();
                        }
                    } else {
                        const confirmed = await showActionConfirm(
                            '플랜 업그레이드',
                            `고객님은 현재 FREE 등급입니다. ${requiredTier} 멤버십으로 업그레이드하고 최상위 필터 기능을 이용해 보세요.`,
                            '플랜 구매하기',
                            '닫기'
                        );
                        if (confirmed) {
                            setActiveTab('mypage');
                            const planBtn = document.getElementById('mypage-plan-manage-btn');
                            if (planBtn) {
                                setTimeout(() => {
                                    planBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 150);
                            }
                        }
                    }
                    return;
                }

                if (!drawWizardState) return;
                const ruleId = String(button.dataset.wizardRule || '').trim();
                if (!ruleId) {
                    return;
                }
                const next = new Set(drawWizardState.selectedRuleIds);
                if (next.has(ruleId)) {
                    next.delete(ruleId);
                } else {
                    next.add(ruleId);
                }
                drawWizardState.selectedRuleIds = Array.from(next);
                commitDrawWizardState();
            };
        }
        if (drawWizardResumeBtn) {
            drawWizardResumeBtn.addEventListener('click', () => {
                if (!drawWizardResumeState) {
                    return;
                }
                drawWizardTransitionDirection = 'forward';
                drawWizardState = sanitizeDrawWizardState(drawWizardResumeState);
                drawWizardResumeState = null;
                commitDrawWizardState();
            });
        }
        if (drawWizardRestartBtn) {
            drawWizardRestartBtn.addEventListener('click', () => {
                drawWizardTransitionDirection = 'backward';
                drawWizardResumeState = null;
                drawWizardState = getDrawWizardDefaultState();
                clearDrawWizardDraft();
                commitDrawWizardState();
            });
        }
        if (drawWizardStartBtn) {
            drawWizardStartBtn.addEventListener('click', () => {
                handleDrawWizardNext();
            });
        }
        if (drawWizardNextBtn) {
            drawWizardNextBtn.addEventListener('click', () => {
                handleDrawWizardNext();
            });
        }
        if (drawWizardPrevBtn) {
            drawWizardPrevBtn.addEventListener('click', () => {
                handleDrawWizardPrev();
            });
        }
        if (drawWizardRerunBtn) {
            drawWizardRerunBtn.addEventListener('click', () => {
                runDrawWizardGeneration();
            });
        }
        if (drawWizardResultCopyEl) {
            drawWizardResultCopyEl.addEventListener('click', async () => {
                await copyAllGeneratedNumbers();
            });
        }
        if (drawWizardEditBtn) {
            drawWizardEditBtn.addEventListener('click', () => {
                drawWizardTransitionDirection = 'backward';
                drawWizardState.currentStep = 'review';
                drawWizardState.completed = false;
                commitDrawWizardState({
                    syncRules: false
                });
            });
        }
        if (drawCountSelect) {
            drawCountSelect.addEventListener('change', () => {
                commitDrawWizardState({
                    syncRules: false
                });
            });
        }
        if (drawTabPanel) {
            drawTabPanel.dataset.wizardInitialized = 'true';
        }
    }


    function updateMypageSummaryUi() {
        const membershipState = getMembershipState();
        const plan = getMembershipPlanMeta(membershipState.membershipTier);
        const scheduledPlan = membershipState.scheduledMembershipTier
            ? getMembershipPlanMeta(membershipState.scheduledMembershipTier)
            : null;
        const stats = getGenerationStats();
        const authPending = isAuthStatePending();
        const member = isMember();
        const premiumActive = member && plan.id !== 'free';
        const recommendedSetCount = member ? getRecommendedSetCount(plan.id) : 0;
        const nextBillingLabel = premiumActive ? formatMembershipDate(membershipState.subscriptionEndsAt) : '-';
        const membershipStatusLabel = authPending
            ? '확인 중'
            : !member
            ? '로그인 전'
            : scheduledPlan
            ? `${plan.label} 사용 중 · ${scheduledPlan.label} 예약`
            : premiumActive
            ? `${plan.label} 사용 중`
            : 'FREE 사용 중';
        const periodLabel = authPending
            ? '플랜 정보를 불러오는 중입니다.'
            : premiumActive
            ? formatMembershipPeriod(membershipState.subscriptionStartedAt, membershipState.subscriptionEndsAt)
            : '무료 이용';
        const flowLabel = authPending
            ? '플랜 정보를 확인하는 중입니다.'
            : !member
            ? '로그인 후 유료 플랜을 첫 달 0원으로 시작할 수 있습니다.'
            : scheduledPlan
            ? `${formatMembershipDate(membershipState.scheduledMembershipApplyAt)}부터 ${scheduledPlan.label}로 변경 예약됨`
            : premiumActive
            ? `첫 달 결제는 0원이며 ${nextBillingLabel}부터 ${formatMembershipRecurringPrice(plan)} 자동결제됩니다. 다운그레이드는 다음 자동결제일부터 적용됩니다.`
            : 'FREE는 하루 5조합입니다. GOLD / PLATINUM / MASTER는 첫 달 0원으로 바로 시작할 수 있습니다.';
        const planHeading = authPending
            ? '확인 중'
            : premiumActive
            ? `${plan.label} 플랜`
            : member
            ? 'FREE 플랜'
            : '무료 플랜';

        if (mypagePlanHeadingEl) {
            mypagePlanHeadingEl.textContent = planHeading;
        }

        if (mypageProfileEmailEl) {
            if (authPending) {
                mypageProfileEmailEl.textContent = '확인 중';
            } else if (currentUser && currentUser.email) {
                mypageProfileEmailEl.textContent = currentUser.email;
            } else if (isMember() && currentUser) {
                mypageProfileEmailEl.textContent = currentUser.uid;
            } else {
                mypageProfileEmailEl.textContent = '비회원';
            }
        }
        if (mypageMembershipTierEl) {
            mypageMembershipTierEl.textContent = authPending ? '확인 중' : (member ? plan.label : 'FREE');
        }
        if (mypageMembershipTierSummaryEl) {
            mypageMembershipTierSummaryEl.textContent = authPending ? '확인 중' : (member ? plan.label : 'FREE');
        }
        if (mypageMembershipDescEl) {
            mypageMembershipDescEl.textContent = membershipStatusLabel;
        }
        if (mypageMembershipNextEl) {
            mypageMembershipNextEl.textContent = authPending
                ? '확인 중'
                : scheduledPlan
                ? '예약 변경'
                : premiumActive
                ? 'ACTIVE'
                : member
                ? 'FREE'
                : '비회원';
        }
        if (mypagePlanNoteEl) {
            mypagePlanNoteEl.textContent = authPending
                ? '확인 중'
                : '플랜 순서: FREE < GOLD < PLATINUM < MASTER · 유료 플랜 첫 달 0원';
        }
        if (mypagePlanSetCountEl) {
            mypagePlanSetCountEl.textContent = authPending
                ? '-'
                : premiumActive
                ? `${recommendedSetCount}세트`
                : '-';
        }
        if (mypagePlanCopyAccessEl) {
            mypagePlanCopyAccessEl.textContent = authPending ? '확인 중' : nextBillingLabel;
        }
        if (mypagePlanGuideEl) {
            mypagePlanGuideEl.textContent = periodLabel;
        }
        if (mypagePlanFlowEl) {
            mypagePlanFlowEl.textContent = flowLabel;
        }
        if (mypagePlanManageBtn) {
            const isOffersVisible = mypagePlanOffersSectionEl && !mypagePlanOffersSectionEl.hidden;
            mypagePlanManageBtn.textContent = authPending
                ? '확인 중'
                : isOffersVisible
                ? '플랜 닫기'
                : '플랜 보기';
            mypagePlanManageBtn.disabled = authPending;
        }
        if (mypagePlanCancelBtn) {
            const freeScheduled = Boolean(scheduledPlan && scheduledPlan.id === 'free');
            mypagePlanCancelBtn.hidden = !premiumActive;
            mypagePlanCancelBtn.disabled = authPending || freeScheduled;
            mypagePlanCancelBtn.textContent = freeScheduled
                ? `${formatMembershipDate(membershipState.scheduledMembershipApplyAt)} FREE 예약됨`
                : '다음 자동결제일부터 FREE';
        }
        mypagePlanOfferCards.forEach(card => {
            const tier = String(card.dataset.premiumPlanCard || '').toLowerCase();
            const isCurrent = !authPending && member && plan.id === tier;
            const isScheduled = !authPending && scheduledPlan && scheduledPlan.id === tier;
            card.classList.toggle('is-active', isCurrent);
            card.classList.toggle('is-scheduled', Boolean(isScheduled));

            const actionButton = card.querySelector('.premium-plan-buy');
            if (!actionButton) return;

            if (authPending) {
                actionButton.disabled = true;
                actionButton.textContent = '확인 중';
                return;
            }

            if (!member) {
                const tierLabel = tier.toUpperCase();
                actionButton.disabled = false;
                actionButton.textContent = `${tierLabel} 로그인 후 첫 달 0원 시작`;
                actionButton.className = 'cta premium-plan-buy';
                return;
            }

            if (isCurrent) {
                if (scheduledPlan) {
                    actionButton.disabled = false;
                    actionButton.textContent = '예약 취소';
                } else {
                    actionButton.disabled = true;
                    actionButton.textContent = '이용 중';
                }
                actionButton.className = 'ghost premium-plan-buy';
                return;
            }

            if (isScheduled) {
                actionButton.disabled = true;
                actionButton.textContent = `${formatMembershipDate(membershipState.scheduledMembershipApplyAt)} 적용 예약`;
                actionButton.className = 'ghost premium-plan-buy';
                return;
            }

            const changeMode = getMembershipChangeMode(plan.id, tier, membershipState.scheduledMembershipTier);
            const tierLabel = tier.toUpperCase();
            actionButton.disabled = false;
            if (changeMode === 'downgrade') {
                actionButton.textContent = '다음 자동결제일부터 변경';
                actionButton.className = 'ghost premium-plan-buy';
            } else if (changeMode === 'upgrade') {
                actionButton.textContent = `${tierLabel} 첫 달 0원 업그레이드`;
                actionButton.className = 'cta premium-plan-buy';
            } else {
                actionButton.textContent = `${tierLabel} 첫 달 0원 시작`;
                actionButton.className = 'cta premium-plan-buy';
            }
        });
        if (mypageStatsGeneratedEl) {
            mypageStatsGeneratedEl.textContent = `${formatNumber(stats.totalSets || 0)}세트`;
        }
        if (mypageStatsRoundEl) {
            const round = Number(stats.lastRound || getTargetRoundForEntries() || 0);
            mypageStatsRoundEl.textContent = round > 0 ? `${round}회` : '-';
        }
        if (mypageStatsModeEl) {
            mypageStatsModeEl.textContent = Number(stats.totalSets || 0) > 0
                ? (stats.lastSourceMode === 'premium' ? '추천 플랜' : '직접 선택')
                : '기록 없음';
        }
        updateLockerTabUi();
    }

    function updateLockerTabUi() {

        renderLockerHistoryUi();
        renderLockerPlanHistoryUi();
    }

    function updateAnalysisSummaryUi() {
        const currentRoundText = String(weeklyThisRoundEl?.textContent || '').trim();
        const currentDateText = String(weeklyThisDateEl?.textContent || '').trim();
        const latest = currentWeeklyData;
        const recentItems = recentRoundDataList
            .filter(Boolean)
            .map(item => ({
                ...item,
                firstWinamntNum: Number(item.firstWinamnt || 0)
            }))
            .filter(item => Number.isFinite(item.firstWinamntNum) && item.firstWinamntNum >= 0);
        const latestTrend = recentItems[0] || (latest ? {
            ...latest,
            firstWinamntNum: Number(latest.firstWinamnt || 0)
        } : null);
        const peakTrend = recentItems.length
            ? recentItems.reduce((best, current) => (current.firstWinamntNum > best.firstWinamntNum ? current : best), recentItems[0])
            : latestTrend;

        if (analysisCurrentRoundEl) {
            analysisCurrentRoundEl.textContent = currentRoundText || (latest ? `${Number(latest.drwNo || 0) + 1}회` : '-');
        }
        if (analysisCurrentDateEl) {
            analysisCurrentDateEl.textContent = currentDateText || '추첨 일정 확인 중';
        }
        if (analysisExpectedAmountEl) {
            if (weeklyExpectedOverride != null) {
                analysisExpectedAmountEl.textContent = formatCurrency(weeklyExpectedOverride);
            } else if (dashExpectedAmountEl && String(dashExpectedAmountEl.textContent || '').trim()) {
                analysisExpectedAmountEl.textContent = String(dashExpectedAmountEl.textContent || '').trim();
            } else {
                analysisExpectedAmountEl.textContent = '-';
            }
        }
        if (analysisLatestRoundEl) {
            analysisLatestRoundEl.textContent = latest ? `${latest.drwNo}회` : '-';
        }
        if (analysisLatestDateEl) {
            analysisLatestDateEl.textContent = latest?.drwNoDate ? `${formatShortDate(latest.drwNoDate)} 추첨` : '최근 회차 확인 중';
        }

        const numbers = latest
            ? [latest.drwtNo1, latest.drwtNo2, latest.drwtNo3, latest.drwtNo4, latest.drwtNo5, latest.drwtNo6]
            : [];
        analysisLatestNumberEls.forEach((el, index) => {
            if (!el) {
                return;
            }
            const value = numbers[index] || '-';
            el.textContent = value;
            applyBallStyle(el, numbers[index]);
        });
        if (analysisBonusEl) {
            analysisBonusEl.textContent = latest?.bnusNo || '-';
            applyBallStyle(analysisBonusEl, latest?.bnusNo);
        }
        if (analysisLatestTotalEl) {
            const total = latest
                ? (latest.firstAccumamnt || (latest.firstWinamnt && latest.firstPrzwnerCo ? latest.firstWinamnt * latest.firstPrzwnerCo : null))
                : null;
            analysisLatestTotalEl.textContent = `1등 총액 ${formatKrwCompact(total)}`;
        }
        if (analysisLatestWinnersEl) {
            analysisLatestWinnersEl.textContent = latest
                ? `당첨자 ${formatNumber(latest.firstPrzwnerCo || 0)}명`
                : '당첨자 -명';
        }
        if (analysisTrendWindowEl) {
            analysisTrendWindowEl.textContent = recentItems.length ? `최근 ${recentItems.length}회` : '최근 흐름 준비 중';
        }
        if (analysisTrendSummaryEl) {
            if (latestTrend && peakTrend) {
                analysisTrendSummaryEl.textContent = `최신 ${formatKrwCompact(latestTrend.firstWinamntNum)} · 최고 ${formatKrwCompact(peakTrend.firstWinamntNum)}`;
            } else {
                analysisTrendSummaryEl.textContent = '당첨금 흐름 준비 중';
            }
        }
        if (analysisLatestPrizeChipEl) {
            analysisLatestPrizeChipEl.textContent = latestTrend
                ? `최신 ${formatKrwCompact(latestTrend.firstWinamntNum)}`
                : '최신 -';
        }
        if (analysisPeakPrizeChipEl) {
            analysisPeakPrizeChipEl.textContent = peakTrend
                ? `최대 ${formatKrwCompact(peakTrend.firstWinamntNum)}`
                : '최대 -';
        }
        if (analysisTrendBadgeEl) {
            analysisTrendBadgeEl.textContent = recentItems.length ? `최근 ${recentItems.length}회` : '최근 0회';
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

    function buildGeneratedHistorySession(draws, options = {}) {
        if (!Array.isArray(draws) || !draws.length) {
            return null;
        }
        const sourceMode = options.sourceMode === 'premium' ? 'premium' : 'self';
        const ruleIds = Array.isArray(options.ruleIds)
            ? Array.from(new Set(options.ruleIds.map(value => String(value || '').trim()).filter(Boolean)))
            : [];
        const entries = draws
            .map((draw, index) => {
                const numbers = normalizeEntryNumbers(draw && draw.numbers);
                if (!numbers.length) {
                    return null;
                }
                return {
                    setNo: Number(draw && draw.setNo ? draw.setNo : index + 1),
                    numbers,
                    strategy: draw && draw.strategy ? String(draw.strategy).trim() : ''
                };
            })
            .filter(Boolean);
        if (!entries.length) {
            return null;
        }
        return {
            ownerKey: getHistoryOwnerKey(),
            generationId: `local_${Date.now()}_${createClientNonce(10)}`,
            createdAt: new Date().toISOString(),
            round: Number(getTargetRoundForEntries() || 0),
            sourceMode,
            ruleCount: ruleIds.length,
            setCount: entries.length,
            entries
        };
    }

    function persistGeneratedHistorySession(draws, options = {}) {
        const nextSession = buildGeneratedHistorySession(draws, options);
        if (!nextSession) {
            return;
        }
        const current = readGeneratedHistorySessions();
        current.unshift(nextSession);
        saveGeneratedHistorySessions(current.slice(0, 24));
    }

    function getSupabaseConfig() {
        const raw = window.LOTTO_SUPABASE_CONFIG;
        if (!raw || typeof raw !== 'object') {
            return null;
        }
        const url = String(raw.url || '').trim().replace(/\/+$/, '');
        const anonKey = String(raw.anonKey || '').trim();
        const schema = String(raw.schema || 'public').trim() || 'public';
        if (!url || !anonKey) {
            return null;
        }
        return { url, anonKey, schema };
    }

    function hasSupabaseDrawStorage() {
        return Boolean(getSupabaseConfig());
    }

    function hasRemoteDrawStorage() {
        return hasSupabaseDrawStorage();
    }

    function buildSupabaseRestUrl(path, query = {}) {
        const config = getSupabaseConfig();
        if (!config) {
            throw new Error('supabase_not_configured');
        }
        const url = new URL(`${config.url}/rest/v1/${String(path || '').replace(/^\/+/, '')}`);
        Object.entries(query).forEach(([key, value]) => {
            if (value == null || value === '') {
                return;
            }
            url.searchParams.set(key, String(value));
        });
        return url.toString();
    }

    function buildSupabaseRestHeaders(options = {}) {
        const config = getSupabaseConfig();
        if (!config) {
            throw new Error('supabase_not_configured');
        }
        const headers = {
            apikey: config.anonKey,
            Authorization: `Bearer ${config.anonKey}`,
            Accept: 'application/json',
            'Accept-Profile': config.schema
        };
        if (options.write) {
            headers['Content-Type'] = 'application/json';
            headers['Content-Profile'] = config.schema;
        }
        if (options.prefer) {
            headers.Prefer = options.prefer;
        }
        return headers;
    }

    async function requestSupabase(path, options = {}) {
        const method = String(options.method || 'GET').toUpperCase();
        const response = await fetch(buildSupabaseRestUrl(path, options.query), {
            method,
            headers: buildSupabaseRestHeaders({
                write: method !== 'GET',
                prefer: options.prefer || ''
            }),
            body: options.body == null ? undefined : JSON.stringify(options.body),
            cache: 'no-store'
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `supabase_${method.toLowerCase()}_${response.status}`);
        }
        const text = await response.text();
        if (!text) {
            return null;
        }
        return JSON.parse(text);
    }

    function resolveCurrentUserEmail() {
        if (!currentUser) {
            return null;
        }
        const candidates = [currentUser.email];
        if (currentUserProfile && currentUserProfile.email) {
            candidates.push(currentUserProfile.email);
        }
        if (Array.isArray(currentUser.providerData)) {
            currentUser.providerData.forEach(provider => {
                if (provider && provider.email) {
                    candidates.push(provider.email);
                }
            });
        }
        for (const value of candidates) {
            const normalized = String(value || '').trim().toLowerCase();
            if (normalized) {
                return normalized;
            }
        }
        return null;
    }

    function buildRemoteDrawEntryRecords(draws, options = {}) {
        const targetRound = Number(getTargetRoundForEntries() || 0);
        const userType = isMember() ? 'member' : 'guest';
        const membershipTier = isMember() ? getMembershipTier() : 'guest';
        const generationId = `gen_${Date.now()}_${createClientNonce(10)}`;
        const sourceMode = options.sourceMode === 'premium' ? 'premium' : 'self';
        const ruleIds = Array.isArray(options.ruleIds)
            ? Array.from(new Set(options.ruleIds.map(value => String(value || '').trim()).filter(Boolean)))
            : [];
        if (userType === 'guest' && !guestTrackingId) {
            guestTrackingId = getOrCreateGuestTrackingId();
        }
        return draws
            .map((draw, index) => {
                const normalizedNumbers = normalizeEntryNumbers(draw && draw.numbers);
                if (!normalizedNumbers.length) {
                    return null;
                }
                const strategy = draw && draw.strategy ? String(draw.strategy).trim() : '';
                return {
                    round: targetRound,
                    numbers: normalizedNumbers,
                    numbersKey: normalizedNumbers.join('-'),
                    setNo: Number(draw && draw.setNo ? draw.setNo : index + 1),
                    sourceMode,
                    strategy: strategy || null,
                    userType,
                    membershipTier,
                    uid: currentUser ? currentUser.uid : null,
                    userEmail: resolveCurrentUserEmail(),
                    guestTrackingId: userType === 'guest' ? guestTrackingId : null,
                    generationId,
                    ruleIds,
                    ruleCount: ruleIds.length
                };
            })
            .filter(Boolean);
    }

    function buildSupabaseDrawEntryRow(record) {
        return {
            round: record.round,
            numbers: record.numbers,
            numbers_key: record.numbersKey,
            set_no: record.setNo,
            source_mode: record.sourceMode,
            strategy: record.strategy,
            user_type: record.userType,
            membership_tier: record.membershipTier,
            uid: record.uid,
            user_email: record.userEmail,
            guest_tracking_id: record.guestTrackingId,
            generation_id: record.generationId,
            rule_ids: record.ruleIds,
            rule_count: record.ruleCount
        };
    }

    async function persistDrawEntriesToSupabase(records) {
        if (!records.length) {
            return;
        }
        await requestSupabase('draw_entries', {
            method: 'POST',
            body: records.map(buildSupabaseDrawEntryRow),
            prefer: 'return=minimal'
        });
    }

    async function fetchRemoteDrawHistoryEntries() {
        if (!hasSupabaseDrawStorage()) {
            return [];
        }
        const query = {
            select: 'generation_id,created_at,source_mode,round',
            order: 'created_at.desc',
            limit: 400
        };
        if (isMember() && currentUser && currentUser.uid) {
            query.uid = `eq.${currentUser.uid}`;
        } else {
            if (!guestTrackingId) {
                guestTrackingId = getOrCreateGuestTrackingId();
            }
            query.guest_tracking_id = `eq.${guestTrackingId}`;
        }
        const rows = await requestSupabase('draw_entries', { query });
        return Array.isArray(rows)
            ? rows.map(row => ({
                generationId: String(row.generation_id || ''),
                createdAt: row.created_at || null,
                sourceMode: row.source_mode || 'self',
                round: Number(row.round || 0)
            }))
            : [];
    }

    let remoteDrawHistorySessions = [];
    let remoteDrawHistoryOwnerKey = '';
    let remoteDrawHistoryPending = false;

    async function fetchRemoteDrawHistorySessions() {
        if (!hasSupabaseDrawStorage()) {
            return [];
        }
        const query = {
            select: 'generation_id,created_at,source_mode,round,numbers,set_no,strategy,rule_count,rule_ids',
            order: 'created_at.desc',
            limit: 600
        };
        if (isMember() && currentUser && currentUser.uid) {
            query.uid = `eq.${currentUser.uid}`;
        } else {
            if (!guestTrackingId) {
                guestTrackingId = getOrCreateGuestTrackingId();
            }
            query.guest_tracking_id = `eq.${guestTrackingId}`;
        }
        const rows = await requestSupabase('draw_entries', { query });
        if (!Array.isArray(rows)) {
            return [];
        }
        const sessionMap = new Map();
        rows.forEach(row => {
            const generationId = String(row.generation_id || '').trim();
            if (!generationId) {
                return;
            }
            let session = sessionMap.get(generationId);
            if (!session) {
                session = {
                    ownerKey: 'remote',
                    generationId,
                    createdAt: row.created_at || null,
                    round: Number(row.round || 0),
                    sourceMode: row.source_mode === 'premium' ? 'premium' : 'self',
                    ruleCount: Number(row.rule_count || 0),
                    ruleIds: Array.isArray(row.rule_ids) ? row.rule_ids.slice() : [],
                    setCount: 0,
                    entries: []
                };
                sessionMap.set(generationId, session);
            }
            const numbers = Array.isArray(row.numbers)
                ? row.numbers.map(value => Number(value)).filter(value => Number.isFinite(value))
                : [];
            if (!numbers.length) {
                return;
            }
            session.entries.push({
                setNo: Number(row.set_no || session.entries.length + 1),
                numbers,
                strategy: row.strategy ? String(row.strategy).trim() : ''
            });
        });
        return Array.from(sessionMap.values())
            .map(session => {
                session.entries.sort((a, b) => (a.setNo || 0) - (b.setNo || 0));
                session.setCount = session.entries.length;
                return session;
            })
            .filter(session => session.entries.length > 0)
            .sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
    }

    async function refreshRemoteDrawHistory({ force = false } = {}) {
        if (!hasSupabaseDrawStorage()) {
            return;
        }
        if (remoteDrawHistoryPending) {
            return;
        }
        const ownerKey = getHistoryOwnerKey();
        if (!force && remoteDrawHistoryOwnerKey === ownerKey && remoteDrawHistorySessions.length) {
            return;
        }
        remoteDrawHistoryPending = true;
        try {
            const sessions = await fetchRemoteDrawHistorySessions();
            remoteDrawHistorySessions = sessions;
            remoteDrawHistoryOwnerKey = ownerKey;
            renderLockerHistoryUi();
            renderDash2MeStats();
        } catch (error) {
            console.error('draw_entries 이력 로드 실패', error);
        } finally {
            remoteDrawHistoryPending = false;
        }
    }

    function getRemoteDrawHistorySessionsForCurrentOwner() {
        const ownerKey = getHistoryOwnerKey();
        if (remoteDrawHistoryOwnerKey !== ownerKey) {
            return [];
        }
        return remoteDrawHistorySessions;
    }

    function getLockerHistorySessionsForDisplay() {
        const remote = getRemoteDrawHistorySessionsForCurrentOwner();
        const local = getGeneratedHistoryForCurrentOwner();
        const merged = new Map();
        remote.forEach(session => {
            if (session && session.generationId) {
                merged.set(session.generationId, session);
            }
        });
        local.forEach(session => {
            if (session && session.generationId && !merged.has(session.generationId)) {
                merged.set(session.generationId, session);
            }
        });
        return Array.from(merged.values())
            .sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
    }

    async function fetchRemoteDrawEntriesByRound(roundNo) {
        if (!hasSupabaseDrawStorage()) {
            return [];
        }
        const rows = await requestSupabase('draw_entries', {
            query: {
                select: 'numbers',
                round: `eq.${Number(roundNo)}`
            }
        });
        return Array.isArray(rows)
            ? rows.map(row => ({ numbers: row.numbers }))
            : [];
    }

    async function persistGeneratedEntries(draws, options = {}) {
        if (!Array.isArray(draws) || !draws.length) {
            return;
        }
        persistGeneratedHistorySession(draws, options);
        updateLockerTabUi();
        renderDash2MeStats();
        if (!hasSupabaseDrawStorage()) {
            console.warn('draw_entries: Supabase 설정이 없어 원격 저장을 건너뜁니다.');
            return;
        }
        try {
            const records = buildRemoteDrawEntryRecords(draws, options);
            if (!records.length) {
                return;
            }
            await persistDrawEntriesToSupabase(records);
            refreshRemoteDrawHistory({ force: true });
            loadMypageDrawHistory(true);
        } catch (error) {
            console.error('번호 저장 실패(draw_entries)', error);
        }
    }

    function renderDash2MeStats() {
        if (!dash2MeWeekEl && !dash2MeSavedEl && !dash2MeRemainingEl && !dash2MePlanEl) {
            return;
        }
        const sessions = getLockerHistorySessionsForDisplay();
        const mondayStart = getLockerMondayStart(getKstNow()).getTime();
        let weekSetCount = 0;
        let savedSetCount = 0;
        sessions.forEach(session => {
            const entries = Array.isArray(session && session.entries) ? session.entries : [];
            savedSetCount += entries.length;
            const createdMs = getTimestampMillis(session && session.createdAt);
            if (createdMs >= mondayStart) {
                weekSetCount += entries.length;
            }
        });
        if (dash2MeWeekEl) {
            dash2MeWeekEl.textContent = formatNumber(weekSetCount);
        }
        if (dash2MeSavedEl) {
            dash2MeSavedEl.textContent = formatNumber(savedSetCount);
        }
        if (dash2MeRemainingEl) {
            const limit = getMembershipDailyGenerationLimit();
            if (!Number.isFinite(limit)) {
                dash2MeRemainingEl.textContent = '무제한';
            } else {
                const used = getDailyGenerationUsageCount();
                const remaining = Math.max(0, limit - used);
                dash2MeRemainingEl.textContent = `${formatNumber(remaining)} / ${formatNumber(limit)}`;
            }
        }
        if (dash2MePlanEl) {
            if (isAuthStatePending()) {
                dash2MePlanEl.textContent = '확인 중';
            } else if (isMember()) {
                const plan = getMembershipPlanMeta();
                dash2MePlanEl.textContent = plan && plan.label ? `${plan.label} 플랜` : '로그인 회원';
            } else {
                dash2MePlanEl.textContent = '비회원';
            }
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


    function getGeneratedHistoryForCurrentOwner() {
        const ownerKey = getHistoryOwnerKey();
        return readGeneratedHistorySessions()
            .filter(item => item && item.ownerKey === ownerKey)
            .sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
    }

    function getLockerMondayStart(date = getKstNow()) {
        const monday = new Date(date);
        monday.setHours(0, 0, 0, 0);
        const day = monday.getDay();
        const offset = day === 0 ? 6 : day - 1;
        monday.setDate(monday.getDate() - offset);
        return monday;
    }

    function getLockerWeeklyDrawDate(mondayDate) {
        const drawDate = new Date(mondayDate);
        drawDate.setDate(drawDate.getDate() + 5);
        drawDate.setHours(20, 35, 0, 0);
        return drawDate;
    }

    function getEstimatedRoundFromDrawDate(drawDate) {
        if (!(drawDate instanceof Date) || Number.isNaN(drawDate.getTime())) {
            return 0;
        }
        const firstDrawUtcMs = Date.UTC(2002, 11, 7);
        const targetUtcMs = Date.UTC(drawDate.getFullYear(), drawDate.getMonth(), drawDate.getDate());
        const diffWeeks = Math.round((targetUtcMs - firstDrawUtcMs) / (7 * 24 * 60 * 60 * 1000));
        return diffWeeks + 1;
    }

    function buildLockerWeeklyPlanSession({ ownerKey, tier, mondayDate }) {
        const plan = getMembershipPlanMeta(tier);
        const setCount = getLockerWeeklySetCount(plan.id);
        if (!ownerKey || plan.id === 'free' || !setCount || !(mondayDate instanceof Date) || Number.isNaN(mondayDate.getTime())) {
            return null;
        }
        const releaseAt = new Date(mondayDate);
        releaseAt.setHours(9, 0, 0, 0);
        const drawDate = getLockerWeeklyDrawDate(mondayDate);
        const round = getEstimatedRoundFromDrawDate(drawDate);
        const releaseDateLabel = formatShortDate(releaseAt);
        const drawDateLabel = formatShortDate(drawDate);
        const weekKey = releaseDateLabel.replace(/\./g, '');
        const draws = generateStrategyRecommendations(setCount, {
            randomFn: createSeededRandom(`${ownerKey}|${plan.id}|${weekKey}|${round}|weekly`),
            excludedNumbers: new Set()
        });
        const entries = draws
            .map((draw, index) => {
                const numbers = normalizeEntryNumbers(draw && draw.numbers);
                if (!numbers.length) {
                    return null;
                }
                return {
                    setNo: Number(draw && draw.setNo ? draw.setNo : index + 1),
                    numbers,
                    strategy: draw && draw.strategy ? String(draw.strategy).trim() : ''
                };
            })
            .filter(Boolean);
        if (!entries.length) {
            return null;
        }
        return {
            ownerKey,
            generationId: `plan_${plan.id}_${weekKey}`,
            createdAt: releaseAt.toISOString(),
            releaseAt: releaseAt.toISOString(),
            releaseDateLabel,
            drawDate: drawDate.toISOString(),
            drawDateLabel,
            round,
            sessionType: 'plan-weekly',
            membershipTier: plan.id,
            membershipLabel: plan.label,
            setCount: entries.length,
            entries
        };
    }

    function getLockerPlanSessionsForCurrentOwner() {
        if (!isPremiumMember()) {
            return [];
        }
        const plan = getMembershipPlanMeta();
        const ownerKey = getHistoryOwnerKey();
        const latestMonday = getLockerMondayStart();
        const sessions = [];
        for (let index = 0; index < PLAN_WEEKLY_HISTORY_LIMIT; index += 1) {
            const mondayDate = new Date(latestMonday);
            mondayDate.setDate(latestMonday.getDate() - index * 7);
            const session = buildLockerWeeklyPlanSession({
                ownerKey,
                tier: plan.id,
                mondayDate
            });
            if (session) {
                sessions.push(session);
            }
        }
        return sessions.sort((a, b) => getTimestampMillis(b.releaseAt || b.createdAt) - getTimestampMillis(a.releaseAt || a.createdAt));
    }

    function getManualLockerSourceLabel(session) {
        return session && session.sourceMode === 'premium' ? '즉시 추천 저장' : '직접 생성';
    }

    function getLockerStrategySummary(entries) {
        const uniqueStrategies = Array.from(new Set(
            (Array.isArray(entries) ? entries : [])
                .map(entry => String(entry && entry.strategy ? entry.strategy : '').trim())
                .filter(Boolean)
        ));
        if (!uniqueStrategies.length) {
            return '';
        }
        if (uniqueStrategies.length === 1) {
            return uniqueStrategies[0];
        }
        return `${uniqueStrategies[0]} 외 ${uniqueStrategies.length - 1}개 전략`;
    }

    function renderLockerEntryRows(entries) {
        return (Array.isArray(entries) ? entries : [])
            .map(entry => {
                const numbers = normalizeEntryNumbers(entry && entry.numbers);
                if (!numbers.length) {
                    return '';
                }
                const setNo = Math.max(1, Number(entry && entry.setNo) || 1);
                const strategy = String(entry && entry.strategy ? entry.strategy : '').trim();
                return `
                    <div class="locker-entry-row">
                        <span class="locker-entry-label">${escapeHtml(`${setNo}세트`)}</span>
                        <div class="locker-entry-balls">
                            ${numbers.map(number => `<span class="locker-entry-ball" data-ball-range="${escapeHtml(getBallRange(number))}">${escapeHtml(String(number))}</span>`).join('')}
                        </div>
                        ${strategy ? `<span class="locker-entry-strategy">${escapeHtml(strategy)}</span>` : ''}
                    </div>
                `;
            })
            .join('');
    }

    function renderLockerSessionCard(session, options = {}) {
        const tone = options.tone === 'plan' ? 'plan' : 'manual';
        const entries = Array.isArray(session && session.entries) ? session.entries : [];
        if (!entries.length) {
            return '';
        }
        const previewLimit = tone === 'plan' ? PLAN_LOCKER_PREVIEW_ENTRY_LIMIT : LOCKER_PREVIEW_ENTRY_LIMIT;
        const previewEntries = entries.slice(0, previewLimit);
        const hiddenEntries = entries.slice(previewLimit);
        const canExpand = hiddenEntries.length > 0;
        const tags = Array.isArray(options.tags)
            ? options.tags.map(value => String(value || "").trim()).filter(Boolean).slice(0, 4)
            : [];
        const expanded = canExpand ? Boolean(options.expanded) : true;
        return `
            <article class="locker-session-card locker-session-card--${tone}${expanded ? " is-expanded" : ""}">
                <div class="locker-session-head">
                    <button type="button" class="locker-session-toggle${canExpand ? "" : " is-static"}" ${canExpand ? "data-locker-toggle" : ""} aria-expanded="${String(expanded)}">
                        <span class="locker-session-kicker">${escapeHtml(String(options.kicker || ""))}</span>
                        <strong>${escapeHtml(String(options.title || "번호 세션"))}</strong>
                        <p>${escapeHtml(String(options.subtitle || ""))}</p>
                        ${tags.length ? `<div class="locker-session-tags">${tags.map(tag => `<span class="locker-session-tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
                    </button>
                    <button type="button" class="ghost locker-copy-btn-mini locker-copy-btn-mini--panel" data-locker-copy="${escapeHtml(String(session.generationId || ""))}">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>복사</span>
                    </button>
                </div>
                <div class="locker-session-preview">
                    ${renderLockerEntryRows(previewEntries)}
                    ${canExpand ? `<div class="locker-session-more" data-locker-more${expanded ? " hidden" : ""}>+${formatNumber(hiddenEntries.length)}세트 더 보기</div>` : ""}
                </div>
                ${canExpand ? `<div class="locker-session-content"${expanded ? "" : " hidden"}>${renderLockerEntryRows(hiddenEntries)}</div>` : ""}
            </article>
        `;
    }
    function bindLockerSectionUi(rootEl) {
        if (!rootEl) {
            return;
        }
        rootEl.querySelectorAll('[data-locker-toggle]').forEach(button => {
            button.onclick = () => {
                const card = button.closest('.locker-session-card');
                if (!card) {
                    return;
                }
                const content = card.querySelector('.locker-session-content');
                const more = card.querySelector('[data-locker-more]');
                if (!content) {
                    return;
                }
                const expanded = !card.classList.contains('is-expanded');
                card.classList.toggle('is-expanded', expanded);
                content.hidden = !expanded;
                if (more) {
                    more.hidden = expanded;
                }
                button.setAttribute('aria-expanded', String(expanded));
            };
        });
        rootEl.querySelectorAll('[data-locker-copy]').forEach(button => {
            button.onclick = event => {
                event.preventDefault();
                event.stopPropagation();
                copyLockerSession(String(button.dataset.lockerCopy || ""));
            };
        });
    }
    function renderLockerPlanEmptyState(options = {}) {
        const authPending = Boolean(options.authPending);
        const member = Boolean(options.member);
        const premiumActive = Boolean(options.premiumActive);
        const headline = authPending
            ? '멤버십 상태를 확인하는 중입니다.'
            : premiumActive
            ? '이번 주 플랜 추천을 준비하는 중입니다.'
            : member
            ? '플랜을 올리면 주간 추천이 자동으로 들어옵니다.'
            : '로그인 후 플랜을 선택하면 주간 추천이 열립니다.';
        const description = authPending
            ? '로그인 정보와 플랜 상태가 확인되면 최근 6주 추천이 표시됩니다.'
            : premiumActive
            ? '잠시 후 다시 열면 최근 6주 주간 추천 번호가 표시됩니다.'
            : member
            ? 'GOLD는 5조합, PLATINUM은 15조합, MASTER는 30조합을 매주 자동으로 보관합니다.'
            : 'GOLD 5조합, PLATINUM 15조합, MASTER 30조합이 최근 6주까지 자동 보관됩니다.';
        const badges = authPending
            ? ['플랜 확인 중']
            : ['GOLD 5조합', 'PLATINUM 15조합', 'MASTER 30조합', '최근 6주 보관'];
        return `
            <article class="locker-history-empty locker-history-empty--plan">
                <strong>${escapeHtml(headline)}</strong>
                <p>${escapeHtml(description)}</p>
                <div class="locker-empty-badges">
                    ${badges.map(label => `<span>${escapeHtml(label)}</span>`).join('')}
                </div>
            </article>
        `;
    }

    function buildGeneratedSessionCopyText(session) {
        if (!session || !Array.isArray(session.entries)) {
            return '';
        }
        return session.entries
            .map(entry => `${entry.setNo}세트: ${Array.isArray(entry.numbers) ? entry.numbers.join(', ') : ''}`)
            .filter(Boolean)
            .join('\n');
    }

    async function copyLockerSession(sessionId) {
        const target = getLockerHistorySessionsForDisplay().find(item => item.generationId === sessionId)
            || getLockerPlanSessionsForCurrentOwner().find(item => item.generationId === sessionId);
        if (!target) {
            showActionPopup('복사할 번호를 찾지 못했습니다.');
            return;
        }
        const text = buildGeneratedSessionCopyText(target);
        if (!text) {
            showActionPopup('복사할 번호가 없습니다.');
            return;
        }
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            }
            showActionPopup(`${target.setCount || 0}세트를 복사했습니다.`);
        } catch {
            showActionPopup('복사에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
    }

    function renderLockerHistoryUi() {
        if (!lockerHistoryListEl) {
            return;
        }
        const sessions = getLockerHistorySessionsForDisplay();
        if (lockerHistoryChipEl) {
            lockerHistoryChipEl.textContent = sessions.length ? `최근 ${formatNumber(sessions.length)}건` : '0건';
        }
        if (!sessions.length) {
            const emptyBody = remoteDrawHistoryPending
                ? '<strong>번호 이력을 불러오는 중입니다.</strong><p>잠시만 기다려 주세요.</p>'
                : '<strong>직접 추첨한 번호가 아직 없습니다.</strong><p>추첨 후 Supabase에 자동 저장되며, 다시 열어 복사할 수 있습니다.</p>';
            lockerHistoryListEl.innerHTML = `
                <article class="locker-history-empty">
                    ${emptyBody}
                </article>
            `;
            return;
        }
        lockerHistoryListEl.innerHTML = sessions
            .map(session => {
                const roundText = Number(session.round || 0) > 0 ? `${Number(session.round)}회` : '회차 미정';
                const entries = Array.isArray(session.entries) ? session.entries : [];
                const strategySummary = getLockerStrategySummary(entries);
                return renderLockerSessionCard(session, {
                    tone: 'manual',
                    expanded: false,
                    kicker: 'MANUAL',
                    title: `${roundText} 직접 추첨`,
                    subtitle: `${formatHistoryDateTime(session.createdAt)} 저장`,
                    tags: [
                        getManualLockerSourceLabel(session),
                        `${formatNumber(entries.length)}세트`,
                        Number(session.ruleCount || 0) > 0 ? `규칙 ${formatNumber(session.ruleCount)}개` : '',
                        strategySummary
                    ]
                });
            })
            .join('');
        bindLockerSectionUi(lockerHistoryListEl);
    }

    function renderLockerPlanHistoryUi() {
        if (!lockerPlanHistoryListEl) {
            return;
        }
        const authPending = isAuthStatePending();
        const member = isMember();
        const premiumActive = isPremiumMember();
        const plan = getMembershipPlanMeta();
        const weeklySetCount = getLockerWeeklySetCount(plan.id);

        if (lockerPlanChipEl) {
            lockerPlanChipEl.textContent = authPending
                ? '확인 중'
                : premiumActive
                ? `${plan.label} · 주 ${formatNumber(weeklySetCount)}세트`
                : member
                ? 'FREE'
                : 'LOCKED';
        }
        if (lockerPlanNoteEl) {
            lockerPlanNoteEl.textContent = authPending
                ? '로그인과 플랜 상태를 확인하는 중입니다.'
                : premiumActive
                ? `${plan.label} 플랜은 매주 ${formatNumber(weeklySetCount)}조합씩, 최근 6주까지만 자동 보관합니다.`
                : member
                ? 'FREE 플랜입니다. GOLD 5조합, PLATINUM 15조합, MASTER 30조합을 최근 6주까지 보관합니다.'
                : '로그인 후 플랜을 선택하면 매주 월요일 추천 번호가 최근 6주까지 자동 보관됩니다.';
        }
        if (authPending || !premiumActive) {
            lockerPlanHistoryListEl.innerHTML = renderLockerPlanEmptyState({
                authPending,
                member,
                premiumActive
            });
            return;
        }

        const sessions = getLockerPlanSessionsForCurrentOwner();
        if (!sessions.length) {
            lockerPlanHistoryListEl.innerHTML = renderLockerPlanEmptyState({
                member,
                premiumActive
            });
            return;
        }

        lockerPlanHistoryListEl.innerHTML = sessions
            .map(session => {
                const roundText = Number(session.round || 0) > 0 ? `${Number(session.round)}회` : '회차 미정';
                const strategySummary = getLockerStrategySummary(session.entries);
                return renderLockerSessionCard(session, {
                    tone: 'plan',
                    expanded: false,
                    kicker: `${session.membershipLabel || plan.label} WEEKLY`,
                    title: `${roundText} 주간 추천`,
                    subtitle: `${session.releaseDateLabel || formatShortDate(new Date(session.releaseAt || session.createdAt))} 배포 · ${session.drawDateLabel || estimateRoundDateLabel(session.round)} 추첨`,
                    tags: [
                        `${formatNumber(session.setCount || 0)}세트`,
                        '최근 6주',
                        strategySummary
                    ]
                });
            })
            .join('');
        bindLockerSectionUi(lockerPlanHistoryListEl);
    }

    async function loadMypageDrawHistory(force = false) {
        if (!mypageHistoryListEl) {
            return;
        }
        if (!hasRemoteDrawStorage()) {
            mypageHistoryListEl.innerHTML = `
                <li>
                    <span class="info-label">원격 저장소 연결 후 이력을 확인할 수 있습니다.</span>
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
            const groupedMap = new Map();
            const entries = await fetchRemoteDrawHistoryEntries();
            entries.forEach(entry => {
                const key = String(entry.generationId || '');
                const existing = groupedMap.get(key);
                if (!existing) {
                    groupedMap.set(key, {
                        generationId: key,
                        createdAt: entry.createdAt || null,
                        sourceMode: entry.sourceMode || 'self',
                        round: Number(entry.round || 0),
                        setCount: 1
                    });
                    return;
                }
                existing.setCount += 1;
                if (getTimestampMillis(entry.createdAt) > getTimestampMillis(existing.createdAt)) {
                    existing.createdAt = entry.createdAt || existing.createdAt;
                }
            });
            const rows = Array.from(groupedMap.values())
                .sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt))
                .slice(0, 20);
            if (!rows.length) {
                mypageHistoryListEl.innerHTML = `
                    <li>
                        <span class="info-label">아직 쌓인 기록이 없습니다.</span>
                        <strong>번호를 한 번 생성하면 최근 흐름이 여기에 표시됩니다.</strong>
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
                    <span class="info-label">기록을 불러오지 못했습니다.</span>
                    <strong>잠시 후 다시 확인해 주세요.</strong>
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
        if (!hasRemoteDrawStorage()) {
            setLastWeekDashboardFallback('생성 기록 연결 중');
            return;
        }
        if (!roundData || !Number.isFinite(Number(roundData.drwNo))) {
            setLastWeekDashboardFallback('직전 회차 기준 정리 중');
            return;
        }
        const roundNo = Number(roundData.drwNo);
        if (!options.force && (lastWinDashboardRound === roundNo || pendingWinDashboardRound === roundNo)) {
            return;
        }
        pendingWinDashboardRound = roundNo;
        dashWinRoundLabelEl.textContent = `직전 ${roundNo}회`;
        dashWinStatusEl.textContent = `${roundNo}회 생성 결과 집계 중`;
        try {
            const entries = await fetchRemoteDrawEntriesByRound(roundNo);
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
                setLastWeekDashboardFallback('직전 회차 데이터 확인 필요');
                return;
            }
            const rankCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            let totalGenerated = 0;
            let totalWinners = 0;
            entries.forEach(entry => {
                const numbers = normalizeEntryNumbers(entry && entry.numbers);
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
            lastWinDashboardRound = roundNo;
            dashWinStatusEl.textContent = totalGenerated
                ? `${roundNo}회 · ${formatNumber(totalGenerated)}세트 중 ${formatNumber(totalWinners)}세트 당첨`
                : `${roundNo}회 · 앱에 기록된 생성 번호가 아직 없습니다`;
        } catch (error) {
            console.warn('지난주 당첨 대시보드 집계 실패', error);
            setLastWeekDashboardFallback('생성 결과를 불러오지 못했습니다');
        } finally {
            if (pendingWinDashboardRound === roundNo) {
                pendingWinDashboardRound = null;
            }
        }
    }

    function isPremiumMember() {
        if (!isMember()) {
            return false;
        }
        return getMembershipPlanMeta().id !== 'free';
    }

    function hasSkippedWelcomeModalToday() {
        try {
            return localStorage.getItem(ONBOARDING_SKIP_TODAY_KEY) === getTodayKey();
        } catch (error) {
            console.warn('온보딩 오늘 숨김 상태 조회 실패', error);
            return false;
        }
    }

    function rememberWelcomeModalSkippedToday() {
        try {
            localStorage.setItem(ONBOARDING_SKIP_TODAY_KEY, getTodayKey());
        } catch (error) {
            console.warn('온보딩 오늘 숨김 상태 저장 실패', error);
        }
    }

    function setOnboardingSlide(index = 0) {
        if (!onboardingSlideEls.length) {
            return;
        }
        const maxIndex = onboardingSlideEls.length - 1;
        const nextIndex = Math.max(0, Math.min(maxIndex, Number(index) || 0));
        onboardingSlideIndex = nextIndex;
        if (onboardingCarouselEl) {
            onboardingCarouselEl.dataset.slide = String(nextIndex);
        }
        if (onboardingCarouselTrackEl) {
            onboardingCarouselTrackEl.style.transform = `translateX(-${nextIndex * 100}%)`;
        }
        onboardingSlideEls.forEach((slide, slideIndex) => {
            const active = slideIndex === nextIndex;
            slide.classList.toggle('is-active', active);
            slide.setAttribute('aria-hidden', String(!active));
        });
        onboardingDotButtons.forEach((button, buttonIndex) => {
            const active = buttonIndex === nextIndex;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        onboardingNavButtons.forEach(button => {
            const direction = button.dataset.onboardingNav === 'next' ? 'next' : 'prev';
            const disabled = (direction === 'prev' && nextIndex === 0) || (direction === 'next' && nextIndex === maxIndex);
            button.disabled = disabled;
        });
    }

    function closeWelcomeModal(options = {}) {
        const { dismissToday = false, keepSessionClosed = true } = options;
        if (welcomeModalTimer) {
            window.clearTimeout(welcomeModalTimer);
            welcomeModalTimer = 0;
        }
        if (dismissToday) {
            rememberWelcomeModalSkippedToday();
        }
        if (keepSessionClosed) {
            welcomeModalDismissedInSession = true;
        } else {
            welcomeModalDismissedInSession = false;
        }
        if (!welcomeModal) {
            return;
        }
        welcomeModal.classList.add('hidden');
    }

    function openWelcomeModal() {
        if (
            !welcomeModal
            || isMember()
            || isAuthStatePending()
            || hasSkippedWelcomeModalToday()
            || welcomeModalDismissedInSession
            || shouldUseExternalBrowserPrompt()
        ) {
            return;
        }
        closeAuthModal();
        welcomeModalDismissedInSession = false;
        syncWelcomeModalViewportLayout();
        setOnboardingSlide(0);
        welcomeModal.classList.remove('hidden');
    }

    function scheduleWelcomeModal() {
        if (
            !welcomeModal
            || isMember()
            || hasSkippedWelcomeModalToday()
            || welcomeModalDismissedInSession
            || shouldUseExternalBrowserPrompt()
        ) {
            return;
        }
        if (isAuthStatePending()) {
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
            if (isMember() || hasSkippedWelcomeModalToday() || welcomeModalDismissedInSession) {
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
            setDrawAdvancedOpen(false);
            setRulePickerOpen(false);
        }
        updatePremiumMembershipUi();
        syncDrawQuickStartUi();
        scheduleDrawHorizontalWidthSync();
    }

    function updatePremiumMembershipUi() {
        const plan = getMembershipPlanMeta();
        const premium = isPremiumMember();
        const authPending = isAuthStatePending();
        if (premiumBadgeEl) {
            premiumBadgeEl.textContent = authPending ? '...' : (premium ? plan.label : 'FREE');
            premiumBadgeEl.classList.toggle('is-premium', !authPending && premium);
        }
        if (premiumLockEl) {
            premiumLockEl.classList.toggle('is-hidden', premium);
        }
        if (premiumGenerateBtn) {
            premiumGenerateBtn.disabled = authPending || !premium;
        }
        if (premiumUpgradeBtn) {
            if (authPending) {
                premiumUpgradeBtn.textContent = '로그인 확인 중';
            } else if (!isMember()) {
                premiumUpgradeBtn.textContent = '로그인 후 플랜 고르기';
            } else if (premium) {
                premiumUpgradeBtn.textContent = `${plan.label} 선택됨`;
            } else {
                premiumUpgradeBtn.textContent = '플랜 고르기';
            }
        }
        if (!premium) {
            lastPremiumDraws = [];
            setPremiumCopyButtonState(false);
            if (premiumNumbersContainer) {
                premiumNumbersContainer.innerHTML = '<div class="premium-empty-state">아직 추천 세트가 없습니다. 플랜을 고르고 이번 회차 추천을 확인해 보세요.</div>';
            }
            if (!lastPremiumDraws.length) {
                updatePremiumCopyStatus('플랜을 고르면 추천 세트가 여기에 표시됩니다.');
            }
        } else if (!lastPremiumDraws.length) {
            updatePremiumCopyStatus(`${plan.label} 선택 완료. 추천번호 받기로 이번 회차 ${getRecommendedSetCount(plan.id)}세트를 확인해 보세요.`);
        }
        updateDrawContextUi();
        updateDashboardSummaryUi();
        updateMypageSummaryUi();
        updateAnalysisSummaryUi();
    }


    async function setMembershipTier(tier) {
        const nextTier = normalizeMembershipTier(tier);
        const currentState = getMembershipState();
        const currentPlan = getMembershipPlanMeta(currentState.membershipTier);
        const targetPlan = getMembershipPlanMeta(nextTier);
        const changeMode = getMembershipChangeMode(currentPlan.id, nextTier, currentState.scheduledMembershipTier);
        const now = new Date();
        let nextState = currentState;

        if (changeMode === 'current') {
            persistLocalMembershipState(currentState);
            return {
                changed: false,
                mode: 'current',
                currentPlan,
                targetPlan,
                effectiveAt: '',
                state: currentState
            };
        }

        if (changeMode === 'retain') {
            nextState = {
                ...currentState,
                subscriptionStatus: 'active',
                scheduledMembershipTier: '',
                scheduledMembershipApplyAt: '',
                subscriptionUpdatedAt: now.toISOString()
            };
        } else if (changeMode === 'downgrade') {
            const effectiveAt = serializeMembershipDate(currentState.subscriptionEndsAt)
                || (addMonthsPreserveClock(now, 1)?.toISOString() || now.toISOString());
            nextState = {
                ...currentState,
                subscriptionStatus: 'scheduled_downgrade',
                scheduledMembershipTier: targetPlan.id,
                scheduledMembershipApplyAt: effectiveAt,
                subscriptionUpdatedAt: now.toISOString()
            };
        } else {
            nextState = createPaidMembershipState(targetPlan.id, now, {
                subscriptionStatus: 'active',
                subscriptionUpdatedAt: now
            });
        }

        persistLocalMembershipState(nextState);
        localStorage.setItem('lotto_membership_tier', nextState.membershipTier);
        if (currentUserProfile) {
            currentUserProfile = {
                ...currentUserProfile,
                ...nextState
            };
        }
        if (firebaseDb && currentUser) {
            try {
                await firebaseDb.collection('users').doc(currentUser.uid).set({
                    membershipTier: nextState.membershipTier,
                    subscriptionStatus: nextState.subscriptionStatus,
                    subscriptionStartedAt: nextState.subscriptionStartedAt || '',
                    subscriptionEndsAt: nextState.subscriptionEndsAt || '',
                    scheduledMembershipTier: nextState.scheduledMembershipTier || '',
                    scheduledMembershipApplyAt: nextState.scheduledMembershipApplyAt || '',
                    subscriptionUpdatedAt: nextState.subscriptionUpdatedAt || now.toISOString(),
                    updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                await ensureUserProfile();
            } catch (error) {
                console.warn('멤버십 상태 저장 실패', error);
            }
        }
        updatePremiumMembershipUi();
        return {
            changed: true,
            mode: changeMode,
            currentPlan,
            targetPlan,
            effectiveAt: changeMode === 'downgrade' ? nextState.scheduledMembershipApplyAt : nextState.subscriptionStartedAt,
            state: nextState
        };
    }

    function generatePremiumRecommendations(count) {

        return generateStrategyRecommendations(count);
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
            const title = document.createElement('strong');
            title.textContent = `추천 ${item.setNo}`;
            const strategy = document.createElement('span');
            strategy.textContent = String(item.strategy || '').trim();
            meta.appendChild(title);
            meta.appendChild(strategy);
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
            tag.textContent = '엄선';
            const note = document.createElement('div');
            note.className = 'premium-row-note';
            note.textContent = buildPremiumReasonText(item);
            row.appendChild(meta);
            row.appendChild(balls);
            row.appendChild(tag);
            row.appendChild(note);
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
        console.log('[Auth] Initializing Firebase...');
        if (typeof window.firebase === 'undefined') {
            authStateResolved = true;
            console.error('[Auth] Firebase SDK not found on window');
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = 'Firebase SDK 로딩 실패: 스크립트 연결을 확인하세요.';
                firebaseAuthStatusEl.style.color = '#ef4444';
            }
            return;
        }

        const config = window.LOTTO_FIREBASE_CONFIG || {};
        if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
            authStateResolved = true;
            console.error('[Auth] Firebase config missing required fields', config);
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = '설정 오류: firebase-config.js를 확인해 주세요.';
                firebaseAuthStatusEl.style.color = '#ef4444';
            }
            return;
        }

        try {
            if (!window.firebase.apps.length) {
                window.firebase.initializeApp(config);
                console.log('[Auth] Firebase app initialized');
            }
            
            if (typeof window.firebase.auth !== 'function') {
                throw new Error('Firebase Auth module not loaded');
            }

            firebaseAuth = window.firebase.auth();
            firebaseDb = window.firebase.firestore();
            firebaseReady = true;
            console.log('[Auth] Auth & Firestore ready');

            googleRedirectFlowPending = readGoogleRedirectPendingState();
            
            if (window.firebase.auth.Auth && window.firebase.auth.Auth.Persistence) {
                const { Persistence } = window.firebase.auth.Auth;
                authPersistenceReady = firebaseAuth.setPersistence(Persistence.LOCAL).catch(async error => {
                    console.warn('[Auth] Persistence LOCAL failed, trying SESSION', error);
                    try {
                        await firebaseAuth.setPersistence(Persistence.SESSION);
                    } catch (e) {
                        console.error('[Auth] Persistence failed completely', e);
                    }
                });
            } else {
                authPersistenceReady = Promise.resolve();
            }

            firebaseAuth.onAuthStateChanged(async user => {
                console.log('[Auth] Auth state changed:', user ? user.uid : 'null');
                await syncAuthState(user);
            });

            void handleGoogleRedirectResult();
            initKakaoSdk();

            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = hasGoogleRedirectPending()
                    ? '구글 로그인 결과를 확인하는 중입니다...'
                    : '로그인할 준비가 되었습니다.';
                firebaseAuthStatusEl.style.color = '#64748b';
            }
        } catch (error) {
            console.error('[Auth] Critical initialization error:', error);
            firebaseReady = false;
            authStateResolved = true;
            if (firebaseAuthStatusEl) {
                firebaseAuthStatusEl.textContent = `초기화 실패: ${error.message}`;
                firebaseAuthStatusEl.style.color = '#ef4444';
            }
        }
        updateAuthUi();
    }

    function isMember() {
        return Boolean(currentUser);
    }

    async function syncAuthState(user) {
        const wasMember = Boolean(currentUser);
        authStateResolved = true;
        currentUser = user || null;
        if (currentUser) {
            setGoogleRedirectPendingState(false);
        }
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
        renderDash2MeStats();
        if (wasMember && !currentUser) {
            resetDrawWizardSessionState({
                clearDraft: true,
                render: getCurrentActiveTabId() === 'draw'
            });
        }
        syncDrawWizardResumeStateFromAuth();
        refreshGuestLimitMessage();
        remoteDrawHistorySessions = [];
        remoteDrawHistoryOwnerKey = '';
        refreshRemoteDrawHistory({ force: true });
        loadMypageDrawHistory(true);
        if (currentWeeklyData) {
            loadLastWeekWinDashboard(currentWeeklyData, { force: true });
        }
    }

    function getMypageSupportDefaultStatus() {
        if (isAuthStatePending()) {
            return '로그인 상태를 확인하고 있습니다.';
        }
        if (!isMember()) {
            return '로그인한 계정의 이메일로 문의를 접수합니다.';
        }
        return '관리자 메일 주소는 공개하지 않고, 로그인한 이메일 기준으로 문의를 접수합니다.';
    }

    function renderMypageSupportStatus() {
        if (!mypageSupportStatusEl) {
            return;
        }
        const message = mypageSupportStatusMessage || getMypageSupportDefaultStatus();
        mypageSupportStatusEl.textContent = message;
        if (mypageSupportStatusTone && mypageSupportStatusTone !== 'default') {
            mypageSupportStatusEl.dataset.state = mypageSupportStatusTone;
        } else {
            mypageSupportStatusEl.removeAttribute('data-state');
        }
    }

    function setMypageSupportStatus(message, tone = 'default') {
        mypageSupportStatusMessage = String(message || '').trim();
        mypageSupportStatusTone = tone;
        renderMypageSupportStatus();
    }

    function resetMypageSupportStatus() {
        mypageSupportStatusMessage = '';
        mypageSupportStatusTone = 'default';
        renderMypageSupportStatus();
    }

    function getMypageSupportSenderEmail() {
        if (!currentUser || !currentUser.email) {
            return '';
        }
        return String(currentUser.email || '').trim();
    }

    function updateMypageSupportUi() {
        const member = isMember();
        const authPending = isAuthStatePending();
        const senderEmail = getMypageSupportSenderEmail();
        const disabled = !member || authPending || mypageSupportSubmitInFlight;

        if (mypageSupportSenderEl) {
            mypageSupportSenderEl.textContent = authPending ? '확인 중...' : (senderEmail || '로그인 필요');
        }
        if (mypageSupportSubjectEl) {
            mypageSupportSubjectEl.disabled = disabled;
        }
        if (mypageSupportMessageEl) {
            mypageSupportMessageEl.disabled = disabled;
        }
        if (mypageSupportSubmitBtn) {
            mypageSupportSubmitBtn.disabled = disabled;
            mypageSupportSubmitBtn.textContent = mypageSupportSubmitInFlight ? '보내는 중...' : '문의 보내기';
        }
        if (!member && !authPending) {
            if (mypageSupportFormEl) {
                mypageSupportFormEl.reset();
            }
            resetMypageSupportStatus();
            return;
        }
        renderMypageSupportStatus();
    }

    async function submitMypageSupportInquiry(event) {
        if (event) {
            event.preventDefault();
        }
        if (!isMember()) {
            openAuthModal();
            return;
        }

        const subject = String(mypageSupportSubjectEl ? mypageSupportSubjectEl.value : '').trim();
        const message = String(mypageSupportMessageEl ? mypageSupportMessageEl.value : '').trim();
        const senderEmail = getMypageSupportSenderEmail();

        if (!senderEmail) {
            setMypageSupportStatus('로그인한 이메일 정보를 확인할 수 없습니다. 다시 로그인해 주세요.', 'error');
            return;
        }
        if (subject.length < 2) {
            setMypageSupportStatus('문의 제목을 2자 이상 입력해 주세요.', 'error');
            if (mypageSupportSubjectEl) {
                mypageSupportSubjectEl.focus();
            }
            return;
        }
        if (message.length < 10) {
            setMypageSupportStatus('문의 내용은 10자 이상 입력해 주세요.', 'error');
            if (mypageSupportMessageEl) {
                mypageSupportMessageEl.focus();
            }
            return;
        }

        mypageSupportSubmitInFlight = true;
        setMypageSupportStatus('문의 내용을 보내는 중입니다.');
        updateMypageSupportUi();

        try {
            const response = await fetch('/api/support-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subject,
                    message,
                    senderEmail,
                    senderUid: currentUser && currentUser.uid ? currentUser.uid : '',
                    nickname: currentUserProfile && currentUserProfile.nickname ? currentUserProfile.nickname : ''
                })
            });

            let payload = null;
            try {
                payload = await response.json();
            } catch (error) {
                payload = null;
            }

            if (!response.ok || !payload || payload.returnValue !== 'success') {
                throw new Error(payload && payload.message ? payload.message : '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
            }

            if (mypageSupportFormEl) {
                mypageSupportFormEl.reset();
            }
            setMypageSupportStatus('문의가 접수되었습니다. 확인 후 답변드리겠습니다.', 'success');
            showActionPopup('문의가 접수되었습니다.');
        } catch (error) {
            console.error('문의 전송 실패', error);
            setMypageSupportStatus(
                error && error.message ? String(error.message) : '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
                'error'
            );
        } finally {
            mypageSupportSubmitInFlight = false;
            updateMypageSupportUi();
        }
    }

    function updateAuthUi() {
        const member = isMember();
        const authPending = isAuthStatePending();
        if (member || authPending) {
            closeWelcomeModal({
                keepSessionClosed: false
            });
        } else {
            scheduleWelcomeModal();
        }
        authLogoutButtons.forEach(button => {
            button.disabled = !member;
            button.hidden = !member;
        });
        if (mypageShellFooterEl) {
            mypageShellFooterEl.hidden = !member;
        }
        authEntryLinks.forEach(link => {
            link.hidden = member || authPending;
        });
        if (mypageAuthSectionEl) {
            mypageAuthSectionEl.hidden = member || authPending;
        }
        if (nicknameOpenModalBtn) {
            nicknameOpenModalBtn.hidden = !member;
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
        updateMypageSupportUi();
        updatePremiumMembershipUi();
        loadMypageDrawHistory();
        if (!firebaseAuthStatusEl) {
            return;
        }
        if (!firebaseReady) {
            return;
        }
        if (authPending) {
            firebaseAuthStatusEl.textContent = getAuthPendingStatusMessage();
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
        firebaseAuthStatusEl.textContent = '로그인하면 계정과 사용 기록이 이어집니다.';
    }

    function setFirebaseAuthStatus(message) {
        if (!firebaseAuthStatusEl) {
            return;
        }
        firebaseAuthStatusEl.textContent = message;
    }

    function setAuthButtonsBusy(isBusy) {
        authActionInFlight = isBusy;
        authButtons.forEach(button => {
            button.disabled = isBusy;
            button.setAttribute('aria-busy', isBusy ? 'true' : 'false');
        });
    }

    function shouldPreferGoogleRedirect() {
        const ua = navigator.userAgent || '';
        const isInAppBrowser = /; wv\)|KAKAOTALK|NAVER|Instagram|FBAN|FBAV|Line\//i.test(ua);
        return isInAppBrowser;
    }

    function shouldFallbackGoogleRedirect(error) {
        const code = error && error.code ? error.code : '';
        return code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment';
    }

    function getGoogleAuthErrorMessage(error) {
        const code = error && error.code ? error.code : '';
        switch (code) {
            case 'auth/unauthorized-domain':
                return '현재 접속 주소가 Firebase Authorized domains에 등록되지 않았습니다.';
            case 'auth/operation-not-allowed':
                return 'Firebase Authentication에서 Google 로그인이 비활성화되어 있습니다.';
            case 'auth/popup-blocked':
                return '브라우저가 로그인 팝업을 차단했습니다.';
            case 'auth/popup-closed-by-user':
                return '로그인 창이 닫혀서 진행이 멈췄습니다.';
            case 'auth/operation-not-supported-in-this-environment':
                return '현재 브라우저에서는 팝업 로그인을 지원하지 않습니다.';
            case 'auth/network-request-failed':
                return '네트워크 연결이 불안정해 로그인에 실패했습니다.';
            case 'auth/web-storage-unsupported':
                return '브라우저 저장소를 사용할 수 없어 로그인에 실패했습니다.';
            case 'auth/cancelled-popup-request':
                return '로그인 요청이 겹쳐 취소되었습니다.';
            default:
                return '구글 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.';
        }
    }

    async function handleGoogleRedirectResult() {
        if (!firebaseReady || !firebaseAuth || googleRedirectResultChecked) {
            return;
        }
        googleRedirectResultChecked = true;
        const hadPendingRedirect = hasGoogleRedirectPending();
        try {
            const result = await firebaseAuth.getRedirectResult();
            const redirectUser = (result && result.user) || firebaseAuth.currentUser || null;
            if (!redirectUser) {
                if (hadPendingRedirect) {
                    setGoogleRedirectPendingState(false);
                    updateAuthUi();
                    setFirebaseAuthStatus('구글 로그인 연결을 확인하지 못했습니다. 다시 시도해 주세요.');
                }
                return;
            }
            setGoogleRedirectPendingState(false);
            await syncAuthState(redirectUser);
            updateRulesStatus('구글 가입/로그인 성공');
            setFirebaseAuthStatus('구글 로그인 완료. 계정 정보를 불러오는 중입니다.');
        } catch (error) {
            setGoogleRedirectPendingState(false);
            console.error('구글 리디렉션 로그인 실패', error);
            const message = getGoogleAuthErrorMessage(error);
            updateRulesStatus(`구글 로그인 실패: ${message}`);
            setFirebaseAuthStatus(`${message}${error && error.code ? ` [${error.code}]` : ''}`);
            updateAuthUi();
        }
    }

    const KAKAO_JS_KEY = 'f4b5463bb98ef8f9c92e202558762423';
    let kakaoSdkReady = false;

    function initKakaoSdk() {
        try {
            if (typeof window.Kakao === 'undefined') {
                console.warn('[Auth] Kakao SDK not loaded yet');
                return;
            }
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(KAKAO_JS_KEY);
            }
            kakaoSdkReady = window.Kakao.isInitialized();
            console.log('[Auth] Kakao SDK ready:', kakaoSdkReady);
        } catch (error) {
            console.error('[Auth] Kakao SDK init failed', error);
            kakaoSdkReady = false;
        }
    }

    function kakaoLoginPromise() {
        return new Promise((resolve, reject) => {
            if (!window.Kakao || !window.Kakao.Auth) {
                reject(new Error('Kakao SDK not available'));
                return;
            }
            window.Kakao.Auth.login({
                scope: 'account_email profile_nickname profile_image',
                success: (authObj) => resolve(authObj),
                fail: (err) => reject(err)
            });
        });
    }

    async function signInWithKakao() {
        console.log('[Auth] Kakao sign-in requested');
        if (!firebaseReady || !firebaseAuth) {
            updateRulesStatus('Firebase 설정이 필요합니다.');
            setFirebaseAuthStatus('Firebase 설정 미완료');
            return false;
        }
        if (!kakaoSdkReady) {
            initKakaoSdk();
        }
        if (!kakaoSdkReady) {
            setFirebaseAuthStatus('카카오 SDK를 불러오지 못했습니다. 네트워크를 확인해 주세요.');
            return false;
        }
        if (authActionInFlight) {
            setFirebaseAuthStatus('로그인 요청을 처리 중입니다. 잠시만 기다려 주세요.');
            return false;
        }
        setAuthButtonsBusy(true);
        try {
            await authPersistenceReady;
            setFirebaseAuthStatus('카카오 로그인 창을 여는 중입니다...');
            const authObj = await kakaoLoginPromise();
            const accessToken = authObj && authObj.access_token;
            if (!accessToken) {
                throw new Error('카카오 access_token 없음');
            }
            setFirebaseAuthStatus('카카오 계정을 확인하는 중입니다...');
            const res = await fetch('/auth/kakao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken })
            });
            if (!res.ok) {
                const errText = await res.text().catch(() => '');
                throw new Error(`서버 검증 실패 (${res.status}) ${errText}`);
            }
            const data = await res.json();
            if (!data || !data.customToken) {
                throw new Error('custom token 응답 없음');
            }
            setFirebaseAuthStatus('Firebase 로그인 처리 중...');
            const result = await firebaseAuth.signInWithCustomToken(data.customToken);
            if (result && result.user) {
                try {
                    if (data.displayName && !result.user.displayName) {
                        await result.user.updateProfile({
                            displayName: data.displayName,
                            photoURL: data.photoURL || null
                        });
                    }
                } catch (profileError) {
                    console.warn('[Auth] Kakao profile update skipped', profileError);
                }
                await syncAuthState(result.user);
            }
            updateRulesStatus('카카오 가입/로그인 성공');
            setFirebaseAuthStatus('카카오 로그인 완료. 계정 정보를 불러오는 중입니다.');
            return true;
        } catch (error) {
            console.error('[Auth] Kakao sign-in error', error);
            const message = (error && error.message) || '카카오 로그인에 실패했습니다.';
            updateRulesStatus(`카카오 로그인 실패: ${message}`);
            setFirebaseAuthStatus(message);
            return false;
        } finally {
            setAuthButtonsBusy(false);
        }
    }

    async function signInWithGoogle() {
        console.log('[Auth] Google sign-in requested');
        if (!firebaseReady || !firebaseAuth) {
            console.error('[Auth] Firebase not ready', { firebaseReady, hasAuth: !!firebaseAuth });
            updateRulesStatus('Firebase 설정이 필요합니다. firebase-config.js 값을 먼저 입력하세요.');
            setFirebaseAuthStatus('Firebase 설정 미완료');
            return false;
        }
        if (shouldUseExternalBrowserPrompt()) {
            console.log('[Auth] In-app browser detected, showing prompt');
            openInAppBrowserModal({ force: true });
            updateRulesStatus('카카오톡에서는 외부 브라우저에서 로그인해 주세요.');
            setFirebaseAuthStatus('카카오톡 인앱브라우저에서는 외부 브라우저로 다시 열어야 구글 로그인이 됩니다.');
            return false;
        }
        if (authActionInFlight) {
            console.warn('[Auth] Auth action already in flight');
            setFirebaseAuthStatus('로그인 요청을 처리 중입니다. 잠시만 기다려 주세요.');
            return false;
        }
        const provider = new window.firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        let startedRedirect = false;
        setAuthButtonsBusy(true);
        try {
            console.log('[Auth] Waiting for persistence...');
            await authPersistenceReady;
            if (shouldPreferGoogleRedirect()) {
                console.log('[Auth] Preferring redirect flow');
                updateRulesStatus('구글 로그인 화면으로 이동합니다.');
                setFirebaseAuthStatus('브라우저 환경에 맞춰 구글 로그인 화면으로 이동합니다.');
                setGoogleRedirectPendingState(true);
                await firebaseAuth.signInWithRedirect(provider);
                startedRedirect = true;
                return false;
            }
            console.log('[Auth] Launching popup...');
            const result = await firebaseAuth.signInWithPopup(provider);
            console.log('[Auth] Popup result received', result?.user?.uid);
            if (result && result.user) {
                await syncAuthState(result.user);
            }
            updateRulesStatus('구글 가입/로그인 성공');
            setFirebaseAuthStatus('구글 로그인 완료. 계정 정보를 불러오는 중입니다.');
            return true;
        } catch (error) {
            console.error('[Auth] Google sign-in error', error);
            if (!startedRedirect && shouldFallbackGoogleRedirect(error)) {
                try {
                    console.log('[Auth] Falling back to redirect flow due to popup block');
                    updateRulesStatus('팝업 대신 구글 로그인 화면으로 이동합니다.');
                    setFirebaseAuthStatus('팝업이 어려워 전체 페이지 로그인으로 전환합니다.');
                    setGoogleRedirectPendingState(true);
                    await firebaseAuth.signInWithRedirect(provider);
                    startedRedirect = true;
                    return false;
                } catch (redirectError) {
                    console.error('[Auth] Fallback redirect error', redirectError);
                    setGoogleRedirectPendingState(false);
                    console.error('구글 리디렉션 로그인 전환 실패', redirectError);
                    error = redirectError;
                }
            }
            setGoogleRedirectPendingState(false);
            const message = getGoogleAuthErrorMessage(error);
            updateRulesStatus(`구글 로그인 실패: ${message}`);
            setFirebaseAuthStatus(`${message}${error && error.code ? ` [${error.code}]` : ''}`);
            return false;
        } finally {
            if (!startedRedirect) {
                setAuthButtonsBusy(false);
            }
        }
    }

    async function signOutFirebaseUser() {
        if (!firebaseReady || !firebaseAuth) {
            return;
        }
        try {
            await firebaseAuth.signOut();
            try {
                if (window.Kakao && window.Kakao.Auth && typeof window.Kakao.Auth.getAccessToken === 'function' && window.Kakao.Auth.getAccessToken()) {
                    window.Kakao.Auth.logout(() => {});
                }
            } catch (kakaoLogoutError) {
                console.warn('[Auth] Kakao logout skipped', kakaoLogoutError);
            }
            setGoogleRedirectPendingState(false);
            currentUserProfile = null;
            welcomeModalDismissedInSession = false;
            scheduleWelcomeModal();
            updateRulesStatus('로그아웃되었습니다.');
            showActionPopup('로그아웃되었습니다.');
        } catch (error) {
            console.error('로그아웃 실패', error);
            updateRulesStatus('로그아웃 실패');
            showActionPopup('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
    }

    function showActionConfirm(title, message, okLabel = '확인', cancelLabel = '취소') {
        return new Promise((resolve) => {
            const confirmed = window.confirm(`${title}\n\n${message}`);
            resolve(confirmed);
        });
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

    function normalizeHelpChatQuery(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/[?!.,/\\()[\]{}'"]/g, '');
    }

    function matchesHelpChatQuery(query, keywords = []) {
        return keywords.some(keyword => query.includes(normalizeHelpChatQuery(keyword)));
    }

    function createHelpChatPromptAction(promptKey) {
        const label = HELP_CHAT_PROMPTS[promptKey];
        return label ? { kind: 'ask', label, value: label } : null;
    }

    function buildHelpChatPromptActions(keys = []) {
        return keys
            .map(createHelpChatPromptAction)
            .filter(Boolean);
    }

    function formatHelpChatText(value) {
        return escapeHtml(value).replace(/\n/g, '<br>');
    }

    function scrollHelpChatToBottom() {
        if (!helpChatBodyEl) {
            return;
        }
        window.requestAnimationFrame(() => {
            helpChatBodyEl.scrollTop = helpChatBodyEl.scrollHeight;
        });
    }

    function clampNumber(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function readHelpChatStoredPosition() {
        try {
            const raw = localStorage.getItem(HELP_CHAT_POSITION_KEY);
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw);
            const x = Number(parsed && parsed.x);
            const y = Number(parsed && parsed.y);
            if (!Number.isFinite(x) || !Number.isFinite(y)) {
                localStorage.removeItem(HELP_CHAT_POSITION_KEY);
                return null;
            }
            return {
                x: Math.round(x),
                y: Math.round(y)
            };
        } catch (error) {
            console.warn('도움말 위치 복원 실패', error);
            try {
                localStorage.removeItem(HELP_CHAT_POSITION_KEY);
            } catch {
                // ignore storage cleanup errors
            }
            return null;
        }
    }

    function saveHelpChatStoredPosition(position) {
        if (!position) {
            return;
        }
        try {
            localStorage.setItem(HELP_CHAT_POSITION_KEY, JSON.stringify({
                x: Math.round(position.x),
                y: Math.round(position.y)
            }));
        } catch (error) {
            console.warn('도움말 위치 저장 실패', error);
        }
    }

    function isHelpChatMobileFullWidth() {
        return Boolean(helpChatWidgetEl && helpChatWidgetEl.dataset.open === 'true' && getViewportWidth() <= 640);
    }

    function normalizeHelpChatPosition(position) {
        if (!helpChatWidgetEl || !position) {
            return null;
        }
        const rect = helpChatWidgetEl.getBoundingClientRect();
        const viewportWidth = Math.max(320, Math.round(getViewportWidth()));
        const viewportHeight = Math.max(
            320,
            Math.round((window.visualViewport && window.visualViewport.height) || window.innerHeight || document.documentElement.clientHeight || 0)
        );
        const widgetWidth = Math.max(72, Math.round(rect.width || 0));
        const widgetHeight = Math.max(64, Math.round(rect.height || 0));
        const inset = getViewportWidth() <= 640 ? 8 : 12;
        const minX = inset;
        const minY = 12;
        const maxX = Math.max(minX, viewportWidth - widgetWidth - inset);
        const maxY = Math.max(minY, viewportHeight - widgetHeight - inset);
        return {
            x: Math.round(clampNumber(Number(position.x) || 0, minX, maxX)),
            y: Math.round(clampNumber(Number(position.y) || 0, minY, maxY))
        };
    }

    function applyHelpChatCustomPosition() {
        if (!helpChatWidgetEl) {
            return;
        }
        if (!helpChatCustomPosition || isHelpChatMobileFullWidth()) {
            helpChatWidgetEl.classList.remove('is-user-positioned');
            helpChatWidgetEl.style.removeProperty('--help-chat-left');
            helpChatWidgetEl.style.removeProperty('--help-chat-top');
            return;
        }
        const normalized = normalizeHelpChatPosition(helpChatCustomPosition);
        if (!normalized) {
            return;
        }
        helpChatCustomPosition = normalized;
        helpChatWidgetEl.classList.add('is-user-positioned');
        helpChatWidgetEl.style.setProperty('--help-chat-left', `${normalized.x}px`);
        helpChatWidgetEl.style.setProperty('--help-chat-top', `${normalized.y}px`);
    }

    function startHelpChatDrag(event) {
        if (!helpChatWidgetEl || !event.isPrimary) {
            return;
        }
        if (typeof event.button === 'number' && event.button !== 0) {
            return;
        }
        if (isHelpChatMobileFullWidth()) {
            return;
        }
        const target = event.target instanceof Element ? event.target : null;
        const currentTarget = event.currentTarget instanceof Element ? event.currentTarget : null;
        const blockedTarget = target ? target.closest('button, input, textarea, a, .help-chat-form, .help-chat-action') : null;
        if (blockedTarget && blockedTarget !== currentTarget) {
            return;
        }
        const rect = helpChatWidgetEl.getBoundingClientRect();
        helpChatDragState = {
            pointerId: event.pointerId,
            pointerStartX: event.clientX,
            pointerStartY: event.clientY,
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            moved: false
        };
        helpChatCustomPosition = {
            x: rect.left,
            y: rect.top
        };
        helpChatWidgetEl.classList.add('is-dragging');
        if (event.currentTarget && typeof event.currentTarget.setPointerCapture === 'function') {
            event.currentTarget.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
    }

    function updateHelpChatDrag(event) {
        if (!helpChatDragState || event.pointerId !== helpChatDragState.pointerId) {
            return;
        }
        const nextPosition = normalizeHelpChatPosition({
            x: event.clientX - helpChatDragState.offsetX,
            y: event.clientY - helpChatDragState.offsetY
        });
        if (!nextPosition) {
            return;
        }
        helpChatDragState.moved = helpChatDragState.moved
            || Math.abs(event.clientX - helpChatDragState.pointerStartX) > 6
            || Math.abs(event.clientY - helpChatDragState.pointerStartY) > 6;
        helpChatCustomPosition = nextPosition;
        applyHelpChatCustomPosition();
        event.preventDefault();
    }

    function endHelpChatDrag(event) {
        if (!helpChatDragState || event.pointerId !== helpChatDragState.pointerId) {
            return;
        }
        const moved = helpChatDragState.moved;
        helpChatDragState = null;
        if (helpChatWidgetEl) {
            helpChatWidgetEl.classList.remove('is-dragging');
        }
        if (moved) {
            helpChatSuppressFabClickUntil = Date.now() + 320;
            if (helpChatCustomPosition) {
                saveHelpChatStoredPosition(helpChatCustomPosition);
            }
        }
        event.preventDefault();
    }

    function syncHelpChatViewportLayout() {
        if (!helpChatWidgetEl) {
            return;
        }
        const viewportWidth = getViewportWidth();
        const isMobile = viewportWidth <= 640;
        const visualViewport = window.visualViewport;
        const viewportHeight = Math.max(
            320,
            Math.round((visualViewport && visualViewport.height) || window.innerHeight || document.documentElement.clientHeight || 0)
        );
        const rawBottomInset = visualViewport
            ? Math.max(0, Math.round(window.innerHeight - (visualViewport.height + visualViewport.offsetTop)))
            : 0;
        const inputFocused = document.activeElement === helpChatInputEl;
        const keyboardOpen = Boolean(isMobile && inputFocused && rawBottomInset > 120);

        helpChatWidgetEl.style.setProperty('--help-chat-viewport-height', `${viewportHeight}px`);
        helpChatWidgetEl.style.setProperty('--help-chat-keyboard-offset', isMobile && keyboardOpen ? `${rawBottomInset}px` : '0px');
        helpChatWidgetEl.classList.toggle('is-keyboard-open', keyboardOpen);
        applyHelpChatCustomPosition();

        if (keyboardOpen && helpChatWidgetEl.dataset.open === 'true') {
            scrollHelpChatToBottom();
        }
    }

    function createHelpChatTypingDots() {
        const wrapper = document.createElement('span');
        wrapper.className = 'help-chat-typing';
        for (let index = 0; index < 3; index += 1) {
            wrapper.appendChild(document.createElement('span'));
        }
        return wrapper;
    }

    function createHelpChatMessageElement(options = {}) {
        const {
            sender = 'assistant',
            text = '',
            actions = [],
            typing = false
        } = options;
        const message = document.createElement('article');
        message.className = `help-chat-message is-${sender === 'user' ? 'user' : 'assistant'}`;

        if (sender === 'assistant') {
            const avatar = document.createElement('span');
            avatar.className = 'help-chat-avatar';
            avatar.setAttribute('aria-hidden', 'true');
            avatar.textContent = '로';
            message.appendChild(avatar);
        }

        const main = document.createElement('div');
        main.className = 'help-chat-message-main';

        if (sender === 'assistant') {
            const name = document.createElement('span');
            name.className = 'help-chat-name';
            name.textContent = '로또 도우미';
            main.appendChild(name);
        }

        const bubble = document.createElement('div');
        bubble.className = 'help-chat-bubble';
        if (typing) {
            bubble.appendChild(createHelpChatTypingDots());
        } else {
            bubble.innerHTML = formatHelpChatText(text);
        }
        main.appendChild(bubble);

        if (Array.isArray(actions) && actions.length) {
            const actionRow = document.createElement('div');
            actionRow.className = 'help-chat-actions';
            actions.forEach(action => {
                if (!action || !action.kind || !action.label) {
                    return;
                }
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'help-chat-action';
                button.textContent = String(action.label);
                button.dataset.actionKind = String(action.kind);
                if (action.value != null) {
                    button.dataset.actionValue = String(action.value);
                }
                if (action.toast) {
                    button.dataset.actionToast = String(action.toast);
                }
                actionRow.appendChild(button);
            });
            if (actionRow.childElementCount) {
                main.appendChild(actionRow);
            }
        }

        message.appendChild(main);
        return message;
    }

    function appendHelpChatMessage(options = {}) {
        if (!helpChatBodyEl) {
            return null;
        }
        const element = createHelpChatMessageElement(options);
        helpChatBodyEl.appendChild(element);
        scrollHelpChatToBottom();
        return element;
    }

    function setHelpChatTyping(active) {
        if (!helpChatBodyEl) {
            return;
        }
        if (!active) {
            if (helpChatTypingMessageEl && helpChatTypingMessageEl.parentNode) {
                helpChatTypingMessageEl.parentNode.removeChild(helpChatTypingMessageEl);
            }
            helpChatTypingMessageEl = null;
            return;
        }
        if (helpChatTypingMessageEl) {
            return;
        }
        helpChatTypingMessageEl = appendHelpChatMessage({
            sender: 'assistant',
            typing: true
        });
    }

    function syncHelpChatComposerState() {
        if (!helpChatSendBtn || !helpChatInputEl) {
            return;
        }
        helpChatSendBtn.disabled = !String(helpChatInputEl.value || '').trim();
    }

    function seedHelpChatConversation() {
        if (helpChatInitialized) {
            return;
        }
        appendHelpChatMessage({
            sender: 'assistant',
            text: '안녕하세요. 로또픽스튜디오 도우미예요.\n앱이 어떤 기능을 하는지, 번호를 어떻게 만들면 되는지, 로그인이나 플랜은 어떻게 쓰는지 바로 안내해 드릴게요.',
            actions: buildHelpChatPromptActions(['app', 'draw', 'filters', 'login', 'plan'])
        });
        helpChatInitialized = true;
        syncHelpChatComposerState();
    }

    function setHelpChatOpen(nextOpen) {
        if (!helpChatWidgetEl || !helpChatPanelEl || !helpChatFabEl) {
            return;
        }
        const isOpen = Boolean(nextOpen);
        helpChatWidgetEl.dataset.open = String(isOpen);
        helpChatPanelEl.hidden = !isOpen;
        helpChatFabEl.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen && document.activeElement === helpChatInputEl) {
            helpChatInputEl.blur();
        }
        syncHelpChatViewportLayout();
        if (isOpen) {
            seedHelpChatConversation();
            syncHelpChatComposerState();
            scrollHelpChatToBottom();
            if (helpChatInputEl) {
                window.requestAnimationFrame(() => {
                    helpChatInputEl.focus();
                    syncHelpChatViewportLayout();
                });
            }
        }
    }

    function maybeFoldHelpChatForMobile() {
        if (getViewportWidth() <= 640) {
            setHelpChatOpen(false);
        }
    }

    function buildHelpChatResponse(question) {
        const compact = normalizeHelpChatQuery(question);
        const askActions = (...keys) => buildHelpChatPromptActions(keys);
        if (!compact || matchesHelpChatQuery(compact, ['안녕', '반가워', 'hello', 'hi'])) {
            return {
                text: '반가워요. 궁금한 항목을 바로 눌러도 되고, 자유롭게 질문해도 괜찮아요.',
                actions: askActions('app', 'draw', 'filters', 'login', 'plan')
            };
        }
        if (
            matchesHelpChatQuery(compact, ['이앱이뭐야', '앱이뭐야', '어떤앱', '앱소개', '서비스소개', '무슨앱'])
            || (matchesHelpChatQuery(compact, ['앱', '서비스']) && matchesHelpChatQuery(compact, ['뭐', '소개', '설명']))
        ) {
            return {
                text: '로또픽스튜디오는 회차 정보와 당첨 흐름을 보면서, 추첨 탭에서 제외할 패턴을 고른 뒤 번호를 생성하는 앱입니다.\n대시보드로 흐름을 보고, 추첨 탭에서 직접 생성하거나 추천 플랜으로 엄선 세트를 확인할 수 있어요.',
                actions: [
                    { kind: 'tab', label: '대시보드 보기', value: 'dashboard', toast: '대시보드 탭으로 이동했습니다.' },
                    { kind: 'tab', label: '추첨 탭 열기', value: 'draw', toast: '추첨 탭으로 이동했습니다.' },
                    { kind: 'premium', label: '플랜 보기', value: 'compare' }
                ]
            };
        }
        if (
            matchesHelpChatQuery(compact, ['번호생성', '번호만들', '생성방법', '추첨방법', '번호어떻게', '세트생성'])
            || (matchesHelpChatQuery(compact, ['번호', '추첨', '생성']) && matchesHelpChatQuery(compact, ['어떻게', '방법', '순서']))
        ) {
            return {
                text: '추첨 탭에서 원하는 필터를 고르고 세트 수를 정한 뒤 번호 생성을 누르면 됩니다.\n생성된 세트 아래에는 어떤 기준을 반영했는지 짧은 설명도 같이 보여서 결과를 바로 읽을 수 있어요.',
                actions: [
                    { kind: 'tab', label: '추첨 탭 열기', value: 'draw', toast: '추첨 탭으로 이동했습니다.' },
                    createHelpChatPromptAction('filters'),
                    createHelpChatPromptAction('plan')
                ].filter(Boolean)
            };
        }
        if (
            matchesHelpChatQuery(compact, ['번호왜', '생성이유', '조합이유', '근거', '왜이렇게나왔', '설명'])
            && matchesHelpChatQuery(compact, ['번호', '조합', '세트', '생성'])
        ) {
            return {
                text: '이제 생성 결과 카드 아래에 선택한 필터 요약과 홀짝 비율, 합계가 같이 보입니다.\n그래서 각 세트가 어떤 기준을 통과해 나온 번호인지 빠르게 읽을 수 있어요.',
                actions: [
                    { kind: 'tab', label: '생성 결과 보러 가기', value: 'draw', toast: '추첨 탭으로 이동했습니다.' },
                    createHelpChatPromptAction('filters')
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['필터', '규칙', '제외', '확률', '후보', '라이브러리'])) {
            return {
                text: '필터는 당첨을 보장하는 기능이 아니라, 원치 않는 패턴을 덜어내서 후보군을 정리하는 기능입니다.\n상단과 하단 요약에서 남은 후보 수와 등수별 확률 변화도 같이 볼 수 있어서, 얼마나 좁혀졌는지 바로 확인할 수 있어요.',
                actions: [
                    { kind: 'tab', label: '규칙 라이브러리 보기', value: 'draw', toast: '추첨 탭으로 이동했습니다.' },
                    createHelpChatPromptAction('draw'),
                    createHelpChatPromptAction('plan')
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['로그인', '구글', '계정', '회원가입', '회원'])) {
            return {
                text: '로그인하면 저장한 기준, 생성 기록, 추천 플랜 흐름을 그대로 이어서 쓸 수 있습니다.\n카카오톡 안에서는 구글 로그인이 막힐 수 있어서 외부 브라우저로 다시 열기 안내가 먼저 뜰 수 있어요.',
                actions: [
                    { kind: 'auth', label: '로그인하기', value: 'google' },
                    { kind: 'tab', label: '마이페이지 보기', value: 'mypage', toast: '마이페이지로 이동했습니다.' },
                    createHelpChatPromptAction('plan')
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['카카오', '인앱', '액세스차단', '외부브라우저', '로그인안돼'])) {
            return {
                text: isKakaoTalkInAppBrowser()
                    ? '지금은 카카오톡 안에서 열려 있어서 구글 로그인 전에 외부 브라우저로 다시 열어야 합니다.\n로그인하기를 누르면 외부 브라우저 안내로 바로 이어집니다.'
                    : '카카오톡 인앱브라우저에서는 Google 정책 때문에 로그인이 막힐 수 있습니다.\n카카오톡에서 열렸다면 외부 브라우저로 다시 연 뒤 로그인하는 게 가장 안전합니다.',
                actions: [
                    { kind: 'auth', label: '로그인 안내 열기', value: 'google' },
                    createHelpChatPromptAction('login')
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['플랜', '유료', '추천플랜', 'gold', 'platinum', 'master', '결제', '구매'])) {
            return {
                text: 'FREE는 하루 5조합, GOLD는 하루 15조합과 추천 5조합, PLATINUM은 하루 30조합과 주간 추천 15조합, MASTER는 무제한과 주간 추천 30조합입니다.\n유료 플랜은 첫 달 0원이고 2개월차부터 이벤트가로 자동결제됩니다.',
                actions: [
                    { kind: 'premium', label: '추천 플랜 보기', value: 'compare' },
                    { kind: 'tab', label: '마이페이지 플랜 보기', value: 'mypage', toast: '마이페이지로 이동했습니다.' },
                    createHelpChatPromptAction('draw')
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['마이페이지', '기록', '이력', '저장한기준', '저장'])) {
            return {
                text: '마이페이지는 계정, 플랜, 저장 기준만 짧게 정리한 화면입니다.\n복잡한 기록은 보관함에서 바로 확인하도록 분리했습니다.',
                actions: [
                    { kind: 'tab', label: '마이페이지 열기', value: 'mypage', toast: '마이페이지로 이동했습니다.' },
                    createHelpChatPromptAction('locker'),
                    createHelpChatPromptAction('login')
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['대시보드', '직전회차', '당첨번호', '보너스번호', '흐름'])) {
            return {
                text: '대시보드는 직전 회차 당첨번호, 보너스번호, 예상 흐름, 생성 기록 집계를 한 번에 보는 화면입니다.\n최근 당첨 흐름을 먼저 보고 추첨 탭으로 넘어가고 싶을 때 가장 편한 시작점이에요.',
                actions: [
                    { kind: 'tab', label: '대시보드 열기', value: 'dashboard', toast: '대시보드 탭으로 이동했습니다.' },
                    createHelpChatPromptAction('draw')
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['qr', '큐알', '분석', '회차흐름', '최근회차', '비교'])) {
            return {
                text: '초기 버전에서는 분석 탭을 숨기고 대시보드와 보관함 중심으로 구성했습니다.\n회차 흐름은 대시보드에서 보고, 생성한 번호는 보관함에서 다시 확인하면 됩니다.',
                actions: [
                    { kind: 'tab', label: '대시보드 열기', value: 'dashboard', toast: '대시보드 탭으로 이동했습니다.' },
                    { kind: 'tab', label: '보관함 열기', value: 'store', toast: '보관함 탭으로 이동했습니다.' }
                ].filter(Boolean)
            };
        }
        if (matchesHelpChatQuery(compact, ['스토어', '보관함', '저장슬롯', '복권방', '구매처', '공식구매', '어디서사'])) {
            return {
                text: '보관함 탭에서는 생성한 번호가 카드로 쌓이고, 각 카드에서 바로 복사할 수 있습니다.\n최근 회차와 세트 수도 함께 보여서 어떤 번호를 만들었는지 한눈에 확인할 수 있습니다.',
                actions: [
                    { kind: 'tab', label: '보관함 열기', value: 'store', toast: '보관함 탭으로 이동했습니다.' },
                    { kind: 'tab', label: '추첨 탭 열기', value: 'draw', toast: '추첨 탭으로 이동했습니다.' }
                ].filter(Boolean)
            };
        }
        return {
            text: '이 질문은 이렇게 많이 물어보세요.\n앱 소개, 번호 생성, 필터 활용, 보관함, 로그인, 추천 플랜 중 하나를 누르면 바로 이어서 안내해 드릴게요.',
            actions: buildHelpChatPromptActions(['app', 'draw', 'filters', 'locker', 'login', 'plan'])
        };
    }

    function submitHelpChatQuestion(value) {
        const question = String(value || '').trim();
        if (!question) {
            syncHelpChatComposerState();
            return false;
        }
        setHelpChatOpen(true);
        appendHelpChatMessage({
            sender: 'user',
            text: question
        });
        if (helpChatInputEl) {
            helpChatInputEl.value = '';
        }
        syncHelpChatComposerState();
        setHelpChatTyping(true);
        if (helpChatReplyTimer) {
            window.clearTimeout(helpChatReplyTimer);
        }
        helpChatReplyTimer = window.setTimeout(() => {
            helpChatReplyTimer = 0;
            setHelpChatTyping(false);
            const response = buildHelpChatResponse(question);
            appendHelpChatMessage({
                sender: 'assistant',
                text: response.text,
                actions: response.actions
            });
        }, 260);
        return true;
    }

    function handleHelpChatAction(button) {
        if (!button) {
            return;
        }
        const kind = String(button.dataset.actionKind || '').trim();
        const value = String(button.dataset.actionValue || '').trim();
        const toast = String(button.dataset.actionToast || '').trim();
        if (kind === 'ask') {
            submitHelpChatQuestion(value);
            return;
        }
        if (kind === 'tab' && value) {
            setActiveTab(value, true);
            if (toast) {
                showActionPopup(toast);
            }
            maybeFoldHelpChatForMobile();
            return;
        }
        if (kind === 'premium') {
            openPremiumPlanWorkspace({
                focusResults: isPremiumMember()
            });
            showActionPopup(isPremiumMember() ? '추천번호 영역으로 이동했습니다.' : '추천 플랜 비교 영역으로 이동했습니다.');
            maybeFoldHelpChatForMobile();
            return;
        }
        if (kind === 'auth') {
            setHelpChatOpen(false);
            openAuthModal();
            return;
        }
    }

    function initializeHelpChat() {
        if (!helpChatWidgetEl || !helpChatPanelEl || !helpChatFabEl || !helpChatBodyEl || !helpChatFormEl || !helpChatInputEl) {
            return;
        }
        if (helpChatWidgetEl.dataset.bound === 'true') {
            return;
        }
        helpChatWidgetEl.dataset.bound = 'true';
        helpChatCustomPosition = readHelpChatStoredPosition();
        syncHelpChatComposerState();
        syncHelpChatViewportLayout();

        helpChatFabEl.addEventListener('click', event => {
            if (Date.now() < helpChatSuppressFabClickUntil) {
                event.preventDefault();
                return;
            }
            const isOpen = helpChatWidgetEl.dataset.open === 'true';
            setHelpChatOpen(!isOpen);
        });

        helpChatFabEl.addEventListener('pointerdown', startHelpChatDrag);
        if (helpChatHeaderEl) {
            helpChatHeaderEl.addEventListener('pointerdown', startHelpChatDrag);
        }

        if (helpChatCloseBtn) {
            helpChatCloseBtn.addEventListener('click', () => {
                setHelpChatOpen(false);
            });
        }

        helpChatFormEl.addEventListener('submit', event => {
            event.preventDefault();
            submitHelpChatQuestion(helpChatInputEl.value);
        });

        helpChatInputEl.addEventListener('input', () => {
            syncHelpChatComposerState();
        });

        helpChatInputEl.addEventListener('focus', () => {
            syncHelpChatViewportLayout();
            window.setTimeout(syncHelpChatViewportLayout, 120);
            window.setTimeout(scrollHelpChatToBottom, 180);
        });

        helpChatInputEl.addEventListener('blur', () => {
            window.setTimeout(syncHelpChatViewportLayout, 120);
        });

        helpChatInputEl.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setHelpChatOpen(false);
            }
        });

        helpChatBodyEl.addEventListener('click', event => {
            const button = event.target instanceof Element ? event.target.closest('.help-chat-action') : null;
            if (!button) {
                return;
            }
            handleHelpChatAction(button);
        });

        if (window.visualViewport && typeof window.visualViewport.addEventListener === 'function') {
            window.visualViewport.addEventListener('resize', syncHelpChatViewportLayout, { passive: true });
            window.visualViewport.addEventListener('scroll', syncHelpChatViewportLayout, { passive: true });
        }

        window.addEventListener('resize', syncHelpChatViewportLayout, { passive: true });
        window.addEventListener('pointermove', updateHelpChatDrag, { passive: false });
        window.addEventListener('pointerup', endHelpChatDrag);
        window.addEventListener('pointercancel', endHelpChatDrag);
        window.addEventListener('orientationchange', () => {
            window.setTimeout(syncHelpChatViewportLayout, 140);
        }, { passive: true });
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
            const membershipState = getMembershipStatePayload(getMembershipState());
            const initialProfile = {
                uid: currentUser.uid,
                email: currentUser.email || '',
                nickname,
                ...membershipState,
                createdAt: serverNow,
                updatedAt: serverNow,
                nicknameUpdatedAt: serverNow,
                nicknameChangeMonth: nowMonthKey,
                nicknameChangeCount: 0
            };
            await profileRef.set(initialProfile);
            currentUserProfile = initialProfile;
            persistLocalMembershipState(initialProfile);
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

        const resolvedMembership = getMembershipStatePayload(resolveMembershipState(profile));
        Object.entries(resolvedMembership).forEach(([key, value]) => {
            const currentValue = key.includes('At')
                ? (serializeMembershipDate(profile[key]) || '')
                : String(profile[key] || '');
            const nextValue = String(value || '');
            if (currentValue !== nextValue) {
                updates[key] = value;
            }
        });

        if (Object.keys(updates).length) {
            updates.updatedAt = serverNow;
            await profileRef.update(updates);
        }
        currentUserProfile = { ...profile, ...updates };
        persistLocalMembershipState(currentUserProfile);
    }

    function renderNicknameUi() {

        const member = isMember();
        const authPending = isAuthStatePending();
        const nicknameText = authPending
            ? '로그인 상태 확인 중...'
            : !member
            ? '첫 로그인 후 자동으로 정해져요'
            : currentUserProfile && currentUserProfile.nickname
            ? currentUserProfile.nickname
            : '닉네임 불러오는 중...';
        const profileTitleText = authPending
            ? '확인 중'
            : !member
            ? '계정'
            : currentUserProfile && currentUserProfile.nickname
            ? currentUserProfile.nickname
            : '닉네임 확인 중';

        if (mypageAuthBadgeEl) {
            mypageAuthBadgeEl.textContent = authPending ? '확인 중' : (member ? '로그인 완료' : '비회원');
        }
        if (mypageProfileTitleEl) {
            mypageProfileTitleEl.textContent = profileTitleText;
        }
        if (mypageNicknameDisplayEl) {
            mypageNicknameDisplayEl.textContent = nicknameText;
        }
        const remaining = getNicknameRemainingChanges();
        if (nicknameStatusEl && authPending) {
            nicknameStatusEl.textContent = '저장된 계정을 확인하고 있습니다.';
        } else if (nicknameStatusEl && !member) {
            nicknameStatusEl.textContent = '로그인하면 닉네임이 자동 생성되고 이후 월 2번까지 변경할 수 있어요.';
        } else if (nicknameStatusEl && member) {
            nicknameStatusEl.textContent = `이번 달 닉네임 변경 가능 횟수 ${remaining}회 남음`;
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
        if (isAuthStatePending()) {
            if (guestLimitEl) {
                guestLimitEl.textContent = '상태 확인 중';
            }
            if (guestBannerEl) {
                guestBannerEl.textContent = '확인 중';
            }
            return false;
        }
        const snapshot = getGenerationLimitSnapshot();
        if (!Number.isFinite(snapshot.limit)) {
            if (guestLimitEl) {
                guestLimitEl.textContent = `${snapshot.plan.label} 무제한`;
            }
            if (guestBannerEl) {
                guestBannerEl.textContent = `${snapshot.plan.label} 무제한`;
            }
            return true;
        }

        if (guestLimitEl) {
            guestLimitEl.textContent = snapshot.remaining > 0
                ? `${snapshot.plan.label} 오늘 ${snapshot.remaining}조합 남음`
                : `${snapshot.plan.label} 오늘 한도 도달`;
        }
        if (guestBannerEl) {
            guestBannerEl.textContent = `${snapshot.plan.label} ${snapshot.limit}조합/일`;
        }

        return snapshot.allowed;
    }

    function incrementGuestCount(amount = 1) {
        const plan = getGenerationAccessPlanMeta();
        const limit = getMembershipDailyGenerationLimit(plan.id);
        if (!Number.isFinite(limit)) {
            if (guestLimitEl) {
                guestLimitEl.textContent = `${plan.label} 무제한`;
            }
            if (guestBannerEl) {
                guestBannerEl.textContent = `${plan.label} 무제한`;
            }
            return;
        }

        const countKey = getDailyGenerationUsageKey();
        const current = getDailyGenerationUsageCount();
        const next = current + Math.max(1, Number(amount) || 1);
        localStorage.setItem(countKey, String(next));

        if (guestLimitEl) {
            guestLimitEl.textContent = `${plan.label} 오늘 ${Math.max(0, limit - next)}조합 남음`;
        }
        if (guestBannerEl) {
            guestBannerEl.textContent = `${plan.label} ${limit}조합/일`;
        }
    }

    function openAuthModal() {
        if (!authModal) {
            return;
        }
        if (isAuthStatePending()) {
            setFirebaseAuthStatus(getAuthPendingStatusMessage());
            return;
        }
        if (shouldUseExternalBrowserPrompt()) {
            openInAppBrowserModal({ force: true });
            return;
        }
        closeWelcomeModal();
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

    function getViewportHeight() {
        const visualHeight = Number(window.visualViewport && window.visualViewport.height);
        if (Number.isFinite(visualHeight) && visualHeight > 0) {
            return visualHeight;
        }
        const innerHeight = Number(window.innerHeight);
        if (Number.isFinite(innerHeight) && innerHeight > 0) {
            return innerHeight;
        }
        return Number(document.documentElement && document.documentElement.clientHeight) || 0;
    }

    function syncWelcomeModalViewportLayout() {
        if (!welcomeModal) {
            return;
        }
        const viewportWidth = Math.max(320, Math.round(getViewportWidth()));
        const viewportHeight = Math.max(480, Math.round(getViewportHeight()));
        welcomeModal.style.setProperty('--welcome-modal-viewport-width', `${viewportWidth}px`);
        welcomeModal.style.setProperty('--welcome-modal-viewport-height', `${viewportHeight}px`);
    }

    function syncDrawViewportLayout(forcedViewportWidth) {
        if (!drawTabPanel) {
            return;
        }
        const viewportWidth = Number.isFinite(forcedViewportWidth) && forcedViewportWidth > 0
            ? forcedViewportWidth
            : Math.floor(getViewportWidth());
        const viewportHeight = Math.max(320, Math.round(getViewportHeight()));
        const headerHeight = siteHeaderEl ? Math.ceil(siteHeaderEl.getBoundingClientRect().height || 0) : 0;
        const bottomTabHeight = viewportWidth <= 768 && bottomTabBarEl
            ? Math.ceil(bottomTabBarEl.getBoundingClientRect().height || 0)
            : 0;

        drawTabPanel.style.setProperty('--draw-tab-viewport-height', `${viewportHeight}px`);
        drawTabPanel.style.setProperty('--site-header-height', `${headerHeight}px`);
        drawTabPanel.style.setProperty('--draw-tab-bottom-offset', `${bottomTabHeight}px`);
    }

    function scheduleDrawHorizontalWidthSync() {
        if (drawWidthSyncRafId) {
            window.cancelAnimationFrame(drawWidthSyncRafId);
        }
        drawWidthSyncRafId = window.requestAnimationFrame(() => {
            drawWidthSyncRafId = 0;
            const viewportWidth = Math.floor(getViewportWidth());
            syncDrawViewportLayout(viewportWidth);
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
        const hasResultUi = Boolean(
            weeklyLatestRoundEl ||
            weeklyThisRoundEl ||
            weeklyExpectedAmountEl ||
            weeklyLatestNumbers.some(Boolean) ||
            dashLatestRoundEl ||
            dashThisRoundEl ||
            dashExpectedAmountEl ||
            dashLatestNumbers.some(Boolean)
        );
        if (!hasResultUi) {
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
        if (!weeklyCountdownEl && !weeklyCountdownDaysEl && !analysisCountdownEl && !dashCountdownDaysEl && !dashRibbonCountdownDaysEl) {
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
        if (analysisCountdownEl) {
            analysisCountdownEl.textContent = `${days}일 ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
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
        if (dashRibbonCountdownDaysEl) {
            dashRibbonCountdownDaysEl.textContent = String(days);
        }
        if (dashRibbonCountdownHoursEl) {
            dashRibbonCountdownHoursEl.textContent = pad(hours);
        }
        if (dashRibbonCountdownMinutesEl) {
            dashRibbonCountdownMinutesEl.textContent = pad(minutes);
        }
        if (dashRibbonCountdownSecondsEl) {
            dashRibbonCountdownSecondsEl.textContent = pad(seconds);
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

    function buildDashboardExpectedRankData(firstAmount) {
        const averageFirstWinners = 11;
        const averageSecondWinners = 85;
        const averageThirdWinners = 3355;
        const normalizedFirstAmount = normalizeAmount(firstAmount);
        const firstPoolEstimate = normalizedFirstAmount == null ? null : normalizedFirstAmount * averageFirstWinners;
        const sharedPoolEstimate = firstPoolEstimate == null ? null : firstPoolEstimate / 6;
        const secondAmount = sharedPoolEstimate == null ? null : sharedPoolEstimate / averageSecondWinners;
        const thirdAmount = sharedPoolEstimate == null ? null : sharedPoolEstimate / averageThirdWinners;

        return [
            {
                amount: normalizedFirstAmount,
                meta: firstPoolEstimate == null
                    ? '평균 11명 기준 공식 예상 1인당 금액'
                    : `평균 11명 · 총 ${formatKrwCompact(firstPoolEstimate)} 배분 예상`
            },
            {
                amount: secondAmount,
                meta: sharedPoolEstimate == null
                    ? '평균 85명 기준 1인당 추산'
                    : `평균 85명 · 총 ${formatKrwCompact(sharedPoolEstimate)} 배분 예상`
            },
            {
                amount: thirdAmount,
                meta: sharedPoolEstimate == null
                    ? '평균 3,355명 기준 1인당 추산'
                    : `평균 3,355명 · 총 ${formatKrwCompact(sharedPoolEstimate)} 배분 예상`
            },
            {
                amount: 50000,
                meta: '4개 번호 일치 · 고정 지급'
            },
            {
                amount: 5000,
                meta: '3개 번호 일치 · 고정 지급'
            }
        ];
    }

    function renderDashboardExpectedRanks(firstAmount) {
        if (!dashExpectedRankEls.length) {
            return;
        }
        const entries = buildDashboardExpectedRankData(firstAmount);
        dashExpectedRankEls.forEach((el, index) => {
            if (!el) {
                return;
            }
            const value = entries[index]?.amount;
            el.textContent = value == null ? '-' : formatKrwCompact(value);
        });
        dashExpectedRankMetaEls.forEach((el, index) => {
            if (!el) {
                return;
            }
            el.textContent = entries[index]?.meta || '';
        });
    }

    async function readJsonResponse(response, contextLabel = 'response') {
        const rawText = await response.text();
        const trimmed = String(rawText || '').trim();
        if (!trimmed) {
            throw new Error(`${contextLabel} returned empty body`);
        }
        const contentType = String(response.headers.get('content-type') || '').toLowerCase();
        if (!contentType.includes('json') && trimmed.startsWith('<')) {
            throw new Error(`${contextLabel} returned html`);
        }
        try {
            return JSON.parse(trimmed);
        } catch (error) {
            throw new Error(`${contextLabel} returned invalid json`);
        }
    }

    function getEmbeddedDrawFallback(round, { exact = false } = {}) {
        const targetRound = Number(round);
        if (!Number.isInteger(targetRound) || targetRound <= 0) {
            return null;
        }
        const knownRounds = Object.keys(EMBEDDED_DRAW_FALLBACKS)
            .map(Number)
            .sort((a, b) => b - a);
        const matchedRound = exact
            ? (EMBEDDED_DRAW_FALLBACKS[targetRound] ? targetRound : null)
            : knownRounds.find(value => value <= targetRound);
        if (!matchedRound) {
            return null;
        }
        return annotateDrawDataSource({ ...EMBEDDED_DRAW_FALLBACKS[matchedRound] }, 'embedded-fallback');
    }

    function getEmbeddedRecentDraws() {
        return Object.values(EMBEDDED_DRAW_FALLBACKS)
            .map(item => annotateDrawDataSource({ ...item }, 'embedded-fallback'))
            .sort((a, b) => Number(b.drwNo) - Number(a.drwNo));
    }

    function formatCompactKstDate(value) {
        if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
            return '';
        }
        const year = String(value.getFullYear());
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }

    function buildLocalIntroFallback() {
        const estimatedLatestRound = estimateLatestRound();
        const embeddedLatest = getEmbeddedDrawFallback(Number.MAX_SAFE_INTEGER);
        const baselineRound = Math.max(
            estimatedLatestRound,
            Number(currentWeeklyData?.drwNo || 0),
            Number(embeddedLatest?.drwNo || 0)
        );
        const nextRound = Math.max(1, baselineRound + 1);
        const nextDraw = getNextSaturdayDrawTime(getKstNow());
        return {
            expected: null,
            current: {
                ltEpsd: nextRound,
                ltRflYmd: formatCompactKstDate(nextDraw),
                ltRflHh: nextDraw.getHours(),
                ltRflMm: nextDraw.getMinutes()
            }
        };
    }

    async function fetchIntroMirrorResult(path) {
        const targetUrl = `https://www.dhlottery.co.kr${path}`;
        const proxyUrl = `/mirror/proxy?url=${encodeURIComponent(targetUrl)}`;
        const response = await fetch(proxyUrl, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`mirror response ${response.status}`);
        }
        const payload = await readJsonResponse(response, 'intro mirror');
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
                const payload = await readJsonResponse(response, 'intro api');
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

        if (!current) {
            const localFallback = buildLocalIntroFallback();
            expected = expected || localFallback.expected;
            current = localFallback.current;
        }

        const expectedAmount = normalizeAmount(expected?.rnk1ExpcAmt);
        if (expectedAmount != null) {
            weeklyExpectedOverride = expectedAmount;
            weeklyExpectedUpdatedAt = Date.now();
            applyWeeklyExpectedAmount(weeklyExpectedOverride, '공식 예상');
        } else if (weeklyExpectedOverride == null) {
            applyWeeklyExpectedAmount(null, '공식 연결 지연');
        }
        const amountToDisplay = expectedAmount != null ? expectedAmount : weeklyExpectedOverride;
        renderDashboardExpectedRanks(amountToDisplay);
        if (current?.ltEpsd && weeklyThisRoundEl) {
            weeklyThisRoundEl.textContent = `${current.ltEpsd}회`;
        }
        if (current?.ltEpsd && dashThisRoundEl) {
            dashThisRoundEl.textContent = `${current.ltEpsd}회`;
        }
        if (current?.ltEpsd && dashRibbonRoundEl) {
            dashRibbonRoundEl.textContent = `${current.ltEpsd}회`;
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
        updateAnalysisSummaryUi();
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
                const payload = await readJsonResponse(response, 'main info');
                const list = payload?.data?.result?.pstLtEpstInfo?.lt645;
                let rounds = Array.isArray(list)
                    ? list.map(mapMainInfoItemToDrawData).filter(Boolean)
                    : [];
                if (!rounds.length) {
                    rounds = getEmbeddedRecentDraws();
                }
                mainInfoCache = {
                    ts: Date.now(),
                    rounds
                };
                return rounds;
            })
            .catch(error => {
                console.warn('main info fallback using embedded rounds', error);
                const rounds = getEmbeddedRecentDraws();
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
            const payload = await readJsonResponse(response, 'lotto proxy');
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
        const embeddedFallback = getEmbeddedDrawFallback(round);
        if (embeddedFallback) {
            return embeddedFallback;
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
        renderDashboardExpectedRanks(weeklyExpectedOverride);
        if (weeklyStatusEl) {
            if (data._source === 'embedded-fallback') {
                weeklyStatusEl.textContent = `${data.drwNo}회차 안내 데이터를 표시합니다. 공식 연결이 복구되면 자동으로 최신값으로 바뀝니다.${cached ? ' (캐시)' : ''}`;
            } else {
                weeklyStatusEl.textContent = `${data.drwNo}회차 당첨 정보가 반영되었습니다.${cached ? ' (캐시)' : ''}`;
            }
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
        if (dashRibbonRoundEl && !dashRibbonRoundEl.textContent.trim()) {
            dashRibbonRoundEl.textContent = `${Number(data.drwNo) + 1}회`;
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
        const count = hasExcludeNumberAccess() ? excludeNumberValues.size : 0;
        const label = hasExcludeNumberAccess()
            ? (count ? `제외수 ${count}` : '없음')
            : 'GOLD 이상 전용';
        if (excludeNumberTitle) {
            excludeNumberTitle.textContent = label;
        }
        if (excludeNumberCard) {
            excludeNumberCard.dataset.title = label;
        }
        if (excludeNumberRule) {
            excludeNumberRule.checked = hasExcludeNumberAccess() && count > 0;
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

    function getBallRange(num) {
        if (num <= 10) return '1-10';
        if (num <= 20) return '11-20';
        if (num <= 30) return '21-30';
        if (num <= 40) return '31-40';
        return '41-45';
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
            button.setAttribute('data-ball-range', getBallRange(i));
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

        if (!hasExcludeNumberAccess() && excludeNumberValues.size) {
            clearExcludeNumberSelection({ clearStorage: true });
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
                if (!hasExcludeNumberAccess()) {
                    if (!isMember()) {
                        showActionPopup('직접 제외수는 GOLD 이상 플랜 전용입니다. 로그인 후 첫 달 0원으로 시작할 수 있습니다.');
                        openAuthModal();
                    } else {
                        showActionPopup('직접 제외수는 GOLD 이상 플랜 전용입니다. 마이페이지에서 첫 달 0원으로 업그레이드할 수 있습니다.');
                    }
                    return;
                }
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
                if (drawWizardState) {
                    syncDrawWizardExcludeNumbersFromControl({
                        commit: true
                    });
                    return;
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
        const selectedCount = ruleInputs.filter(input => input.checked).length;
        const totalCount = ruleCards.length;
        const visibleCount = ruleCards.filter(card => isCardVisibleInPicker(card)).length;
        if (rulesSelectedCount) {
            rulesSelectedCount.textContent = `${selectedCount}개`;
        }
        if (rulesVisibleCount) {
            rulesVisibleCount.textContent = `표시: ${visibleCount}/${totalCount}`;
        }
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
                ? `최근 빠른 선택: ${lastDrawInteraction.label}`
                : `최근 빠른 선택 해제: ${lastDrawInteraction.label}`;
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

    function getBaseOddsMap() {
        const total = TOTAL_COMBOS;
        return {
            1: total,
            2: Math.round(total / 6),
            3: Math.round(total / 228),
            4: Math.round(total / (combination(6, 4) * combination(39, 2))),
            5: Math.round(total / (combination(6, 3) * combination(39, 3)))
        };
    }

    function formatCompactOddsValue(value) {
        const safeValue = Math.max(1, Math.round(Number(value) || 0));
        const formatUnit = (divisor, suffix) => {
            const compact = safeValue / divisor;
            const fractionDigits = compact >= 100 ? 0 : 1;
            return `${Number(compact.toFixed(fractionDigits)).toLocaleString('ko-KR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: fractionDigits
            })}${suffix}`;
        };
        if (safeValue >= 100000000) {
            return formatUnit(100000000, '억');
        }
        if (safeValue >= 10000) {
            return formatUnit(10000, '만');
        }
        return formatNumber(safeValue);
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
                ? `${PRESETS_LABEL[activeStrategy] || activeStrategy} 빠른 선택`
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
            drawSelectionDockMetaEl.textContent = recentText || '빠른 선택 또는 규칙을 고르면 여기서 계속 보입니다.';
            if (drawSelectionDockMetricsEl) {
                drawSelectionDockMetricsEl.hidden = true;
            }
            if (drawSelectionDockOddsEl) {
                drawSelectionDockOddsEl.hidden = true;
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
        const remainPct = formatDisplayPercent(Number.isFinite(currentRemainingRatio) ? currentRemainingRatio * 100 : 100);
        const remainingValue = Number.isFinite(currentRemainingCombos) ? formatNumber(currentRemainingCombos) : '-';
        const benefitPct = Number.isFinite(currentRemainingRatio)
            ? Math.max(0, Math.round((1 - Math.max(0.000001, Math.min(1, currentRemainingRatio))) * 100))
            : 0;
        drawSelectionDockMetaEl.textContent = recentText || '선택 내용과 확률 변화가 여기서 계속 갱신됩니다.';
        if (drawSelectionDockMetricsEl) {
            drawSelectionDockMetricsEl.hidden = false;
        }
        if (drawSelectionDockOddsEl) {
            drawSelectionDockOddsEl.hidden = false;
            const clampRatio = Math.max(0.000001, Math.min(1, currentRemainingRatio || 1));
            const baseOdds = getBaseOddsMap();
            Object.entries(baseOdds).forEach(([rank, value]) => {
                const targetEl = drawSelectionDockOddsValueEls[rank];
                if (!targetEl) {
                    return;
                }
                const adjusted = Math.max(1, Math.round(value * clampRatio));
                targetEl.textContent = `${formatCompactOddsValue(value)} -> ${formatCompactOddsValue(adjusted)}`;
            });
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
            rulePickerPanel.classList.toggle('is-open', Boolean(isOpen));
            rulePickerPanel.setAttribute('aria-hidden', String(!isOpen));
            rulePickerBackdrop.hidden = true;
            body.classList.remove('rule-picker-open');
            if (isOpen) {
                setDrawAdvancedOpen(true);
                if (rulePickerSearch) {
                    window.setTimeout(() => {
                        rulePickerSearch.focus();
                    }, 40);
                }
                scrollIntoViewSoon(rulePickerPanel);
            }
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

    if (drawWizardDetailGroupsEl) {
        drawWizardDetailGroupsEl.addEventListener('scroll', () => {
            if (drawWizardDetailGroupsEl.scrollTop > 8) {
                hideDrawWizardScrollGuide({ persist: true });
            }
        }, { passive: true });
    }

    function setupRuleDetails() {
        ruleCards.forEach(card => {
            const input = card.querySelector('.rule-input');
            const body = card.querySelector('.rule-body');
            if (!input || !body || card.dataset.skipDetail === 'true') {
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
        const activeRules = getActiveRules();
        const remainingRatio = getEstimatedRemainingRatio(activeRules);
        const remainingCombos = Math.max(1, Math.round(TOTAL_COMBOS * remainingRatio));
        const excludedCombos = Math.max(0, TOTAL_COMBOS - remainingCombos);
        currentRemainingRatio = remainingRatio;
        currentRemainingCombos = remainingCombos;
        currentExcludedCombos = excludedCombos;
        if (remainingCombosEl) {
            remainingCombosEl.textContent = `${formatNumber(remainingCombos)}개`;
        }
        if (excludedCombosEl) {
            excludedCombosEl.textContent = `제외: ${formatNumber(excludedCombos)}개`;
        }
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
        const odds = getBaseOddsMap();
        Object.entries(odds).forEach(([rank, value]) => {
            if (oddsBaseEls[rank]) {
                oddsBaseEls[rank].textContent = `1 / ${formatNumber(Math.round(value))}`;
            }
        });
        updateAdjustedOdds(1);
    }

    function updateAdjustedOdds(ratio) {
        const clampRatio = Math.min(1, Math.max(0.000001, ratio));
        const baseOdds = getBaseOddsMap();
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
                    oddsDeltaEls[rank].textContent = `제외수 ${betterPct}%`;
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
            const excludedPct = fixed ? fixed.excludedPct : formatDisplayPercent((1 - fallbackRatio) * 100);
            const ratio = fixed ? Math.max(0.000001, 1 - excludedPct / 100) : fallbackRatio;
            const remainingCombos = Math.max(1, Math.round(TOTAL_COMBOS * ratio));
            const excludedCombos = Math.max(0, TOTAL_COMBOS - remainingCombos);
            const excludedEl = card.querySelector('[data-metric="excluded"]');
            const improveEl = card.querySelector('[data-metric="improve"]');
            if (excludedEl) {
                excludedEl.textContent = `예상 제외: ${formatNumber(excludedCombos)}개`;
            }
            if (improveEl) {
                const remainPct = formatDisplayPercent(ratio * 100);
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
        const containers = getRecentRoundContainers();
        if (!containers.length) {
            return;
        }
        const count = getRecentCount();
        syncRecentCountControls(count);
        const rounds = [];
        for (let i = 0; i < count; i += 1) {
            rounds.push(Math.max(1, latestRound - i));
        }
        recentRoundDataList = [];
        containers.forEach(container => {
            container.innerHTML = '';
            container.classList.add('is-loading');
        });
        const cards = rounds.map(round => {
            containers.forEach(container => {
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
                container.appendChild(card);
            });
            return { round };
        });
        updateRecentActive(latestRound);
        const chartData = [];
        for (const item of cards) {
            const cardSet = containers
                .map(container => container.querySelector(`.recent-card[data-round="${item.round}"]`))
                .filter(Boolean);
            const data = await hydrateRecentCard(cardSet, item.round);
            if (data) {
                chartData.push(data);
            }
        }
        if (!chartData.length && currentWeeklyData) {
            chartData.push(currentWeeklyData);
        }
        recentRoundDataList = chartData.slice();
        renderTrendChart(chartData);
        containers.forEach(container => {
            container.classList.remove('is-loading');
            if (!container.children.length) {
                container.innerHTML = '<div class="recent-empty">최근 회차 정보를 불러오지 못했습니다.</div>';
            }
        });
        updateAnalysisSummaryUi();
    }

    async function hydrateRecentCard(cards, round) {
        const cardList = Array.isArray(cards) ? cards.filter(Boolean) : [cards].filter(Boolean);
        const cached = getCachedRound(round);
        if (cached && cached.data) {
            cardList.forEach(card => fillRecentCard(card, cached.data));
        }
        try {
            const data = await fetchDrawData(round);
            if (data && data.returnValue === 'success') {
                cardList.forEach(card => fillRecentCard(card, data));
                cacheRoundOnly(data);
                return data;
            }
        } catch (error) {
            logProxyError('recentCard', error, { round });
        }
        if (!cached?.data) {
            const fallbackData = {
                drwNo: round,
                drwNoDate: '-',
                drwtNo1: '-',
                drwtNo2: '-',
                drwtNo3: '-',
                drwtNo4: '-',
                drwtNo5: '-',
                drwtNo6: '-'
            };
            cardList.forEach(card => fillRecentCard(card, fallbackData));
        }
        return cached?.data || null;
    }

    function fillRecentCard(card, data) {
        if (!card) {
            return;
        }
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
        getRecentRoundContainers().forEach(container => {
            Array.from(container.querySelectorAll('.recent-card')).forEach(card => {
                card.classList.toggle('is-active', card.dataset.round === String(round));
            });
        });
    }

    function renderTrendChart(dataList) {
        getTrendChartTargets().forEach(target => {
            renderTrendChartInto(target, dataList);
        });
        if (dataList.length) {
            recentRoundDataList = dataList.filter(Boolean);
        }
        updateAnalysisSummaryUi();
    }

    function renderTrendChartInto(target, dataList) {
        if (!target) {
            return;
        }
        if (!dataList.length) {
            target.classList.add('is-empty');
            target.innerHTML = '<div class="trend-empty">최근 회차 데이터를 불러오는 중입니다.</div>';
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
            target.classList.add('is-empty');
            target.innerHTML = '<div class="trend-empty">표시할 당첨금 데이터가 부족합니다. 회차를 변경해 주세요.</div>';
            return;
        }
        target.classList.remove('is-empty');
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

        target.innerHTML = `
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

        const rowsEl = target.querySelector('.trend-rows');
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
        const value = Number(
            analysisRecentCountSelectEl?.value
            || recentCountSelect?.value
            || 8
        );
        return Number.isFinite(value) ? value : 8;
    }

    function handleCompare() {
        handleCompareWithRefs({
            inputEl: compareInput,
            bonusEl: compareBonusInput,
            resultEl: compareResult
        });
    }

    function handleCompareWithRefs({ inputEl, bonusEl, resultEl }) {
        if (!inputEl || !resultEl) {
            return;
        }
        if (!currentWeeklyData) {
            updateCompareResult('회차 정보를 불러온 뒤 비교할 수 있습니다.', resultEl);
            return;
        }
        const raw = inputEl.value || '';
        const nums = raw
            .split(/[,\s]+/)
            .map(value => Number(value))
            .filter(value => Number.isInteger(value));
        const unique = Array.from(new Set(nums));
        if (unique.length !== 6 || unique.some(n => n < 1 || n > 45)) {
            updateCompareResult('1~45 사이 숫자 6개를 넣어 주세요.', resultEl);
            return;
        }
        const bonus = bonusEl ? Number(bonusEl.value) : 0;
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
        updateCompareResult(`일치 ${matchCount}개${bonusMatch ? ' + 보너스' : ''} → ${rank}`, resultEl);
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

    function updateCompareResult(message, target = compareResult) {
        if (target) {
            target.textContent = message;
        }
    }

    function logProxyError(stage, error, meta = {}) {
        console.warn(`[lotto-proxy] ${stage}`, { error, ...meta });
    }

});
