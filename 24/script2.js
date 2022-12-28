
const { data } = require('./input');
const lines = data.split('\n').map(x => x.trim());

const smallTest = `#.#####
  #.....#
  #<....#
  #.....#
  #...v.#
  #.....#
  #####.#`.split("\n").map(x => x.trim());


const test = `#.######
  #>>.<^<#
  #.<..<<#
  #>v.><>#
  #<^v^^>#
  ######.#`.split("\n").map(x => x.trim());

// python syntax for slicing is much nicer..
const parse = input => {
    const grid = input.slice(1, input.length - 1)
        .map(row => row.slice(1, row.length - 1));
    // console.log(grid);
    // const blizzards = new Map(); // keys are positions, values are blizzard type (><^v);
    // Oh wait.... same position can have multiple blizzards... maybe just give them type and position
    const blizzards = [];

    const rows = grid.length;
    const columns = grid[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const val = grid[i][j];
            if (val.match(/[>v<\^]/)) {
                // console.log("match", val);
                // blizzards.set(`${i},${j}`, val);
                blizzards.push({ position: { y: i, x: j }, type: val });
            }
        }
    }

    function getBlizzardsAtTime(t) {
        return blizzards.map(b => {
            let invert = b.type.match(/[>v]/) ? 1 : -1;
            // console.log("invert", invert);
            return {
                ...b,
                position: {
                    x: b.type.match(/[v\^]/) ? b.position.x : (b.position.x + invert * t + columns * 10000) % columns,
                    y: b.type.match(/[v\^]/) ? (b.position.y + invert * t + rows * 10000) % rows : b.position.y,
                }
            }
        });
    }

    return {
        rows,
        columns,
        blizzards,
        getBlizzardsAtTime
    }
};




const bfs = (parsedGrid, initialTime = 1, reversed = false) => {
    const visited = new Map();

    const {
        rows,
        columns,
        blizzards,
        getBlizzardsAtTime
    } = parsedGrid;


    //   let initialTime = 1;
    const startPosition = reversed ? [columns - 1, rows - 1] : [0, 0];
    const target = reversed ? [0, 0] : [columns - 1, rows - 1];

    while (true) {
        if (!getBlizzardsAtTime(initialTime).some(b => b.position.x === startPosition[0] && b.position.y === startPosition[1])) break;
        initialTime++;
    }


    console.log("INIT TIME", initialTime, startPosition, target);

    const start = [...startPosition, initialTime].toString();
    visited.set(start, 0);

    const maxX = columns - 1;
    const minX = 0;
    const maxY = rows - 1;
    const minY = 0;

    let i = 0;
    let isDone = false;
    let finalTime = 0;

    // console.log("about to loop", i, isDone);

    while (i < 1000000 && !isDone) {
        // if (i % 1000 === 0) console.log("iter", i);
        i += 1;
        const minKey = [...visited.keys()].sort((a, b) => visited.get(a) - visited.get(b))[0];
        if (!minKey) continue;
        if (visited.get(minKey) === Infinity) break;

        const cube = minKey.split(",").map(Number);

        const time = cube[2];
        const timeSlice = getBlizzardsAtTime(time + 1);

        const neighbors = [
            [cube[0] + 1, cube[1], time + 1],
            [cube[0] - 1, cube[1], time + 1],
            [cube[0], cube[1] + 1, time + 1],
            [cube[0], cube[1] - 1, time + 1],
            [cube[0], cube[1], time + 1], // This represents staying still in one location
        ]
            // .filter(x => !visited.has(x.toString()))
            .filter(x => !timeSlice.find(b => b.position.x === x[0] && b.position.y === x[1]))
            .filter(x => x[0] >= minX && x[0] <= maxX && x[1] >= minY && x[1] <= maxY);

        // console.log(neighbors.length);

        neighbors.forEach(n => {
            if (n[0] === target[0] && n[1] === target[1]) {
                // All done!
                console.log("DONE", n, "iter", i);
                finalTime = n[2];
                isDone = true;
            } else {
                visited.set(n.toString(), visited.get(minKey) + 1);
            }
        });

        // visited.set(minKey, Infinity); // Should effectively set this cell as "dead", never to be chosen as new head/leaf
        // NOTE!!! Seems to work the same, and go much faster, if you delete them...
        visited.delete(minKey);
    }

    return finalTime + 1;
};





const run = () => {
    // console.log(parse(smallTest));

    const parsed = parse(test);
    // console.log("time 0", parsed.blizzards);
    // console.log(parsed.getBlizzardsAtTime(1));


    const firstThrough = bfs(parsed);
    console.log("Finished the first go through, sir!", firstThrough);

    // return firstThrough;

    const goingBack = bfs(parsed, firstThrough + 2, true);
    console.log("And now we've gone back!", goingBack);

    // Ok, it's promising that this at least works... if we hard code 41 as the second arg, from example, then we get 54 total...so 13 for this.... good good.
    const backAgain = bfs(parsed, goingBack);
    console.log("And finally, we've made it home!", backAgain);

    return backAgain;

    /**
     * Just run BFS through 3d space, where z-axis is time's inexorable march.
     * From any given cell, there should be five valid options to check in the next slice.
     */



    /**
     * WOWWWW I DON'T BELIEVE IT
     * IT WORKED!
     * IT TOOK 1:24 (84 seconds), then spit out the right answer! Wow!!!!
     * 
     * (a few mixups of row vs column, 0 vs 1...)
     */


};

console.time('run');
console.log(run());
console.timeEnd('run');

