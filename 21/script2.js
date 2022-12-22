
const { data } = require('./input');
const lines = data.split('\n');


/**
 * haha, this was a fun one
 * 
 * just kind of guessing it was monotonic, the idea of finding where it hits zero
 */

// Have to be careful: when pasting test input to separate file, need to trim
const testInput = require("./testInput").data.split("\n").map(x => x.trim());

const PHI = 161803;

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
    // console.log("get value for", id, map.get(id));
    if (!isNaN(map.get(id))) return map.get(id);
    // console.log(map.get(id));
    const { ids, operation } = map.get(id);
    const fn = fns[operation];
    return fn(...ids.map(id => getValue(id, map)));
};

const getEquation = (id, map) => {
    if (!isNaN(map.get(id))) return map.get(id);
    const { ids, operation } = map.get(id);
    let eq1 = getEquation(ids[0], map);
    let eq2 = getEquation(ids[1], map);

    // wow, this worked
    if (!eq1.toString().includes(PHI)) eq1 = eval(eq1);
    if (!eq2.toString().includes(PHI)) eq2 = eval(eq2);
    return `(${eq1} ${operation} ${eq2})`;
};

const run = () => {
    const m = parse(lines);
    // console.log(m);
    // console.log(m.get("humn"), "root", m.get("root"));
    //   return getValue("root", m);

    const { ids } = m.get("root");
    console.log("ids", ids);
    const target = 230689299 * 215113;
    // const target = 150;

    m.set("humn", 95500000000000);
    let i = 98500000000000;
    i = 99248550000000;
    i = 99248549999990;
    i = 6548549999990;
    i = 6493549999990;
    i = 6493406999990;
    i = 6493406435990;
    i = 3363406435990;
    i = 3360566435990;
    i = 3360561285990;

    i = 3360561285172; // That's it! That's the answer!
    // let i = 99329400000000;
    while (target - getValue(ids[0], m) > 0) {
        m.set("humn", i);
        // if (getValue(ids[0], m) === target) break;
        // console.log(i, getValue(ids[0], m), getValue(ids[1], m));

        console.log(i, target - getValue(ids[0], m));
        i -= 1;
        // i--;
    }
    return i;

    // Heck ya,  you can just return eval of this to get real answer!
    // return [getEquation(ids[0], m), getEquation(ids[1], m)];


    return target - eval(getEquation(ids[0], m));
};


// got to about 3mil for part 2....clearly a better way.... oh, write out the equation LOL

// 6493406435148 too high...

/**
 * (((((700 + (102855557937315 - ((((((708 + (((((((((((((((((((4 * ((((2 * (((722 + (((((279 + ((((((860 + (((21 * (974 + (((((262 + (2 * (((559 + ((120 * ((((2 * (161803 - 806)) + 146) / 6) + 89)) - 581)) / 2) - 555))) / 10) - 544) + 999) / 4))) - 132) * 2)) / 4) + 83) * 2) - 425) / 3)) / 2) - 927) * 11) + 530)) / 3) - 993)) + 569) / 5) - 112)) - 481) / 5) + 669) * 9) - 452) / 2) + 903) * 2) - 502) * 2) + 134) / 2) - 885) * 2) + 332) / 7) - 327) * 2)) / 2) - 917) * 3) + 290) / 2))) / 3) + 422) * 3) + 49624267175787)(((((700 + (102855557937315 - ((((((708 + (((((((((((((((((((4 * ((((2 * (((722 + (((((279 + ((((((860 + (((21 * (974 + (((((262 + (2 * (((559 + ((120 * ((((2 * (161803 - 806)) + 146) / 6) + 89)) - 581)) / 2) - 555))) / 10) - 544) + 999) / 4))) - 132) * 2)) / 4) + 83) * 2) - 425) / 3)) / 2) - 927) * 11) + 530)) / 3) - 993)) + 569) / 5) - 112)) - 481) / 5) + 669) * 9) - 452) / 2) + 903) * 2) - 502) * 2) + 134) / 2) - 885) * 2) + 332) / 7) - 327) * 2)) / 2) - 917) * 3) + 290) / 2))) / 3) + 422) * 3) + 49624267175787)
 */

console.time('run');
console.log(run());
console.timeEnd('run');

