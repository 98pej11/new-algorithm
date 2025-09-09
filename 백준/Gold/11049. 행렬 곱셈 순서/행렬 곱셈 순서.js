const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0]);
const matrices = input.slice(1).map((line) => line.split(" ").map(Number));

// 크기 배열 만들기
let dims = [];
dims.push(matrices[0][0]);
for (let i = 0; i < N; i++) {
  dims.push(matrices[i][1]);
}

// dp[i][j] = i번째 행렬부터 j번째 행렬까지 최소 곱셈 연산 횟수
let dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

for (let len = 2; len <= N; len++) {
  for (let i = 1; i <= N - len + 1; i++) {
    let j = i + len - 1;
    dp[i][j] = Infinity;
    for (let k = i; k < j; k++) {
      const cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
      if (cost < dp[i][j]) {
        dp[i][j] = cost;
      }
    }
  }
}

console.log(dp[1][N]);
