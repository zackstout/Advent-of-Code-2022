
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

// Took 11.5 seconds for real input, but it worked!
const run = () => {

  const cubes = lines.map(x => x.split(',').map(Number));
  console.log(cubes, lines.length);

  const r = new Map();
  cubes.forEach(cube => {
    const x = [
      [cube[0] + 1, cube[1], cube[2]],
      [cube[0] - 1, cube[1], cube[2]],
      [cube[0], cube[1] + 1, cube[2]],
      [cube[0], cube[1] - 1, cube[2]],
      [cube[0], cube[1], cube[2] + 1],
      [cube[0], cube[1], cube[2] - 1],
    ];
    r.set(cube.toString(), x.filter(n => cubes.some(c => c.toString() === n.toString())));
  });

  return [...r.keys()].reduce((sum, key) => {
    return sum + (6 - r.get(key).length);
  }, 0);

};

console.time('run');
console.log(run());
console.timeEnd('run');

