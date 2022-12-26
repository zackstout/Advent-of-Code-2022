
const { data } = require('./input');
const lines = data.split('\n');

const test = `....#..
  ..###.#
  #...#.#
  .#...##
  #.###..
  ##.#.##
  .#..#..`.split('\n').map(x => x.trim());


const testSmall = `.....
  ..##.
  ..#..
  .....
  ..##.
  .....`.split('\n').map(x => x.trim());

const parse = arr => {
  const m = new Map();
  arr.forEach((line, r) => {
    line.split("").forEach((char, c) => {
      if (char === "#") {
        m.set(`${r},${c}`, 1);
      }
    });
  });
  return m;
};

const DIRS_DELTAS = {
  N: [[0, -1], [1, -1], [-1, -1]],
  E: [[1, 0], [1, 1], [1, -1]],
  S: [[0, 1], [1, 1], [-1, 1]],
  W: [[-1, 0], [-1, 1], [-1, -1]],
};

let DIRS = ["N", "S", "W", "E"];

const cloneMap = source => new Map(JSON.parse(JSON.stringify(Array.from(source))));

const mapsEqual = (m1, m2) => {
  if (!m1 || !m2) return false;
  return [...m1.keys()].every(key => m1.get(key) === m2.get(key));
};

/**
 * Create a new targets Map to track where each elf wants to go.
 * (Keyed by target cell, value is array of elves that want to go there)
 * If any elves have 0 neighbors, skip them.
 * Move all elves in targets Map with single value in array to target.
 */
const step = m => {

  const targets = new Map();

  const result = cloneMap(m);

  // Populate targets map
  [...m.keys()].forEach(elf => {
    const [r, c] = elf.split(",").map(Number);
    const deltas = [
      [1, 0], [-1, 0],
      [0, 1], [1, 1], [-1, 1],
      [0, -1], [1, -1], [-1, -1]
    ];
    const neighbors = deltas.map(d => ({ r: r + d[1], c: c + d[0] })).filter(pos => m.has(`${pos.r},${pos.c}`));
    if (neighbors.length === 0) return;


    let isDone = false;
    DIRS.forEach(direction => {
      if (isDone) return;
      const dirDeltas = DIRS_DELTAS[direction];
      // if any of those cells are occupied, skip to next direction.
      if (dirDeltas.some(d => m.has(`${r + d[1]},${c + d[0]}`))) {
        return;
      } else {
        // Set that direction as target
        // const key = "";
        const move = dirDeltas[0];
        const key = `${r + move[1]},${c + move[0]}`;
        if (targets.has(key)) {
          targets.set(key, [...targets.get(key), elf])
        } else {
          targets.set(key, [elf]);
        }
        isDone = true;
      }
    });
  });
  // console.log("targets", targets);

  targets.forEach((value, key) => {
    if (value.length === 1) {
      // Move it
      result.delete(value[0]);
      result.set(key, 1);
    }
  });

  // console.log("New resultap", result);
  return result;

};

const run = () => {
  // console.log(test, parse(test));

  let m = parse(lines.map(x => x.trim()));
  // let m = parse(test);
  // Step until no elves move (maps are equal)
  // Just manually update the DIRS array here (DIRS.push(DIRS.shift()))

  let prev = null;
  let i = 0;
  while (true && i < 500000) {
    if (mapsEqual(m, prev)) break;
    prev = m;
    m = step(m);
    i++;
    DIRS.push(DIRS.shift());
  }

  const maxR = Math.max(...[...m.keys()].map(key => +key.split(",")[1]));
  const minR = Math.min(...[...m.keys()].map(key => +key.split(",")[1]));
  const maxC = Math.max(...[...m.keys()].map(key => +key.split(",")[0]));
  const minC = Math.min(...[...m.keys()].map(key => +key.split(",")[0]));

  console.log("Num steps", i);
  console.log("Bounds", minR, maxR, minC, maxC);

  // Lol it's pretty sneaky that in example, you get same result if you leave out the "plus 1" and the "minus m.size"
  return (maxR - minR + 1) * (maxC - minC + 1) - m.size;
};

// Uh oh... part 2.... took 9 seconds to run 1000.... Oh good it's just 1069
console.time('run');
console.log(run());
console.timeEnd('run');

