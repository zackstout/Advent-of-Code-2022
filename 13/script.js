
const { data } = require('./testInput');
const lines = data.split('\n').map(l => l.trim());

const parse = arr => {
  const pairs = [];

  let pair = [];
  arr.forEach(line => {
    // console.log(line);

    if (line) {
      pair.push(JSON.parse(line));
    } else {
      pairs.push(pair);
      pair = [];
    }
  });
  pairs.push(pair);
  return pairs;
};

const isOrdered = (pair) => {
  let [x, y] = pair;

  if (!Array.isArray(x) && !Array.isArray(y)) {
    if (x < y) return 1;
    if (x > y) return 0;
    if (x === y) return 2;
  }

  if (!Array.isArray(x)) {
    x = [x];
  }
  if (!Array.isArray(y)) {
    y = [y];
  }

  // Now we have 2 arrays, x and y
  const max = Math.max(x.length, y.length);

  for (let i = 0; i < max; i++) {

    // If lefthand array runs out first, it's ordered
    if (x[i] === undefined) return 1;
    // If righthand array runs out first, it's not ordered
    if (y[i] === undefined) return 0;

    // YEAH BUDDY, check this, instead of whether integers are equal.
    // Because same thing has to happen when arrays are equal.
    if (isOrdered([x[i], y[i]]) === 2) continue;

    return isOrdered([x[i], y[i]]);
  }

  return 2;
};

const run = () => {
  const pairs = parse(lines);
  // console.log("pairs", pairs);
  let sum = 0;

  pairs.forEach((pair, idx) => {
    if (isOrdered(pair)) {
      // console.log("Pair is ordered", pair[0].length, pair[1].length, idx + 1);
      // if (pair[0].length > pair[1].length) {
      //   console.log("Pair is ordered", pair, idx + 1);

      // }
      sum += (idx + 1);
    }
  });


  // const x = isOrdered([[1, 1, 1], [1, 1, 1, []]]);
  // console.log("ordered", x);
  return sum;
};


const runTwo = () => {
  const pairs = parse(lines);

  const x = [...pairs.map(p => p[0]), ...pairs.map(p => p[1])].sort((a, b) => isOrdered([a, b]));
  console.log(x.slice(0, 5), x.length);
};


// 5642 is too high... though test works

console.time('run');
console.log(runTwo());
console.timeEnd('run');

