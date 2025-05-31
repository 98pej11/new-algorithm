const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M, H] = input[0].split(" ").map(Number);

let list = [];

for (let i = 1; i <= N; i++) {
  let cur = input[i].split(" ").map(Number);
  list.push(cur);
}

const dp = Array.from({ length: N + 1 }, () => Array.from({ length: H + 1 }, () => 0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= H; j++) {
    for (let item of list[i - 1]) {
      if (item === j) dp[i][j]++;
      else if (item < j) dp[i][j] += dp[i - 1][j - item];
    }
    dp[i][j] += dp[i - 1][j];
    dp[i][j] %= 10007;
  }
}

console.log(dp[N][H]);
