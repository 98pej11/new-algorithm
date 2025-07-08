const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0]);

// 사용자 정보 저장 (시작시간, 종료시간, 원래 순서)
const users = [];
for (let i = 1; i <= n; i++) {
  const [p, q] = input[i].split(" ").map(Number);
  users.push({ start: p, end: q, index: i - 1 });
}

// 시작 시간 기준으로 정렬
users.sort((a, b) => a.start - b.start);

// 각 컴퓨터의 마지막 사용 종료 시간을 저장
const computers = [];
// 각 컴퓨터에서 사용한 사람 수를 저장
const computerUsage = [];
// 각 사람이 어느 컴퓨터를 사용했는지 저장
const userComputer = new Array(n);

for (const user of users) {
  let assigned = false;

  // 기존 컴퓨터 중에서 사용 가능한 것 찾기
  for (let i = 0; i < computers.length; i++) {
    if (computers[i] <= user.start) {
      // 이 컴퓨터를 사용할 수 있음
      computers[i] = user.end;
      computerUsage[i]++;
      userComputer[user.index] = i;
      assigned = true;
      break;
    }
  }

  // 사용 가능한 컴퓨터가 없으면 새 컴퓨터 추가
  if (!assigned) {
    computers.push(user.end);
    computerUsage.push(1);
    userComputer[user.index] = computers.length - 1;
  }
}

// 결과 출력
console.log(computers.length); // 최소 컴퓨터 개수
console.log(computerUsage.join(" ")); // 각 컴퓨터 사용 인원 수
