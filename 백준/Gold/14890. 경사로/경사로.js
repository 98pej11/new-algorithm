const fs = require("fs");
let [n, ...map] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, L] = n.trim().split(" ").map(Number);
for (let i = 0; i < N; i++) {
  map[i] = map[i].trim().split(" ").map(Number);
}

let answer = 0;

// 행 체크
for (let i = 0; i < N; i++) {
  if (checkRoute(map[i])) {
    answer++;
  }
}

// 열 체크
for (let i = 0; i < N; i++) {
  let column = map.map((row) => row[i]);
  if (checkRoute(column)) {
    answer++;
  }
}

console.log(answer);

function checkRoute(arr) {
  let same = 1;
  let isPossible = true;

  for (let j = 1; j < N; j++) {
    let diff = arr[j] - arr[j - 1];

    if (diff === 0) {
      same++;
    } else if (diff === 1) {
      if (same < L) {
        isPossible = false;
        break;
      }
      same = 1;
    } else if (diff === -1) {
      if (j + L - 1 >= N) {
        isPossible = false;
        break;
      }
      for (let k = 0; k < L; k++) {
        if (arr[j + k] !== arr[j]) {
          isPossible = false;
          break;
        }
      }
      if (!isPossible) break;
      j += L - 1;
      same = 0;
    } else {
      isPossible = false;
      break;
    }
  }

  return isPossible;
}
