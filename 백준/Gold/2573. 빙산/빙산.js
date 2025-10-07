const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let arr = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1].split(" ").map(Number);
}

let time = 0;

while (true) {
  let newArr = arr.map((row) => [...row]);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] > 0) {
        let cnt = 0;
        for (let d = 0; d < 4; d++) {
          let nr = i + dir[d][0];
          let nc = j + dir[d][1];

          if (nr >= 0 && nr < N && nc >= 0 && nc < M && arr[nr][nc] === 0) {
            cnt++;
          }
        }
        newArr[i][j] = Math.max(arr[i][j] - cnt, 0);
      }
    }
  }
  time++;

  let iceChunks = onIceCnt();

  if (iceChunks > 1) {
    console.log(time - 1);
    break;
  }

  if (iceChunks === 0) {
    console.log(0);
    break;
  }

  arr = newArr.map((row) => [...row]);
}

function onIceCnt() {
  let iceCnt = 0;
  let visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] > 0 && !visited[i][j]) {
        dfs(i, j, visited);
        iceCnt++;
      }
    }
  }
  return iceCnt;
}

// DFS 함수로 얼음 덩어리 탐색
function dfs(r, c, visited) {
  visited[r][c] = true;

  for (let i = 0; i < 4; i++) {
    let nr = r + dir[i][0];
    let nc = c + dir[i][1];

    if (nr >= 0 && nr < N && nc >= 0 && nc < M && arr[nr][nc] > 0 && !visited[nr][nc]) {
      dfs(nr, nc, visited);
    }
  }
}
