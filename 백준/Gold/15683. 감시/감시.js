const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const office = input.slice(1).map((line) => line.split(" ").map(Number));

const dirs = [
  [], // 0은 CCTV가 아님
  [[0], [1], [2], [3]], // 1번 CCTV
  [
    [0, 2],
    [1, 3],
  ], // 2번 CCTV
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ], // 3번 CCTV
  [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 0],
    [3, 0, 1],
  ], // 4번 CCTV
  [[0, 1, 2, 3]], // 5번 CCTV
];

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const cctvs = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const val = office[i][j];
    if (val >= 1 && val <= 5) cctvs.push([i, j, val]);
  }
}

let minBlind = Infinity;

function watch(tempMap, x, y, dir) {
  const nx = dx[dir];
  const ny = dy[dir];
  let cx = x + nx;
  let cy = y + ny;

  while (cx >= 0 && cx < N && cy >= 0 && cy < M && tempMap[cx][cy] !== 6) {
    if (tempMap[cx][cy] === 0) tempMap[cx][cy] = "#";
    cx += nx;
    cy += ny;
  }
}

function dfs(depth, map) {
  if (depth === cctvs.length) {
    let blind = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === 0) blind++;
      }
    }
    minBlind = Math.min(minBlind, blind);
    return;
  }

  const [x, y, type] = cctvs[depth];
  for (const dirSet of dirs[type]) {
    const temp = map.map((row) => [...row]);
    for (const d of dirSet) {
      watch(temp, x, y, d);
    }
    dfs(depth + 1, temp);
  }
}

dfs(0, office);
console.log(minBlind);
