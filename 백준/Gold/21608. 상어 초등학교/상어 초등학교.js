const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const map = new Map();

for (let i = 1; i <= N * N; i++) {
  const [cur, ...likes] = input[i].split(" ").map(Number);
  map.set(cur, likes);
}

const classroom = Array.from({ length: N }, () => Array(N).fill(0));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1], 
];

for (let i = 1; i <= N * N; i++) {
  const num = Number(input[i].split(" ")[0]);
  calc(num);
}

function calc(num) {
  let arr = [];
  let maxLike = -1;
  let maxEmpty = -1;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (classroom[r][c] !== 0) continue; // 이미 차있으면 패스

      let likeCnt = 0;
      let emptyCnt = 0;
      for (const [dr, dc] of dir) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;

        if (classroom[nr][nc] === 0) emptyCnt++;
        else if (map.get(num).includes(classroom[nr][nc])) likeCnt++;
      }

      // 조건 1 확인 -> 조건 2 확인
      if (likeCnt > maxLike || (likeCnt === maxLike && emptyCnt > maxEmpty)) {
        maxLike = likeCnt;
        maxEmpty = emptyCnt;
        arr = [[r, c]];
      } else if (likeCnt === maxLike && emptyCnt === maxEmpty) {
        arr.push([r, c]);
      }
    }
  }

  arr.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const [r, c] = arr[0];
  classroom[r][c] = num;
}

let total = 0;

for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const student = classroom[r][c];
    let cnt = 0;

    for (const [dr, dc] of dir) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
      if (map.get(student).includes(classroom[nr][nc])) cnt++;
    }

    if (cnt > 0) total += Math.pow(10, cnt - 1);
  }
}

console.log(total);
