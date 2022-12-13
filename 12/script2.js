
const { data } = require('./input');
const lines = data.split('\n').map(x => x.trim());

const testLines =
    `Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi`.split('\n').map(x => x.trim());



/**
 * Main diff from part1 is that now start at "End",
 * go until you hit an "a". Invert the "canVisit" rule.
 */



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
    if (srcVal === "E") return lines[r][c] === "z";
    if (visited.has(`${r},${c}`)) return false;

    return lines[r][c].charCodeAt(0) >= srcVal.charCodeAt(0) - 1;
};

const run = () => {
    const start = { r: 0, c: 0 };

    start.r = lines.findIndex(x => x.includes("E"));
    start.c = lines[start.r].split('').findIndex(x => x === "E");


    visited.set(`${start.r},${start.c}`, 0);


    while (true) {
        const minKey = [...visited.keys()].sort((a, b) => visited.get(a) - visited.get(b))[0];
        if (!minKey) continue;

        const pos = {
            r: +minKey.split(',')[0],
            c: +minKey.split(',')[1]
        };

        const val = lines[pos.r][pos.c];

        const neighbors = getNeighbors(pos.r, pos.c)
            .filter(n => canVisit(val, n.r, n.c));

        if (neighbors.some(n => lines[n.r][n.c] === "a")) {
            // Break  
            return visited.get(minKey) + 1;
        }

        neighbors.forEach(n => {
            visited.set(`${n.r},${n.c}`, visited.get(minKey) + 1);
        });

        visited.set(minKey, Infinity); // Should effectively set this cell as "dead", never to be chosen as new head/leaf
    }
};

console.time('run');
console.log("Result:", run());
console.timeEnd('run');

