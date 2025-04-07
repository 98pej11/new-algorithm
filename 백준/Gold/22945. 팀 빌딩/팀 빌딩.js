const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

let max = 0;
let left = 0;
let right = N - 1;

while (left < right) {
  let min = Math.min(arr[left], arr[right]);

  max = Math.max(max, min * (right - left - 1));
  if (min === arr[left]) left++;
  else right--;
}

console.log(max);
