const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); // A의 개수
const arr = input.slice(1).map(BigInt); // A[1] ~ A[N] (BigInt로 변환)

// 첫 번째 값 세팅
let prev = arr[0]; // 1
let max = arr[0]; // 1
let answer = 0n;

// 1 1 1 1 3 3 1
// 왼쪽에서 오른쪽으로 탐색하며 차이 누적
for (let i = 1; i < N; i++) {
  const cur = arr[i];

  // 증가한 만큼 Add가 필요함
  if (prev < cur) {
    answer += cur - prev; // +2
  }

  // 전체 최대값 갱신
  if (cur > max) max = cur; // 3

  prev = cur; // 3
}

// 마지막 값에서 최댓값까지 다시 올리기
answer += max - prev;

console.log(answer.toString());
