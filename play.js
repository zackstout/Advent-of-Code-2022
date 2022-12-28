

// let res = '';

// let max = 1;
// for (let i = 1; i < 9; i++) {
//     let line = '';
//     for (let j = 1; j <= i; j++) {
//         line += j;
//     }
//     res += line.split('').reverse().join('');
//     res += '\n';
// }

// console.log(res);



/**
 * WE GOT THERE
 */

const permute = arr => {
    if (arr.length === 1) return [arr];
    return arr.flatMap((el, idx) => {
        const m = [...arr];
        m.splice(idx, 1);
        // const m = arr.slice(0, idx).concat(arr.slice(idx + 1)); // actually I prefer other way
        return permute(m).map(perm => [el, ...perm]);
    });

    // return permute(arr.slice(1)).flatMap(perm => [[arr[0], ...perm], [...perm, arr[0]]]);
};

console.log(permute([1, 2, 3]))