const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
let board = [];
let data = [];

for (let i = 1; i <= N; i++) {
  let row = input[i].split(" ").map(Number);
  board.push(row);

  for (let j = 0; j < N; j++) {
    if (row[j] !== 0) {
      // (바이러스 번호, 시간, x, y)
      data.push([row[j], 0, i - 1, j]);
    }
  }
}

// S, X, Y
const [S, X, Y] = input[N + 1].split(" ").map(Number);

// 바이러스 번호 기준 오름차순 정렬 (작은 번호가 먼저 확산)
data.sort((a, b) => a[0] - b[0]);

let queue = [...data];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

while (queue.length > 0) {
  let [virus, sec, x, y] = queue.shift();

  if (sec === S) break; // S초 후 멈춤

  for (let dir = 0; dir < 4; dir++) {
    let nx = x + dx[dir];
    let ny = y + dy[dir];

    if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
      if (board[nx][ny] === 0) {
        board[nx][ny] = virus;
        queue.push([virus, sec + 1, nx, ny]);
      }
    }
  }
}

console.log(board[X - 1][Y - 1]);
