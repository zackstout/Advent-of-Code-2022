
const { data } = require('./input');
const lines = data.split('\n');

/**
 * Fun one to animate
 */

const testLines = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split('\n');

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

const moveTail = () => {
  const dist = Math.abs(head.x - tail.x) + Math.abs(head.y - tail.y);
  if (head.x === tail.x || head.y === tail.y) {
    return dist > 1;
  }
  return dist > 2;
};

const run = () => {
  const visited = new Map();

  lines.forEach(line => {
    const [dir, val] = line.split(" ");
    let n = +val;
    while (n > 0) {
      switch (dir) {
        case "R":
          head.x++;
          break;
        case "L":
          head.x--;
          break;
        case "U":
          head.y--;
          break;
        case "D":
          head.y++;
          break;
      }
      n--;
      // console.log("head..", head.x, head.y);

      // Update tail position based on head, if needed:
      if (moveTail()) {
        if (head.y > tail.y) {
          tail.y++;
        }
        else if (head.y < tail.y) {
          tail.y--;
        }
        if (head.x > tail.x) {
          tail.x++;
        }
        else if (head.x < tail.x) {
          tail.x--;
        }

        // console.log("tail...", tail.x, tail.y);
        // console.log("=========");
        // console.log("\n");
        const key = `${tail.x},${tail.y}`;
        if (!visited.has(key)) visited.set(key, 1);

        // Same column
        // if (head.x === tail.x) {
        //   if (head.y > tail.y) {
        //     tail.y++;
        //   } else {
        //     tail.y--;
        //   }
        //   // Same row
        // } else if (head.y === tail.y) {
        //   if (head.x > tail.x) {
        //     tail.x++;
        //   } else {
        //     tail.x--;
        //   }
        //   // Diagonal
        // } 
        // else {
        //   if (head.x > tail.x && head.y > tail.y) {
        //     tail.x ++;
        //   }
        //   else if (head.x > tail.x && head.y < tail.y) {

        //   }
        //   else if (head.x < tail.x && head.y > tail.y) {

        //   }
        //   else {

        //   }
        // }
      }
    }
  });

  return visited.size + 1;
};

console.time('run');
console.log(run());
console.timeEnd('run');

