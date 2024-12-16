function bfs(arr) {
  const visited = new Array(101).fill(-1);
  visited[1] = 0;
  const queue = [1];

  while (queue.length > 0) {
    let cur = queue.shift();

    for (let i = 1; i <= 6; i++) {
      let curNext = cur + i;

      if (curNext > 100) break;

      if (arr[curNext] !== -1) {
        curNext = arr[curNext];
      }

      if (visited[curNext] === -1 || visited[curNext] > visited[cur] + 1) {
        visited[curNext] = visited[cur] + 1;

        if (curNext === 100) {
          return visited[curNext];
        }

        queue.push(curNext);
      }
    }
  }
}

function main() {
  const fs = require("fs");
  const input = fs
    // .readFileSync("2주차/입출력.txt")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

  const [N, M] = input[0].split(" ").map(Number);
  const arr = new Array(101).fill(-1);

  // 사다리 데이터
  for (let i = 1; i <= N; i++) {
    const [x, y] = input[i].split(" ").map(Number);
    arr[x] = y;
  }

  // 뱀 데이터
  for (let i = N + 1; i <= N + M; i++) {
    const [u, v] = input[i].split(" ").map(Number);
    arr[u] = v;
  }

  const cnt = bfs(arr);
  console.log(cnt);
}

main();
