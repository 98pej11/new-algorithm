const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const map = input.map((line) => line.split(" ").map(Number));
// console.log(map);

const count = [5, 5, 5, 5, 5];
let min = 26;

backTracking(0);

if (min === 26) console.log(-1);
else console.log(min);

function findXY() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (map[i][j] === 1) return [i, j];
    }
  }
  return [-1, -1];
}

function backTracking(cnt) {
  if (cnt >= min) return;

  let [r, c] = findXY();
  // console.log(r, c);

  if (r === -1 && c === -1) {
    min = Math.min(min, cnt);
    return;
  }

  for (let k = 0; k < 5; k++) {
    if (check(r, c, k) && count[k] > 0) {
      for (let i = r; i <= r + k; i++) {
        for (let j = c; j <= c + k; j++) {
          map[i][j] = 0;
        }
      }
      count[k]--;
      backTracking(cnt + 1);

      count[k]++;
      for (let i = r; i <= r + k; i++) {
        for (let j = c; j <= c + k; j++) {
          map[i][j] = 1;
        }
      }
    }
  }
}

function check(r, c, k) {
  if (r + k >= 10 || c + k >= 10) return false;
  for (let i = r; i <= r + k; i++) {
    for (let j = c; j <= c + k; j++) {
      if (map[i][j] === 0) return false;
    }
  }
  return true;
}
