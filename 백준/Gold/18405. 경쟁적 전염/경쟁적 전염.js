const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
let board = [];
let data = [];

for (let i = 1; i <= N; i++) {
  let row = input[i].split(" ").map(Number);
  board.push(row);

  for (let j = 0; j < N; j++) {
    if (row[j] !== 0) {
      // (바이러스 번호, 시간, x, y)
      data.push([row[j], 0, i - 1, j]);
    }
  }
}

// S, X, Y
const [S, X, Y] = input[N + 1].split(" ").map(Number);

// 바이러스 번호 기준 오름차순 정렬 (작은 번호가 먼저 확산)
data.sort((a, b) => a[0] - b[0]);

// Queue 클래스
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
    let removed = this.queue[this.front];
    this.front++;
    return removed;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

// Queue 사용
let queue = new Queue();
for (let item of data) {
  queue.enqueue(item);
}

// 방향 배열
const dir = [
  [0, 1], // 오른쪽
  [1, 0], // 아래
  [0, -1], // 왼쪽
  [-1, 0], // 위
];

while (!queue.isEmpty()) {
  let [virus, sec, x, y] = queue.dequeue();

  if (sec === S) break; // S초 후 멈춤

  for (let [dx, dy] of dir) {
    let nx = x + dx;
    let ny = y + dy;

    if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
      if (board[nx][ny] === 0) {
        board[nx][ny] = virus;
        queue.enqueue([virus, sec + 1, nx, ny]);
      }
    }
  }
}

console.log(board[X - 1][Y - 1]);
