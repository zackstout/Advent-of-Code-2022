
const { data } = require('./input');
const lines = data.split('\n');


/**
 * Ooh, tricky, fun, reminds me of 16, with the recursive valves...
 * 
 * Seems we want a recursive fn that takes Amt of time left,
 * number of Bots we currently have.. and Resources we have? And find best way forward? That max # of geodes we can crack?
 * Maybe not bots, but just resources?
 * 
 * One thing that sticks out... it should always be correct to build a geode-breaker, if possible.
 * There's no resaon not to, ever. 
 * Well.... is that true?? Idk.. if you had enough time... But we only ever care about like 24 turns.
 * 
 * I mean..yeah..it's very closely analgoous to 16...
 * Nodes are like pairs of Bots/Resources... and costs of "turning on a valve" are now costs of buying a bot...
 * How much difference does it make that you can now "visit the same node twice"?
 * Yeah... there's not really ever a point where you only have one node left to visit....
 * So what's the base case? 
 * hm....
 * Is it just "buy a geode-cracking bot if you can"?
 * Or I guess "you have a single minute/turn remaining"?
 * 
 * So in the recursive fn..
 * 
 * We would want to check all the avialable actions -- any available builds, and, do nothing.
 * 
 * We want to return sum of curr expected # of geodes... and # of geodes we would get if we took that action.. 
 * 
 * Base case is just where I'm tripping up. I guess if we only have 1 action? 
 * 
 * 
 * 
 * What if we reorganize...around idea of Choosing Next Thing to Build.
 */


// Costs are stored as Ore, Clay, Obsidian,  Geodeß
// Same with bots
const testBlueprint =
  [
    [4, 0, 0], // cost for ore bot
    [2, 0, 0], // cost for clay bot
    [3, 14, 0],
    [2, 0, 7]
  ];


const subtract = (a1, a2) => {
  // if (a2.length === 0) return a1;
  return a1.map((v, i) => v - (a2[i] || 0));
};

const findMostGeodes = (blueprint, resources = [0, 0, 0, 0], bots = [1, 0, 0, 0], timeRemaining = 24) => {

  if (timeRemaining === 0) return resources[3];
  if (timeRemaining === 1) {
    console.log("1 left", resources[3] + bots[3], resources, bots);
    return resources[3] + bots[3];
  }
  // if (timeRemaining === 2) return resources[3] + bots.geode * 2;

  const availableMoves = [-1]; // -1 represents "do nothing"
  blueprint.forEach((cost, costIdx) => {
    // const cost = blueprint[key];
    const remaining = subtract(resources, cost);
    // console.log("rem", remaining);
    if (remaining.every(n => n >= 0)) availableMoves.push(costIdx);
  });

  // console.log("find most", timeRemaining, resources, bots, availableMoves);


  // I think this should actually be covered by next "general" case...
  // if (availableMoves.length === 1) {
  //   // Can only "do nothing"
  //   return currentGeodes + findMostGeodes(blueprint, newResources, bots, timeRemaining - 1);
  // }

  const currentGeodes = resources[3] + bots[3] * timeRemaining;

  return Math.max(...availableMoves.map(moveIdx => {
    // Perform move
    const move = moveIdx > -1 ? blueprint[moveIdx] : [];
    const newResources = subtract(resources, move);
    const newBots = [...bots];
    // const newResources = [...resources];
    if (move.length > 0) {
      // const resource = Object.keys(blueprint).find(key => blueprint[key].toString() === move.toString());
      newBots[moveIdx] += 1;
    }

    // bots, NOT newBots
    // Object.keys(bots).forEach(resource => {
    //   if (resource === "ore") newResources[0] += bots[resource];
    //   if (resource === "clay") newResources[1] += bots[resource];
    //   if (resource === "obsidian") newResources[2] += bots[resource];
    //   if (resource === "geode") newResources[3] += bots[resource];
    // });

    bots.forEach((resource, resourceIdx) => {
      newResources[resourceIdx] += resource;
    });

    return currentGeodes + findMostGeodes(blueprint, newResources, newBots, timeRemaining - 1);
  }));

};

const run = () => {
  return findMostGeodes(testBlueprint);
};

console.time('run');
console.log(run());
console.timeEnd('run');

