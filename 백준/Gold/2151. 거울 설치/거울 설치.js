const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const map = input.slice(1).map((row) => row.split(""));

const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

let doors = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "#") doors.push([i, j]);
  }
}

const [sr, sc] = doors[0];
const [er, ec] = doors[1];

// dist[r][c][dir]
const INF = Infinity;
const dist = Array.from({ length: N }, () => Array.from({ length: N }, () => Array(4).fill(INF)));

// 최소 힙 (다익스트라)
class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(item) {
    this.heap.push(item);
    this._up();
  }
  _up() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p][0] <= this.heap[i][0]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._down();
    return top;
  }
  _down() {
    let i = 0;
    while (true) {
      let l = i * 2 + 1;
      let r = i * 2 + 2;
      let smallest = i;

      if (l < this.heap.length && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
      if (r < this.heap.length && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

const pq = new MinHeap();

// 시작점에서 4방향 출발
for (let d = 0; d < 4; d++) {
  dist[sr][sc][d] = 0;
  pq.push([0, sr, sc, d]);
}

while (!pq.isEmpty()) {
  const [cnt, r, c, dir] = pq.pop();

  if (cnt > dist[r][c][dir]) continue;

  let nr = r + dr[dir];
  let nc = c + dc[dir];

  if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
  if (map[nr][nc] === "*") continue;

  // 직진
  if (dist[nr][nc][dir] > cnt) {
    dist[nr][nc][dir] = cnt;
    pq.push([cnt, nr, nc, dir]);
  }

  // 거울 설치 가능
  if (map[nr][nc] === "!") {
    for (const nd of [(dir + 1) % 4, (dir + 3) % 4]) {
      if (dist[nr][nc][nd] > cnt + 1) {
        dist[nr][nc][nd] = cnt + 1;
        pq.push([cnt + 1, nr, nc, nd]);
      }
    }
  }
}

// 도착 문 최소값
let answer = INF;
for (let d = 0; d < 4; d++) {
  answer = Math.min(answer, dist[er][ec][d]);
}

console.log(answer);
