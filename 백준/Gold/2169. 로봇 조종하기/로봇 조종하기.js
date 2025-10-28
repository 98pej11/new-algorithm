const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(" ").map(Number));

// dp[i][j]: (i, j)에 도착했을 때의 최대 가치
const dp = Array.from({ length: N }, () => Array(M).fill(-Infinity));

// 첫 행은 왼쪽에서 오른쪽으로만 이동 가능
dp[0][0] = map[0][0];
for (let j = 1; j < M; j++) {
  dp[0][j] = dp[0][j - 1] + map[0][j];
}

// 두 번째 행부터 아래로 내려가며 계산
for (let i = 1; i < N; i++) {
  const left = Array(M).fill(-Infinity);
  const right = Array(M).fill(-Infinity);

  // 왼쪽 → 오른쪽으로 이동
  left[0] = dp[i - 1][0] + map[i][0];
  for (let j = 1; j < M; j++) {
    left[j] = Math.max(left[j - 1], dp[i - 1][j]) + map[i][j];
  }

  // 오른쪽 → 왼쪽으로 이동
  right[M - 1] = dp[i - 1][M - 1] + map[i][M - 1];
  for (let j = M - 2; j >= 0; j--) {
    right[j] = Math.max(right[j + 1], dp[i - 1][j]) + map[i][j];
  }

  // 두 방향 중 최대값을 선택
  for (let j = 0; j < M; j++) {
    dp[i][j] = Math.max(left[j], right[j]);
  }
}

console.log(dp[N - 1][M - 1]);
