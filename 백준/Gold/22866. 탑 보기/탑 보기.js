const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const N = Number(input[0]);
const heights = input[1].split(" ").map(Number);

const count = Array(N).fill(0);
const closest = Array(N).fill(0);

// 왼쪽 방향 탐색
let stack = [];
for (let i = 0; i < N; i++) {
  // 현재보다 낮거나 같은 건물은 pop (가려짐)
  while (stack.length && heights[stack[stack.length - 1]] <= heights[i]) {
    stack.pop();
  }
  if (stack.length) {
    count[i] += stack.length;
    closest[i] = stack[stack.length - 1] + 1; // 0-based → 1-based index
  }
  stack.push(i);
}

// 오른쪽 방향 탐색
stack = [];
for (let i = N - 1; i >= 0; i--) {
  while (stack.length && heights[stack[stack.length - 1]] <= heights[i]) {
    stack.pop();
  }
  if (stack.length) {
    count[i] += stack.length;
    const rightIdx = stack[stack.length - 1] + 1;
    if (closest[i] === 0) {
      closest[i] = rightIdx;
    } else {
      const leftDist = Math.abs((closest[i] - 1) - i);
      const rightDist = Math.abs((rightIdx - 1) - i);
      if (rightDist < leftDist || (rightDist === leftDist && rightIdx < closest[i])) {
        closest[i] = rightIdx;
      }
    }
  }
  stack.push(i);
}

// 출력
let result = "";
for (let i = 0; i < N; i++) {
  if (count[i] === 0) result += "0\n";
  else result += `${count[i]} ${closest[i]}\n`;
}
console.log(result.trim());