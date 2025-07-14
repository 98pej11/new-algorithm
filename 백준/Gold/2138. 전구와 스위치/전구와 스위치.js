const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0]);
const originInput = input[1].split("");
const targetInput = input[2].split("");

const INF = Math.floor(Number.MAX_SAFE_INTEGER / 1000);

// 원본 배열과 목표 배열 생성 (1-based indexing, 양쪽에 패딩)
const origin = new Array(N + 2).fill(false);
const target = new Array(N + 2).fill(false);

for (let i = 1; i <= N; i++) {
  origin[i] = originInput[i - 1] === "1";
  target[i] = targetInput[i - 1] === "1";
}

// idx번째 스위치를 눌렀을 때 (인접 3개 스위치 상태 변경)
function pushSwitch(idx, lightBulbs) {
  lightBulbs[idx - 1] = !lightBulbs[idx - 1];
  lightBulbs[idx] = !lightBulbs[idx];
  lightBulbs[idx + 1] = !lightBulbs[idx + 1];
}

// 현재 전구 상태가 목표 전구 상태와 같은지 비교
function isSame(lightBulbs) {
  for (let i = 1; i <= N; i++) {
    if (lightBulbs[i] !== target[i]) {
      return false;
    }
  }
  return true;
}

// 배열 복사
function copy() {
  return [...origin];
}

function getResult(lightBulbs) {
  let result = 0;

  for (let i = 2; i <= N; i++) {
    // idx 기준 왼쪽 전구의 현재상태와 왼쪽 전구의 목표상태가 다르다면
    if (lightBulbs[i - 1] !== target[i - 1]) {
      // 스위치를 눌러 왼쪽 전구를 목표 상태로 만든다
      pushSwitch(i, lightBulbs);
      result++;
    }
  }

  // 원하는 상태가 만들어진 경우 -> 스위치를 누른 횟수 반환
  if (isSame(lightBulbs)) {
    return result;
  }

  // 원하는 상태가 만들어지지 않은 경우 -> INF값 반환
  return INF;
}

// 첫번째 버튼을 누르지 않은 경우
let copied = copy();
let result1 = getResult(copied);

// 첫번째 버튼을 누른 경우
copied = copy();
pushSwitch(1, copied);
let result2 = getResult(copied) + 1;

// 첫번째 버튼을 눌렀을 때, 누르지 않았을 때의 값 중 최솟값 선택
let min = Math.min(result1, result2);
console.log(min === INF ? -1 : min);
