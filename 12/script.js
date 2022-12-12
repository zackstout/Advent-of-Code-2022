
const { data } = require('./input');
const lines = data.split('\n').map(x => x.trim());

const testLines =
  `Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi`.split('\n').map(x => x.trim());


// ooooohduh.... don't mark as visitedandforget...
// bc could be visitable from another dir
// noo....nvm


const getNeighbors = (r, c) => {
  const result = [];

  if (r > 0) result.push({ r: r - 1, c });
  if (r < lines.length - 1) result.push({ r: r + 1, c });
  if (c > 0) result.push({ r, c: c - 1 });
  if (c < lines[0].length - 1) result.push({ r, c: c + 1 });
  return result;
};

const visited = new Map();

const canVisit = (srcVal, r, c) => {
  if (srcVal === "S") return true;
  if (visited.has(`${r},${c}`)) return false;
  // if (lines[r][c] === "E") return true;
  if (lines[r][c] === "E") return srcVal === "z";

  // return true;
  // console.log("can visit..", lines[r][c].charCodeAt(0), srcVal.charCodeAt(0) + 1);
  return lines[r][c].charCodeAt(0) <= srcVal.charCodeAt(0) + 1;
};

const run = () => {
  const start = { r: 0, c: 0 };
  const end = { r: 0, c: 0 };

  start.r = lines.findIndex(x => x.includes("S"));
  start.c = lines[start.r].split('').findIndex(x => x === "S");
  end.r = lines.findIndex(x => x.includes("E"));
  // console.log("row...", lines[end.r]);
  end.c = lines[end.r].split('').findIndex(x => x === "E");

  // If char is 'd', can only visit 'e' and below
  console.log(start, end, 'a'.charCodeAt(0), 'z'.charCodeAt(0)); // 97 to 122

  visited.set(`${start.r},${start.c}`, 0);
  // const target = `${end.r},${end.c}`;

  // let i = 0;

  while (true) {
    // i += 1;
    const minKey = [...visited.keys()].sort((a, b) => visited.get(a) - visited.get(b))[0];
    if (!minKey) continue;

    const pos = {
      r: +minKey.split(',')[0],
      c: +minKey.split(',')[1]
    };

    // console.log("mk", minKey, pos, visited);

    const val = lines[pos.r][pos.c];

    const neighbors = getNeighbors(pos.r, pos.c)
      .filter(n => canVisit(val, n.r, n.c));

    // console.log(neighbors);

    if (neighbors.some(n => n.r === end.r && n.c === end.c)) {
      // Break  
      return visited.get(minKey) + 1;
    }

    neighbors.forEach(n => {
      // const { r, c } = n;
      // console.log("rc", r, c, n);
      // const val = lines[r][c];
      visited.set(`${n.r},${n.c}`, visited.get(minKey) + 1);
    });

    visited.set(minKey, Infinity); // Should effectively set this cell as "dead", never to be chosen as new head/leaf
  }
};

console.time('run');
console.log("Result:", run());
console.timeEnd('run');

