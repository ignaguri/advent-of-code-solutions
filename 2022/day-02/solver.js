const fs = require("fs");

const ROCK = "✊";
const PAPER = "✋";
const SCISSORS = "✌️";
const WIN = "🥇";
const DRAW = "🥈";
const LOSE = "🥉";

const shapeScore = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
};

const resultScore = {
  [WIN]: 6,
  [DRAW]: 3,
  [LOSE]: 0,
};

const game = {
  [ROCK]: {
    [ROCK]: DRAW,
    [PAPER]: LOSE,
    [SCISSORS]: WIN,
  },
  [PAPER]: {
    [ROCK]: WIN,
    [PAPER]: DRAW,
    [SCISSORS]: LOSE,
  },
  [SCISSORS]: {
    [ROCK]: LOSE,
    [PAPER]: WIN,
    [SCISSORS]: DRAW,
  },
};

// A = Rock = X
// B = Paper = Y
// C = Scissors = Z
function parse1(input) {
  let parsed = input
    .replace(/A|X/g, ROCK)
    .replace(/B|Y/g, PAPER)
    .replace(/C|Z/g, SCISSORS);

  return parsed.split(" ");
}

// A = Rock
// B = Paper
// C = Scissors
// X = Lose
// Y = Draw
// Z = Win
function parse2(input) {
  let parsed = input
    .replace(/A/g, ROCK)
    .replace(/B/g, PAPER)
    .replace(/C/g, SCISSORS)
    .replace(/X/g, LOSE)
    .replace(/Y/g, DRAW)
    .replace(/Z/g, WIN);

  return parsed.split(" ");
}

(function solve() {
  const inputs = fs.readFileSync("inputs.txt", "utf-8");

  // Part 1
  let totalScore1 = 0;
  inputs.split("\n").forEach((value) => {
    const [other, me] = parse1(value);

    const result = resultScore[game[me][other]] + shapeScore[me];
    totalScore1 += result;
    // console.log(`${me} vs ${other}: ${result}`);
  });

  console.log("totalScore 1", totalScore1);

  // Part 2
  let totalScore2 = 0;
  inputs.split("\n").forEach((value) => {
    const [other, expected] = parse2(value);
    const me = Object.keys(game).find((me) => game[me][other] === expected);

    // console.log(`${me} vs ${other}: ${expected}`);

    const result = resultScore[game[me][other]] + shapeScore[me];
    totalScore2 += result;
  });

  console.log("totalScore 2", totalScore2);
})();
