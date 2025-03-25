const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, X] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const reverseGraph = Array.from({ length: N + 1 }, () => []);

// 그래프와 반대 방향 그래프 생성
for (let i = 1; i <= M; i++) {
  const [start, end, time] = input[i].split(" ").map(Number);
  graph[start].push([end, time]);
  reverseGraph[end].push([start, time]);  // 반대 방향 그래프 생성
}

class PriorityQueue {
  constructor() {
    this.queue = [];
    this.front = 0;
  }

  enqueue(node, cost) {
    this.queue.push({ node, cost });
    // 비용을 기준으로 정렬 (오름차순)
    this.queue.sort((a, b) => a.cost - b.cost);
  }

  dequeue() {
    return this.queue[this.front++];
  }

  isEmpty() {
    return this.front === this.queue.length;
  }
}

// 다익스트라 함수
function dijkstra(start, graph) {
  const dis = new Array(N + 1).fill(Infinity);
  dis[start] = 0;

  const pq = new PriorityQueue();
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { node, cost } = pq.dequeue();

    if (cost > dis[node]) continue;

    for (const [next, time] of graph[node]) {
      const newCost = cost + time;
      if (newCost < dis[next]) {
        dis[next] = newCost;
        pq.enqueue(next, newCost);
      }
    }
  }

  return dis;
}

// X에서 다른 마을로 가는 최단 경로
const goDistances = dijkstra(X, graph);

// X로 가는 각 마을의 최단 경로 (반대 방향 그래프에서 계산)
const backDistances = dijkstra(X, reverseGraph);

// X에서 다른 마을로 가고, 그 마을에서 X로 돌아오는 시간을 계산
let maxTime = 0;
for (let i = 1; i <= N; i++) {
  maxTime = Math.max(maxTime, goDistances[i] + backDistances[i]);
}

console.log(maxTime);
