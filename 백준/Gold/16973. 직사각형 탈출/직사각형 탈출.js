const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

// 격자 입력
const grid = [];
for (let i = 1; i <= N; i++) {
  grid.push(input[i].split(" ").map(Number));
}

// 직사각형 정보와 시작/도착 좌표
const [H, W, Sr, Sc, Fr, Fc] = input[N + 1].split(" ").map(Number);

// 2D prefix sum으로 벽 개수 미리 계산
const prefixSum = Array(N + 1)
  .fill(null)
  .map(() => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    prefixSum[i][j] = grid[i - 1][j - 1] + prefixSum[i - 1][j] + prefixSum[i][j - 1] - prefixSum[i - 1][j - 1];
  }
}

// O(1)으로 직사각형 영역의 벽 개수 확인
function hasWall(r, c) {
  // 범위 체크
  if (r < 0 || r + H > N || c < 0 || c + W > M) {
    return true;
  }

  // (r,c)부터 (r+H-1, c+W-1)까지의 벽 개수
  const r1 = r + 1,
    c1 = c + 1; // 1-indexed로 변환
  const r2 = r + H,
    c2 = c + W;

  const wallCount = prefixSum[r2][c2] - prefixSum[r1 - 1][c2] - prefixSum[r2][c1 - 1] + prefixSum[r1 - 1][c1 - 1];

  return wallCount > 0;
}

// BFS
const queue = [[Sr - 1, Sc - 1, 0]]; // 0-indexed로 변환
const visited = Array(N)
  .fill(null)
  .map(() => Array(M).fill(false));
visited[Sr - 1][Sc - 1] = true;

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

while (queue.length > 0) {
  const [r, c, moves] = queue.shift();

  // 도착점 확인
  if (r === Fr - 1 && c === Fc - 1) {
    console.log(moves);
    return;
  }

  // 4방향 이동
  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;

    if (nr >= 0 && nr < N && nc >= 0 && nc < M && !visited[nr][nc] && !hasWall(nr, nc)) {
      visited[nr][nc] = true;
      queue.push([nr, nc, moves + 1]);
    }
  }
}

console.log(-1);
