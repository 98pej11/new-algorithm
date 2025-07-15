const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0]);
const originInput = input[1].split("");
const targetInput = input[2].split("");

const INF = Number.MAX_SAFE_INTEGER;

const origin = Array.from({ length: N + 2 }, (_, i) => originInput[i - 1] === "1");
const target = Array.from({ length: N + 2 }, (_, i) => targetInput[i - 1] === "1");

function pushSwitch(idx, lightBulbs) {
  lightBulbs[idx - 1] = !lightBulbs[idx - 1];
  lightBulbs[idx] = !lightBulbs[idx];
  lightBulbs[idx + 1] = !lightBulbs[idx + 1];
}

function isSame(lightBulbs) {
  return lightBulbs.slice(1, N + 1).every((state, i) => state === target[i + 1]);
}

function getResult(lightBulbs) {
  let count = 0;
  for (let i = 2; i <= N; i++) {
    if (lightBulbs[i - 1] !== target[i - 1]) {
      pushSwitch(i, lightBulbs);
      count++;
    }
  }
  return isSame(lightBulbs) ? count : INF;
}

// 첫 번째 버튼을 누르지 않은 경우
let result1 = getResult([...origin]);

// 첫 번째 버튼을 누른 경우
let copied = [...origin];
pushSwitch(1, copied);
let result2 = getResult(copied) + 1;

console.log(Math.min(result1, result2) === INF ? -1 : Math.min(result1, result2));
