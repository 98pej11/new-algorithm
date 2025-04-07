const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const prefix = Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  prefix[i] = prefix[i - 1] + arr[i - 1];
}

// console.log(prefix);

let min = N + 1;
let left = 0;
let right = 1;

while (left <= right && right <= N) {
  if (prefix[right] - prefix[left] >= S) {
    min = Math.min(min, right - left);
    left++;
  } else right++;
}

console.log(min === N + 1 ? 0 : min);
