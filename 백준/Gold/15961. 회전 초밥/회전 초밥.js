const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, D, K, C] = input[0].split(" ").map(Number);
const arr = input.slice(1).map(Number);

// 원형 처리
const sushi = arr.concat(arr.slice(0, K - 1));

const count = new Array(D + 1).fill(0); // 초밥 종류별 개수
let kind = 0; // 현재 먹고 있는 초밥 종류 수

// 초기 K개 세팅
for (let i = 0; i < K; i++) {
  if (count[sushi[i]] === 0) kind++;
  count[sushi[i]]++;
}

let max = count[C] > 0 ? kind : kind + 1;

// 슬라이딩 윈도우
for (let left = 0, right = K; right < sushi.length; left++, right++) {
  // 왼쪽 초밥 제거
  count[sushi[left]]--;
  if (count[sushi[left]] === 0) kind--;

  // 오른쪽 초밥 추가
  if (count[sushi[right]] === 0) kind++;
  count[sushi[right]]++;

  max = Math.max(max, count[C] > 0 ? kind : kind + 1);
}

console.log(max);
