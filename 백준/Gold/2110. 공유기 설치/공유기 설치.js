const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, C] = input[0].split(" ").map(Number);

const arr = Array.from({ length: N }, () => 0);

for (let i = 1; i <= N; i++) {
  arr[i - 1] = Number(input[i]);
}
arr.sort((a, b) => a - b);

let start = 1;
let end = arr[N - 1] - arr[0];
// [1,2,4,8,9]
while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  //   console.log("mid", mid);
  let cnt = 1;
  let st = arr[0];
  for (const cur of arr) {
    // console.log("cur prev mid", cur, st, mid);
    if (cur - st < mid) continue;

    st = cur;
    cnt++;
  }

  if (cnt < C) end = mid - 1;
  else start = mid + 1;
}

console.log(end);
