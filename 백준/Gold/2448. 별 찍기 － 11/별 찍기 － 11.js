const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const star = Array.from({ length: N }, () => Array.from({ length: 2 * N - 1 }, () => " "));

inputStar(0, N - 1, N);

for (let i = 0; i < N; i++) {
  let str = "";
  for (let j = 0; j < 2 * N - 1; j++) {
    str += star[i][j];
  }
  console.log(str);
}

// 0 23 24
function inputStar(r, c, N) {
  if (N === 3) {
    star[r][c] = "*";
    star[r + 1][c - 1] = "*";
    star[r + 1][c + 1] = "*";
    star[r + 2][c - 2] = "*";
    star[r + 2][c - 1] = "*";
    star[r + 2][c] = "*";
    star[r + 2][c + 1] = "*";
    star[r + 2][c + 2] = "*";
    return;
  } else {
    inputStar(r, c, N / 2);
    inputStar(r + N / 2, c - N / 2, N / 2);
    inputStar(r + N / 2, c + N / 2, N / 2);
  }
}
