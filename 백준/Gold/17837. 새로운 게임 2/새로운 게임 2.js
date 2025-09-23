const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

let chess = Array.from({ length: N }, () => null);
for (let i = 0; i < N; i++) {
  chess[i] = input[i + 1].split(" ").map(Number);
}

// 각 칸에 쌓인 말 관리
let arr = Array.from({ length: N }, () => Array.from({ length: N }, () => []));

// 말 담는 배열
let items = [];

let start = N + 1;
for (let i = start; i < start + K; i++) {
  let [r, c, curDir] = input[i].split(" ").map(Number);
  r -= 1;
  c -= 1;
  curDir -= 1;
  items.push([r, c, curDir]);
  arr[r][c].push(i - start); // 말 번호를 각 칸에 쌓음
}

let dir = [
  [0, 1], 
  [0, -1],
  [-1, 0], 
  [1, 0],
];

let cnt = 0;
let flag = false;

while (cnt <= 1000) {
  cnt++;
  if (move()) {
    flag = true;
    console.log(cnt);
    break;
  }
}

if (!flag) console.log(-1);

function move() {
  for (let i = 0; i < items.length; i++) {
    let [r, c, curDir] = items[i];

    let stack = arr[r][c];
    let index = stack.indexOf(i);
    let moving = stack.splice(index);

    let [dr, dc] = dir[curDir];
    let nr = r + dr;
    let nc = c + dc;

    // 범위 밖이거나 파란색
    if (nr < 0 || nr >= N || nc < 0 || nc >= N || chess[nr][nc] === 2) {
      // 방향 반대로
      if (curDir === 0) curDir = 1;
      else if (curDir === 1) curDir = 0;
      else if (curDir === 2) curDir = 3;
      else if (curDir === 3) curDir = 2;

      [dr, dc] = dir[curDir];
      nr = r + dr;
      nc = c + dc;

      // 두 번째 이동도 파란색이나 범위 밖이면 원위치
      if (nr < 0 || nr >= N || nc < 0 || nc >= N || chess[nr][nc] === 2) {
        arr[r][c].push(...moving); // 원래 자리로 되돌리기
        items[i][2] = curDir; // 방향만 변경
        continue;
      }
    }

    // 빨강이면 뒤집어서 이동
    if (chess[nr][nc] === 1) {
      moving.reverse();
    }

    arr[nr][nc].push(...moving); // 이동 완료

    for (let m of moving) {
      items[m][0] = nr;
      items[m][1] = nc;
      // 방향은 원래의 말 기준만 유지
      if (m === i) items[m][2] = curDir;
    }

    // 4개 이상 쌓이면 종료
    if (arr[nr][nc].length >= 4) return true;
  }

  return false;
}
