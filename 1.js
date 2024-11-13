// problem: https://codeforces.com/problemset/problem/804/A
// input n
// ticket price form i to j => (i+j)%(n+1)
// min price to coverage

// i+j must be greater than n+1 so cost will be low
// for example 1 2 3 4 5 6 7 8 9 10 => (i+j) % 11
// 1,10 2,9 3,8 4,7 5,6 => 0
// 10,2     3,7     5,6 => 2 biggest + smallest of each set
// 9,3      5,6         => 1
// 7,5                  => 1
//                      if odd => hold middle => it remains until end and adds 1 cost
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// single line input
readline.on("line", (input) => {
  readline.close();
  const n = +input;
  let a = Math.round(n / 2);
  let c = 0;
  while (a > 1) {
    c += Math.floor(a / 2);
    a = Math.round(a / 2);
  }
  console.log(c);
});
