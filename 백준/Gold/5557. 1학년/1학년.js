const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const arr = input[1].split(" ").map(Number);

// i번째 까지 계산했을때 j가 되는 경우의 수
const dp = Array.from({ length: N - 1 }, () => Array(21).fill(BigInt(0)));
dp[0][arr[0]] = BigInt(1);

for (let i = 1; i < N - 1; i++) {
  let cur = arr[i];

  for (let j = 0; j <= 20; j++) {
    if (j - cur >= 0) dp[i][j - cur] = dp[i - 1][j] + dp[i][j - cur];
    if (j + cur <= 20) dp[i][j + cur] = dp[i - 1][j] + dp[i][j + cur];
  }
}
console.log(dp[N - 2][arr[N - 1]].toString());
