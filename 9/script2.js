
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

const testLines2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split('\n');

const nodes = [...new Array(10)].map(_ => ({ x: 0, y: 0 }));

// console.log(nodes, nodes[0]);


const moveNode = (head, tail) => {
    // const head = nodes[idx - 1];
    // const tail = nodes[idx];
    const dist = Math.abs(head.x - tail.x) + Math.abs(head.y - tail.y);
    if (head.x === tail.x || head.y === tail.y) {
        return dist > 1;
    }
    return dist > 2;
};

const run = () => {
    const visited = new Map();
    const head = nodes[0];

    testLines2.forEach(line => {
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

            // Foreach node (other than head): Update node position based on its "head", if needed:
            nodes.slice(0).forEach((node, idx) => {
                if (idx === nodes.length - 1) return; // e.g. if there are 2 nodes, only do once, for 0head and 1tail
                const head = nodes[idx];
                const tail = nodes[idx + 1];

                if (moveNode(head, tail)) {
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

                    if (idx === nodes.length - 2) {
                        const key = `${tail.x},${tail.y}`;
                        if (!visited.has(key)) visited.set(key, 1);
                    }
                }
            });
        }
    });

    return visited.size + 1;
};

console.time('run');
console.log(run());
console.timeEnd('run');

