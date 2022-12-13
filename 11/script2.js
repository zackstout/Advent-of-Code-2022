
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


    /**
     * ahhhhhh nice! So the issue is that the numnbers have indeed become "ridiculous"
     * Computer with "e" values... and then "Infinity".... yeah, ok.
     * 
     * Heck yeah. Just need to use (x * y) % z = ((x % z) * (y % z)) % z
     */

    const numRounds = 10000;

    // const lcm = 13 * 17 * 19 * 23; // Test input

    const lcm = monkeys.map(m => m.test).reduce((prod, v) => prod * v, 1);

    console.log("Lcm", lcm);

    for (let i = 0; i < numRounds; i++) {
        monkeys.forEach(monkey => {

            while (monkey.items.length > 0) {
                let v = monkey.items.shift();
                if (monkey.op === "old * old") {
                    v = ((v % lcm) * (v % lcm)) % lcm;
                } else {
                    const val = +monkey.op.match(/\d+/);
                    if (monkey.op.includes("*")) {
                        v = ((v % lcm) * (val % lcm)) % lcm;
                    } else {
                        v += val;
                    }
                }

                // v = Math.floor(v / 3);
                const targetIdx = (v % monkey.test === 0) ? monkey.throw[0] : monkey.throw[1];
                const target = monkeys[targetIdx];
                target.items.push(v);
                monkey.actions += 1;
            }
        });
    }

    // console.log("Monkeys", monkeys);
    return monkeys.sort((a, b) => a.actions - b.actions).map(x => x.actions);
};

console.time('run');
console.log(run());
console.timeEnd('run');

