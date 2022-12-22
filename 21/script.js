
const { data } = require('./input');
const lines = data.split('\n');
const testInput = require("./testInput").data.split("\n").map(x => x.trim());


const fns = {
  '-': (a, b) => a - b,
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const parse = input => {
  const map = new Map();
  input.forEach(line => {
    const [id, val] = line.split(": ");
    if (isNaN(val)) {
      const regex = /[\+\-\*\/]/g;
      const ids = val.split(regex).map(x => x.trim());
      // console.log("x", val.match(regex));
      map.set(id, { ids, operation: val.match(regex) })
    } else {
      map.set(id, +val);
    }
    // console.log(val, +val, isNaN(val));
  });
  return map;
};


const getValue = (id, map) => {
  // console.log("get value for", id);
  if (!isNaN(map.get(id))) return map.get(id);
  // console.log(map.get(id));
  const { ids, operation } = map.get(id);
  const fn = fns[operation];
  return fn(...ids.map(id => getValue(id, map)));
};

const run = () => {
  const m = parse(lines);
  // console.log(m);
  return getValue("root", m);
};

// 152479825094094 is the answer lol, exceedingly large

console.time('run');
console.log(run());
console.timeEnd('run');

