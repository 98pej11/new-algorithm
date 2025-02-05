const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);

const arr = [];
for (let i = 1; i <= N; i++) {
  arr.push(input[i].split(" ").map(Number));
}

// 방향 (우, 하, 좌, 상)
const dir = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// DP 배열 (최대 이동 거리 저장)
const dp = Array.from({ length: N }, () => Array(N).fill(1));

// BFS 큐 사용
const queue = [];

// 모든 위치를 (값, 행, 열) 형태로 정렬하여 작은 값부터 큐에 넣기
const positions = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    positions.push([arr[i][j], i, j]);
  }
}

// 값이 작은 순으로 정렬 (작은 값부터 탐색)
positions.sort((a, b) => a[0] - b[0]);

// BFS 실행
for (const [value, r, c] of positions) {
  for (let d = 0; d < 4; d++) {
    let nr = r + dir[d][0];
    let nc = c + dir[d][1];

    if (nr >= 0 && nr < N && nc >= 0 && nc < N && arr[nr][nc] > value) {
      dp[nr][nc] = Math.max(dp[nr][nc], dp[r][c] + 1);
    }
  }
}

// dp 배열에서 최댓값 찾기
let maxPath = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    maxPath = Math.max(maxPath, dp[i][j]);
  }
}

console.log(maxPath);
