const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

// 최대 힙 구현
class MaxHeap {
  constructor() {
    this.heap = [];
  }
  push(value) {
    this.heap.push(value);
    let cur = this.heap.length - 1;
    while (cur > 0) {
      const parent = Math.floor((cur - 1) / 2);
      if (this.heap[parent] >= this.heap[cur]) break;
      [this.heap[parent], this.heap[cur]] = [this.heap[cur], this.heap[parent]];
      cur = parent;
    }
  }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let cur = 0;
    while (true) {
      let left = cur * 2 + 1;
      let right = cur * 2 + 2;
      let largest = cur;
      if (left < this.heap.length && this.heap[left] > this.heap[largest]) largest = left;
      if (right < this.heap.length && this.heap[right] > this.heap[largest]) largest = right;
      if (largest === cur) break;
      [this.heap[cur], this.heap[largest]] = [this.heap[largest], this.heap[cur]];
      cur = largest;
    }
    return top;
  }
  size() {
    return this.heap.length;
  }
}

let jewels = [];
for (let i = 1; i <= N; i++) {
  const [w, v] = input[i].split(" ").map(Number);
  jewels.push([w, v]);
}
jewels.sort((a, b) => a[0] - b[0]); // 무게 오름차순

let bags = [];
for (let i = N + 1; i <= N + K; i++) {
  bags.push(Number(input[i]));
}
bags.sort((a, b) => a - b); // 가방 무게 오름차순

let answer = 0;
let heap = new MaxHeap();
let idx = 0;

// 가벼운 가방부터
for (let i = 0; i < K; i++) {
  // 현재 가방 무게 이하인 모든 보석 heap에 추가
  while (idx < N && jewels[idx][0] <= bags[i]) {
    heap.push(jewels[idx][1]); // 가격만 저장
    idx++;
  }
  if (heap.size() > 0) {
    answer += heap.pop();
  }
}

console.log(answer);
