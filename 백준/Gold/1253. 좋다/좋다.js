const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);

const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < arr.length; i++) {
  let cur = arr[i];
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    if (start === i) {
      start++;
      continue;
    } else if (end === i) {
      end--;
      continue;
    }

    if (arr[start] + arr[end] === cur) {
      answer++;
      break;
    } else if (arr[start] + arr[end] < cur) {
      start++;
    } else {
      end--;
    }
  }
}

console.log(answer);
