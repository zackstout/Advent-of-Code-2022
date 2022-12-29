
const { data } = require('./input');
// const lines = data.split('\n');

const allCharsUnique = str => {
  return (new Set(str.split(''))).size === str.length;
};

const test = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

const run = () => {
  let i = 3;
  while (true) {
    if (allCharsUnique(data.slice(i - 3, i + 1))) {
      return i + 1;
    }
    i++;
  }
};

// Just changes 3 to 13
const runTwo = () => {
  let i = 13;
  while (true) {
    if (allCharsUnique(data.slice(i - 13, i + 1))) {
      return i + 1;
    }
    i++;
  }
};

console.time('run');
console.log(runTwo());
console.timeEnd('run');

console.log(allCharsUnique("abcd"), allCharsUnique("aabd"));