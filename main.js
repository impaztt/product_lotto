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
    const ruleSearch = document.getElementById('rule-search');
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
        same_decade_4_plus: { ratio: 0.06101, excluded: 496930 },
        same_decade_5_plus: { ratio: 0.004055, excluded: 33028 },
        all_low_or_high: { ratio: 0.02172, excluded: 176911 },
        low_or_high_5_plus: { ratio: 0.187055, excluded: 1523574 },
        tight_range: { ratio: 0.040695, excluded: 331463 },
        extreme_sum: { ratio: 0.045385, excluded: 369664 },
        prime_4_plus: { ratio: 0.065145, excluded: 530610 },
        prime_1_or_less: { ratio: 0.38143, excluded: 3106770 }
    };

    syncThemeToggle();
    syncMenuState(false);
    applySavedRules();
    updateRulesStatus('');
    updateSelectionCount();
    computeBaseOdds();
    updateCombinedEstimates();

    generateBtn.addEventListener('click', () => {
        generateAndDisplayNumbers();
    });

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', nextTheme);
        syncThemeToggle();
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = body.classList.contains('menu-open');
            syncMenuState(!isOpen);
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            syncMenuState(false);
        });
    });

    if (ruleSearch) {
        ruleSearch.addEventListener('input', event => {
            const query = event.target.value.trim().toLowerCase();
            filterRules(query);
        });
    }

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

    ruleInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateSelectionCount();
            updateCombinedEstimates();
        });
    });

    ruleCards.forEach(card => {
        card.addEventListener('click', event => {
            if (event.target && event.target.tagName === 'INPUT') {
                return;
            }
            const input = card.querySelector('.rule-input');
            if (!input) {
                return;
            }
            input.checked = !input.checked;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

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

    function syncThemeToggle() {
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? '라이트 모드' : '다크 모드');
        themeToggle.setAttribute('title', currentTheme === 'dark' ? '라이트 모드' : '다크 모드');
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

    function filterRules(query) {
        ruleCards.forEach(card => {
            const title = (card.dataset.title || '').toLowerCase();
            const group = (card.dataset.group || '').toLowerCase();
            const visible = !query || title.includes(query) || group.includes(query);
            card.classList.toggle('is-hidden', !visible);
        });
        ruleGroups.forEach(group => {
            const visibleCards = group.querySelectorAll('.rule-card:not(.is-hidden)');
            group.classList.toggle('is-empty', visibleCards.length === 0);
        });
        updateSelectionCount();
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
            id: 'prime_4_plus',
            exclude: numbers => countPrimes(numbers) >= 4
        },
        {
            id: 'prime_1_or_less',
            exclude: numbers => countPrimes(numbers) <= 1
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
