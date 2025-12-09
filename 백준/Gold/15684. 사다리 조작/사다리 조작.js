const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M, H] = input[0].split(" ").map(Number);

const map = Array.from({ length: H + 1 }, () => Array(N + 1).fill(false));

for (let i = 1; i <= M; i++) {
  const [r, c] = input[i].split(" ").map(Number);
  map[r][c] = true;
}

let answer = 4;

if (check()) {
  answer = 0;
} else {
  dfs(0, 1, 1);
}

console.log(answer === 4 ? -1 : answer);

// 사다리 타기
function check() {
  for (let cur = 1; cur <= N; cur++) {
    let c = cur;

    for (let r = 1; r <= H; r++) {
      if (map[r][c]) c++;
      else if (c > 1 && map[r][c - 1]) c--;
    }

    if (c !== cur) return false;
  }
  return true;
}

function dfs(cnt, r, c) {
  if (cnt >= answer) return;

  if (check()) {
    answer = cnt;
    return;
  }

  if (cnt === 3) return;

  for (let i = r; i <= H; i++) {
    let startC = i === r ? c : 1;

    for (let j = startC; j < N; j++) {
      if (map[i][j]) continue; // 이미 연결되어잇거나
      if (j > 1 && map[i][j - 1]) continue;
      if (j + 1 <= N - 1 && map[i][j + 1]) continue; // 연속되거나

      map[i][j] = true;
      dfs(cnt + 1, i, j);
      map[i][j] = false;
    }
  }
}
