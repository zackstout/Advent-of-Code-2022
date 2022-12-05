
const { data } = require('./input');
const lines = data.split('\n');

const stacks = {
  1: 'HTZD'.split(''),
  2: 'QRWTGCS'.split(''),
  3: 'PBFQNRCH'.split(''),
  4: 'LCNFHZ'.split(''),
  5: 'GLFQS'.split(''),
  6: 'VPWZBRCS'.split(''),
  7: 'ZFJ'.split(''),
  8: 'DLVZRHQ'.split(''),
  9: 'BHGNFZLD'.split('')
}

const run = () => {
  lines.forEach((line, idx) => {
    const [num, from, to] = line.match(/(\d+)/g).map(x => +x);
    // if (idx < 3) console.log(line, nums);

    // part one, works
    // for (let i = 0; i < num; i++) {
    //   stacks[to].push(stacks[from].pop());
    // }

    // part two
    stacks[to] = [...stacks[to], ...stacks[from].splice(stacks[from].length - num, num)];

  });

  return Object.values(stacks).map(v => v[v.length - 1]).join('');
};
console.time('run');
console.log(run());
console.timeEnd('run');

