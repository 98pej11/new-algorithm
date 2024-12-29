const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const gap = [];
for (let i = 1; i < arr.length; i++) {
  gap.push(arr[i] - arr[i - 1]);
}
gap.sort((a, b) => a - b);

let answer = 0;
for (let i = 0; i < gap.length - K + 1; i++) {
  answer += gap[i];
}
console.log(answer);
