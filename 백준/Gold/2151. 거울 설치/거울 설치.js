const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(item) {
    this.queue.push(item);
    this.rear++;
  }
  dequeue() {
    return this.queue[this.front++];
  }
  isEmpty() {
    return this.front === this.rear;
  }
}

const N = Number(input[0]);
const map = input.slice(1).map((row) => row.split(""));

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let doors = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "#") doors.push([i, j]);
  }
}

const [sr, sc] = doors[0];
const [er, ec] = doors[1];

const cost = Array.from({ length: N }, () => Array.from({ length: N }, () => Array(4).fill(Infinity)));

const queue = new Queue();

for (let d = 0; d < 4; d++) {
  cost[sr][sc][d] = 0;
  queue.enqueue([sr, sc, d]);
}

while (!queue.isEmpty()) {
  const [r, c, dir] = queue.dequeue();
  const cnt = cost[r][c][dir];

  const [dr, dc] = dirs[dir];
  const nr = r + dr;
  const nc = c + dc;

  if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
  if (map[nr][nc] === "*") continue;

  // 직진
  if (cost[nr][nc][dir] > cnt) {
    cost[nr][nc][dir] = cnt;
    queue.enqueue([nr, nc, dir]);
  }

  // 거울 설치
  if (map[nr][nc] === "!") {
    for (const nd of [(dir + 1) % 4, (dir + 3) % 4]) {
      if (cost[nr][nc][nd] > cnt + 1) {
        cost[nr][nc][nd] = cnt + 1;
        queue.enqueue([nr, nc, nd]);
      }
    }
  }
}

let answer = Infinity;
for (let d = 0; d < 4; d++) {
  answer = Math.min(answer, cost[er][ec][d]);
}

console.log(answer);
