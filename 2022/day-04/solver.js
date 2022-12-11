const fs = require("fs");

(function solve() {
  const inputs = fs.readFileSync("inputs.txt", "utf-8");
  const assignments = inputs.split("\n");

  // Part 1
  let fullyContainedRanges = 0;
  assignments.forEach((assignment) => {
    const [first, second] = assignment.split(",");
    const [from1, to1] = first.split("-").map(Number);
    const [from2, to2] = second.split("-").map(Number);

    const firstContainsSecond = from1 <= from2 && to1 >= to2;
    const secondContainsFirst = from2 <= from1 && to2 >= to1;

    if (firstContainsSecond || secondContainsFirst) {
      fullyContainedRanges += 1;
    }
  });

  console.log("fullyContainedRanges", fullyContainedRanges);

  // Part 2
  let partiallyContainedRanges = 0;
  assignments.forEach((assignment) => {
    const [first, second] = assignment.split(",");
    const [from1, to1] = first.split("-").map(Number);
    const [from2, to2] = second.split("-").map(Number);

    const firstContainsSecond = to1 >= from2 && from1 <= to2;
    const secondContainsFirst = to2 >= from1 && from2 <= to1;

    if (firstContainsSecond || secondContainsFirst) {
      partiallyContainedRanges += 1;
    }
  });

  console.log("partiallyContainedRanges", partiallyContainedRanges);
})();
