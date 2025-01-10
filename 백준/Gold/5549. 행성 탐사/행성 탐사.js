const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [M, N] = input[0].split(" ").map(Number);
input.shift();

const K = Number(input[0]);
input.shift();

const map = Array.from({ length: M + 1 }, () => Array(N + 1).fill("N"));
const prefixMap = Array.from({ length: M + 1 }, () => Array(N + 1).fill([0, 0, 0]));

for (let i = 1; i <= M; i++) {
  let arr = input[i - 1].split("");
  for (let j = 1; j <= N; j++) {
    map[i][j] = arr[j - 1];
  }
}

for (let i = 1; i <= M; i++) {
  for (let j = 1; j <= N; j++) {
    const current = map[i][j];
    let jCount = 0,
      oCount = 0,
      iCount = 0;

    if (current === "J") jCount = 1;
    if (current === "O") oCount = 1;
    if (current === "I") iCount = 1;

    prefixMap[i][j] = [prefixMap[i - 1][j][0] + prefixMap[i][j - 1][0] - prefixMap[i - 1][j - 1][0] + jCount, prefixMap[i - 1][j][1] + prefixMap[i][j - 1][1] - prefixMap[i - 1][j - 1][1] + oCount, prefixMap[i - 1][j][2] + prefixMap[i][j - 1][2] - prefixMap[i - 1][j - 1][2] + iCount];
  }
}

for (let i = 0; i < K; i++) {
  let [a, b, c, d] = input[i + M].split(" ").map(Number);

  const result = [
    prefixMap[c][d][0] - prefixMap[a - 1][d][0] - prefixMap[c][b - 1][0] + prefixMap[a - 1][b - 1][0],
    prefixMap[c][d][1] - prefixMap[a - 1][d][1] - prefixMap[c][b - 1][1] + prefixMap[a - 1][b - 1][1],
    prefixMap[c][d][2] - prefixMap[a - 1][d][2] - prefixMap[c][b - 1][2] + prefixMap[a - 1][b - 1][2],
  ];

  console.log(result.join(" "));
}