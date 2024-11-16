// problem: https://codeforces.com/problemset/problem/1999/D
// input:
//          number of strings
//          string s contains letters and ? (can be any letter)
//          string t contains letters
// output:
//          YES
//          possible s => if t is sub of s (not continuous)
//          NO
//            abc??d
//            abdd => yes => abcddd

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputLines = [];
let n = 0;

rl.on("line", (line) => {
  inputLines.push(line);
  if (inputLines.length === 1) {
    n = parseInt(line);
  } else if (inputLines.length === 2 * n + 1) {
    rl.close();
  }
});

rl.on("close", () => {
  const inputs = [];
  for (let i = 0; i < n; i++) {
    const s = inputLines[2 * i + 1];
    const t = inputLines[2 * i + 2];
    inputs.push({ s: s, t: t });
  }
  answer(inputs);
});

let set = new Set();
let returnString = "";
let runnig = true;

function answer(inputs = [{ s: "", t: "" }]) {
  // Your logic to process the inputs
  //console.log(inputs);
  for (let i = 0; i < inputs.length; i++) {
    const res = findStringFor(inputs[i].s, inputs[i].t);
    if (!res) {
      console.log("NO");
      continue;
    }

    let ret = "";
    for (let j = 0; j < inputs[i].s.length; j++) {
      if (inputs[i].s[j] === "?") {
        if (returnString[0] === undefined) ret += "a";
        else {
          ret += returnString[0];
          returnString = returnString.substring(1);
        }
      } else {
        ret += inputs[i].s[j];
      }
    }
    console.log("YES");
    console.log(ret);

    returnString = "";
    runnig = true;
  }
}

const findStringFor = (s = "", t = "") => {
  // s[0] === t[0] || s[0] === "?"
  //    ignore => s.sub(1) , t
  //    equal  => s.sub(1) , t.sub(1)
  // s[0] !== t[0]
  //    next => s.sub(1) , t

  //console.log(s, "|", t, returnString);

  //if (set.has(s + t + returnString)) {
  //  return false;
  //} else set.add(s + t + returnString);
  if (t.length === 0) {
    runnig = false;
    return true;
  } else if (t.length > 0 && s.length > 0 && runnig) {
    if (s[0] === t[0] || s[0] === "?") {
      if (s[0] === "?") {
        returnString += t[0];
      }
      const res2 = findStringFor(s.substring(1), t.substring(1));
      if (res2) return true;
      const res = findStringFor(s.substring(1), t);
      if (res) return true;
      if (s[0] === "?") {
        returnString = returnString.substring(0, returnString.length - 1);
      }
    } else {
      const res3 = findStringFor(s.substring(1), t);
      if (res3) return true;
    }
  }
};

//answer([{ s: "tes???t", t: "test" }]);
