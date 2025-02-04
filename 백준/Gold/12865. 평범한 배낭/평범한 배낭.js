const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, W] = input[0].split(" ").map(Number);

const dp = Array(W + 1).fill(0);

for (let i = 1; i <= N; i++) {
  const [w, v] = input[i].split(" ").map(Number);

  for (let j = W; j >= w; j--) {
    dp[j] = Math.max(dp[j], dp[j - w] + v);
  }
}

console.log(dp[W]);
