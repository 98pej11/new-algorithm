const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

let minWeight = 1;
let maxWeight = 0;

// 그래프 입력 처리
for (let i = 1; i <= M; i++) {
  const [A, B, C] = input[i].split(" ").map(Number);
  graph[A].push([B, C]);
  graph[B].push([A, C]);
  maxWeight = Math.max(maxWeight, C);
}

const [start, end] = input[M + 1].split(" ").map(Number);

// BFS 함수
function canMove(weight) {
  const visited = Array(N + 1).fill(false);
  const queue = [start];
  visited[start] = true;

  while (queue.length > 0) {
    const now = queue.shift();

    if (now === end) return true;

    for (const [next, limit] of graph[now]) {
      if (!visited[next] && limit >= weight) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }
  return false;
}

// 이분 탐색
let result = 0;

while (minWeight <= maxWeight) {
  const mid = Math.floor((minWeight + maxWeight) / 2);

  if (canMove(mid)) {
    result = mid;
    minWeight = mid + 1; // 더 무거운 무게 시도
  } else {
    maxWeight = mid - 1; // 무게 줄이기
  }
}

console.log(result);
