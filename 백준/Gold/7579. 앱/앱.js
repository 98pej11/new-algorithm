const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const mem = input[1].split(" ").map(Number);
const cost = input[2].split(" ").map(Number);

const max = cost.reduce((a, b) => a + b, 0);

const dp = Array(max + 1).fill(0);

for (let i = 0; i < N; i++) {
  const m = mem[i];
  const c = cost[i];

  for (let j = max; j >= c; j--) {
    dp[j] = Math.max(dp[j], dp[j - c] + m);
  }
}

let answer = Infinity;
for (let c = 0; c <= max; c++) {
  if (dp[c] >= M) {
    answer = c;
    break;
  }
}

console.log(answer);
