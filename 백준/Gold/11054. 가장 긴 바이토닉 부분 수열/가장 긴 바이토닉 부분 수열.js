const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const str = input[1].split(" ").map(Number);

// 오름차순 부분 수열 계산
let dp1 = Array(N).fill(1);
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (str[i] > str[j]) {
      dp1[i] = Math.max(dp1[i], dp1[j] + 1);
    }
  }
}

// 내림차순 부분 수열 계산
let dp2 = Array(N).fill(1);
for (let i = N - 2; i >= 0; i--) {
  for (let j = N - 1; j > i; j--) {
    if (str[i] > str[j]) {
      dp2[i] = Math.max(dp2[i], dp2[j] + 1);
    }
  }
}

// console.log(dp1, dp2);
let maxLength = 0;
for (let i = 0; i < N; i++) {
  maxLength = Math.max(maxLength, dp1[i] + dp2[i] - 1);
}

console.log(maxLength);
