const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); // SCV의 개수
const scv = input[1].split(" ").map(Number); // SCV의 체력

// SCV의 최대 체력 60 이하이고, 공격마다 차례대로 [9, 3, 1]의 데미지를 받음
const directions = [
  [9, 3, 1],
  [9, 1, 3],
  [3, 1, 9],
  [3, 9, 1],
  [1, 9, 3],
  [1, 3, 9],
];

// SCV의 최대 체력은 60이므로 상태는 최대 60까지
const MAX = 60;

// dp 배열을 초기화
const dp = Array.from({ length: MAX + 1 }, () => Array.from({ length: MAX + 1 }, () => Array(MAX + 1).fill(Infinity)));

// 방문을 기록할 배열
const visited = Array.from({ length: MAX + 1 }, () => Array.from({ length: MAX + 1 }, () => Array(MAX + 1).fill(false)));

// 초기 상태 설정: SCV 개수에 맞춰서 시작점 설정
if (N === 1) {
  dp[scv[0]][0][0] = 0;
  visited[scv[0]][0][0] = true;
} else if (N === 2) {
  dp[scv[0]][scv[1]][0] = 0;
  visited[scv[0]][scv[1]][0] = true;
} else {
  dp[scv[0]][scv[1]][scv[2]] = 0;
  visited[scv[0]][scv[1]][scv[2]] = true;
}

// BFS를 이용하여 최소 공격 횟수 구하기
function BFS() {
  const queue = [];

  // 초기 상태 큐에 넣기
  if (N === 1) {
    queue.push([scv[0], 0, 0, 0]);
  } else if (N === 2) {
    queue.push([scv[0], scv[1], 0, 0]);
  } else {
    queue.push([scv[0], scv[1], scv[2], 0]);
  }

  while (queue.length > 0) {
    const [x, y, z, cnt] = queue.shift();

    // 모든 SCV의 체력이 0 이하가 되면 종료
    if (x <= 0 && y <= 0 && z <= 0) {
      console.log(cnt);
      return;
    }

    // 6가지 공격에 대해
    for (let [d1, d2, d3] of directions) {
      let nx = Math.max(0, x - d1);
      let ny = Math.max(0, y - d2);
      let nz = Math.max(0, z - d3);

      if (!visited[nx][ny][nz]) {
        visited[nx][ny][nz] = true;
        dp[nx][ny][nz] = Math.min(dp[nx][ny][nz], cnt + 1);
        queue.push([nx, ny, nz, cnt + 1]);
      }
    }
  }
}

BFS();
