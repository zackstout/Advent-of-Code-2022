
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
 * This would only work if all dirs had unique names.
 * 
 * Take name of dir. Find where we cd {dir} && ls.
 * Next lines
 */

// const allSizes = [];
const processedDirs = new Map();

// const getSize = (dir) => {
//   if (processedDirs.has(dir)) return processedDirs.get(dir);

//   const i = commands.findIndex(x => x === `$ cd ${dir}`);
//   const i2 = commands.slice(i + 1).findIndex(x => x.startsWith("$ cd"));
//   // console.log(dir, i, i2);
//   const contents = i2 === -1 ? commands.slice(i + 2) : commands.slice(i + 2, i + i2 + 1);
//   // console.log(contents);
//   // return contents;
//   let size = 0;
//   contents.forEach(c => {
//     if (c.startsWith("dir")) {
//       // console.log("new dir is", c.split(' ')[1])
//       size += getSize(c.split(" ")[1]);
//     } else {
//       const n = +c.match(/(\d+)/)[0];
//       // console.log(n);
//       size += n;
//     }
//   });

//   // console.log(`Size of ${dir} is ${size}`);
//   // allSizes.push(size);
//   processedDirs.set(dir, size);
//   return size;
// };

const addSize = (map, key, size) => {
  if (!map.has(key)) map.set(key, 0);
  map.set(key, map.get(key) + size);
};

const getSizes = () => {
  let dir = "";
  commands.forEach(cmd => {
    // console.log("Dir...", dir, "cmd", cmd);
    // Just skip "$ ls" lines
    if (cmd === "$ ls") return;

    if (cmd.startsWith("$ cd")) {
      if (cmd === "$ cd ..") {
        const dirs = dir.split("#");
        dirs.pop();
        dir = dirs.join("#");
      } else {
        const d = cmd.split(" ").at(-1);
        dir += `#${d}`
      }
    } else {
      if (cmd.startsWith("dir")) {
        // Do nothing
      } else {
        // Add value to ALL ancestor dirs
        const val = +cmd.split(" ")[0];
        const dirs = dir.split("#").filter(x => x);

        while (dirs.length > 0) {
          addSize(processedDirs, dirs.join("#"), val);
          dirs.pop();
        }
      }
    }
  });
};

const run = () => {
  // getSize("/");

  getSizes();

  // PART ONE
  // return [...processedDirs.values()].filter(x => x <= 100000).reduce((sum, v) => sum + v, 0);


  // PART TWO
  const totalUnused = 70000000 - processedDirs.get("/");
  console.log("total size", totalUnused);
  return [...processedDirs.values()].sort((a, b) => a - b).filter(x => totalUnused + x >= 30000000)[0];
};

console.time('run');
console.log(run());
console.timeEnd('run');

