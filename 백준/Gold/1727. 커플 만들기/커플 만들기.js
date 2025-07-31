const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const boys = input[1].split(" ").map(Number);
const girls = input[2].split(" ").map(Number);

boys.sort((a, b) => a - b);
girls.sort((a, b) => a - b);

const dp = Array.from({ length: N + 1 }, () => Array.from({ length: M + 1 }, () => 0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    // 남자와 여자 수가 같을 경우: 모두가 짝을 이뤄 커플이 되어야함
    if (i === j) {
      dp[i][j] = dp[i - 1][j - 1] + Math.abs(boys[i - 1] - girls[j - 1]);
    }
    // 남자가 더 많을 경우: 여자는 모두 짝이 되지만, 남자는 될수도 안될수도있음
    else if (i > j) {
      // 되는경우와 안되는 경우를 고려
      dp[i][j] = Math.min(dp[i - 1][j - 1] + Math.abs(boys[i - 1] - girls[j - 1]), dp[i - 1][j]);
    }
    // 여자가 더 많을 경우: 남자는 모두 짝이 되지만, 여자는 될수도 안될수도있음
    else {
      dp[i][j] = Math.min(dp[i - 1][j - 1] + Math.abs(boys[i - 1] - girls[j - 1]), dp[i][j - 1]);
    }
  }
}

console.log(dp[N][M]);
