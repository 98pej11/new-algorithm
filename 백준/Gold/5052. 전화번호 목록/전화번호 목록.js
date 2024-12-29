const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n");

const T = Number(input[0]);

let idx = 1;

for (let i = 0; i < T; i++) {
  let N = Number(input[idx]);
  idx++;

  let arr = [];
  for (let j = idx; j < idx + N; j++) {
    arr.push(input[j]);
  }
  arr.sort();

  let TF = true;
  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j + 1].startsWith(arr[j])) {
      TF = false;
      break;
    }
  }
  if (!TF) console.log("NO");
  else console.log("YES");

  idx += N;
}
