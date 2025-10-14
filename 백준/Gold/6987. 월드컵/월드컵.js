const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const pairs = [];
for (let i = 0; i < 5; i++) {
  for (let j = i + 1; j < 6; j++) {
    pairs.push([i, j]);
  }
}

// 가능한지 확인하는 함수
function isPossible(arr) {
  const team = Array.from({ length: 6 }, () => [0, 0, 0]);
  for (let i = 0; i < 6; i++) {
    team[i] = arr.slice(i * 3, i * 3 + 3);
  }

  let possible = false;

  function dfs(idx) {
    if (possible) return;
    if (idx === 15) {
      // 모든 경기 끝남 → 모든 팀의 승무패가 0이어야 함
      if (team.every(([w, d, l]) => w === 0 && d === 0 && l === 0)) {
        possible = true;
      }
      return;
    }

    const [a, b] = pairs[idx];

    // a 승, b 패
    if (team[a][0] > 0 && team[b][2] > 0) {
      team[a][0]--;
      team[b][2]--;
      dfs(idx + 1);
      team[a][0]++;
      team[b][2]++;
    }

    // 무승부
    if (team[a][1] > 0 && team[b][1] > 0) {
      team[a][1]--;
      team[b][1]--;
      dfs(idx + 1);
      team[a][1]++;
      team[b][1]++;
    }

    // a 패, b 승
    if (team[a][2] > 0 && team[b][0] > 0) {
      team[a][2]--;
      team[b][0]--;
      dfs(idx + 1);
      team[a][2]++;
      team[b][0]++;
    }
  }

  dfs(0);
  return possible ? 1 : 0;
}

const results = [];
for (let i = 0; i < 4; i++) {
  const arr = input[i].split(" ").map(Number);
  results.push(isPossible(arr));
}

console.log(results.join(" "));
