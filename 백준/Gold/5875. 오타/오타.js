const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let arr = input[0].split("");
let N = arr.length;

let left = 0;
let right = 0;
let prefix = 0;
let result = 0;

for (let i = 0; i < N; i++) {
  if (arr[i] === "(") {
    prefix++;
    left++;
  } else {
    prefix--;
    right++;
  }

  // 닫은 괄호가 하나 더 많은 순간 break
  // 왜냐면: 다시 여는 괄호가 나오고 닫는 괄호가 나와서 -1이 된다해도, 그 뒤의 닫는 괄호는 바꿔도 앞쪽이 올바른 괄호쌍이 되지못함
  if (prefix === -1) {
    result = right;
    break;
  }
  // 여는 괄호가 하나 더 많을 경우 left 0으로 초기화
  // 왜냐면 하나는 당연히 많아야함 (맨 앞이 여는 괄호니까)
  else if (prefix === 1) {
    left = 0;
  }
}

// 마지막 총 누적합이 2 = 여는 괄호가 더 많다는 뜻
if (prefix === 2) {
  result = left;
}
console.log(result);
