const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [A, B] = input[0].split(" ").map(BigInt);

function countOnes(n) {
    if (n < 0n) return 0n;
    let count = 0n;
    let bit = 1n;

    while (bit <= n) {
        let fullCycles = (n + 1n) / (bit * 2n); // 전체 패턴 주기
        let onesFromFullCycles = fullCycles * bit;

        let remainder = (n + 1n) % (bit * 2n);
        let onesFromRemainder = remainder > bit ? remainder - bit : 0n;

        count += onesFromFullCycles + onesFromRemainder;

        bit <<= 1n;
    }

    return count;
}

const result = countOnes(B) - countOnes(A - 1n);
console.log(result.toString());
