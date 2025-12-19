const problemTests = {
  1: [
    {
      input: `5
1 2 3 4 5
3
0 2
1 3
2 4`,
      output: `6
9
12`
    }
  ],

  2: [
    {
      input: `5
10 3
15 1
12 3
20 1
8 2`,
      output: `20 1
15 1
8 2
12 3
10 3`
    }
  ],

  3: [
    {
      input: `4 3
1 2
2 3
3 4`,
      output: `YES`
    },
    {
      input: `4 2
1 2
3 4`,
      output: `NO`
    },
    {
      input: `1 0`,
      output: `YES`
    }
  ]
};

module.exports = problemTests;
