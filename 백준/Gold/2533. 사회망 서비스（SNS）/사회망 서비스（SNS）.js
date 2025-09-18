const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
// console.log(N);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
  let [u, v] = input[i].split(" ").map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

const dp = Array.from({ length: N + 1 }, () => Array.from({ length: 2 }, () => 0));
const visited = Array.from({ length: N + 1 }, () => false);

// console.log(graph);
DFS(1);

// 0 = 얼리어답터일때 = 자식이 얼리어답터여도되고 아니여도되고
// 1 = 아닐때 = 자식이 얼리어답터여야함

function DFS(node) {
  visited[node] = true;
  dp[node][0] = 1; // 얼리어답터일때

  for (let child of graph[node]) {
    if (!visited[child]) {
      DFS(child);
      dp[node][0] += Math.min(dp[child][0], dp[child][1]);
      dp[node][1] += dp[child][0];
    }
  }
}

console.log(Math.min(dp[1][0], dp[1][1]));
