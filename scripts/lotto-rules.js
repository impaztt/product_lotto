(function initLottoRules(global) {
    function combination(n, k) {
        let result = 1;
        for (let i = 1; i <= k; i += 1) {
            result = (result * (n - (k - i))) / i;
        }
        return Math.round(result);
    }

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

    const RULES = [
        { id: 'all_odd', exclude: numbers => numbers.every(number => number % 2 === 1) },
        { id: 'all_even', exclude: numbers => numbers.every(number => number % 2 === 0) },
        { id: 'five_odd_one_even', exclude: numbers => countBy(numbers, number => number % 2 === 1) === 5 },
        { id: 'five_even_one_odd', exclude: numbers => countBy(numbers, number => number % 2 === 0) === 5 },
        { id: 'four_odd_two_even', exclude: numbers => countBy(numbers, number => number % 2 === 1) === 4 },
        { id: 'four_even_two_odd', exclude: numbers => countBy(numbers, number => number % 2 === 0) === 4 },
        { id: 'multiples_of_2_4_plus', exclude: numbers => countMultiples(numbers, 2) >= 4 },
        { id: 'multiples_of_2_5_plus', exclude: numbers => countMultiples(numbers, 2) >= 5 },
        { id: 'multiples_of_3_3_plus', exclude: numbers => countMultiples(numbers, 3) >= 3 },
        { id: 'multiples_of_4_3_plus', exclude: numbers => countMultiples(numbers, 4) >= 3 },
        { id: 'multiples_of_5_3_plus', exclude: numbers => countMultiples(numbers, 5) >= 3 },
        { id: 'multiples_of_6_3_plus', exclude: numbers => countMultiples(numbers, 6) >= 3 },
        { id: 'multiples_of_7_3_plus', exclude: numbers => countMultiples(numbers, 7) >= 3 },
        { id: 'consecutive_3_plus', exclude: numbers => longestConsecutiveRun(numbers) >= 3 },
        { id: 'consecutive_4_plus', exclude: numbers => longestConsecutiveRun(numbers) >= 4 },
        { id: 'same_last_digit_3_plus', exclude: numbers => maxSameLastDigit(numbers) >= 3 },
        { id: 'same_last_digit_4_plus', exclude: numbers => maxSameLastDigit(numbers) >= 4 },
        { id: 'last_digit_2_plus', exclude: numbers => maxSameLastDigit(numbers) >= 2 },
        { id: 'last_digit_zero_2_plus', exclude: numbers => countBy(numbers, number => number % 10 === 0) >= 2 },
        { id: 'last_digit_five_2_plus', exclude: numbers => countBy(numbers, number => number % 10 === 5) >= 2 },
        { id: 'same_decade_4_plus', exclude: numbers => maxInSameDecade(numbers) >= 4 },
        { id: 'same_decade_5_plus', exclude: numbers => maxInSameDecade(numbers) >= 5 },
        { id: 'all_low_or_high', exclude: numbers => numbers.every(number => number <= 22) || numbers.every(number => number >= 23) },
        { id: 'low_or_high_5_plus', exclude: numbers => Math.max(countLow(numbers), countHigh(numbers)) >= 5 },
        { id: 'low_1_15_4_plus', exclude: numbers => countBy(numbers, number => number <= 15) >= 4 },
        { id: 'mid_16_30_4_plus', exclude: numbers => countBy(numbers, number => number >= 16 && number <= 30) >= 4 },
        { id: 'high_31_45_4_plus', exclude: numbers => countBy(numbers, number => number >= 31) >= 4 },
        { id: 'tight_range', exclude: numbers => (numbers[numbers.length - 1] - numbers[0]) < 20 },
        {
            id: 'extreme_sum',
            exclude: numbers => {
                const sum = numbers.reduce((acc, number) => acc + number, 0);
                return sum <= 80 || sum >= 200;
            }
        },
        { id: 'sum_low_100', exclude: numbers => numbers.reduce((acc, number) => acc + number, 0) <= 100 },
        { id: 'sum_high_180', exclude: numbers => numbers.reduce((acc, number) => acc + number, 0) >= 180 },
        { id: 'prime_4_plus', exclude: numbers => countPrimes(numbers) >= 4 },
        { id: 'prime_5_plus', exclude: numbers => countPrimes(numbers) >= 5 },
        { id: 'prime_1_or_less', exclude: numbers => countPrimes(numbers) <= 1 },
        { id: 'prime_0', exclude: numbers => countPrimes(numbers) === 0 },
        {
            id: 'exclude_number',
            exclude: (numbers, excludeNumberValues) => {
                if (!excludeNumberValues || !excludeNumberValues.size) {
                    return false;
                }
                return numbers.some(number => excludeNumberValues.has(number));
            }
        }
    ];

    const PRESETS = {
        light: ['all_odd', 'all_even', 'consecutive_4_plus', 'same_last_digit_4_plus', 'extreme_sum'],
        conservative: ['all_odd', 'all_even', 'same_last_digit_4_plus'],
        balanced: ['five_odd_one_even', 'five_even_one_odd', 'multiples_of_2_4_plus', 'multiples_of_3_3_plus', 'same_decade_4_plus', 'tight_range'],
        expanded: ['same_decade_4_plus', 'tight_range', 'last_digit_2_plus', 'same_last_digit_3_plus', 'consecutive_3_plus'],
        aggressive: ['four_odd_two_even', 'four_even_two_odd', 'multiples_of_4_3_plus', 'multiples_of_5_3_plus', 'multiples_of_6_3_plus', 'consecutive_3_plus', 'same_last_digit_3_plus', 'all_low_or_high', 'low_or_high_5_plus', 'prime_4_plus'],
        range_focus: ['same_decade_5_plus', 'tight_range', 'all_low_or_high', 'low_or_high_5_plus'],
        sum_balance: ['sum_low_100', 'sum_high_180', 'extreme_sum'],
        digit_focus: ['last_digit_zero_2_plus', 'last_digit_five_2_plus', 'same_last_digit_3_plus'],
        prime_focus: ['prime_0', 'prime_1_or_less', 'prime_4_plus']
    };

    const PRESETS_LABEL = {
        light: '보수형',
        conservative: '편중 최소형',
        balanced: '균형형',
        expanded: '분포 강화형',
        aggressive: '공격형',
        range_focus: '구간 집중형',
        sum_balance: '합계 안정형',
        digit_focus: '끝자리 집중형',
        prime_focus: '소수 집중형'
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
        prime_5_plus: '소수가 5개 이상 포함된 조합을 제외합니다.',
        prime_1_or_less: '소수가 1개 이하인 조합을 제외합니다.',
        prime_0: '소수가 하나도 없는 조합을 제외합니다.',
        exclude_number: '선택한 번호가 포함된 조합을 모두 제외합니다.'
    };

    const RULE_NARRATIVES = {
        all_odd: '홀짝이 한쪽으로 완전히 쏠린 극단 패턴이라 먼저 정리하는 기본 제외입니다.',
        all_even: '짝수만 몰린 극단 패턴을 빠르게 덜어낼 때 가장 먼저 쓰는 기본 제외입니다.',
        five_odd_one_even: '홀수 쏠림을 줄여 보다 균형적인 후보만 남기고 싶을 때 체감이 큰 제외입니다.',
        five_even_one_odd: '짝수 편중을 줄여 한쪽으로 기운 후보를 빠르게 정리할 때 자주 씁니다.',
        four_odd_two_even: '홀수 우세 패턴까지 줄여 분포 편향을 한 단계 더 정리하고 싶을 때 유용합니다.',
        four_even_two_odd: '짝수 우세 패턴을 덜어내 홀짝 밸런스를 더 깔끔하게 맞추는 제외입니다.',
        multiples_of_2_4_plus: '짝수가 과하게 많은 조합을 크게 줄여 후보 압축 체감이 큰 대표 필터입니다.',
        multiples_of_2_5_plus: '짝수가 거의 대부분인 조합만 한 번 더 걷어내는 보강 제외입니다.',
        multiples_of_3_3_plus: '3의 배수 쏠림을 줄여 특정 배수 패턴 반복을 싫어할 때 쓰는 제외입니다.',
        multiples_of_4_3_plus: '4의 배수 편중까지 줄여 배수 몰림을 더 세밀하게 관리하고 싶을 때 적합합니다.',
        multiples_of_5_3_plus: '끝자리 0·5가 많이 겹치는 흐름을 부담스러워할 때 가볍게 정리하는 제외입니다.',
        multiples_of_6_3_plus: '2와 3 성질이 겹친 숫자 몰림을 줄여 더 다양한 결의 후보를 남기는 제외입니다.',
        multiples_of_7_3_plus: '7의 배수 편중을 마지막에 세밀하게 다듬고 싶을 때 쓰는 미세 제외입니다.',
        consecutive_3_plus: '연속수가 길게 붙는 조합을 싫어하는 사용자에게 가장 체감이 큰 대표 제외입니다.',
        consecutive_4_plus: '연속수가 아주 길게 붙은 강한 패턴만 골라내는 정밀 제외입니다.',
        same_last_digit_3_plus: '끝자리가 여러 개 겹쳐 시각적으로 몰린 조합을 먼저 덜어내는 제외입니다.',
        same_last_digit_4_plus: '끝자리 반복이 아주 심한 패턴만 강하게 정리하는 끝자리 제외입니다.',
        last_digit_2_plus: '끝자리 중복 자체를 크게 싫어할 때 후보를 강하게 압축하는 고강도 제외입니다.',
        last_digit_zero_2_plus: '0으로 끝나는 숫자 몰림을 따로 피하고 싶을 때 취향을 반영하기 좋습니다.',
        last_digit_five_2_plus: '5로 끝나는 숫자 몰림을 따로 줄이고 싶을 때 쓰는 세부 제외입니다.',
        same_decade_4_plus: '한 구간에 숫자가 몰리는 패턴을 줄여 구간 분산을 넓게 가져가고 싶을 때 적합합니다.',
        same_decade_5_plus: '거의 한 구간에 쏠린 조합만 마지막으로 걷어내는 미세 제외입니다.',
        all_low_or_high: '낮은 번호대나 높은 번호대 한쪽에만 몰린 극단 분포를 먼저 정리하는 기본 제외입니다.',
        low_or_high_5_plus: '저구간 또는 고구간 한쪽으로 심하게 기운 조합을 줄여 전체 밸런스를 맞춥니다.',
        low_1_15_4_plus: '초반 번호대 쏠림을 줄여 너무 낮은 숫자 중심 후보를 피하고 싶을 때 유용합니다.',
        mid_16_30_4_plus: '중간 구간 과밀을 덜어내 특정 구간 편중을 세밀하게 관리하는 제외입니다.',
        high_31_45_4_plus: '후반 번호대 과밀을 줄여 높은 숫자 위주 후보를 정리할 때 효과적입니다.',
        tight_range: '숫자 폭이 좁은 조합을 빼고 더 넓게 퍼진 조합만 보고 싶을 때 가장 직관적입니다.',
        extreme_sum: '합계가 너무 낮거나 높은 극단 조합을 한 번에 걷어내는 대표 합계 제외입니다.',
        sum_low_100: '합계가 낮은 조합을 덜어내 낮은 번호 쏠림까지 함께 정리하고 싶을 때 잘 맞습니다.',
        sum_high_180: '합계가 높은 조합을 줄여 높은 번호 위주 흐름을 마지막으로 다듬는 제외입니다.',
        prime_4_plus: '소수가 지나치게 많은 패턴을 줄여 숫자 성질이 한쪽으로 기운 조합을 정리합니다.',
        prime_5_plus: '소수 편중이 매우 심한 조합만 별도로 걷어내는 정밀 제외입니다.',
        prime_1_or_less: '소수가 거의 없는 조합을 강하게 줄여 숫자 성격을 더 고르게 맞추는 제외입니다.',
        prime_0: '소수가 하나도 없는 조합만 마지막에 세밀하게 덜어내는 보정 제외입니다.',
        exclude_number: '자동 규칙과 별개로 이번 회차에 개인적으로 빼고 싶은 번호를 직접 반영하는 제외입니다.'
    };

    Object.keys(RULE_NARRATIVES).forEach(ruleId => {
        const narrative = RULE_NARRATIVES[ruleId];
        if (narrative && RULE_DETAILS[ruleId]) {
            RULE_DETAILS[ruleId] = RULE_DETAILS[ruleId] + ' ' + narrative;
        }
    });

    global.LottoRules = {
        PRESETS,
        PRESETS_LABEL,
        RULE_DETAILS,
        RULE_NARRATIVES,
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
    };
})(window);
