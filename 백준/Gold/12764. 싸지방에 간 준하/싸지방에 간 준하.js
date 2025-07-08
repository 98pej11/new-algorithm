const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

// 사용자 정보 저장
const users = [];
for (let i = 1; i <= N; i++) {
  const [s, e] = input[i].split(" ").map(Number);
  users.push({ start: s, end: e });
}

// 시작 시간 기준으로 정렬
users.sort((a, b) => a.start - b.start);

// 각 컴퓨터의 마지막 사용 종료 시간을 저장
const computers = [];
// 각 컴퓨터에서 사용한 사람 수를 저장
const computerUseCount = [];

for (const user of users) {
  let usable = false;

  // 기존 컴퓨터 중에서 사용 가능한 것 찾기
  for (let i = 0; i < computers.length; i++) {
    if (computers[i] <= user.start) {
      computers[i] = user.end;
      computerUseCount[i]++;
      usable = true;
      break;
    }
  }

  // 사용 가능한 컴퓨터가 없으면 새 컴퓨터 추가
  if (!usable) {
    computers.push(user.end);
    computerUseCount.push(1);
  }
}

console.log(computers.length); // 최소 컴퓨터 개수
console.log(computerUseCount.join(" ")); // 각 컴퓨터 사용 인원 수
