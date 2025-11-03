const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const S = Number(input[0]);

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(item) {
    this.queue.push(item);
    this.rear++;
  }

  dequeue() {
    let removed = this.queue[this.front++];
    return removed;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

const queue = new Queue();
queue.enqueue([1, 0, 0]);

// console.log(queue);
console.log(BFS());

function BFS() {
  const visited = Array.from({ length: 2001 }, () => Array(2001).fill(false));

  while (!queue.isEmpty()) {
    let [sum, clip, time] = queue.dequeue();

    // console.log(sum, clip, time);
    if (sum === S) {
      return time;
    }

    // 복사
    if (!visited[sum][sum]) {
      visited[sum][sum] = true;
      queue.enqueue([sum, sum, time + 1]);
    }
    // 붙여넣기
    if (clip > 0 && sum + clip <= 2000 && !visited[sum + clip][clip]) {
      visited[sum + clip][clip] = true;
      queue.enqueue([sum + clip, clip, time + 1]);
    }
    // 하나 삭제
    if (sum > 0 && !visited[sum - 1][clip]) {
      visited[sum - 1][clip] = true;
      queue.enqueue([sum - 1, clip, time + 1]);
    }
  }
}
