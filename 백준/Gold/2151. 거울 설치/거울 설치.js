const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const map = input.slice(1).map((row) => row.split(""));

const dirs = [
  [-1, 0], // 상
  [0, 1], // 우
  [1, 0], // 하
  [0, -1], // 좌
];

// 문 위치 찾기
let doors = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "#") doors.push([i, j]);
  }
}

const [sr, sc] = doors[0];
const [er, ec] = doors[1];

// cost[r][c][dir]
const cost = Array.from({ length: N }, () => Array.from({ length: N }, () => Array(4).fill(Infinity)));

// 일반 큐
const queue = [];

// 시작: 4방향
for (let d = 0; d < 4; d++) {
  cost[sr][sc][d] = 0;
  queue.push([sr, sc, d]);
}

while (queue.length) {
  const [r, c, dir] = queue.shift();
  const cnt = cost[r][c][dir];

  const [dr, dc] = dirs[dir];
  const nr = r + dr;
  const nc = c + dc;

  if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
  if (map[nr][nc] === "*") continue;

  // 1️⃣ 직진
  if (cost[nr][nc][dir] > cnt) {
    cost[nr][nc][dir] = cnt;
    queue.push([nr, nc, dir]);
  }

  // 2️⃣ 거울 설치
  if (map[nr][nc] === "!") {
    for (const nd of [(dir + 1) % 4, (dir + 3) % 4]) {
      if (cost[nr][nc][nd] > cnt + 1) {
        cost[nr][nc][nd] = cnt + 1;
        queue.push([nr, nc, nd]);
      }
    }
  }
}

let answer = Infinity;
for (let d = 0; d < 4; d++) {
  answer = Math.min(answer, cost[er][ec][d]);
}

console.log(answer);
