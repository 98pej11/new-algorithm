const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

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
    let removed = this.queue[this.front++];
    return removed;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

const [N, M] = input[0].split(" ").map(Number);
const map = [];
let red, blue;

for (let i = 1; i <= N; i++) {
  let line = input[i].split("");
  map.push(line);

  for (let j = 0; j < M; j++) {
    if (line[j] === "R") red = [i - 1, j];
    if (line[j] === "B") blue = [i - 1, j];
  }
}

let queue = new Queue();
let visited = new Set();

queue.enqueue([...red, ...blue, 0]);
visited.add([...red, ...blue].join(","));

// console.log(map);

console.log(BFS());

function move(x, y, dx, dy) {
  let count = 0;
  while (map[x + dx][y + dy] !== "#") {
    x += dx;
    y += dy;
    count++;
    if (map[x][y] === "O") break;
  }

  return [x, y, count];
}

function BFS() {
  while (!queue.isEmpty()) {
    const [rx, ry, bx, by, count] = queue.dequeue();

    if (count >= 10) continue;

    for (let [dx, dy] of dir) {
      let [nrx, nry, rCnt] = move(rx, ry, dx, dy);
      let [nbx, nby, bCnt] = move(bx, by, dx, dy);

      if (map[nbx][nby] === "O") continue;
      if (map[nrx][nry] === "O") return 1;

      if (nrx === nbx && nry === nby) {
        if (rCnt > bCnt) {
          nrx -= dx;
          nry -= dy;
        } else {
          nbx -= dx;
          nby -= dy;
        }
      }

      if (!visited.has([nrx, nry, nbx, nby].join(","))) {
        visited.add([nrx, nry, nbx, nby].join(","));
        queue.enqueue([nrx, nry, nbx, nby, count + 1]);
      }
    }
  }

  return 0;
}
