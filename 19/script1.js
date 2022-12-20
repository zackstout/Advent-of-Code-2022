

/**
 * Jeez man Idk i'm pretty stuck...
 * 
 * Can we reason backwards....to LATEST possible time we could create a geode?
 * 
 * 
 * OMG we got it right for first Blueprint! And 1 over for second!!
 * 
 * Woo!!!
 * 
 * Main idea was to cull all paths where you built more {X} robots than max-{X}-costing-robot
 */

const testBlueprint =
    [
        [4, 0, 0, 0], // cost for ore bot: 4 ore, 0 clay, 0
        [2, 0, 0, 0], // cost for clay bot
        [3, 14, 0, 0],
        [2, 0, 7, 0]
    ];

const testBlueprint2 =
    [
        [2, 0, 0, 0], // cost for ore bot: 4 ore, 0 clay, 0
        [3, 0, 0, 0], // cost for clay bot
        [3, 8, 0, 0],
        [3, 0, 12, 0]
    ];

const subtract = (a1, a2) => {
    // if (a2.length === 0) return a1;
    return a1.map((v, i) => v - (a2[i] || 0));
};

const add = (a1, a2) => {
    return a1.map((v, i) => v + (a2[i] || 0));
};

const timeToBuild = (cost, resources, bots) => {
    const timesPerResource = cost
        .map((x, i) => Math.max(0, x - resources[i])) // How much MORE of that resource we need
        .map((x, i) => {
            // How long it would take to produce that much more of the resource
            if (x === 0) return 0;
            // console.log(x, bots[i])
            return bots[i] === 0 ? Infinity : Math.ceil(x / bots[i]);
        });
    return Math.max(...timesPerResource) + 1;
};

let steps = 0;


const findMostGeodes = (blueprint, resources = [0, 0, 0, 0], bots = [1, 0, 0, 0], timeRemaining = 24) => {
    steps++;
    if (timeRemaining === 0) return resources[3];
    if (timeRemaining === 1) {
        // console.log("1 left", resources[3] + bots[3], resources, bots);
        return resources[3] + bots[3];
    }

    // Find all possible "next build" robots. Impossible to build if lack resources/bots of a required resource type.
    // Ignore any choices that would produce MORE {X} bots than the max {X} cost of any bots
    const availableToBuild = blueprint
        .filter((cost, costIdx) => costIdx === 3 ? true : bots[costIdx] < Math.max(...blueprint.map(n => n[costIdx])))
        .filter(cost => timeToBuild(cost, resources, bots) <= timeRemaining);

    // Whenever you CAN build a Geode bot... do it!
    // Huh.. interesting that we get way wrong answer is we remove this block...
    if (availableToBuild.some(x => x.toString() === blueprint[3].toString())) {
        const time = timeToBuild(blueprint[3], resources, bots);
        // console.log("Build geode bot", resources, bots, timeRemaining)
        // Build a geode bot
        let newResources = subtract(resources, blueprint[3]);
        // console.log("new from geode", newResources);
        const newBots = [...bots];

        // Weird...changing "bots" to "newBots" gives wrong answer...
        newBots[3] += 1;

        // // Simulate time steps until bot is created
        for (let i = 0; i < time; i++) {
            newResources = add(newResources, bots);
        }

        return resources[3] + timeRemaining * bots[3] + findMostGeodes(blueprint, newResources, newBots, timeRemaining - time);
    }
    // console.log(availableToBuild, resources, bots, timeRemaining);

    return Math.max(...availableToBuild.map(cost => {
        const time = timeToBuild(cost, resources, bots);

        // Build the bot
        let newResources = subtract(resources, cost);
        const newBots = [...bots];
        const resourceIdx = blueprint.findIndex(x => x.toString() === cost.toString());
        newBots[resourceIdx] += 1;

        // Simulate time steps until bot is created
        for (let i = 0; i < time; i++) {
            newResources = add(newResources, bots);
        }

        // console.log("new from other", newResources);

        return resources[3] + timeRemaining * bots[3] + findMostGeodes(blueprint, newResources, newBots, timeRemaining - time);
    }));
};

const run = () => {
    // return findMostGeodes(testBlueprint);

    return [findMostGeodes(testBlueprint), findMostGeodes(testBlueprint2)];

    // return timeToBuild([4, 5, 10], [10, 10, 0, 0], [2, 2, 1, 0]);
};

console.time('run');
console.log(run(), steps);
console.timeEnd('run');