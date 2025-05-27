function solution(money) {
    let N = money.length;
    
    // dp1: 첫 번째 집을 포함하는 경우 (마지막 집은 포함하지 않음)
    let dp1 = Array.from({ length: N }, () => 0);
    dp1[0] = money[0];
    dp1[1] = Math.max(money[0], money[1]);
    
    for (let i = 2; i < N - 1; i++) {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i]);
    }
    
    // dp2: 첫 번째 집을 포함하지 않는 경우 (첫 번째 집은 제외하고 계산)
    let dp2 = Array.from({ length: N }, () => 0);
    dp2[1] = money[1];
    
    for (let i = 2; i < N; i++) {
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]);
    }
    
    // 두 경우의 최대값을 반환
    return Math.max(dp1[N - 2], dp2[N - 1]);
}
