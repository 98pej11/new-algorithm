const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);

const cost = Array.from({ length: V }, () => Array(V).fill(Infinity));

for (let i = 0; i < V; i++) {
  cost[i][i] = 0;
}

for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  const u = a - 1;
  const v = b - 1;

  cost[u][v] = c;
}

// 플로이드-워셜
for (let k = 0; k < V; k++) {
  for (let i = 0; i < V; i++) {
    if (cost[i][k] === Infinity) continue;
    for (let j = 0; j < V; j++) {
      if (cost[k][j] === Infinity) continue;
      const val = cost[i][k] + cost[k][j];
      if (val < cost[i][j]) cost[i][j] = val;
    }
  }
}

// 최소 사이클 계산 (i -> j -> i)
let min = Infinity;
for (let i = 0; i < V; i++) {
  for (let j = 0; j < V; j++) {
    if (i !== j && cost[i][j] !== Infinity && cost[j][i] !== Infinity) {
      min = Math.min(min, cost[i][j] + cost[j][i]);
    }
  }
}

console.log(min === Infinity ? -1 : min);
