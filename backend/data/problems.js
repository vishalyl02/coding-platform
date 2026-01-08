const problemTests = {
  // ==================== TEST 1 - BASICS ====================
  
  // Problem 1.1: Kadane's Algorithm - Maximum Subarray Sum
  "1-1": [
    {
      input: `5
-2 1 -3 4 -1`,
      output: `4`
    },
    {
      input: `8
-2 -3 4 -1 -2 1 5 -3`,
      output: `7`
    },
    {
      input: `3
5 4 -1`,
      output: `9`
    },
    {
      input: `1
1`,
      output: `1`
    },

{      input: `3
5 4 -1`,
      output: `9`
    }
  ],

  // Problem 1.2: Maximum Frequency of a Character
  "1-2": [
    {
      input: `hello`,
      output: `2`
    },
    {
      input: `aabbcc`,
      output: `2`
    },
    {
      input: `programming`,
      output: `2`
    }
  ],

  // Problem 1.3: Palindrome Check
  "1-3": [
    {
      input: `racecar`,
      output: `YES`
    },
    {
      input: `hello`,
      output: `NO`
    }
  ],

  // ==================== TEST 2 - NUMBER OPERATIONS ====================
  
  // Problem 2.1: Transpose of a Matrix
  "2-1": [
    {
      input: `2 3
1 2 3
4 5 6`,
      output: `1 4
2 5
3 6`
    },
    {
      input: `3 3
1 2 3
4 5 6
7 8 9`,
      output: `1 4 7
2 5 8
3 6 9`
    },
    {
      input: `1 4
1 2 3 4`,
      output: `1
2
3
4`
    }
  ],

  // Problem 2.2: Two Sum
  "2-2": [
    {
      input: `4 9
2 7 11 15`,
      output: `YES`
    },
    {
      input: `5 10
1 5 3 7 2`,
      output: `YES`
    }
  ],

  // Problem 2.3: Prime Number Check
  "2-3": [
    {
      input: `7`,
      output: `YES`
    },
    {
      input: `12`,
      output: `NO`
    },
    {
      input: `2`,
      output: `YES`
    }
  ],

  // ==================== TEST 3 - STRING OPERATIONS ====================
  
  // Problem 3.1: Valid Parentheses
  "3-1": [
    {
      input: `()[]{}`,
      output: `YES`
    },
    {
      input: `([)]`,
      output: `NO`
    },
    {
      input: `{[]}`,
      output: `YES`
    }
  ],

  // Problem 3.2: Maximum Consecutive Repeated Character Frequency
  "3-2": [
    {
      input: `aaabbbaa`,
      output: `3`
    },
    {
      input: `aabbbbcc`,
      output: `4`
    },
    {
      input: `abcdef`,
      output: `1`
    }
  ],

  // Problem 3.3: Pair Count with Sum Less Than K
  "3-3": [
    {
      input: `4 6
1 2 3 4`,
      output: `4`
    },
    {
      input: `5 10
3 5 7 2 8`,
      output: `6`
    },
    {
      input: `3 5
5 5 5`,
      output: `0`
    }
  ],

  // ==================== TEST 4 - ADVANCED OPERATIONS ====================
  
  // Problem 4.1: Count Vowels and Alphanumeric Characters
  "4-1": [
    {
      input: `Hello World!`,
      output: `3 10`
    },
    {
      input: `Programming123`,
      output: `3 14`
    },
    {
      input: `abc 123 xyz`,
      output: `1 9`
    }
  ],

  // Problem 4.2: Sum of Digits
  "4-2": [
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

  // Problem 4.3: Anagram Check
  "4-3": [
    {
      input: `listen
silent`,
      output: `YES`
    },
    {
      input: `hello
world`,
      output: `NO`
    },
    {
      input: `Anagram
Nagaram`,
      output: `NO`
    }
  ],
};

module.exports = problemTests;