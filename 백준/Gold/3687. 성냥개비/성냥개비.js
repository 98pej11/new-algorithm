const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const t = Number(input[0]); // 테스트 케이스 개수
const minDp = Array(101).fill(Infinity);
const minInit = ["", "", "1", "7", "4", "2", "6", "8", "10"];

for (let i = 2; i <= 8; i++) {
  minDp[i] = minInit[i];
}

// 최소값 계산 (DP)
for (let i = 9; i <= 100; i++) {
  for (let j = 2; j <= i - 2; j++) {
    let newValue = minDp[j] + minDp[i - j];

    if (Number(newValue) < Number(minDp[i])) {
      minDp[i] = newValue;
    }
  }

  // 성냥개비 6개로 0을 만들 수 있음
  if (i >= 6 && minDp[i - 6] !== Infinity) {
    let zeroCase = minDp[i - 6] + "0";
    if (Number(zeroCase) < Number(minDp[i])) {
      minDp[i] = zeroCase;
    }
  }
}

// 최대값 찾기
const findBiggest = (num) => {
  let result = "1".repeat(num / 2);
  if (num % 2 === 1) {
    result = "7" + result.slice(1);
  }
  return result;
};

// 최소값 찾기
const findSmallest = (num) => minDp[num];

for (let i = 1; i <= t; i++) {
  const n = Number(input[i]);
  console.log(findSmallest(n), findBiggest(n));
}
