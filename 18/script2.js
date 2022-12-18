
const { data } = require('./input');
const lines = data.split('\n');

const testLines = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`.split("\n");


const bfs = (cubes) => {
    const visited = new Map();
    const start = [0, 0, 0].toString();
    visited.set(start, 0);
    let area = 0;

    const maxX = Math.max(...cubes.map(c => c[0])) + 1;
    const maxY = Math.max(...cubes.map(c => c[1])) + 1;
    const maxZ = Math.max(...cubes.map(c => c[2])) + 1;

    const minX = Math.min(...cubes.map(c => c[0])) - 1;
    const minY = Math.min(...cubes.map(c => c[1])) - 1;
    const minZ = Math.min(...cubes.map(c => c[2])) - 1;

    // const surface = new Map();

    // let i = 0;
    while (true) {
        // i += 1;
        const minKey = [...visited.keys()].sort((a, b) => visited.get(a) - visited.get(b))[0];
        if (!minKey) continue;
        if (visited.get(minKey) === Infinity) break;

        const cube = minKey.split(",").map(Number);

        // console.log("cube", cube);

        const neighbors = [
            [cube[0] + 1, cube[1], cube[2]],
            [cube[0] - 1, cube[1], cube[2]],
            [cube[0], cube[1] + 1, cube[2]],
            [cube[0], cube[1] - 1, cube[2]],
            [cube[0], cube[1], cube[2] + 1],
            [cube[0], cube[1], cube[2] - 1],
        ]
            .filter(x => !visited.has(x.toString()))
            .filter(x => x[0] >= minX && x[0] <= maxX && x[1] >= minY && x[1] <= maxY && x[2] >= minZ && x[2] <= maxZ);

        // console.log(neighbors);

        neighbors.forEach(n => {
            if (cubes.some(c => c.toString() === n.toString())) {
                // console.log("Hit one!");
                area++;
                // visited.set(n.toString(), Infinity);

                // if (!surface.has(n.toString())) {
                //     // area++;
                //     surface.set(n.toString(), 1);
                //     // visited.set(n.toString(), Infinity);
                // }
            } else {
                visited.set(n.toString(), visited.get(minKey) + 1);
            }
        });

        // if (neighbors.includes(target)) {
        //     // Break  
        //     console.log(`Dist from ${start} to ${target} is ${visited.get(minKey) + 2}`);
        //     return visited.get(minKey) + 2; // 1 minute to get there, 1 minute to open valve
        // }

        // neighbors.forEach(n => {
        //     visited.set(n, visited.get(minKey) + 1);
        // });

        visited.set(minKey, Infinity); // Should effectively set this cell as "dead", never to be chosen as new head/leaf
    }

    return area;
};


// Took 11.5 seconds for real input, but it worked!
const run = () => {

    const cubes = lines.map(x => x.split(',').map(Number));
    // console.log(cubes, lines.length);

    // const maxX = Math.max(...cubes.map(c => c[0]));
    // const maxY = Math.max(...cubes.map(c => c[1]));
    // const maxZ = Math.max(...cubes.map(c => c[2]));

    // const minX = Math.min(...cubes.map(c => c[0]));
    // const minY = Math.min(...cubes.map(c => c[1]));
    // const minZ = Math.min(...cubes.map(c => c[2]));

    // console.log(minX, maxX, minY, maxY, minZ, maxZ);

    // const r = new Map();

    return bfs(cubes);



    //   cubes.forEach(cube => {
    //     const x = [
    //       [cube[0] + 1, cube[1], cube[2]],
    //       [cube[0] - 1, cube[1], cube[2]],
    //       [cube[0], cube[1] + 1, cube[2]],
    //       [cube[0], cube[1] - 1, cube[2]],
    //       [cube[0], cube[1], cube[2] + 1],
    //       [cube[0], cube[1], cube[2] - 1],
    //     ];
    //     r.set(cube.toString(), x.filter(n => cubes.some(c => c.toString() === n.toString())));
    //   });

    //   return [...r.keys()].reduce((sum, key) => {
    //     return sum + (6 - r.get(key).length);
    //   }, 0);

};

console.time('run');
console.log(run());
console.timeEnd('run');

