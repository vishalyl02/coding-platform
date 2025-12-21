const problemTests = {
  // ==================== TEST 1 - BASICS ====================
  
  // Problem 1.1: Sum of Elements
  "1-1": [
    {
      input: `5
1 2 3 4 5`,
      output: `15`
    },
    {
      input: `3
10 20 30`,
      output: `60`
    },
    {
      input: `4
-5 10 -3 8`,
      output: `10`
    }
  ],

  // Problem 1.2: Number of Even Elements
  "1-2": [
    {
      input: `6
1 2 3 4 5 6`,
      output: `3`
    },
    {
      input: `5
2 4 6 8 10`,
      output: `5`
    },
    {
      input: `4
1 3 5 7`,
      output: `0`
    }
  ],

  // Problem 1.3: Number of Odd Elements
  "1-3": [
    {
      input: `6
1 2 3 4 5 6`,
      output: `3`
    },
    {
      input: `5
1 3 5 7 9`,
      output: `5`
    },
    {
      input: `4
2 4 6 8`,
      output: `0`
    }
  ],

  // ==================== TEST 2 - NUMBER OPERATIONS ====================
  
  // Problem 2.1: Total Number of Factors
  "2-1": [
    {
      input: `12`,
      output: `6`
    },
    {
      input: `20`,
      output: `6`
    },
    {
      input: `7`,
      output: `2`
    }
  ],

  // Problem 2.2: Sum of Digits
  "2-2": [
    {
      input: `12345`,
      output: `15`
    },
    {
      input: `999`,
      output: `27`
    },
    {
      input: `100`,
      output: `1`
    }
  ],

  // Problem 2.3: Largest Number in Array
  "2-3": [
    {
      input: `5
3 7 2 9 1`,
      output: `9`
    },
    {
      input: `4
-5 -2 -10 -1`,
      output: `-1`
    },
    {
      input: `6
100 200 50 150 300 250`,
      output: `300`
    }
  ],

  // ==================== TEST 3 - FINDING MINIMUM ====================
  
  // Problem 3.1: Smallest Number
  "3-1": [
    {
      input: `5
3 7 2 9 1`,
      output: `1`
    },
    {
      input: `4
-5 -2 -10 -1`,
      output: `-10`
    },
    {
      input: `6
100 50 200 25 300 75`,
      output: `25`
    }
  ],

  // Problem 3.2: Smallest Even Number
  "3-2": [
    {
      input: `6
3 8 5 2 9 4`,
      output: `2`
    },
    {
      input: `5
10 6 8 12 4`,
      output: `4`
    },
    {
      input: `4
1 3 5 7`,
      output: `-1`
    }
  ],

  // Problem 3.3: Smallest Odd Number
  "3-3": [
    {
      input: `6
2 7 4 3 8 5`,
      output: `3`
    },
    {
      input: `5
1 9 3 11 5`,
      output: `1`
    },
    {
      input: `4
2 4 6 8`,
      output: `-1`
    }
  ],

  // ==================== TEST 4 - ADVANCED OPERATIONS ====================
  
  // Problem 4.1: Max Difference Between Any Two Numbers
  "4-1": [
    {
      input: `5
2 7 3 1 9`,
      output: `8`
    },
    {
      input: `4
10 5 20 15`,
      output: `15`
    },
    {
      input: `6
-5 10 3 -8 7 2`,
      output: `18`
    }
  ],

  // Problem 4.2: Max Product of Any Three Numbers
  "4-2": [
    {
      input: `5
1 2 3 4 5`,
      output: `60`
    },
    {
      input: `4
-10 -5 2 3`,
      output: `150`
    },
    {
      input: `6
1 10 2 6 5 3`,
      output: `300`
    }
  ],

  // Problem 4.3: Number of Vowels in String
  "4-3": [
    {
      input: `hello world`,
      output: `3`
    },
    {
      input: `AEIOU`,
      output: `5`
    },
    {
      input: `Programming is fun`,
      output: `5`
    }
  ],
};

module.exports = problemTests;