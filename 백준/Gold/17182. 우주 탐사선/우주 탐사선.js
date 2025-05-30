const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number); // 행성 개수와 ana호 발사 행성 위치
input.shift();

const graph = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
const visited = Array(N).fill(false);
visited[K] = true;

for (let i = 0; i < N; i++) {
  graph[i] = input[i].split(" ").map(Number);
}

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
    }
  }
}
let min = Infinity;

DFS(K, 0, 1);

console.log(min);

function DFS(start, sum, count) {
  if (count === N) {
    min = Math.min(min, sum);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      DFS(i, sum + graph[start][i], count + 1);
      visited[i] = false;
    }
  }
}
