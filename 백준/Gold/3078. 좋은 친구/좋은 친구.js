const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, K] = input[0].split(" ").map(Number);
let arr = input.slice(1);

let map = new Map();
let result = 0;

let left = 0;

for (let right = 0; right < N; right++) {
  let len = arr[right].length;

  // 윈도우 안에 같은 길이 있으면 개수만큼 result++
  if (map.has(len)) {
    result += map.get(len);
  }

  // 현재 문자열 길이 추가
  map.set(len, (map.get(len) || 0) + 1);

  // 윈도우 크기 넘어가면 left 제거
  if (right - left >= K) {
    let leftLen = arr[left].length;
    map.set(leftLen, map.get(leftLen) - 1);
    if (map.get(leftLen) === 0) map.delete(leftLen);
    left++;
  }
}

console.log(result);
