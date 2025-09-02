const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((line) => line.split(""));

const dx = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 0, 1, -1, 0, 1];

let Ax, Ay, Bx, By;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "A") {
      Ax = i;
      Ay = j;
      board[i][j] = ".";
    } else if (board[i][j] === "B") {
      Bx = i;
      By = j;
      board[i][j] = ".";
    }
  }
}

const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => Array.from({ length: N }, () => Array(M).fill(false))));

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
  }

  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    return this.queue[this.front++];
  }

  isEmpty() {
    return this.front === this.queue.length;
  }
}

const queue = new Queue();
queue.enqueue([Ax, Ay, Bx, By, 0]);
visited[Ax][Ay][Bx][By] = true;

let found = false;

while (!queue.isEmpty()) {
  const [ax, ay, bx, by, turns] = queue.dequeue();

  if (ax === Bx && ay === By && bx === Ax && by === Ay) {
    console.log(turns);
    found = true;
    break;
  }

  for (let i = 0; i < 9; i++) {
    const nax = ax + dx[i];
    const nay = ay + dy[i];
    if (nax < 0 || nax >= N || nay < 0 || nay >= M) continue;
    if (board[nax][nay] === "X") continue;

    for (let j = 0; j < 9; j++) {
      const nbx = bx + dx[j];
      const nby = by + dy[j];
      if (nbx < 0 || nbx >= N || nby < 0 || nby >= M) continue;
      if (board[nbx][nby] === "X") continue;

      if (nax === nbx && nay === nby) continue;
      if (nax === bx && nay === by && nbx === ax && nby === ay) continue;

      if (!visited[nax][nay][nbx][nby]) {
        visited[nax][nay][nbx][nby] = true;
        queue.enqueue([nax, nay, nbx, nby, turns + 1]);
      }
    }
  }
}

if (!found) console.log(-1);
