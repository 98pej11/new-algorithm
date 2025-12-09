const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let left = 0;
let sum = 0;
let energy = 0;

for (let right = 0; right < N; right++) {
  sum += arr[right];

  // 구간합이 K 이상이면 탈피 후 초기화
  if (sum >= K) {
    energy += sum - K;
    // 다음 구간 시작
    left = right + 1;
    sum = 0;
  }
}

console.log(energy);
