const fs = require("fs");

// const crates = {
//   1: ["Z", "N"],
//   2: ["M", "C", "D"],
//   3: ["P"],
// };

const crates = {
  1: ["B", "G", "S", "C"],
  2: ["T", "M", "W", "H", "J", "N", "V", "G"],
  3: ["M", "Q", "S"],
  4: ["B", "S", "L", "T", "W", "N", "M"],
  5: ["J", "Z", "F", "T", "V", "G", "W", "P"],
  6: ["C", "T", "B", "G", "Q", "H", "S"],
  7: ["T", "J", "P", "B", "W"],
  8: ["G", "D", "C", "Z", "F", "T", "Q", "M"],
  9: ["N", "S", "H", "B", "P", "F"],
};

(function solve() {
  const inputs = fs.readFileSync("inputs.txt", "utf-8");
  const [_, allMovements] = inputs.split("\n\n");
  const movements = allMovements.split("\n");
  const movementRegex = /move (\d+) from (\d+) to (\d+)/;

  console.log("crates INITIAL");
  console.table(crates);
  console.log("\n");

  // Part 1
  movements.forEach((movement) => {
    const [command, amount, from, to] = movement.match(movementRegex);
    // console.log("command", command);

    for (let index = 0; index < amount; index++) {
      const crate = crates[from].pop();
      if (!crate) {
        throw new Error("no box left to move");
      }

      crates[to].push(crate);
    }
  });

  console.log("\n");
  console.log("crates FINAL");
  console.table(crates);

  const message1 = Object.keys(crates).reduce((acc, cur) => {
    const currentStack = crates[cur];
    acc += currentStack[currentStack.length - 1];
    return acc;
  }, "");
  console.log("message1", message1);

  // running it after part 1 would give a wrong result as the crates object was mutated
  // Part 2
  movements.forEach((movement) => {
    const [command, amount, from, to] = movement.match(movementRegex);
    // console.log("command", command);

    const crateFrom = crates[from];
    const cratesToMove = crateFrom.splice(crateFrom.length - amount, amount);

    crates[to].push(...cratesToMove);
  });

  console.log("\n");
  console.log("crates FINAL");
  console.table(crates);

  const message2 = Object.keys(crates).reduce((acc, cur) => {
    const currentStack = crates[cur];
    acc += currentStack[currentStack.length - 1];
    return acc;
  }, "");
  console.log("message2", message2);
})();
