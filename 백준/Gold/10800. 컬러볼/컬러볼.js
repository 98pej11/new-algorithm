const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const balls = [];
for (let i = 1; i <= N; i++) {
  const [color, size] = input[i].split(" ").map(Number);
  balls.push([i - 1, color, size]);
}

balls.sort((a, b) => {
  if (a[2] === b[2]) return a[1] - b[1]; // size 같으면 color 기준 정렬
  return a[2] - b[2]; // size 기준 정렬
});

// console.log(balls);
const answer = Array(N).fill(0);
const colorSum = Array(N + 1).fill(0);
let totalSum = 0;

let start = 0;

for (let i = 0; i < N; i++) {
  const [idx, color, size] = balls[i];

  while (start < i && balls[start][2] < size) {
    const [sIdx, sColor, sSize] = balls[start];
    totalSum += sSize;
    colorSum[sColor] += sSize;
    start++;
  }

  answer[idx] = totalSum - colorSum[color];
}

console.log(answer.join("\n"));
