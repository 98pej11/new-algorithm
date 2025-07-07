const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0]);
const costs = input[1].split(" ").map(Number);
const M = parseInt(input[2]);

// 가장 저렴한 숫자의 비용 찾기
const minCost = Math.min(...costs);

// 예산으로 만들 수 있는 최대 자릿수부터 시작해서 줄여가며 시도
for (let digits = Math.floor(M / minCost); digits >= 1; digits--) {
  let result = "";
  let remainingBudget = M;
  let possible = true;

  // 각 자릿수에 대해 가장 큰 숫자를 배치
  for (let pos = 0; pos < digits; pos++) {
    let found = false;

    // 현재 위치에서 사용할 수 있는 최대 숫자 찾기
    for (let digit = N - 1; digit >= 0; digit--) {
      // 첫 번째 자릿수에서는 0을 사용할 수 없음
      if (pos === 0 && digit === 0) continue;

      const currentCost = costs[digit];
      const remainingPositions = digits - pos - 1;

      // 현재 숫자를 사용하고 남은 자릿수를 최소 비용으로 채울 수 있는지 확인
      if (remainingBudget >= currentCost && remainingBudget - currentCost >= remainingPositions * minCost) {
        result += digit.toString();
        remainingBudget -= currentCost;
        found = true;
        break;
      }
    }

    if (!found) {
      possible = false;
      break;
    }
  }

  if (possible) {
    console.log(result);
    return;
  }
}

// 아무것도 만들 수 없는 경우
console.log(0);
