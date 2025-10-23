const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const dir = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(item) {
    this.queue[this.rear++] = item;
  }

  dequeue() {
    return this.queue[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

let arr = Array.from({ length: N }, (_, i) => input[i + 1].split(" ").map(Number));

let groupId = 2;
let groupSize = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 1) {
      let size = BFS(i, j, groupId);
      groupSize[groupId] = size;
      groupId++;
    }
  }
}

let max = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 0) {
      let size = 1;
      let set = new Set();

      for (let d = 0; d < 4; d++) {
        let nr = i + dir[d][0];
        let nc = j + dir[d][1];

        if (nr >= 0 && nr < N && nc >= 0 && nc < M && arr[nr][nc] > 1) {
          set.add(arr[nr][nc]);
        }
      }

      for (let idx of set) {
        size += groupSize[idx];
      }

      max = Math.max(max, size);
    }
  }
}

console.log(max);

function BFS(r, c, groupId) {
  let queue = new Queue();
  queue.enqueue([r, c]);

  arr[r][c] = groupId;
  let size = 1;

  while (!queue.isEmpty()) {
    let [x, y] = queue.dequeue();

    for (let d = 0; d < 4; d++) {
      let nx = x + dir[d][0];
      let ny = y + dir[d][1];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && arr[nx][ny] === 1) {
        arr[nx][ny] = groupId;
        queue.enqueue([nx, ny]);
        size++;
      }
    }
  }

  return size;
}
