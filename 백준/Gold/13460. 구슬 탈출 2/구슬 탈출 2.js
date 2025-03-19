const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(""));

const directions = [
  [0, -1], // 왼쪽
  [0, 1], // 오른쪽
  [-1, 0], // 위쪽
  [1, 0], // 아래쪽
];

let red, blue, hole;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "R") red = [i, j];
    if (map[i][j] === "B") blue = [i, j];
    if (map[i][j] === "O") hole = [i, j];
  }
}

function bfs() {
  const queue = [[...red, ...blue, 0]];
  const visited = new Set();
  visited.add(`${red[0]},${red[1]},${blue[0]},${blue[1]}`);

  while (queue.length) {
    let [rx, ry, bx, by, depth] = queue.shift();
    if (depth >= 10) return -1;

    for (const [dx, dy] of directions) {
      let [nrx, nry, rCount] = move(rx, ry, dx, dy);
      let [nbx, nby, bCount] = move(bx, by, dx, dy);

      if (map[nbx][nby] === "O") continue; // 파란 구슬이 빠지면 실패
      if (map[nrx][nry] === "O") return depth + 1; // 빨간 구슬이 빠지면 성공

      if (nrx === nbx && nry === nby) {
        if (rCount > bCount) (nrx -= dx), (nry -= dy);
        else (nbx -= dx), (nby -= dy);
      }

      const state = `${nrx},${nry},${nbx},${nby}`;
      if (!visited.has(state)) {
        visited.add(state);
        queue.push([nrx, nry, nbx, nby, depth + 1]);
      }
    }
  }
  return -1;
}

function move(x, y, dx, dy) {
  let count = 0;
  while (map[x + dx][y + dy] !== "#" && map[x][y] !== "O") {
    x += dx;
    y += dy;
    count++;
  }
  return [x, y, count];
}

console.log(bfs());
