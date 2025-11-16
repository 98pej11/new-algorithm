const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [M, N] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((line) => line.split(" ").map(Number));

// dp 배열 초기화 (-1 = 아직 계산 안함)
const dp = Array.from({ length: M }, () => Array(N).fill(-1));

// 상, 하, 좌, 우
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

console.log(dfs(0, 0));

function dfs(x, y) {
  // 목표 도착
  if (x === M - 1 && y === N - 1) return 1;

  // 이미 계산된 경우
  if (dp[x][y] !== -1) return dp[x][y];

  dp[x][y] = 0;

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < M && ny >= 0 && ny < N && arr[x][y] > arr[nx][ny]) {
      dp[x][y] += dfs(nx, ny);
    }
  }

  return dp[x][y];
}
