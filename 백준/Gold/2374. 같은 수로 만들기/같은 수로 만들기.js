const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map(Number);

let prev = arr[0];
let max = arr[0];
let answer = 0;

// 1 1 1 1 3 3 1
for (let i = 1; i < N; i++) {
  const cur = arr[i];

  if (prev < cur) {
    answer += cur - prev;
  }

  if (cur > max) max = cur;

  prev = cur;
}

answer += max - prev;

console.log(answer);
