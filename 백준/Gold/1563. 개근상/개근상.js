const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const dp = Array.from({ length: N + 1 }, () => Array.from({ length: 2 }, () => new Array(3).fill(0)));

dp[1][0][0] = 1;
dp[1][1][0] = 1; // 지각
dp[1][0][1] = 1; // 결석

for (let i = 2; i <= N; i++) {
  dp[i][0][0] = (dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2]) % 1000000;
  dp[i][0][1] = dp[i - 1][0][0] % 1000000;
  dp[i][0][2] = dp[i - 1][0][1] % 1000000;
  dp[i][1][0] = (dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2] + dp[i - 1][1][0] + dp[i - 1][1][1] + dp[i - 1][1][2]) % 1000000;
  dp[i][1][1] = dp[i - 1][1][0] % 1000000;
  dp[i][1][2] = dp[i - 1][1][1] % 1000000;
}

let answer = dp[N][0][0] + dp[N][0][1] + dp[N][0][2] + dp[N][1][0] + dp[N][1][1] + dp[N][1][2];
console.log(answer % 1000000);
