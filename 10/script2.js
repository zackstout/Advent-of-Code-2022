
const { data } = require('./input');
const lines = data.split('\n');

const testInput = require("./testInput").data.split('\n');

const run = () => {
    let cycleNumber = 0;
    let register = 1; // controls position of sprite


    const screenRows = ["", "", "", "", "", ""];
    const SCREEN_WIDTH = 40;


    lines.forEach(line => {
        // const r = register % SCREEN_WIDTH;
        let spritePos = [register - 1, register, register + 1];
        let screenRowIdx = Math.floor(cycleNumber / SCREEN_WIDTH);

        // console.log(register);

        if (line.startsWith("addx")) {
            let pixel = spritePos.map(x => x + (SCREEN_WIDTH * screenRowIdx)).includes(cycleNumber) ? "#" : ".";
            screenRows[screenRowIdx] += pixel;
            cycleNumber++;

            // Do it again
            spritePos = [register - 1, register, register + 1];
            screenRowIdx = Math.floor(cycleNumber / SCREEN_WIDTH);
            pixel = spritePos.map(x => x + (SCREEN_WIDTH * screenRowIdx)).includes(cycleNumber) ? "#" : ".";
            screenRows[screenRowIdx] += pixel;
            cycleNumber++;

            const num = +line.split(" ")[1];
            register += num;
        } else {
            let pixel = spritePos.map(x => x + (SCREEN_WIDTH * screenRowIdx)).includes(cycleNumber) ? "#" : ".";
            screenRows[screenRowIdx] += pixel;
            cycleNumber++;
        }
    });

    return screenRows;
};

console.time('run');
console.log(run());
console.timeEnd('run');

