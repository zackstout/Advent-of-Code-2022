
const { data } = require('./input');
// const lines = data.split('\n');

/**
 * Index of each "rock" is lower left corner.
 * Positive y is up, positive x is right.
 */

const ROCKS = [
  [[0, 0], [1, 0], [2, 0], [3, 0]],
  [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
  [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [0, 1], [1, 0], [1, 1]],
];

// Wait a second....what happens when this runs out? 
// Ahhhh it repeats jesus

// const gases = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

const gases = data.trim();

let gasIndex = 0;

const rockWidth = rock => Math.max(...rock.map(n => n[0])) + 1;


// Hmm, 4448 is too high....ahh we parsed input wrong lol.. yea we got it


const run = () => {
  const LEFT_WALL = -1;
  const RIGHT_WALL = 7;

  const obstacles = new Map();

  let rockCount = 0;
  // let gasIndex = 0;

  let maxHeight = 0;

  const getMaxHeight = () => Math.max(...[...obstacles.keys()].map(p => p.split(",")[1]));

  const NUM_ROCKS = 2022;

  while (rockCount < NUM_ROCKS) {
    const rockIndex = rockCount % ROCKS.length;
    if (obstacles.size > 0) maxHeight = getMaxHeight();

    const rock = {
      pos: [2, maxHeight + 4],
      els: ROCKS[rockIndex].slice(0)
    };

    // console.log("NEW ROCK", rock);

    while (true) {
      // Move from gas
      // const gas = gases.shift(); // lol was doing pop!

      const gas = gases[gasIndex % gases.length];

      let absoluteEls = rock.els
        .map(pos => [pos[0] + rock.pos[0], pos[1] + rock.pos[1]])

      // NOTE: Must also account for hitting obstacles here!
      if (gas === ">") {
        // move right
        // console.log("try right");
        const rightEls = absoluteEls.map(p => [p[0] + 1, p[1]]);
        if (rock.pos[0] + rockWidth(rock.els) < RIGHT_WALL && !rightEls.some(p => obstacles.has(`${p[0]},${p[1]}`))) {
          // console.log("move right");
          rock.pos[0]++;
        }
      } else {
        // move left
        const leftEls = absoluteEls.map(p => [p[0] - 1, p[1]]);
        // console.log("try left");
        if (rock.pos[0] > LEFT_WALL + 1 && !leftEls.some(p => obstacles.has(`${p[0]},${p[1]}`))) {
          // console.log("move left");
          rock.pos[0]--;
        }
      }

      gasIndex++;

      absoluteEls = rock.els
        .map(pos => [pos[0] + rock.pos[0], pos[1] + rock.pos[1]])

      // Move down
      // Must actually detect, for all els, whether they hit obstacles.
      // Floor has index 0. We drop from 4.
      const downEls = absoluteEls
        .map(p => [p[0], p[1] - 1]);

      if (downEls.some(pos => obstacles.has(`${pos[0]},${pos[1]}`) || pos[1] === 0)) {
        // Hit! add to obstacles, get new rock
        absoluteEls.forEach(pos => obstacles.set(`${pos[0]},${pos[1]}`, 1));
        // console.log("HIT", absoluteEls);
        rockCount++;
        break;
      } else {
        rock.pos[1]--;
      }
    }

  }

  return getMaxHeight();
};

console.time('run');
console.log(run());
console.timeEnd('run');

