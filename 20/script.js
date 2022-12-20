
const { data } = require('./input');
const lines = data.split('\n').map(Number);

const test = `1
  2
  -3
  3
  -2
  0
  4`.split("\n").map(Number);


/**
 * Yesssss issue was dupes in real input
 */

const run = (partTwo = false) => {

  const scale = partTwo ? 811589153 : 1;
  const numIterations = partTwo ? 10 : 1;

  const input = lines.map((n, i) => `${n * scale},${i}`);

  console.log(input.length, input.slice(0, 5));

  let result = [...input];

  for (let j = 0; j < numIterations; j++) {
    for (let i = 0; i < input.length; i++) {
      const index = result.findIndex(x => +x.split(",")[1] === i);
      const [val, origIdx] = result[index].split(",").map(Number); // origIdx should be i

      // let [val, index] = input[i].split(",").map(Number);
      // let idx = result.findIndex(x => x === val);
      let newIdx = (index + val + 1 * (input.length - 1)) % (input.length - 1);
      // if (idx + val < 0) newIdx--;
      // if (idx + val > input.length) newIdx++;
      result.splice(index, 1);
      result.splice(newIdx, 0, `${val},${i}`) // inserts it BEFORE newIdx
      // console.log("After move", ressult, index, newIdx, val)
    }
  }


  const zeroIdx = result.findIndex(x => +x.split(",")[0] === 0);
  console.log("Final result", zeroIdx);
  return [zeroIdx + 1000, zeroIdx + 2000, zeroIdx + 3000]
    .map(x => x % result.length)
    .reduce((acc, idx) => {
      // console.log(idx, result[idx])
      return acc + Number(result[idx].split(",")[0]);
    }, 0);
};

// 5261 too high...
// -6922 is wrong...

// Part 2 took 54s but it works

console.time('run');
console.log(run(true));
console.timeEnd('run');

