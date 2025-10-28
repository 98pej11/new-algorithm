const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

let left = 0;
let right = 0;
let count = 0;
const seen = new Set();

while (right < N) {
  // 중복이 있으면 left를 오른쪽으로 이동
  while (seen.has(arr[right])) {
    seen.delete(arr[left]);
    left++;
  }

  // 현재 숫자를 추가하고, 가능한 부분수열 개수를 더함
  seen.add(arr[right]);
  count += right - left + 1;
  right++;
}

console.log(count);
