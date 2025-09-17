const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, L] = input[0].split(" ").map(Number);
// console.log(N, M, L);

let max = 0; // 휴게소가 없는 구간들 중 최대값을 구해야함

let places = [];
if (N > 0) places = input[1].split(" ").map(Number);

places.push(0);
places.push(L);
places.sort((a, b) => a - b);
// console.log(places);

let answer = 0;
let left = 1;
let right = L;

while (left <= right) {
  let mid = parseInt((left + right) / 2);
  if (countNewPlace(mid) <= M) {
    answer = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(answer);

// 더 지어야하는 휴게소
function countNewPlace(n) {
  let cnt = 0;
  for (let i = 0; i < places.length - 1; i++) {
    let gap = places[i + 1] - places[i];

    cnt += parseInt((gap - 1) / n);
  }
  return cnt;
}
