
const { data } = require('./input');
const lines = data.split('\n');

const run = () => {
  return lines.reduce((sum, line) => {
    const [r1, r2] = line.split(",")
      .map(range => range.split("-").map(x => +x));
    // if (line.trim() === "9-27,10-80") console.log(ranges);

    const [s1, e1] = r1;
    const [s2, e2] = r2;

    // check if r2 contains r1
    const val = ((s1 >= s2 && e1 <= e2) || (s1 <= s2 && e1 >= e2)) ? 1 : 0;
    return sum + val;
  }, 0);
};
console.time('run');
console.log(run());
console.timeEnd('run');


const runTwo = () => {
  return lines.reduce((sum, line) => {
    const [r1, r2] = line.split(",")
      .map(range => range.split("-").map(x => +x));
    // if (line.trim() === "9-27,10-80") console.log(ranges);

    const [s1, e1] = r1;
    const [s2, e2] = r2;

    // check if r1 and r2 overlap
    const val = (s1 <= e2 && e1 >= e2 || s2 <= e1 && e2 >= e1) ? 1 : 0;
    return sum + val;
  }, 0);
};
console.time('runTwo');
console.log(runTwo());
console.timeEnd('runTwo');