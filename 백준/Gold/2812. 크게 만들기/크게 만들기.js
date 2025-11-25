const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split("").map(Number);

let result = [];
let cnt = 0;

for (let i = 0; i < arr.length; i++) {
  while (result.length && cnt < K && result[result.length - 1] < arr[i]) {
    result.pop();
    cnt++;
  }
  result.push(arr[i]);
}

while (result.length > arr.length - K) {
  result.pop();
}
console.log(result.join(""));
