const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const parent = input[1].split(" ").map(Number);

const child = Array.from({ length: N }, () => []);

for (let i = 1; i < N; i++) {
  child[parent[i]].push(i);
}

console.log(dfs(0));

function dfs(node) {
  if (child[node].length === 0) {
    return 0;
  }

  let list = [];

  for (let ch of child[node]) {
    list.push(dfs(ch));
  }

  list.sort((a, b) => b - a);

  let max = 0;

  for (let i = 0; i < list.length; i++) {
    max = Math.max(max, list[i] + i + 1);
  }

  return max;
}
