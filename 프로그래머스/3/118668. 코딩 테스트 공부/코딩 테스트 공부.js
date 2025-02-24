function solution(alp, cop, problems) {
    let maxAlp = alp, maxCop = cop;

    // 목표 알고력과 코딩력 설정
    for (let [reqAlp, reqCop] of problems) {
        maxAlp = Math.max(maxAlp, reqAlp);
        maxCop = Math.max(maxCop, reqCop);
    }

    let dp = Array.from({ length: maxAlp + 1 }, () => Array(maxCop + 1).fill(Infinity));
    dp[alp][cop] = 0;

    for (let i = alp; i <= maxAlp; i++) {
        for (let j = cop; j <= maxCop; j++) {
            if (i < maxAlp) {
                dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
            }
            if (j < maxCop) {
                dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
            }

            for (let [reqAlp, reqCop, rewdAlp, rewdCop, cost] of problems) {
                if (i >= reqAlp && j >= reqCop) {
                    let newAlp = i + rewdAlp < maxAlp ? i + rewdAlp: maxAlp;
                    let newCop = j + rewdCop < maxCop ? j + rewdCop: maxCop;
                    // let newCop = Math.min(j + rewdCop, maxCop);
                    dp[newAlp][newCop] = Math.min(dp[newAlp][newCop], dp[i][j] + cost);
                }
            }
        }
    }
    
    return dp[maxAlp][maxCop];
}
