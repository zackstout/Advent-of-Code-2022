
const { data } = require('./input');
const lines = data.split('\n');

console.log(lines);

const run = () => {
  const nums = [];
  let num = 0;
  for (let line of lines) {
    if (line.match(/\d/)) {
      num += +line;
    } else {
      nums.push(num);
      num = 0;
    }
  }

  console.log(nums);
  return Math.max(...nums);
};

// console.time("run");
// console.log(run());
// console.timeEnd("run");


const runTwo = () => {
  const nums = [];
  let num = 0;
  for (let line of lines) {
    if (line.match(/\d/)) {
      num += +line;
    } else {
      nums.push(num);
      num = 0;
    }
  }

  console.log(nums);
  return nums.sort((a, b) => b - a).slice(0, 3).reduce((sum, v) => sum + v, 0);
};

console.time("run");
console.log(runTwo());
console.timeEnd("run");
