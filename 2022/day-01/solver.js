const fs = require("fs");

(function solve() {
  const inputs = fs.readFileSync("inputs.txt", "utf-8");

  const elfBags = [];
  let index = 0;
  inputs.split("\n").forEach((value) => {
    if (!value) {
      index++;
      return;
    }

    const calories = Number(value);

    // overengineering much?
    if (isNaN(calories)) {
      return;
    }

    elfBags[index]?.length
      ? elfBags[index].push(calories)
      : elfBags.push([calories]);
  });

  const caloriesPerElf = elfBags.map((bag) => {
    return bag.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  });

  // Part 1
  const maxCalories = Math.max(...caloriesPerElf);
  console.log("An the winner is...", maxCalories);

  // Part 2
  const sortedCalories = [...caloriesPerElf].sort((a, b) => b - a);
  console.log(
    "Sum of top 3 elves",
    sortedCalories[0] + sortedCalories[1] + sortedCalories[2]
  );
})();
