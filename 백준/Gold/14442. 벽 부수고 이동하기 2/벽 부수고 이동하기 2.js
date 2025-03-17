const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const map = input.slice(1).map((s) => s.split("").map(Number));

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const visited = Array.from({ length: K + 1 }, () => Array.from({ length: N }, () => Array(M).fill(false)));
let answer = 0;
let queue = []; // [r, c, remain]
let nextQueue = []; // 다음 레벨 큐
queue.push([0, 0, K]);
visited[K][0][0] = true;

while (queue.length) {
  let levelSize = queue.length;
  answer++; // 레벨마다 거리 증가

  // 이번 레벨을 처리할 큐에 있는 모든 요소를 하나씩 처리
  while (queue.length) {
    let [r, c, remain] = queue.pop(); // 큐에서 하나씩 꺼냄

    if (r === N - 1 && c === M - 1) {
      console.log(answer);
      process.exit(0);
    }

    // 네 방향 탐색
    for (let [dr, dc] of directions) {
      let nr = r + dr,
        nc = c + dc;

      if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        let nextRemain = remain - (map[nr][nc] === 1 ? 1 : 0);

        if (nextRemain >= 0 && !visited[nextRemain][nr][nc]) {
          visited[nextRemain][nr][nc] = true;
          nextQueue.push([nr, nc, nextRemain]);
        }
      }
    }
  }

  // 현재 레벨 처리 끝난 후, 다음 레벨 큐로 갱신
  queue = [...nextQueue];
  nextQueue = [];
}

console.log(-1); // 목표 지점에 도달할 수 없으면 -1 반환
