const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const map = input.map((line) => line.split(""));

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let answer = 0;
let visited = [];
let isBoom = false;

while (1) {
  visited = Array.from({ length: 12 }, () => Array(6).fill(false));
  isBoom = false;

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (map[i][j] !== "." && !visited[i][j]) {
        visited[i][j] = true;
        BFS(i, j);
      }
    }
  }
  if (!isBoom) break;
  answer++;
  moveDown();
}

console.log(answer);

function BFS(i, j) {
  const queue = [[i, j]];
  const equal = [[i, j]];
  const color = map[i][j];

  while (queue.length) {
    const [r, c] = queue.shift();

    for (const [dr, dc] of dir) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < 12 && nc >= 0 && nc < 6 && !visited[nr][nc] && map[nr][nc] === color) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
        equal.push([nr, nc]);
      }
    }
  }
  if (equal.length >= 4) {
    isBoom = true;

    for (const [r, c] of equal) {
      map[r][c] = ".";
    }
  }
}

function moveDown() {
  for (let j = 0; j < 6; j++) {
    const queue = [];

    for (let i = 11; i >= 0; i--) {
      if (map[i][j] !== ".") {
        queue.push(map[i][j]);
        map[i][j] = ".";
      }
    }

    let i = 11;
    while (queue.length) {
      map[i--][j] = queue.shift();
    }
  }
}
