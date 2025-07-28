const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = Number(input[0]);

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
    let removed = this.queue[this.front];
    this.front++;
    return removed;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
let queue = new Queue();
let sum = 0;
let answer = 0;

for (let i = 1; i <= n; i++) {
  if (isPrime(i)) {
    while (sum + i > n) {
      let val = queue.dequeue();
      sum -= val;
    }

    if (i > n) break;

    queue.enqueue(i);
    sum += i;

    if (sum === n) {
      answer++;
    }
  }
}

console.log(answer);

function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
