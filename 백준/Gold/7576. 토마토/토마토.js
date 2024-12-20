const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number);
input.shift();

class Queue {
  constructor() {
    this.storage = [];
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  enqueue(item) {
    this.storage[this.rear] = item;
    this.rear++;
  }

  dequeue() {
    let removed = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;

    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return removed;
  }
}

const map = new Array(N).fill(null).map(() => new Array(M).fill(null));
const queue = new Queue();
let cnt = 0;

for (let i = 0; i < N; i++) {
  let arr = input[i].split(" ").map(Number);
  for (j = 0; j < M; j++) {
    map[i][j] = arr[j];
    if (map[i][j] === 1) {
      queue.enqueue([i, j, 0]);
    }
    if (map[i][j] === 0) cnt++;
  }
}

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

if (cnt === 0) {
  console.log(0);
} else {
  let result = BFS();

  if (result > 0) console.log(result);
  else console.log(-1);
}

function BFS() {
  while (queue.size() > 0) {
    let cur = queue.dequeue();

    for (let d = 0; d < 4; d++) {
      let nr = cur[0] + dir[d][0];
      let nc = cur[1] + dir[d][1];

      if (nr >= 0 && nr < N && nc >= 0 && nc < M && map[nr][nc] === 0) {
        cnt--;
        if (cnt === 0) return cur[2] + 1;

        map[nr][nc] = 1;
        queue.enqueue([nr, nc, cur[2] + 1]);
      }
    }
  }
  return 0;
}
