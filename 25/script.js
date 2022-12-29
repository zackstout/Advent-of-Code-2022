
const { data } = require('./input');
const lines = data.split('\n');

// Nice, works
const toDecimal = num => {
  return num.split('').reduce((acc, val, idx) => {
    const pow = num.length - 1 - idx;
    let v = val;
    if (v === "-") v = -1;
    if (v === "=") v = -2;
    v = parseInt(v);
    return acc + v * Math.pow(5, pow);
  }, 0);
};

/**
 * Hm.... this is actually harder to write... 
 * 
 * I wonder if instead we should sum the columns... and "carry" the extras manually...?
 * 
 * Yeah... we need to massage the number...working from the ones place, upward....
 * Borrowing from or shoving off onto the next place up...until we get to [-2, 2] range... We just add or subtract 5 as needed until we get to that range...
 */
const toSnafu = num => {

};

const sumSnafuDigits = digits => {
  // First digit is 1's place.
  let result = [];

  console.log("Summing snafu digits...", digits);

  let carry = 0;

  while (digits.length > 0) {
    let d = digits.shift() + carry;
    carry = 0;
    if (d >= -2 && d <= 2) {
      result.push(d);
      continue;
    }
    const dir = d < -2 ? 1 : -1;
    while (d > 2 || d < -2) {
      carry += -dir;
      d += dir * 5;
    }
    result.push(d);
  }

  // console.log("final carry", carry);
  // result.push(carry);

  return result;
};

const run = () => {
  // ['1=-0-2', '12111', '2=0=', '12'].forEach(n => console.log(toDecimal(n)));

  console.log(Math.max(...lines.map(l => l.length)));

  let total = 0;

  const digits = [];

  [...new Array(20)].map((x, i) => i).forEach(n => {
    // Show "nth-place" digit of number
    const nsPlace = lines.map(l => l[l.length - 1 - n] ?? 0)
      // .join('');
      .reduce((acc, val) => {
        let v = val;
        if (v === "-") v = -1;
        if (v === "=") v = -2;
        v = parseInt(v);
        return acc + v;
      }, 0);
    console.log(`5^${n}'s place is`, nsPlace);
    digits.push(nsPlace);

    // Ok yes... this is working...
    // total += nsPlace * Math.pow(5, n);
  });

  const snafuDigits = sumSnafuDigits(digits);

  // hehe, forgot to reverse
  const snafuSum = snafuDigits.reverse().map(v => {
    if (v === -1) v = "-";
    if (v === -2) v = "=";
    return v;
  }).join("");


  // Even though we didn't technically need toDecimal for our solution, it was really crucial to be able to test our answer 
  console.log("Snafu digits sum:", snafuSum, toDecimal(snafuSum));

  // console.log(`Total is ${total}.`);

  // Must toSnafu this answer...
  return lines.map(x => x.trim()).map(toDecimal).reduce((acc, val) => acc + val, 0);
};

console.time('run');
console.log(run());
console.timeEnd('run');

