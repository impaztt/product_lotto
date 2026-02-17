document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.querySelector('.numbers-container');
    const generateBtn = document.getElementById('generate-btn');
    const drawCountSelect = document.getElementById('draw-count');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const ruleInputs = Array.from(document.querySelectorAll('.rules-grid input[type="checkbox"]'));
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
    const rulesSection = document.getElementById('rules');
    const guestLimitEl = document.getElementById('guest-limit');
    const guestBannerEl = document.getElementById('guest-banner');
    const authModal = document.getElementById('auth-modal');
    const authButtons = Array.from(document.querySelectorAll('[data-auth]'));
    const authClose = authModal ? authModal.querySelector('.modal-close') : null;
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn[data-tab]'));
    const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
    const tabLinks = Array.from(document.querySelectorAll('[data-tab-link]'));
    const weeklyStatusEl = document.getElementById('weekly-status');
    const weeklyRoundBadge = document.getElementById('weekly-round-badge');
    const weeklyNumbersEl = document.getElementById('weekly-numbers');
    const weeklyBonusEl = document.getElementById('weekly-bonus');
    const weeklyDateEl = document.getElementById('weekly-date');
    const weeklyUpdatedEl = document.getElementById('weekly-updated');
    const weeklyCard = document.getElementById('weekly-card');
    const weeklyFirstPrizeEl = document.getElementById('weekly-first-prize');
    const weeklyFirstWinnersEl = document.getElementById('weekly-first-winners');
    const weeklyTotalSalesEl = document.getElementById('weekly-total-sales');
    const weeklyAccumulatedEl = document.getElementById('weekly-accumulated');
    const weeklyRoundSelect = document.getElementById('weekly-round-select');
    const weeklyRoundHint = document.getElementById('weekly-round-hint');
    const weeklyNextDrawEl = document.getElementById('weekly-next-draw');
    const weeklyCountdownEl = document.getElementById('weekly-countdown');
    const weeklyCountdownSubEl = document.getElementById('weekly-countdown-sub');
    const weeklyExpectedAmountEl = document.getElementById('weekly-expected-amount');
    const weeklyExpectedNoteEl = document.getElementById('weekly-expected-note');
    const recentRoundsEl = document.getElementById('recent-rounds');
    const roundSearchInput = document.getElementById('round-search-input');
    const roundSearchBtn = document.getElementById('round-search-btn');
    const compareInput = document.getElementById('compare-input');
    const compareBonusInput = document.getElementById('compare-bonus');
    const compareBtn = document.getElementById('compare-btn');
    const compareResult = document.getElementById('compare-result');
    const recentCountSelect = document.getElementById('recent-count');
    const trendChart = document.getElementById('trend-chart');
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
    let qrStream = null;
    let qrScanRafId = null;
    let qrCanvasCtx = null;
    let qrLastPayload = '';
    let qrBarcodeDetector = null;
    let qrLastNumbers = [];
    let qrLastMatchedRound = null;

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
            setActiveTab('weekly', true);
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

    if (customApplyBtn) {
        customApplyBtn.addEventListener('click', () => {
            const saved = localStorage.getItem('lotto_custom_preset');
            if (!saved) {
                updateRulesStatus('저장된 내 프리셋이 없습니다.');
                return;
            }
            const ids = JSON.parse(saved);
            ruleInputs.forEach(input => {
                input.checked = ids.includes(input.value);
            });
            updateRulesStatus('내 프리셋을 적용했습니다.');
            updateSelectionCount();
            updateCombinedEstimates();
        });
    }

    authButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.dataset.auth;
            updateRulesStatus(`${provider === 'google' ? '구글' : '카카오'} 로그인은 준비 중입니다.`);
            openAuthModal();
        });
    });

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
        });
    });

    if (toggleRulesBtn && rulesSection) {
        toggleRulesBtn.addEventListener('click', () => {
            const collapsed = rulesSection.classList.toggle('rules-collapsed');
            toggleRulesBtn.textContent = collapsed ? '모든 규칙 펼치기' : '간단히 보기';
        });
    }

    ruleInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateSelectionCount();
            updateCombinedEstimates();
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
            ruleInputs.forEach(input => {
                input.checked = false;
            });
            updateSelectionCount();
            updateCombinedEstimates();
        });
    }

    try {
        syncThemeToggle();
        syncMenuState(false);
        applySavedRules();
        updateRulesStatus('');
        updateSelectionCount();
        computeBaseOdds();
        updateCombinedEstimates();
        setupRuleDetails();
        syncInitialTab();
        fetchLatestDraw();
        if (rulesSection) {
            rulesSection.classList.add('rules-collapsed');
        }
        if (toggleRulesBtn) {
            toggleRulesBtn.textContent = '모든 규칙 펼치기';
        }
        if (guestLimitEl) {
            guestLimitEl.textContent = '비회원은 하루 5회까지 가능 (1회 1세트).';
            canGuestGenerate();
        }
    } catch (error) {
        console.error('초기화 오류', error);
    }

    function generateAndDisplayNumbers() {
        const drawCount = parseInt(drawCountSelect.value, 10);
        const activeRules = getActiveRules();
        const draws = [];
        for (let i = 0; i < drawCount; i += 1) {
            const numbers = generateNumbersWithRules(activeRules);
            draws.push(numbers);
        }
        displayNumbers(draws);
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

    function displayNumbers(draws) {
        numbersContainer.innerHTML = '';
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

            numbersContainer.appendChild(row);
        });
    }

    function canGuestGenerate() {
        if (!guestLimitEl) {
            return true;
        }
        const drawCount = parseInt(drawCountSelect.value, 10);
        const isMember = false;
        if (isMember) {
            return true;
        }
        const limit = 5;
        const todayKey = getTodayKey();
        const countKey = `guest_count_${todayKey}`;
        const current = Number(localStorage.getItem(countKey) || 0);
        if (drawCount > 1) {
            guestLimitEl.textContent = '비회원은 1회 1세트만 가능합니다. 로그인 후 이용해 주세요.';
            if (guestBannerEl) {
                guestBannerEl.textContent = '비회원 제한으로 1회 1세트만 가능합니다. 로그인하면 제한이 해제됩니다.';
            }
            return false;
        }
        if (current >= limit) {
            guestLimitEl.textContent = '비회원 하루 5회 제한을 초과했습니다. 로그인 후 이용해 주세요.';
            if (guestBannerEl) {
                guestBannerEl.textContent = '비회원 하루 5회 제한을 초과했습니다. 로그인 후 이용해 주세요.';
            }
            return false;
        }
        guestLimitEl.textContent = `비회원 남은 횟수: ${limit - current}회 (1회 1세트)`;
        if (guestBannerEl) {
            guestBannerEl.textContent = `비회원 남은 횟수: ${limit - current}회 (1회 1세트)`;
        }
        return true;
    }

    function incrementGuestCount() {
        if (!guestLimitEl) {
            return;
        }
        const isMember = false;
        if (isMember) {
            return;
        }
        const todayKey = getTodayKey();
        const countKey = `guest_count_${todayKey}`;
        const current = Number(localStorage.getItem(countKey) || 0);
        const next = current + 1;
        localStorage.setItem(countKey, String(next));
        guestLimitEl.textContent = `비회원 남은 횟수: ${Math.max(0, 5 - next)}회 (1회 1세트)`;
        if (guestBannerEl) {
            guestBannerEl.textContent = `비회원 남은 횟수: ${Math.max(0, 5 - next)}회 (1회 1세트)`;
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

    function syncInitialTab() {
        if (!tabButtons.length || !tabPanels.length) {
            return;
        }
        const hash = window.location.hash;
        if (hash && hash.startsWith('#tab-')) {
            const target = hash.replace('#tab-', '');
            setActiveTab(target, false, false);
        } else {
            setActiveTab('weekly', false, false);
        }
    }

    function setActiveTab(tabId, focusPanel, updateHash = true) {
        if (!tabId) {
            return;
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
            if (!storeAutoLoaded) {
                storeAutoLoaded = true;
                locateAndLoadStores();
            }
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
        if (!navigator.geolocation) {
            storeStatusEl.textContent = '현재 브라우저에서는 위치 조회를 지원하지 않습니다.';
            return;
        }
        storeStatusEl.textContent = '현재 위치 확인 중입니다. 위치 권한을 허용해 주세요.';
        navigator.geolocation.getCurrentPosition(
            position => {
                storeLastPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                loadNearbyStores(storeLastPosition);
            },
            error => {
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
        if (!map) {
            return;
        }
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

        const radius = getStoreRadius();
        try {
            const stores = await fetchNearbyStores(position, radius);
            renderStoreResults(stores, position);
            storeStatusEl.textContent = stores.length
                ? `반경 ${Math.round(radius / 1000 * 10) / 10}km 내 판매점 ${stores.length}곳을 찾았습니다. 하단 버튼으로 길찾기 또는 QR 스캔으로 이동하세요.`
                : '주변 판매점이 적게 검색되었습니다. 반경을 3km 이상으로 넓혀 다시 조회해 주세요.';
        } catch (error) {
            logProxyError('storeFinder', error, { position, radius });
            storeStatusEl.textContent = '판매점 데이터를 불러오지 못했습니다. 네트워크를 확인한 뒤 다시 조회해 주세요.';
        }
    }

    function ensureStoreMap(center) {
        if (!storeMapEl || !window.L) {
            if (storeStatusEl) {
                storeStatusEl.textContent = '지도를 초기화하지 못했습니다. 페이지를 새로고침해 주세요.';
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
        const proxyBase = window.STORE_PROXY_URL || '/api/stores';
        const region = await resolveStoreRegion(position);
        const params = new URLSearchParams({
            lat: String(position.lat),
            lng: String(position.lng),
            radius: String(radius)
        });
        if (region?.ctpv) {
            params.set('ctpv', region.ctpv);
        }
        if (region?.sgg) {
            params.set('sgg', region.sgg);
        }
        const url = `${proxyBase}?${params.toString()}`;
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 8000);
        const response = await fetch(url, {
            cache: 'no-store',
            signal: controller.signal
        });
        window.clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`store proxy error: ${response.status}`);
        }
        const payload = await response.json();
        if (!payload || payload.returnValue !== 'success') {
            throw new Error(payload?.message || 'store data fail');
        }
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
    }

    async function resolveStoreRegion(position) {
        try {
            const controller = new AbortController();
            const timeoutId = window.setTimeout(() => controller.abort(), 5000);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}&accept-language=ko`,
                { signal: controller.signal }
            );
            window.clearTimeout(timeoutId);
            if (!response.ok) {
                return null;
            }
            const data = await response.json();
            const address = data?.address || {};
            const ctpvFull = address.state
                || address.city
                || address.province
                || address.region
                || address.county
                || '';
            const sgg = address.borough
                || address.county
                || address.city_district
                || address.district
                || address.municipality
                || '';
            return {
                ctpv: mapCtpvShort(ctpvFull),
                sgg: String(sgg || '').trim()
            };
        } catch {
            return null;
        }
    }

    function mapCtpvShort(value) {
        const raw = String(value || '').trim();
        if (!raw) {
            return '';
        }
        return CTPV_SHORT[raw]
            || raw.replace('특별시', '')
                .replace('광역시', '')
                .replace('특별자치시', '')
                .replace('특별자치도', '')
                .replace('도', '');
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

    const CTPV_SHORT = {
        '서울특별시': '서울',
        '경기도': '경기',
        '부산광역시': '부산',
        '대구광역시': '대구',
        '인천광역시': '인천',
        '대전광역시': '대전',
        '울산광역시': '울산',
        '강원도': '강원',
        '충청북도': '충북',
        '충청남도': '충남',
        '광주광역시': '광주',
        '전라북도': '전북',
        '전라남도': '전남',
        '경상북도': '경북',
        '경상남도': '경남',
        '제주특별자치도': '제주',
        '세종특별자치시': '세종'
    };

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
        if (!weeklyStatusEl || !weeklyRoundBadge || !weeklyNumbersEl || !weeklyBonusEl) {
            return;
        }
        weeklyStatusEl.textContent = '최신 회차 데이터를 확인하고 있습니다. 잠시만 기다려 주세요.';
        weeklyRoundBadge.textContent = '조회중';
        if (weeklyCard) {
            weeklyCard.classList.add('is-loading');
        }

        const cached = getCachedWeekly();
        let hasCached = false;
        if (cached && cached.data) {
            renderWeeklyData(cached.data, { cached: true });
            hasCached = true;
        }

        const estimatedRound = estimateLatestRound();
        latestAvailableRound = estimatedRound;
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

        weeklyStatusEl.textContent = '최신 회차 연결이 지연되고 있습니다. 새로고침하거나 잠시 후 다시 시도해 주세요.';
        weeklyRoundBadge.textContent = '연동 실패';
        weeklyRoundBadge.classList.add('muted');
        if (weeklyCard) {
            weeklyCard.classList.remove('is-loading');
        }
        if (hasCached) {
            weeklyStatusEl.textContent = '실시간 연결이 지연되어 마지막 저장 데이터를 표시합니다.';
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
        if (!weeklyCountdownEl) {
            return;
        }
        const now = getKstNow();
        const nextDraw = getNextSaturdayDrawTime(now);
        const diffMs = Math.max(0, nextDraw.getTime() - now.getTime());
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const pad = value => String(value).padStart(2, '0');
        weeklyCountdownEl.textContent = `${days}일 ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        if (weeklyCountdownSubEl) {
            weeklyCountdownSubEl.textContent = `다음 추첨: ${formatKstDateTime(nextDraw)} (KST)`;
        }
    }

    function updateWeeklyNextDrawDisplay() {
        if (!weeklyNextDrawEl) {
            return;
        }
        const now = getKstNow();
        const nextDraw = getNextSaturdayDrawTime(now);
        const diffMs = Math.max(0, nextDraw.getTime() - now.getTime());
        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        const days = Math.floor(totalMinutes / (60 * 24));
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
        const minutes = totalMinutes % 60;
        weeklyNextDrawEl.textContent = `${days}일 ${hours}시간 ${minutes}분`;
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

        weeklyRoundBadge.textContent = `${data.drwNo}회`;
        weeklyRoundBadge.classList.remove('muted');
        if (weeklyRoundSelect) {
            weeklyRoundSelect.value = String(data.drwNo);
        }
        weeklyNumbersEl.innerHTML = '';
        numbers.forEach(value => {
            const el = document.createElement('div');
            el.className = 'number';
            el.textContent = value;
            weeklyNumbersEl.appendChild(el);
        });
        weeklyBonusEl.textContent = data.bnusNo || '-';
        weeklyDateEl.textContent = `추첨일: ${data.drwNoDate || '-'}`;
        if (weeklyUpdatedEl) {
            weeklyUpdatedEl.textContent = `업데이트: ${formatKstDateTime(getKstNow())}${cached ? ' (캐시)' : ''}`;
        }
        updateWeeklyNextDrawDisplay();
        if (weeklyRoundHint) {
            weeklyRoundHint.textContent = `선택된 회차: ${data.drwNo}회`;
        }

        if (weeklyFirstPrizeEl) {
            weeklyFirstPrizeEl.textContent = formatCurrency(data.firstWinamnt);
        }
        if (weeklyFirstWinnersEl) {
            weeklyFirstWinnersEl.textContent = `${formatNumber(data.firstPrzwnerCo || 0)}명`;
        }
        if (weeklyTotalSalesEl) {
            weeklyTotalSalesEl.textContent = formatCurrency(data.totSellamnt);
        }
        if (weeklyAccumulatedEl) {
            weeklyAccumulatedEl.textContent = formatCurrency(data.firstAccumamnt);
        }
        if (weeklyExpectedAmountEl) {
            const expected = data.firstAccumamnt || data.firstWinamnt;
            weeklyExpectedAmountEl.textContent = formatCurrency(expected);
        }
        if (weeklyExpectedNoteEl) {
            weeklyExpectedNoteEl.textContent = `${data.drwNo}회차 기준`;
        }
        if (weeklyStatusEl) {
            weeklyStatusEl.textContent = `${data.drwNo}회차 당첨 정보가 반영되었습니다.${cached ? ' (캐시)' : ''}`;
        }
        if (weeklyCard) {
            weeklyCard.classList.remove('is-loading');
        }
    }

    function formatCurrency(value) {
        if (!value && value !== 0) {
            return '-';
        }
        return `${formatNumber(value)}원`;
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

    function applyPreset(preset) {
        const presetIds = PRESETS[preset] || [];
        if (preset === 'clear') {
            ruleInputs.forEach(input => {
                input.checked = false;
            });
            updateRulesStatus('모든 선택을 해제했습니다.');
            updateSelectionCount();
            updateCombinedEstimates();
            return;
        }
        ruleInputs.forEach(input => {
            input.checked = presetIds.includes(input.value);
        });
        updateRulesStatus(`${PRESETS_LABEL[preset]} 규칙을 적용했습니다.`);
        updateSelectionCount();
        updateCombinedEstimates();
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
            ruleInputs.forEach(input => {
                input.checked = savedIds.includes(input.value);
            });
            if (fromButton) {
                updateRulesStatus('저장된 규칙을 불러왔습니다.');
            }
            updateSelectionCount();
            updateCombinedEstimates();
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
        const visibleCount = ruleCards.filter(card => !card.classList.contains('is-hidden')).length;
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
        selectedCards.forEach(card => {
            const input = card.querySelector('.rule-input');
            if (!input) {
                return;
            }
            const title = card.dataset.title
                || card.querySelector('.rule-title')?.textContent
                || '규칙';
            const group = card.dataset.group || '';
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'draw-selected-chip';
            chip.dataset.value = input.value;
            chip.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(group)}</span>`;
            selectedRulesListEl.appendChild(chip);
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
            const stat = RULE_STATS[rule.id];
            if (stat) {
                ratio *= (1 - stat.ratio);
            }
        });
        return Math.max(0.000001, ratio);
    }

    function formatNumber(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        if (!weeklyStatusEl) {
            return;
        }
        weeklyStatusEl.textContent = `${round}회차 데이터를 조회하고 있습니다.`;
        if (weeklyCard) {
            weeklyCard.classList.add('is-loading');
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
            } else {
                weeklyStatusEl.textContent = '해당 회차 데이터가 아직 공개되지 않았습니다.';
            }
        } catch (error) {
            logProxyError('loadRound', error, { round });
            if (!cached) {
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
            id: 'prime_1_or_less',
            exclude: numbers => countPrimes(numbers) <= 1
        },
        {
            id: 'prime_0',
            exclude: numbers => countPrimes(numbers) === 0
        }
    ];

    const PRESETS = {
        light: [
            'all_odd',
            'all_even',
            'consecutive_4_plus',
            'same_last_digit_4_plus',
            'extreme_sum'
        ],
        balanced: [
            'five_odd_one_even',
            'five_even_one_odd',
            'multiples_of_2_4_plus',
            'multiples_of_3_3_plus',
            'same_decade_4_plus',
            'tight_range'
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
        ]
    };

    const PRESETS_LABEL = {
        light: '보수형',
        balanced: '균형형',
        aggressive: '공격형'
    };

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
        prime_1_or_less: '소수가 1개 이하인 조합을 제외합니다.',
        prime_0: '소수가 하나도 없는 조합을 제외합니다.'
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
