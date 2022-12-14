
const { data } = require('./input');
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

  // console.log("Is ordered...", x, y,);

  // Hmm.... Seems we want "<" for test case "8"... but otherwise "<="....
  if (!Array.isArray(x) && !Array.isArray(y)) return x <= y;

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
    if (x[i] === undefined) return true;
    // If righthand array runs out first, it's not ordered
    if (y[i] === undefined) return false;

    if (x[i] === y[i]) continue;

    // if (!isOrdered([x[i], y[i]])) {
    //   return false;
    // }
    return isOrdered([x[i], y[i]]);
  }

  return true;
};

const run = () => {
  const pairs = parse(lines);
  // console.log("pairs", pairs);
  let sum = 0;

  pairs.forEach((pair, idx) => {
    if (isOrdered(pair)) {
      console.log("Pair is ordered", pair, idx + 1);
      sum += (idx + 1);
    }
  });


  const x = isOrdered([[1, 1, 1], [1, 1, 1, []]]);
  console.log("ordered", x);
  return sum;
};


// 5642 is too high... though test works

console.time('run');
console.log(run());
console.timeEnd('run');

