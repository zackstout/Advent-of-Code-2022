
const { data } = require('./input');
const lines = data.split('\n');

const testInput = require("./testInput").data.split('\n');

const run = () => {
  let n = 0;

  const targets = [20, 60, 100, 140, 180, 220];

  const nums = [];

  let res = 0;

  lines.forEach(line => {

    if (line.startsWith("addx")) { n += 2; } else { n += 1; }

    // ahh must be >=, not >
    if (n >= targets[0]) {
      const v = targets.shift();
      const sum = nums.reduce((sum, v) => sum + v, 1); // starting value in register x is 1
      res += (sum * v);
      console.log(sum, v);
    }

    if (line.startsWith("addx")) {
      nums.push(+line.split(" ")[1]);
      // console.log("push n", +line.split(" ")[1]);
    }

    // console.log(n, line);
  });

  return res;
};

console.time('run');
console.log(run());
console.timeEnd('run');

