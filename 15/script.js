
const { data } = require('./input');
const lines = data.split('\n');

// const testLines = `
//   Sensor at x=2, y=-10; closest beacon is at x=-2,y=15
//   Sensor at x=32, y=-100; closest beacon is at x=-12,y=15
//   `.split("\n");
const testLines = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`.split("\n");

const parse = lines => {
  return lines.map(x => x.match(/\-?\d+/g)?.map(Number)).filter(x => x);
};

const getDist = (a1, a2) => {
  const [x1, y1] = a1;
  const [x2, y2] = a2;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const run = () => {
  const HIT_ROW_INDEX = 2000000;

  const hitMap = new Map();

  const parsed = parse(lines);

  parsed.forEach(line => {
    const [sx, sy, bx, by] = line;
    const distFromBeacon = getDist([sx, sy], [bx, by]);

    // Any squares with y=200000 that are less than dist away from sensor.. add to map
    const distFromHitRow = Math.abs(sy - HIT_ROW_INDEX);
    const toAdd = distFromBeacon - distFromHitRow;

    if (toAdd < 0) return;

    console.log(distFromBeacon, distFromHitRow)

    hitMap.set(sx, 1);
    for (let i = 1; i <= toAdd; i++) {
      hitMap.set(sx + i, 1);
      hitMap.set(sx - i, 1);
    }

  });

  const beaconsOnHitRow = [...new Set(parsed.map(a => `${a[2]},${a[3]}`))]
    .filter(a => a.split(",")[1] == HIT_ROW_INDEX && hitMap.has(Number(a.split(",")[0]))).length;
  // console.log([...new Set(parsed.map(a => `${a[2]},${a[3]}`))])
  return hitMap.size - beaconsOnHitRow;
};

console.time('run');
console.log(run());
console.timeEnd('run');

