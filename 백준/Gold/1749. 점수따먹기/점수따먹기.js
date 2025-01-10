const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
input.shift();

const map = Array.from({ length: N }, () => Array(M).fill(0));

for (let i = 0; i < N; i++) {
  map[i] = input[i].split(" ").map(Number);
}

const prefixSum = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    prefixSum[i][j] = map[i - 1][j - 1] + prefixSum[i - 1][j] + prefixSum[i][j - 1] - prefixSum[i - 1][j - 1];
  }
}

let max = -Infinity;

for (let r1 = 1; r1 <= N; r1++) {
  for (let c1 = 1; c1 <= M; c1++) {
    for (let r2 = r1; r2 <= N; r2++) {
      for (let c2 = c1; c2 <= M; c2++) {
        const sum = prefixSum[r2][c2] - prefixSum[r1 - 1][c2] - prefixSum[r2][c1 - 1] + prefixSum[r1 - 1][c1 - 1];
        max = Math.max(max, sum);
      }
    }
  }
}

console.log(max);