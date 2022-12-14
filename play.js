

let res = '';

let max = 1;
for (let i = 1; i < 9; i++) {
    let line = '';
    for (let j = 1; j <= i; j++) {
        line += j;
    }
    res += line.split('').reverse().join('');
    res += '\n';
}

console.log(res);