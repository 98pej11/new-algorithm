const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [V, E] = input[0].split(' ').map(Number);
const INF = 1000000000;  // 무한을 나타내는 값
const dist = Array.from({ length: V }, () => Array(V).fill(INF));

// 도로 정보 입력
for (let i = 0; i < V; i++) {
    dist[i][i] = 0;  // 자기 자신으로 가는 거리는 0
}

for (let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(' ').map(Number);
    dist[a - 1][b - 1] = Math.min(dist[a - 1][b - 1], c); // 여러 번 주어지므로 최소값을 사용
}

// 플로이드-워셜 알고리즘
for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (dist[i][k] < INF && dist[k][j] < INF) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
}

// 사이클 최소 길이 계산
let minCycle = INF;
for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
        if (i !== j && dist[i][j] !== INF && dist[j][i] !== INF) {
            minCycle = Math.min(minCycle, dist[i][j] + dist[j][i]);
        }
    }
}

// 결과 출력
console.log(minCycle === INF ? -1 : minCycle);
