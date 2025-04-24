const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input = input[0].split("");

const stack = [];

for (let i = 0; i < input.length; i++) {
  stack.push(input[i]);

  if (stack.length >= 4) {
    while (1) {
      let N = stack.length - 1;
      if (stack[N] === "P" && stack[N - 1] === "A" && stack[N - 2] === "P" && stack[N - 3] === "P") {
        for (let j = 0; j < 4; j++) stack.pop();
        stack.push("P");
      } else break;
    }
  }
}

if (stack.length === 1 && stack[0] === "P") console.log("PPAP");
else console.log("NP");
