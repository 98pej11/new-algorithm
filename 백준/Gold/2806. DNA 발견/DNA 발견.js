const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0]);
const dna = input[1];

const dp = Array.from({ length: 2 }, () => Array(N).fill(0));

// 초기 세팅 ..
if (dna[0] === 'A') {
    dp[0][0] = 0; // A로 끝나려면 0번 변환
    dp[1][0] = 1; // B로 끝나려면 1번 변환
} else {
    dp[0][0] = 1; // A로 끝나려면 1번 변환
    dp[1][0] = 0; // B로 끝나려면 0번 변환
}

for (let i = 1; i < N; i++) {
    const c = dna[i];

    if (c === 'A') {
        dp[0][i] = dp[0][i - 1];
        dp[1][i] = Math.min(dp[1][i - 1] + 1, dp[0][i] + 1);
    } else { // B
        dp[1][i] = dp[1][i - 1];
        dp[0][i] = Math.min(dp[0][i - 1] + 1, dp[1][i] + 1);
    }
}

const ans = Math.min(dp[0][N - 1], dp[1][N - 1] + 1);
console.log(ans);
