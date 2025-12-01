const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const board = input.slice(1).map((line) => line.split("").map(Number));

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
    if (this.isEmpty()) return null;
    const removed = this.queue[this.front];
    this.front++;
    return removed;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const arr = Array.from({ length: N }, () => Array(N).fill(Infinity));

const queue = new Queue();
queue.enqueue([0, 0]);
arr[0][0] = 0;

while (!queue.isEmpty()) {
  const [x, y] = queue.dequeue();

  for (const [dx, dy] of dir) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

    const cost = board[nx][ny] === 0 ? 1 : 0;

    if (arr[nx][ny] > arr[x][y] + cost) {
      arr[nx][ny] = arr[x][y] + cost;
      queue.enqueue([nx, ny]);
    }
  }
}

console.log(arr[N - 1][N - 1]);
