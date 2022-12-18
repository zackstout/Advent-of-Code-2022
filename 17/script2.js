

/**
 * I think I see the idea....
 * There will be a pattern, a repetition if... pattern within or from Gases starts at same time as rocks..
 * 
 * So for instance LCM(5, gases.length) should guarantee one...
 * 
 * But then it also has to be the case that the line ---- falls in same place.. which isn't guaranteed..
 * well, can't come to rest above that point... but could be below... if highest point was say off to far right..
 * and we went down past it to the left...then no longer guaranteed to repeat, right?
 * 
 * Hmm...length of gases is 10091.... maybe there's a pattern inside it.... how we would check....
 * 
 * 
 * I mean, 2200 took 3 seconds, so 50k would be like... 90 seconds... 
 * Oh, no it's not linear lol.
 * We can remove stuff from obstacles after a certain point right......like 50??
 * Hell yeah, that's way way faster!! Nice one
 * 
 * Ok, so for 5 * 10091, the height is 79531... 
 * 
 * 1000000000000 % (5*10091) = 13345.
 * 
 * And Math.floor(1000000000000 / (5 * 10091)) = 19819641.... 
 * 
 * And height for 13345 is... 21053
 * 
 * So we want.... 19819641 * 79531 + 21053... or 1576275889424... nah that's too high... but feels like it's ... close... just a bit higher than sample ... 
 * ....                                         .1514285714288
 * 
 * 
 * After 40 rocks... have height or 66
 * 
 * So 25000000000 * 66 .... Hmm... that's not right.... 
 * 
 * 
 * 
 * 
 * 
 * 
 * Ah right... We may be right about cycle size... LCM...
 * But NOT about where it starts... wehave to find correct starting point....
 * 
 */





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

const gases = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

// const gases = data.trim();

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

    // const NUM_ROCKS = 10091 * 5;
    const NUM_ROCKS = 40 * 5;
    // const NUM_ROCKS = 2022;

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


                [...obstacles.keys()].forEach(key => {
                    if (maxHeight - key.split(",")[1] > 50) {
                        obstacles.delete(key);
                    }
                })
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
console.log(gases.length);
console.timeEnd('run');

