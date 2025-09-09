const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

let arr = Array.from({ length: N }, () => []);

for (let i = 1; i <= N; i++) {
  arr[i - 1] = input[i].split(" ").map(Number);
}

let visited = Array.from({ length: N }, () => Array(M).fill(false));
let max = 0;

const dirs = [
  [
    [0, 0],
    [-1, 0],
    [0, 1],
  ], // 상-우
  [
    [0, 0],
    [-1, 0],
    [0, -1],
  ], // 상-좌
  [
    [0, 0],
    [1, 0],
    [0, 1],
  ], // 하-우
  [
    [0, 0],
    [1, 0],
    [0, -1],
  ], // 하-좌
];

DFS(0, 0, 0);
console.log(max);

function DFS(r, c, sum) {
  if (c >= M) {
    r++;
    c = 0;
  }
  if (r >= N) {
    max = Math.max(max, sum);
    return;
  }

  // 현재 칸에 부메랑을 놓을 수 있는지 확인
  for (let dir of dirs) {
    let canPlace = true;
    let tempSum = 0;

    for (let [dr, dc] of dir) {
      let nr = r + dr;
      let nc = c + dc;
      if (nr < 0 || nr >= N || nc < 0 || nc >= M || visited[nr][nc]) {
        canPlace = false;
        break;
      }
      tempSum += arr[nr][nc];
    }

    if (canPlace) {
      // 중심 칸 값은 두 번 계산
      tempSum += arr[r][c];
      for (let [dr, dc] of dir) visited[r + dr][c + dc] = true;

      DFS(r, c + 1, sum + tempSum);

      for (let [dr, dc] of dir) visited[r + dr][c + dc] = false;
    }
  }

  // 현재 칸에 아무 것도 놓지 않고 넘어가기
  DFS(r, c + 1, sum);
}
