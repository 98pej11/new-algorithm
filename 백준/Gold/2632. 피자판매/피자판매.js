const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const R = Number(input[0]);
input.shift();
const [m, n] = input[0].split(" ").map(Number);
input.shift();

const pizzaA = Array.from({ length: m * 2 }, () => null);
const pizzaB = Array.from({ length: n * 2 }, () => null);

for (let i = 0; i < m; i++) {
  pizzaA[i] = Number(input[i]);
  pizzaA[i + m] = Number(input[i]);
}

for (let i = 0; i < n; i++) {
  pizzaB[i] = Number(input[m + i]);
  pizzaB[i + n] = Number(input[m + i]);
}

for (let i = 1; i < m * 2; i++) {
  pizzaA[i] += pizzaA[i - 1];
}
for (let i = 1; i < n * 2; i++) {
  pizzaB[i] += pizzaB[i - 1];
}

// console.log(pizzaA, pizzaB);
let result = 0;
let remain = new Map();

if (pizzaA[m - 1] + pizzaB[n - 1] === R) {
  console.log(1);
  return;
}

if (pizzaA[m - 1] === R) result++;
else if (pizzaA[m - 1] < R) remain.set(pizzaA[m - 1], 1);

for (let i = 0; i < m; i++) {
  for (let j = i + 1; j < m + i; j++) {
    let cur = pizzaA[j] - pizzaA[i];
    if (cur === R) result++;
    else if (cur < R) remain.set(cur, (remain.get(cur) || 0) + 1);
  }
}

if (pizzaB[n - 1] === R) result++;
else if (pizzaB[n - 1] < R && remain.has(R - pizzaB[n - 1])) {
  result += remain.get(R - pizzaB[n - 1]);
}
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n + i; j++) {
    let cur = pizzaB[j] - pizzaB[i];
    //   console.log(cur);
    if (cur === R) result++;
    else if (cur < R && remain.has(R - cur)) {
      result += remain.get(R - cur);
    }
  }
}

console.log(result);
