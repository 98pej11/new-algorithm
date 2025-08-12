const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let idx = 0;
let results = [];

for (let t = 0; t < 3; t++) {
  const N = Number(input[idx++]); // 동전 종류 개수
  let coins = [];
  for (let i = 0; i < N; i++) {
    const [value, count] = input[idx++].split(" ").map(Number);
    coins.push([value, count]);
  }
  results.push(canSplitCoins(N, coins));
}

console.log(results.join("\n"));

function canSplitCoins(N, coins) {
  // 총합 계산
  let total = 0;
  for (let i = 0; i < N; i++) {
    total += coins[i][0] * coins[i][1];
  }

  // 총합이 홀수면 바로 불가능
  if (total % 2 !== 0) return 0;

  const target = total / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true; // 0원은 항상 가능

  // 동적 계획법
  for (let i = 0; i < N; i++) {
    const value = coins[i][0];
    const count = coins[i][1];

    // 역순 탐색 (중복 방지)
    for (let j = target; j >= 0; j--) {
      if (dp[j]) {
        for (let k = 1; k <= count && j + k * value <= target; k++) {
          dp[j + k * value] = true;
        }
      }
    }
  }

  return dp[target] ? 1 : 0;
}
