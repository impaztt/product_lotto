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
    const recentRoundsEl = document.getElementById('recent-rounds');
    const roundSearchInput = document.getElementById('round-search-input');
    const roundSearchBtn = document.getElementById('round-search-btn');
    const compareInput = document.getElementById('compare-input');
    const compareBonusInput = document.getElementById('compare-bonus');
    const compareBtn = document.getElementById('compare-btn');
    const compareResult = document.getElementById('compare-result');
    const recentCountSelect = document.getElementById('recent-count');
    const trendChart = document.getElementById('trend-chart');
    let currentWeeklyData = null;
    let latestAvailableRound = null;

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
            const value = roundSearchInput ? Number(roundSearchInput.value) : 0;
            if (!value) {
                updateCompareResult('회차 번호를 입력해 주세요.');
                return;
            }
            loadRound(value);
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
        if (focusPanel) {
            targetPanel.focus({ preventScroll: true });
            targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
        weeklyStatusEl.textContent = '당첨 정보를 불러오는 중입니다.';
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
        loadRecentRounds(estimatedRound);
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
                    loadRecentRounds(data.drwNo);
                    return;
                }
            } catch (error) {
                logProxyError('fetchLatestDraw', error, { round });
            }
        }

        weeklyStatusEl.textContent = '당첨 정보를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.';
        weeklyRoundBadge.textContent = '연동 실패';
        weeklyRoundBadge.classList.add('muted');
        if (weeklyCard) {
            weeklyCard.classList.remove('is-loading');
        }
        if (hasCached) {
            weeklyStatusEl.textContent = '최신 정보를 불러오지 못해 마지막 캐시를 표시합니다.';
            if (cached?.data?.drwNo) {
                initRoundSelect(cached.data.drwNo);
                latestAvailableRound = cached.data.drwNo;
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

    async function fetchDrawData(round) {
        const proxyBase = window.LOTTO_PROXY_URL || 'https://product-lotto.pages.dev/api/lotto';
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
        const savedIds = JSON.parse(saved);
        ruleInputs.forEach(input => {
            input.checked = savedIds.includes(input.value);
        });
        if (fromButton) {
            updateRulesStatus('저장된 규칙을 불러왔습니다.');
        }
        updateSelectionCount();
        updateCombinedEstimates();
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
        updateGroupButtons();
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
        Object.entries(baseOdds).forEach(([rank, value]) => {
            const adjusted = Math.max(1, Math.round(value * clampRatio));
            if (oddsAdjEls[rank]) {
                oddsAdjEls[rank].textContent = `1 / ${formatNumber(adjusted)}`;
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
        const rounds = [];
        for (let i = 0; i < 12; i += 1) {
            rounds.push(Math.max(1, latestRound - i));
        }
        weeklyRoundSelect.innerHTML = '';
        rounds.forEach(round => {
            const option = document.createElement('option');
            option.value = String(round);
            option.textContent = `${round}회`;
            weeklyRoundSelect.appendChild(option);
        });
        weeklyRoundSelect.value = String(latestRound);
        if (weeklyRoundHint) {
            weeklyRoundHint.textContent = `최신 당첨 회차: ${latestRound}회`;
        }
        weeklyRoundSelect.onchange = () => {
            const round = Number(weeklyRoundSelect.value);
            if (!round) {
                return;
            }
            loadRound(round);
        };
    }

    async function loadRound(round) {
        if (!weeklyStatusEl) {
            return;
        }
        weeklyStatusEl.textContent = `${round}회차 정보를 불러오는 중입니다.`;
        if (weeklyCard) {
            weeklyCard.classList.add('is-loading');
        }
        const cached = getCachedRound(round);
        if (cached && cached.data) {
            renderWeeklyData(cached.data, { cached: true });
        }
        try {
            const data = await fetchDrawData(round);
            if (data && data.returnValue === 'success') {
                renderWeeklyData(data, { cached: false });
                cacheWeekly(data);
                updateRecentActive(round);
            } else {
                weeklyStatusEl.textContent = '해당 회차 정보가 아직 없습니다.';
            }
        } catch (error) {
            logProxyError('loadRound', error, { round });
            if (!cached) {
                weeklyStatusEl.textContent = '회차 정보를 가져오지 못했습니다.';
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
        const fetches = rounds.map(round => {
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
            return hydrateRecentCard(card, round);
        });
        updateRecentActive(latestRound);
        const results = await Promise.allSettled(fetches);
        const chartData = results
            .map(result => (result.status === 'fulfilled' ? result.value : null))
            .filter(Boolean);
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
            trendChart.innerHTML = '';
            return;
        }
        const sorted = dataList
            .filter(data => data && data.firstWinamnt)
            .sort((a, b) => a.drwNo - b.drwNo);
        const maxValue = Math.max(...sorted.map(item => Number(item.firstWinamnt || 0)), 1);
        trendChart.innerHTML = '';
        sorted.forEach(item => {
            const ratio = Math.max(0.08, Number(item.firstWinamnt || 0) / maxValue);
            const bar = document.createElement('div');
            bar.className = 'trend-bar';
            bar.innerHTML = `
                <div class="bar" style="height: ${Math.round(ratio * 100)}%"></div>
                <div class="label">${item.drwNo}회</div>
            `;
            trendChart.appendChild(bar);
        });
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
