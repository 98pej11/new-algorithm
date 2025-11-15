const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

let laptop = Array.from({ length: N }, () => Array(M).fill(0));

let idx = 1;

for (let i = 0; i < K; i++) {
  let [r, c] = input[idx].split(" ").map(Number);

  let sticker = [];
  for (let j = 1; j <= r; j++) {
    sticker.push(input[idx + j].split(" ").map(Number));
  }
  idx += r + 1;

  // 0, 90, 180, 270도 시도
  let placed = false;
  for (let rotate = 0; rotate < 4; rotate++) {
    if (check(sticker, r, c)) {
      placed = true;
      break;
    }
    // 회전 후 크기 업데이트
    sticker = rotateSticker(sticker);
    [r, c] = [c, r];
  }
}

// 최종 스티커 붙은 칸 개수 계산
let cnt = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (laptop[i][j] === 1) cnt++;
  }
}
console.log(cnt);

// 노트북에 붙일 수 있는지 체크
function check(sticker, r, c) {
  for (let i = 0; i <= N - r; i++) {
    for (let j = 0; j <= M - c; j++) {
      let canPlace = true;
      for (let a = 0; a < r; a++) {
        for (let b = 0; b < c; b++) {
          if (sticker[a][b] === 1 && laptop[i + a][j + b] === 1) {
            canPlace = false;
            break;
          }
        }
        if (!canPlace) break;
      }
      if (canPlace) {
        addSticker(sticker, i, j, r, c);
        return true;
      }
    }
  }
  return false;
}

// 노트북에 스티커 붙이기
function addSticker(sticker, i, j, r, c) {
  for (let a = 0; a < r; a++) {
    for (let b = 0; b < c; b++) {
      if (sticker[a][b] === 1) laptop[i + a][j + b] = 1;
    }
  }
}

// 2D 배열을 시계방향으로 90도 회전
function rotateSticker(sticker) {
  const R = sticker.length;
  const C = sticker[0].length;
  const newSticker = Array.from({ length: C }, () => Array(R).fill(0));
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      newSticker[j][R - 1 - i] = sticker[i][j];
    }
  }
  return newSticker;
}
