const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);

const tree = new Map();
for (let i = 1; i <= N; i++) {
  tree.set(i, []);
}

for (let i = 1; i < input.length; i++) {
  const data = input[i].split(" ").map(Number);
  const node = data[0];

  for (let j = 1; j < data.length - 1; j += 2) {
    const to = data[j];
    const cost = data[j + 1];
    tree.get(node).push([to, cost]);
  }
}

function findFarthest(start) {
  let visited = new Array(N + 1).fill(false);
  let maxDist = 0;
  let farthestNode = start;

  function DFS(node, dist) {
    visited[node] = true;
    if (dist > maxDist) {
      maxDist = dist;
      farthestNode = node;
    }

    for (let [next, cost] of tree.get(node)) {
      if (!visited[next]) {
        DFS(next, dist + cost);
      }
    }
  }

  DFS(start, 0);
  return [farthestNode, maxDist];
}

// 1. 임의의 노드(1)에서 가장 먼 노드 찾기
const [A] = findFarthest(1);

// 2. A에서 가장 먼 노드까지의 거리 찾기 → 트리의 지름
const [, maxDiameter] = findFarthest(A);

console.log(maxDiameter);
