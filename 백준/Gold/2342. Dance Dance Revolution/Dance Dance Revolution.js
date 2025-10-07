const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const seq = input[0].split(" ").map(Number);
seq.pop();
const INF = 1e9;

// 이동 비용 계산 함수
function cost(from, to) {
  if (from === to) return 1;
  if (from === 0) return 2;
  // 반대편
  if ((from === 1 && to === 3) || (from === 3 && to === 1) || (from === 2 && to === 4) || (from === 4 && to === 2)) {
    return 4;
  }
  return 3; // 인접한 위치
}

// dp[l][r] = 왼발이 l, 오른발이 r일 때의 최소 힘
let dp = Array.from({ length: 5 }, () => Array(5).fill(INF));
dp[0][0] = 0;

for (let c of seq) {
  const next = Array.from({ length: 5 }, () => Array(5).fill(INF));

  for (let l = 0; l < 5; l++) {
    for (let r = 0; r < 5; r++) {
      const cur = dp[l][r];
      if (cur === INF) continue;

      // 이미 한쪽 발이 눌러야 할 위치에 있을 경우
      if (c === l) {
        next[l][r] = Math.min(next[l][r], cur + 1);
        continue;
      }
      if (c === r) {
        next[l][r] = Math.min(next[l][r], cur + 1);
        continue;
      }

      // 왼발을 이동하는 경우 (단, 오른발과 같은 칸은 불가)
      if (c !== r) {
        next[c][r] = Math.min(next[c][r], cur + cost(l, c));
      }

      // 오른발을 이동하는 경우 (단, 왼발과 같은 칸은 불가)
      if (c !== l) {
        next[l][c] = Math.min(next[l][c], cur + cost(r, c));
      }
    }
  }

  dp = next;
}

// 결과 계산
let ans = INF;
for (let l = 0; l < 5; l++) {
  for (let r = 0; r < 5; r++) {
    ans = Math.min(ans, dp[l][r]);
  }
}

console.log(ans);
