
const { data } = require('./input');
const commands = data.split('\n');

// const test = {
//   name: "/",
//   children: [
//     {
//       name: "a",
//       children: []
//     },
//     {
//       name: "b.txt",
//       size: 1000
//     }
//   ]
// }

const testCommands = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split("\n");

/**
 * Jump in difficulty!
 * 
 * Hmm.... not sure what's going wrong in real case. Test works.
 * 
 * Huh....dir pwcvj appears inside of itself.... That must be it...
 * Name of a dir needs to depend on entire path, not just its name...
 * 
 * Ugh, kinda breaks whole idea, where we just try to find index of `$ cd ${dir}`. If there are many places.
 * 
 * Seems we actually need to keep track of working directory as we move around.
 * 
 * Huh... So we want to process the lines one at a time.
 * 
 * But then....how to keep track of each dir's cumulative size..... This is tough.
 * 
 * Like you'd have to, if you just go through line by line...
 * Add the value to EACH of the ancestor divs.
 * 
 * Ok so map would have keys like "/", "/-a", "/-a-b", etc.
 */

/**
 * Take name of dir. Find where we cd {dir} && ls.
 * Next lines
 */

// const allSizes = [];
const processedDirs = new Map();

const getSize = (dir) => {
  if (processedDirs.has(dir)) return processedDirs.get(dir);

  const i = commands.findIndex(x => x === `$ cd ${dir}`);
  const i2 = commands.slice(i + 1).findIndex(x => x.startsWith("$ cd"));
  // console.log(dir, i, i2);
  const contents = i2 === -1 ? commands.slice(i + 2) : commands.slice(i + 2, i + i2 + 1);
  // console.log(contents);
  // return contents;
  let size = 0;
  contents.forEach(c => {
    if (c.startsWith("dir")) {
      // console.log("new dir is", c.split(' ')[1])
      size += getSize(c.split(" ")[1]);
    } else {
      const n = +c.match(/(\d+)/)[0];
      // console.log(n);
      size += n;
    }
  });

  // console.log(`Size of ${dir} is ${size}`);
  // allSizes.push(size);
  processedDirs.set(dir, size);
  return size;
};

const run = () => {
  getSize("/");

  return [...processedDirs.values()].filter(x => x <= 100000).reduce((sum, v) => sum + v, 0);
};

console.time('run');
console.log(run());
console.timeEnd('run');

