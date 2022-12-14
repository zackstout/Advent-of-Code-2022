
const { data } = require('./input');
const lines = data.split('\n').map(x => x.trim());



const parseInput = lines => {
  const grid = new Map();

  const connectedLines = lines.map(l => l.split(" -> ").map(x => x.split(",").map(n => +n)));

  connectedLines.forEach((line) => {
    line.forEach((node, nodeIdx) => {
      // Skip final node because we consider node along with next node
      if (nodeIdx === line.length - 1) return;
      // console.log(node, line[nodeIdx + 1]);

      const nextNode = line[nodeIdx + 1];

      // testing same val issue
      // node = [6, 6];
      // nextNode = [3, 6];

      // "Draw the line" between node endpoints:
      const shared = node.find(x => nextNode.includes(x));
      const sharedIdx = Math.max(node.findIndex(x => x === shared), nextNode.findIndex(x => x === shared));
      if (sharedIdx === 0) {
        // same x
        const yRange = [node, nextNode].map(n => n[1]);
        const min = Math.min(...yRange);
        const max = Math.max(...yRange);
        for (let i = min; i <= max; i++) {
          // console.log("Pt", shared, i);
          const key = `${shared},${i}`;
          if (!grid.has(key)) grid.set(key, 1);
        }
      } else {
        // same y
        const xRange = [node, nextNode].map(n => n[0]);
        const min = Math.min(...xRange);
        const max = Math.max(...xRange);
        for (let i = min; i <= max; i++) {
          // console.log("Pt", i, shared);
          const key = `${i},${shared}`;
          if (!grid.has(key)) grid.set(key, 1);
        }
      }

      // console.log(shared, sharedIdx);
    });
  });
  return grid;
};


// Bring sand to final location, add it to map.
// Return false if y exceeds a certain "abyssal" value.
const bringSandToRest = (grid) => {
  const pos = { x: 500, y: 0 };

  const maxY = Math.max(...[...grid.keys()].map(k => k.split(",")[1]));
  console.log("Max y", maxY);

  let count = 0;
  while (true) {
    count++;
    if (pos.y > maxY) return false;

    const nextRow = [
      `${pos.x},${pos.y + 1}`, // center
      `${pos.x - 1},${pos.y + 1}`, // left
      `${pos.x + 1},${pos.y + 1}`, // right
    ];
    const idx = nextRow.findIndex(n => !grid.has(n));

    // console.log(nextRow, idx);
    if (idx === -1) {
      // Done. Sand at rest.
      // console.log("sand at rest,", pos);
      grid.set(`${pos.x},${pos.y}`, 1);
      return true;
    }
    const [x, y] = nextRow[idx].split(",").map(n => +n);
    pos.x = x;
    pos.y = y;
  }
};


const run = () => {
  const grid = parseInput(lines);
  let count = 0;

  // console.log("Grid", grid);

  while (bringSandToRest(grid)) {
    count++;
  }

  return count;
};

console.time('run');
console.log(run());
console.timeEnd('run');

