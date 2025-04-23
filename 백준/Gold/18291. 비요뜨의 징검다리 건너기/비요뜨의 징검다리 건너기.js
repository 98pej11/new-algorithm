const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const MOD = 1000000007;

for (let i = 1; i <= N; i++) {
  let K = Number(input[i]);

  if (K === 1 || K === 2) {
    console.log(1);
  } else {
    console.log(recursive(2, K - 2));
  }
}
function recursive(base, N) {
  if (N === 0) return 1;
  if (N % 2 === 0) {
    let tmp = recursive(base, N / 2);
    return Number((BigInt(tmp) * BigInt(tmp)) % BigInt(MOD));
  } else {
    return (2 * recursive(base, N - 1)) % MOD;
  }
}
