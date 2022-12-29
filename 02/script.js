
const { data } = require('./input');
const lines = data.split('\n');

const run = () => {
  return lines.reduce((sum, line) => {
    const [p2, p1] = line.trim().split(" ");
    // console.log(p2, p1);
    const win = (p2 === "A" && p1 === "Y")
      || (p2 === "B" && p1 === "Z")
      || (p2 === "C" && p1 === "X");
    const draw = (p2 === "A" && p1 === "X")
      || (p2 === "B" && p1 === "Y")
      || (p2 === "C" && p1 === "Z");
    let score = 0;
    if (draw) score = 3;
    if (win) score = 6;
    let pScore = 1;
    if (p1 === "Y") pScore = 2;
    if (p1 === "Z") pScore = 3;
    return sum + score + pScore;
  }, 0);

};

const runTwo = () => {
  return lines.reduce((sum, line) => {
    const [p2, res] = line.trim().split(" ");
    // X means lose, Y draw, Z win.
    const moves = "ABC";

    let i = moves.indexOf(p2);
    if (res === "X") i--;
    if (res === "Z") i++;
    const move = moves[(i + 3) % 3];


    let moveScore = 1;
    if (move === "B") moveScore = 2;
    if (move === "C") moveScore = 3;

    let score = 0;
    if (res === "Y") score = 3;
    if (res === "Z") score = 6;
    return sum + score + moveScore;
  }, 0);
};

console.time('run');
console.log(runTwo());
console.timeEnd('run');

