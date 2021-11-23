interface dancer {
  height: number;
  mayor: boolean;
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Zadej číslo n: ", (n: number) => {
  n = Number(n);
  readline.question("Zadej číslo s: ", (s: number) => {
    s = Number(s);
    readline.question("Zadej číslo l: ", (l: number) => {
      l = Number(l);
      readline.question("Zadej výšky tanečníků: ", (heights: string) => {
        var heightsArray = heights.split(" ");
        var dancersHeights = heightsArray.map(Number);

        var dancers: dancer[] = dancersHeights.map((dancer, i) => {
          return { height: dancer, mayor: i + 1 == s };
        });

        function areSorted(): boolean {
          let sorted: boolean = true;
          dancers.forEach((dancer, i) => {
            if (dancer.height > (dancers[i + 1]?.height || Infinity))
              sorted = false;
          });
          return sorted;
        }

        function turn(indexes: number[]) {
          var invertingArray: dancer[] = [];
          dancers.forEach((dancer, i) => {
            if (indexes.includes(i)) invertingArray.push(dancer);
          });
          invertingArray.reverse();
          let inserted = 0;
          dancers.forEach((dancer, i) => {
            if (indexes.includes(i)) {
              dancers[i] = invertingArray[inserted];
              inserted++;
            }
          });
        }

        var mayorTurns = false;
        var turns = 0;
        var turnsIndexes: number[][] = [];
        while (!areSorted() && turns < (l || 100) && !mayorTurns) {
          turns++;
          var turningI: number[] = [];
          let start = false;
          let end = false;
          dancers.forEach((dancer, i) => {
            if (
              dancer.height < (dancers[i - 1]?.height || 0) ||
              dancer.height > (dancers[i + 1]?.height || Infinity)
            ) {
              if (!end) {
                start = true;
                turningI.push(i);
              }
            } else {
              if (start) end = true;
            }
          });

          turningI.forEach((turningIndex, i) => {
            if (
              dancers[turningIndex].mayor &&
              !(
                turningI.length % 2 == 1 &&
                dancers[turningI[Math.round((turningI.length - 1) / 2)]].mayor
              )
            ) {
              mayorTurns = true;
            }
          });

          turn(turningI);
          turnsIndexes.push([turningI[0], turningI[turningI.length - 1]]);
        }

        console.log(mayorTurns || !areSorted() ? "NE" : "ANO");
        if (!mayorTurns && areSorted() && l) {
          console.log(turns);
          turnsIndexes.forEach((turnsIndex) => {
            console.log(
              turnsIndex
                .map((index) => {
                  return index + 1;
                })
                .join(" ")
            );
          });
        }
        process.exit();
      });
    });
  });
});
