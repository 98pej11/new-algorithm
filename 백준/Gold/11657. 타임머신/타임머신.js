const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const edges = [];

for (let i = 1; i <= M; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  edges.push([a, b, c]);
}

const dist = Array(N + 1).fill(Infinity);
dist[1] = 0;

let isCycle = false;

for (let i = 1; i <= N; i++) {
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[v] > dist[u] + w) {
      dist[v] = dist[u] + w;
      // 음수 사이클인지 확인
      if (i === N) isCycle = true;
    }
  }
}

if (isCycle) {
  console.log(-1);
} else {
  for (let i = 2; i <= N; i++) {
    console.log(dist[i] === Infinity ? -1 : dist[i]);
  }
}
