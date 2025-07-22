function solution(sequence) {
    const n = sequence.length;
    
    // 펄스 수열 두 가지 경우를 위한 변수
    let maxSum1 = -Infinity;
    let maxSum2 = -Infinity;

    // 현재까지의 연속 펄스 부분수열 합
    let currSum1 = 0;
    let currSum2 = 0;

    for (let i = 0; i < n; i++) {
        // i가 짝수면 [1, -1, 1, -1...] 형태에서 1
        const pulse1 = i % 2 === 0 ? 1 : -1;
        // i가 짝수면 [-1, 1, -1, 1...] 형태에서 -1
        const pulse2 = i % 2 === 0 ? -1 : 1;

        // 원소에 펄스 적용
        const val1 = sequence[i] * pulse1;
        const val2 = sequence[i] * pulse2;

        // Kadane's algorithm 적용
        currSum1 = Math.max(val1, currSum1 + val1);
        currSum2 = Math.max(val2, currSum2 + val2);

        // 최대값 갱신
        maxSum1 = Math.max(maxSum1, currSum1);
        maxSum2 = Math.max(maxSum2, currSum2);
    }

    return Math.max(maxSum1, maxSum2);
}
