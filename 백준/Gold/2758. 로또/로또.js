const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = Number(input[0]);

for (let tc = 1; tc <= T; tc++) {
  const [n, m] = input[tc].split(" ").map(Number);

  // dp[i][j] = i번째 숫자를 j로 선택했을 때 경우의 수
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  // 첫 번째 숫자는 1~m까지 가능
  for (let j = 1; j <= m; j++) dp[1][j] = 1;

  for (let i = 2; i <= n; i++) {
    // dp[i-1]의 누적합 prefixSum 계산
    const prefixSum = Array(m + 1).fill(0);
    for (let j = 1; j <= m; j++) {
      prefixSum[j] = prefixSum[j - 1] + dp[i - 1][j];
    }

    for (let j = 1; j <= m; j++) {
      const maxPrev = Math.floor(j / 2);
      if (maxPrev >= 1) {
        dp[i][j] = prefixSum[maxPrev]; // 누적합 이용
      }
    }
  }

  // 마지막 숫자를 선택한 경우의 합
  let ans = 0;
  for (let j = 1; j <= m; j++) ans += dp[n][j];
  console.log(ans);
}
