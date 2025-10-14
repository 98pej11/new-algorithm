const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = +input[0];
const wires = input.slice(1).map((line) => line.split(" ").map(Number));

// 1️⃣ A 기준으로 오름차순 정렬
wires.sort((a, b) => a[0] - b[0]);

// 2️⃣ LIS 알고리즘 적용 (B 기준)
const lis = [];

for (let i = 0; i < N; i++) {
  const b = wires[i][1];
  // 이분 탐색으로 LIS 위치 찾기
  let left = 0;
  let right = lis.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (lis[mid] < b) left = mid + 1;
    else right = mid;
  }
  lis[left] = b;
}

// 3️⃣ 결과 출력: 전체 - LIS 길이
console.log(N - lis.length);
