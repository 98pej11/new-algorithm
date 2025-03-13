const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const M = Number(input[1]);

let map = new Map();

for (let i = 2; i < M + 2; i++) {
  let cur = input[i].split(" ").map(Number);

  if (!map.has(cur[0])) {
    map.set(cur[0], []);
  }
  map.get(cur[0]).push([cur[1], cur[2]]);
}

for (let [key, value] of map) {
  value.sort((a, b) => a[1] - b[1]); // cost를 기준으로 오름차순 정렬
}

const [S, T] = input[input.length - 1].split(" ").map(Number);

let minArr = new Array(N + 1).fill(Infinity); // 모든 도시의 최소 비용을 무한대로 초기화
minArr[S] = 0; // 출발 도시의 비용을 0으로 설정

findMin(S, 0);

console.log(minArr[T]); // 최단 비용 출력

function findMin(key, val) {
  let values = map.get(key) || [];

  // 현재 노드에서 갈 수 있는 도시들에 대해 반복
  for (let [next, cost] of values) {
    let newCost = val + cost;

    // 이미 구한 최소 비용보다 현재 경로 비용이 더 작으면 갱신
    if (newCost < minArr[next]) {
      minArr[next] = newCost;
      findMin(next, newCost); // 재귀 호출로 계속 탐색
    }
  }
}
