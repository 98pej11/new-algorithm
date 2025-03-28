const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const prefix1 = Array(N + 1).fill(0);
const prefix2 = Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  if (arr[i - 1] === 1) {
    prefix1[i] = prefix1[i - 1] + 1;
    prefix2[i] = prefix2[i - 1];
  } else {
    prefix1[i] = prefix1[i - 1];
    prefix2[i] = prefix2[i - 1] + 1;
  }
}
// console.log(arr);
// console.log(prefix1, prefix2);

let max = 0;
let minPrefix = 0;
let maxPrefix = 0;

for (let i = 1; i <= N; i++) {
  const diff = prefix1[i] - prefix2[i];

  max = Math.max(max, Math.abs(diff - minPrefix), Math.abs(diff - maxPrefix));

  minPrefix = Math.min(minPrefix, diff);
  maxPrefix = Math.max(maxPrefix, diff);
}

console.log(max);
