
const { data } = require('./input');
const lines = data.split('\n');
const testLines = require("./testInput").data.split('\n');

// const monkeys = [
//   {
//     items: [],
//     op: "",
//     test: 7,
//     throw: [6, 7]
//   }
// ];

const parseInput = (lines) => {
  const monkeys = [];
  // let monkeyNumber = 0;
  let monkey = {};

  // console.log("lines..", lines.slice(0, 10).map(l => l.trim()));

  lines.forEach(line => {
    const l = line.trim();
    if (l.startsWith("Monkey")) {
      if (monkey.hasOwnProperty("items")) monkeys.push({ ...monkey });

      monkey = {};
      // monkeyNumber = +l.match(/\d+/);
    }
    if (l.startsWith("Starting")) {
      monkey.items = l.split(':')[1].split(", ").map(x => +x);
    }

    if (l.startsWith("Operation")) {
      monkey.op = l.split("=")[1].trim();
    }
    if (l.startsWith("Test")) {
      monkey.test = +l.match(/\d+/);
    }
    if (l.startsWith("If true")) {
      monkey.throw = [+l.match(/\d+/)];
    }
    if (l.startsWith("If false")) {
      monkey.throw.push(+l.match(/\d+/));
    }
  });

  monkeys.push(monkey);

  return monkeys;
};

const run = () => {
  const monkeys = parseInput(lines).map(m => ({ ...m, actions: 0 }));
  console.log("Monkeys", monkeys);

  const numRounds = 20;

  for (let i = 0; i < numRounds; i++) {
    monkeys.forEach(monkey => {

      while (monkey.items.length > 0) {
        let v = monkey.items.shift();
        // TODO: apply OP to v
        // Ew lol
        // if (monkey.op === "old * 19") v *= 19;
        // if (monkey.op === "old + 6") v += 6;
        // if (monkey.op === "old + 3") v += 3;
        if (monkey.op === "old * old") {
          v *= v;
        } else {
          const val = +monkey.op.match(/\d+/);
          if (monkey.op.includes("*")) {
            v *= val;
          } else {
            v += val;
          }
        }

        v = Math.floor(v / 3);
        const targetIdx = (v % monkey.test === 0) ? monkey.throw[0] : monkey.throw[1];
        const target = monkeys[targetIdx];
        target.items.push(v);
        monkey.actions += 1;
      }
    });
  }

  return monkeys.sort((a, b) => a.actions - b.actions).map(x => x.actions);;
};

console.time('run');
console.log(run());
console.timeEnd('run');

