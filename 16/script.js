
const { data } = require('./input');
const lines = data.split('\n');


/**
 * Tricky one. So we want a recursive fn that
 * takes in StartingPoint and AvailableValves
 * 
 * We want to return the max of each AvailableNode considered as next startingpoint...
 * 
 * 
 * Ok this works! On test input at least!
 * 
 * Chugging to compute distances map for real input....
 * Need to skip the 0 flow ones somehow...
 * Ah yeah and then skip visited neighbors in bfs..
 * 
 * HELL YEAH, CORRECT answer in 1:45!
 */

const distances = {};

const parse = lines => {
  const result = {};
  lines.forEach(line => {
    const valve = line.trim().split(" ")[1];
    const flowRate = +line.match(/\d+/);
    const lastIdx = line.indexOf("to valve");
    const lastSpaceIdx = line.slice(lastIdx + 4).indexOf(" ");
    const connections = line.slice(lastIdx + 4 + lastSpaceIdx).trim().split(", ");
    result[valve] = {
      flowRate,
      connections
    }
  });

  return result;
};

const bfs = (input, start, target) => {
  const visited = new Map();
  visited.set(start, 0);

  while (true) {
    // i += 1;
    const minKey = [...visited.keys()].sort((a, b) => visited.get(a) - visited.get(b))[0];
    if (!minKey) continue;

    const neighbors = input[minKey].connections.filter(x => !visited.has(x));

    // console.log(neighbors);

    if (neighbors.includes(target)) {
      // Break  
      console.log(`Dist from ${start} to ${target} is ${visited.get(minKey) + 2}`);
      return visited.get(minKey) + 2; // 1 minute to get there, 1 minute to open valve
    }

    neighbors.forEach(n => {
      visited.set(n, visited.get(minKey) + 1);
    });

    visited.set(minKey, Infinity); // Should effectively set this cell as "dead", never to be chosen as new head/leaf
  }
};

const memo = new Map();

const findBest = (start, available, minutesRemaining, input) => {
  const key = `${start}, ${JSON.stringify(available.sort())}, ${minutesRemaining}`;

  if (memo.has(key)) return memo.get(key);
  if (available.length === 1) {
    const node = available[0];
    const distance = distances[start][node];
    // const distance = 1;
    const { flowRate } = input[node];
    return flowRate * Math.max(0, (minutesRemaining - distance));
  }
  const res = Math.max(...available.map((node, nodeIdx) => {
    const copy = [...available];
    copy.splice(nodeIdx, 1);
    const distance = distances[start][node];
    // const distance = 1;
    const { flowRate } = input[node];
    const curr = flowRate * Math.max(0, (minutesRemaining - distance));
    const next = findBest(node, copy, minutesRemaining - distance, input);
    return curr + next;
  }));

  memo.set(key, res);
  return res;
};

const run = () => {
  const input = parse(lines);
  console.log("Input", input);


  // const t = bfs(input, "AA", "GG");
  // console.log(t);

  // Initialize distances map:
  Object.keys(input).forEach(key => {
    distances[key] = {};
    const { flowRate } = input[key];
    if (flowRate === 0 && key !== "AA") return;
    Object.keys(input).forEach(key2 => {
      const { flowRate } = input[key2];
      if (flowRate === 0) return;
      if (key === key2) return;
      distances[key][key2] = bfs(input, key, key2);
    });
  });

  console.log("distancez", distances);

  const available = Object.keys(input).filter(x => input[x].flowRate > 0);
  console.log("Total available", available.length);
  if (available.indexOf("AA") > -1) available.splice(available.indexOf("AA"), 1);
  const maxPressure = findBest("AA", available, 30, input);
  return maxPressure;
};

console.time('run');
console.log(run());
console.timeEnd('run');

