
const { data } = require('./input');
const lines = data.split('\n');

const run = () => {
  return lines.reduce((sum, line) => {
    // was off by one, needed >= instead of >
    const match = line.slice(0, line.length / 2).split("").find(x => line.lastIndexOf(x) >= line.length / 2);
    // console.log("match", match);
    // if (match === undefined) console.log(line, line.length, line.slice(0, line.length / 2));
    const score = match === match.toUpperCase() ? -38 : -96;
    return sum + score + match.charCodeAt(0);
  }, 0);
};

console.time('run');
console.log(run());
console.timeEnd('run');

const runTwo = () => {
  let sum = 0;
  let i = 0;
  while (i < lines.length - 2) {
    const group = lines.slice(i, i + 3);
    const match = group[0].split("").find(x => group[1].includes(x) && group[2].includes(x));
    // console.log("Match", match);
    // Watch parens here
    sum += (match.charCodeAt(0) + (match === match.toUpperCase() ? -38 : -96));
    i += 3;
  }
  return sum;
};

console.time('runTwo');
console.log(runTwo());
console.timeEnd('runTwo');
