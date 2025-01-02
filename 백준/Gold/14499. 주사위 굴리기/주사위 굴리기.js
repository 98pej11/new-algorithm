const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString().trim()
  .split("\n");

let [N, M, x, y, K] = input[0].split(" ").map(Number);
input.shift();

const map = new Array(N).fill(() => new Array(M).fill(null));

for (let i = 0; i < N; i++) {
  const numArr = input[i].split(" ").map(Number);
  map[i] = [...numArr];
}

let dice = [null, 0, 0, 0, 0, 0, 0];
const arr = input[input.length - 1].split(" ").map(Number);

for (let i = 0; i < K; i++) {
  if (arr[i] === 1) {
    if (y + 1 < M) y = y + 1;
    else continue;
  } else if (arr[i] === 2) {
    if (y - 1 >= 0) y = y - 1;
    else continue;
  } else if (arr[i] === 3) {
    if (x - 1 >= 0) x = x - 1;
    else continue;
  } else if (arr[i] === 4) {
    if (x + 1 < N) x = x + 1;
    else continue;
  }

  dice = play(arr[i]);
  
  if (map[x][y] === 0) map[x][y] = dice[6];
  else {
    dice[6] = map[x][y];
    map[x][y] = 0;
  }
  console.log(dice[1]);
}

function play(num) {
  let newArr = [];

  if (num === 1) {
    newArr = [null, dice[4], dice[2], dice[1], dice[6], dice[5], dice[3]];
  } else if (num === 2) {
    newArr = [null, dice[3], dice[2], dice[6], dice[1], dice[5], dice[4]];
  } else if (num === 3) {
    newArr = [null, dice[5], dice[1], dice[3], dice[4], dice[6], dice[2]];
  } else if (num === 4) {
    newArr = [null, dice[2], dice[6], dice[3], dice[4], dice[1], dice[5]];
  }

  return newArr;
}
