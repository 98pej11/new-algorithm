const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const dp = Array.from({ length: N + 1 }, () => Array.from({ length: K + 1 }, () => 0));
const MOD = 1000000000;

dp[0][0] = 1;

for (let j = 1; j <= K; j++) {
  for (let i = 0; i <= N; i++) {
    for (let x = 0; x <= i; x++) {
      dp[i][j] = (dp[i][j] + dp[i - x][j - 1]) % MOD;
    }
  }
}

console.log(dp[N][K]);
