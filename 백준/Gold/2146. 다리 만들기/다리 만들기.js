const fs = require("fs");
const input = fs
  // .readFileSync("2주차/입출력.txt")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
input.shift();

const map = new Array(N).fill(null).map(() => new Array(N).fill(null));
const visited = new Array(N).fill(null).map(() => new Array(N).fill(false));
const groupMap = new Map();

let min = Infinity;

for (let i = 0; i < N; i++) {
  const arr = input[i].split(" ").map(Number);

  for (let j = 0; j < N; j++) {
    map[i][j] = arr[j];
  }
}

let group = 2;

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 1) {
      groupMap.set(group, []);
      DFS(i, j, group);
      group++;
    }
  }
}

for (let [k, v] of groupMap) {
  const queue = [];
  const visited = new Array(N).fill(null).map(() => new Array(N).fill(false));

  // for (let i = 0; i < v.length; v++) {
  //   queue.push([v[i][0], v[i][1], 0]);
  //   visited[(v[i][0], v[i][1])] = true;
  // }

  // 그룹에 속하는 좌표들 큐에 넣기
  v.forEach(([r, c]) => {
    queue.push([r, c, 0]); // [r, c, distance]
    visited[r][c] = true;
  });
  // console.log(queue);
  // BFS 수행
  while (queue.length > 0) {
    let [r, c, dist] = queue.shift();

    for (let d = 0; d < 4; d++) {
      let nr = r + dir[d][0];
      let nc = c + dir[d][1];

      if (nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc]) {
        if (map[nr][nc] === 0) {
          queue.push([nr, nc, dist + 1]);
          visited[nr][nc] = true;
        } else if (map[nr][nc] !== k) {
          min = Math.min(min, dist + 1);
        }
      }
    }
  }
  // console.log(k, min);
}

console.log(min);

// DFS
function DFS(r, c, group) {
  visited[r][c] = true;
  map[r][c] = group;

  for (let d = 0; d < 4; d++) {
    let nr = r + dir[d][0];
    let nc = c + dir[d][1];

    if (nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc]) {
      if (map[nr][nc] === 1) {
        DFS(nr, nc, group);
      } else {
        groupMap.get(group).push([nr, nc]);
      }
    }
  }
}
