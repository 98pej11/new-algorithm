const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0]);
const costs = input[1].split(" ").map(Number);
const M = parseInt(input[2]);

// 가장 저렴한 숫자의 비용 찾기
const minCost = Math.min(...costs);

// console.log(Math.floor(M / minCost));

// 예산으로 만들 수 있는 최대 자릿수부터 시작해서 줄여가며 시도
for (let i = Math.floor(M / minCost); i >= 1; i--) {
  let result = "";
  let remainCost = M;
  let possible = true;

  // 각 자릿수에 대해 가장 큰 숫자를 배치
  for (let j = 0; j < i; j++) {
    let found = false;

    // 현재 위치에서 사용할 수 있는 최대 숫자 찾기
    for (let k = N - 1; k >= 0; k--) {
      // 첫 번째 자릿수에서는 0을 사용할 수 없음
      if (j === 0 && k === 0) continue;

      const currentCost = costs[k];
      const remainPositions = i - j - 1; // 3-0-1

      // 현재 숫자를 사용하고 남은 자릿수를 최소 비용으로 채울 수 있는지 확인
      if (remainCost >= currentCost && remainCost - currentCost >= remainPositions * minCost) {
        result += k.toString();
        remainCost -= currentCost;
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

 console.log("0");