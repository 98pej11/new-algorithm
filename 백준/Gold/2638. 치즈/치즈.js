const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

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

const dir = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

let map = [];

for (let i = 1; i <= N; i++) {
  let cur = input[i].split(" ").map(Number);
  map.push(cur);
}

let time = 0;

while (1) {
  let visited = BFS();

  if (!calc(visited)) break;

  time++;
}

console.log(time);

function BFS() {
  const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
  const queue = new Queue();

  queue.enqueue([0, 0]);

  while (!queue.isEmpty()) {
    let [r, c] = queue.dequeue();

    for (let d = 0; d < 4; d++) {
      let [dr, dc] = dir[d];

      let nr = r + dr;
      let nc = c + dc;

      if (nr >= 0 && nr < N && nc >= 0 && nc < M && !visited[nr][nc]) {
        if (map[nr][nc] === 0) {
          visited[nr][nc] = true;
          queue.enqueue([nr, nc]);
        }
      }
    }
  }
  return visited;
}

function calc(visited) {
  let copyMap = map.map((row) => [...row]);
  let tf = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let cnt = 0;

      if (map[i][j] === 1) {
        tf = true;
        for (let d = 0; d < 4; d++) {
          let [dr, dc] = dir[d];
          let nr = i + dr;
          let nc = j + dc;

          if (nr >= 0 && nr < N && nc >= 0 && nc < M && visited[nr][nc]) {
            cnt++;
          }
        }
      }
      if (cnt >= 2) {
        copyMap[i][j] = 0;
      }
    }
  }

  if (!tf) return false;

  map = copyMap.map((row) => [...row]);
  return true;
}
