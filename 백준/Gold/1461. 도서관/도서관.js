const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const negative = arr.filter((v) => v < 0).sort((a, b) => a - b);
const positive = arr.filter((v) => v > 0).sort((a, b) => b - a);

let max = 0;

if (negative.length) max = Math.abs(negative[0]);
if (positive.length) max = positive[0] > max ? positive[0] : max;

let answer = 0;

for (let i = 0; i < negative.length; i++) {
  answer += Math.abs(negative[i]) * 2;
  i += M - 1;
}
for (let i = 0; i < positive.length; i++) {
  answer += positive[i] * 2;
  i += M - 1;
}

console.log(answer - max);
