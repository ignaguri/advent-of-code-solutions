const fs = require("fs");

const abc = "#abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

(function solve() {
  const inputs = fs.readFileSync("inputs.txt", "utf-8");
  const rucksacks = inputs.split("\n");

  // Part 1
  let sumOfPriorities1 = 0;
  rucksacks.forEach((rucksack) => {
    const half = Math.ceil(rucksack.length / 2);
    const firstHalf = rucksack.slice(0, half);
    const secondHalf = rucksack.slice(half);

    // if (firstHalf.length !== secondHalf.length) {
    //   throw new Error("something is wrong");
    // }

    const commonItem = [...firstHalf].find((item) => secondHalf.includes(item));
    const itemScore = abc.indexOf(commonItem);

    sumOfPriorities1 += itemScore;
  });

  console.log("sumOfPriorities1", sumOfPriorities1);

  // Part 2
  let sumOfPriorities2 = 0;
  const groups = chunk(rucksacks, 3);
  groups.forEach((group) => {
    const [first, second, third] = group;

    const commonItem = [...first].find(
      (item) => second.includes(item) && third.includes(item)
    );
    const itemScore = abc.indexOf(commonItem);

    sumOfPriorities2 += itemScore;
  });

  console.log("sumOfPriorities2", sumOfPriorities2);
})();
