const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const arr = Array.from({ length: N }, () => Array.from({ length: M }, () => null));
const visitedWithoutBreak = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
const visitedWithBreak = Array.from({ length: N }, () => Array.from({ length: M }, () => false));

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
    let removed = this.queue[this.front];
    this.front++;
    return removed;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

for (let i = 1; i <= N; i++) {
  arr[i - 1] = input[i].split("").map(Number);
}

const queue = new Queue();

// 시작점 방문 처리
if (arr[0][0] === 0) {
  visitedWithoutBreak[0][0] = true;
  queue.enqueue([0, 0, 1, false]); // 벽을 부수지 않고 가는 경로
} else {
  visitedWithBreak[0][0] = true;
  queue.enqueue([0, 0, 1, true]); // 벽을 부수고 가는 경로
}

console.log(BFS());

function BFS() {
  while (!queue.isEmpty()) {
    let [r, c, cost, isBreak] = queue.dequeue();

    if (r === N - 1 && c === M - 1) {
      return cost;
    }

    for (let i = 0; i < 4; i++) {
      let nr = r + dir[i][0];
      let nc = c + dir[i][1];

      if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        if (arr[nr][nc] === 1) {
          // 벽인 경우
          if (!isBreak && !visitedWithBreak[nr][nc]) {
            // 벽을 부수지 않은 상태에서만
            visitedWithBreak[nr][nc] = true;
            queue.enqueue([nr, nc, cost + 1, true]);
          }
        } else {
          // 빈 공간인 경우
          if (!isBreak && !visitedWithoutBreak[nr][nc]) {
            // 벽을 부수지 않은 상태에서만
            visitedWithoutBreak[nr][nc] = true;
            queue.enqueue([nr, nc, cost + 1, isBreak]);
          }
          if (isBreak && !visitedWithBreak[nr][nc]) {
            // 벽을 부순 상태에서는 그냥 지나감
            visitedWithBreak[nr][nc] = true;
            queue.enqueue([nr, nc, cost + 1, isBreak]);
          }
        }
      }
    }
  }

  return -1;
}
