
const { data } = require('./input');
const lines = data.split('\n').map(l => l.split('').map(n => +n));

const testLines = `30373
25512
65332
33549
35390`.split('\n').map(l => l.split('').map(n => +n));

/**
 * Run through all rows and cols, forward and backward.
 * Keep map of all visible trees; only add if not already has.
 */

const run = () => {
  const visibleTrees = new Map();

  // Rows forward
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];
    let block = -1;
    for (let j = 0; j < row.length; j++) {
      const val = row[j];
      const key = `${i},${j}`;
      if (val > block) {
        block = val;
        if (!visibleTrees.has(key)) {
          visibleTrees.set(key, 1);
        }
      }
    }
  }

  // Rows backward
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];
    let block = -1;
    for (let j = row.length - 1; j >= 0; j--) {
      const val = row[j];
      const key = `${i},${j}`;
      if (val > block) {
        block = val;
        if (!visibleTrees.has(key)) {
          visibleTrees.set(key, 1);
        }
      }
    }
  }

  // Cols forward
  for (let j = 0; j < lines[0].length; j++) {
    const col = lines.map(l => l[j]);
    let block = -1;
    for (let i = 0; i < col.length; i++) {
      const val = col[i];
      const key = `${i},${j}`;
      if (val > block) {
        block = val;
        if (!visibleTrees.has(key)) {
          visibleTrees.set(key, 1);
        }
      }
    }
  }

  // Cols backward
  for (let j = 0; j < lines[0].length; j++) {
    const col = lines.map(l => l[j]);
    let block = -1;
    for (let i = col.length - 1; i >= 0; i--) {
      const val = col[i];
      const key = `${i},${j}`;
      if (val > block) {
        block = val;
        if (!visibleTrees.has(key)) {
          visibleTrees.set(key, 1);
        }
      }
    }
  }

  console.log(visibleTrees);
  return visibleTrees.size;
};

const findScore = (i, j) => {


  const val = lines[i][j];

  // console.log("finding score", val, i, j);

  let x = 0, y = 0, z = 0, w = 0;

  let r = i + 1, c = j;
  while (r < lines.length) {
    x++;
    if (lines[r][c] >= val) break;
    r++;
  }


  r = i - 1, c = j;
  while (r >= 0) {
    y++;
    if (lines[r][c] >= val) break;
    r--;
  }

  r = i, c = j + 1;
  while (c < lines[0].length) {
    z++;
    if (lines[r][c] >= val) break;
    c++;
  }

  r = i, c = j - 1;
  while (c >= 0) {
    w++;
    if (lines[r][c] >= val) break;
    c--;
  }

  // console.log(x, y, z, w);
  return x * y * z * w;
};

const runTwo = () => {
  const scores = new Map();

  // Ignore borders (score is always 0)
  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      scores.set(`${i},${j}`, findScore(i, j));
    }
  }

  // findScore(3, 2);
  return Math.max(...scores.values());
};

console.time('run');
console.log(runTwo());
console.timeEnd('run');

