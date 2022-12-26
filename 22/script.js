
const { data } = require('./input');
const lines = data.split('\n');

// Eeek, watch out for whitespace
const testInput = `
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`.split("\n");

const EMPTY = "X";

const parse = input => {
  const moves = input.at(-2); // NOTE!!! was -1 for test
  const nums = moves.split(/[RL]/);
  const turns = moves.match(/[RL]/g);
  const res = [];
  // console.log("moves...", input.length, input.slice(input.length - 3));
  for (let i = 0; i < nums.length; i++) {
    res.push(+nums[i]);
    if (turns[i]) res.push(turns[i]);
  }
  const grid = input
    .slice(0, input.length - 2)
    .filter(x => x)
    // NOTE only do this for real input, not for test
    .map((x, i) => i >= 100 ? x : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + x)
    .map(l => l.replace(/\s/g, "X"));
  const maxLen = Math.max(...grid.map(l => l.length));

  grid.forEach((line, lineIdx) => {
    while (line.length < maxLen) {
      line += EMPTY;
      grid[lineIdx] = line;
    }
  });

  // console.log("end of grid", grid.slice(grid.length - 3))
  return { moves: res, grid };
};

// Curr is in [0,1,2,3], t is in [L,R]
const turn = (curr, t) => {
  if (t === "L") return (curr + 4 - 1) % 4;
  if (t === "R") return (curr + 1) % 4;
};

const DIR_DELTAS = {
  0: [1, 0],
  1: [0, 1],
  2: [-1, 0],
  3: [0, -1]
};


const run = () => {
  const { moves, grid } = parse(lines);
  // console.log(moves, grid, grid.slice(grid.length - 100));

  const NUM_ROWS = grid.length;
  const NUM_COLS = grid[0].length;

  const pos = {
    r: 0,
    c: grid[0].indexOf(".")
  }
  // 0=R, 1=D, 2=L, 3=U
  let dir = 0;



  // return;

  // console.log(pos);

  while (moves.length > 0) {
    let next = moves.shift();

    // console.log("next", next);
    if (next === parseInt(next)) {
      // Move in current dir. If hit wall ("#"), stop. If hit edge (EMPTY), wrap.
      // Look at "target" cell, including wrapping -- if a wall, don't go there.

      let targetCell = { ...pos };
      const delta = DIR_DELTAS[dir];
      // console.log("DELTA", delta);

      // Walk for {next} steps, or until hit a wall.
      while (next > 0) {

        targetCell.c += delta[0];
        targetCell.r += delta[1];

        // If target is an "X", keep going until it's NOT an "X"
        while (grid[targetCell.r]?.[targetCell.c] === "X" || grid[targetCell.r]?.[targetCell.c] === undefined) {
          targetCell.r = (targetCell.r + delta[1] + NUM_ROWS) % NUM_ROWS;
          targetCell.c = (targetCell.c + delta[0] + NUM_COLS) % NUM_COLS;
          const val = grid[targetCell.r][targetCell.c];
          if (val === "#" || val === ".") break;
          // if (val === EMPTY) break;
        }

        const val = grid[targetCell.r][targetCell.c];
        if (val === "#") {
          break;
        }
        pos.r = targetCell.r;
        pos.c = targetCell.c;

        // console.log("Pos", pos.r, pos.c);
        next--;
      }
    } else {
      // Change dir
      dir = turn(dir, next);
    }
  }

  console.log("Final pos", pos, "and dir", dir);
  return 1000 * (pos.r + 1) + 4 * (pos.c + 1) + dir;

  // console.log(turn(0, "R"), turn(0, "L"), turn(2, "R"))
};

console.time('run');
console.log(run());
console.timeEnd('run');

