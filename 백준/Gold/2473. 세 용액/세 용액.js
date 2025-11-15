const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

let arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let min = Infinity;
let answer = [];

for (let i = 0; i < N - 2; i++) {
  // 0~3
  let left = i + 1; // 1
  let right = N - 1; // 4

  while (left < right) {
    let sum = arr[i] + arr[left] + arr[right];

    if (Math.abs(sum) < Math.abs(min)) {
      min = Math.abs(sum);
      answer = [arr[i], arr[left], arr[right]];
    }

    if (sum < 0) {
      left++;
    } else if (sum > 0) {
      right--;
    } else {
      console.log(answer.join(" "));
      return;
    }
  }
}
console.log(answer.join(" "));
