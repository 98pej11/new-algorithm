const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
let visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
let answer = 0;

DFS(0, 0);
console.log(answer);

function DFS(count, start) {
  if (check(count)) answer++;
  if (count === N * M) return;

  for (let i = start; i < N * M; i++) {
    let x = parseInt(i / M);
    let y = i % M;
    
    if (visited[x][y]) continue;

    visited[x][y] = true;
    DFS(count + 1, i + 1);
    visited[x][y] = false;
  }
}

function check(count) {
  if (count < 4) return true;
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < M - 1; j++) {
      if (visited[i][j] && visited[i + 1][j] && visited[i][j + 1] && visited[i + 1][j + 1]) return false;
    }
  }
  return true;
}
