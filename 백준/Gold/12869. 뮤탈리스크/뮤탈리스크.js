const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const scv = input[1].split(" ").map(Number);

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
  }

  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    return this.queue[this.front++];
  }

  isEmpty() {
    return this.front === this.queue.length;
  }
}

let min = Infinity;
let queue = new Queue();
let visited = new Set();

if (N === 1) {
  queue.enqueue([scv[0], 0, 0, 0]);
} else if (N === 2) {
  queue.enqueue([scv[0], scv[1], 0, 0]);
} else {
  queue.enqueue([scv[0], scv[1], scv[2], 0]);
}
visited.add(`${scv[0]},${scv[1]},${scv[2]}`);

console.log(BFS());

function BFS() {
  while (!queue.isEmpty()) {
    let [n1, n2, n3, count] = queue.dequeue();

    // if (n1 <= 0 && n2 <= 0 && n3 <= 0) {
    //   return count;
    // }

    const states = [
      [n1 - 9, n2 - 3, n3 - 1],
      [n1 - 9, n2 - 1, n3 - 3],
      [n1 - 3, n2 - 1, n3 - 9],
      [n1 - 3, n2 - 9, n3 - 1],
      [n1 - 1, n2 - 9, n3 - 3],
      [n1 - 1, n2 - 3, n3 - 9],
    ];

    for ([next1, next2, next3] of states) {
      if (next1 <= 0 && next2 <= 0 && next3 <= 0) {
        return count + 1;
      }
      if (!visited.has(`${next1},${next2},${next3}`)) {
        visited.add(`${next1},${next2},${next3}`);
        queue.enqueue([next1, next2, next3, count + 1]);
      }
    }
  }
}
