// allTestProblems.js - Complete problem definitions with descriptions and examples

// ==================== TEST 1 - BASICS ====================
export const test1Problems = [
  {
    id: 1,
    title: "Sum of Elements",
    description: `Given an array of n integers, find the sum of all elements.

Problem Statement:
You are given an integer n (the number of elements) and an array of n integers. Calculate and return the sum of all elements in the array.

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers (-10^6 ≤ each element ≤ 10^6)

Output Format:
- A single integer representing the sum of all elements

Constraints:
- 1 ≤ n ≤ 1000
- -10^6 ≤ array elements ≤ 10^6

Time Limit: 1 second`,
    examples: [
      {
        input: `5
1 2 3 4 5`,
        output: `15`,
        explanation: "Sum = 1 + 2 + 3 + 4 + 5 = 15"
      },
      {
        input: `3
10 20 30`,
        output: `60`,
        explanation: "Sum = 10 + 20 + 30 = 60"
      },
      {
        input: `4
-5 10 -3 8`,
        output: `10`,
        explanation: "Sum = -5 + 10 + (-3) + 8 = 10"
      }
    ],
  },
  {
    id: 2,
    title: "Number of Even Elements",
    description: `Given an array of n integers, count how many elements are even numbers.

Problem Statement:
You are given an integer n and an array of n integers. Count and return how many numbers in the array are even (divisible by 2).

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer representing the count of even numbers

Note:
- Zero (0) is considered an even number
- Negative even numbers (like -2, -4) are also counted

Constraints:
- 1 ≤ n ≤ 1000
- -10^6 ≤ array elements ≤ 10^6

Time Limit: 1 second`,
    examples: [
      {
        input: `6
1 2 3 4 5 6`,
        output: `3`,
        explanation: "Even numbers are: 2, 4, 6. Count = 3"
      },
      {
        input: `5
2 4 6 8 10`,
        output: `5`,
        explanation: "All numbers are even. Count = 5"
      },
      {
        input: `4
1 3 5 7`,
        output: `0`,
        explanation: "No even numbers found. Count = 0"
      }
    ],
  },
  {
    id: 3,
    title: "Number of Odd Elements",
    description: `Given an array of n integers, count how many elements are odd numbers.

Problem Statement:
You are given an integer n and an array of n integers. Count and return how many numbers in the array are odd (not divisible by 2).

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer representing the count of odd numbers

Note:
- Negative odd numbers (like -1, -3) are also counted

Constraints:
- 1 ≤ n ≤ 1000
- -10^6 ≤ array elements ≤ 10^6

Time Limit: 1 second`,
    examples: [
      {
        input: `6
1 2 3 4 5 6`,
        output: `3`,
        explanation: "Odd numbers are: 1, 3, 5. Count = 3"
      },
      {
        input: `5
1 3 5 7 9`,
        output: `5`,
        explanation: "All numbers are odd. Count = 5"
      },
      {
        input: `4
2 4 6 8`,
        output: `0`,
        explanation: "No odd numbers found. Count = 0"
      }
    ],
  },
];

// ==================== TEST 2 - NUMBER OPERATIONS ====================
export const test2Problems = [
  {
    id: 1,
    title: "Total Number of Factors",
    description: `Given a positive integer n, find the total number of factors (divisors) of n.

Problem Statement:
A factor of a number n is a positive integer that divides n completely (with remainder 0). Your task is to count all such factors including 1 and n itself.

Input Format:
- A single positive integer n (1 ≤ n ≤ 10^6)

Output Format:
- A single integer representing the count of factors

Example:
For n = 12:
- Factors are: 1, 2, 3, 4, 6, 12
- Count = 6

Constraints:
- 1 ≤ n ≤ 10^6

Time Limit: 1 second`,
    examples: [
      {
        input: `12`,
        output: `6`,
        explanation: "Factors of 12 are: 1, 2, 3, 4, 6, 12. Total = 6 factors"
      },
      {
        input: `20`,
        output: `6`,
        explanation: "Factors of 20 are: 1, 2, 4, 5, 10, 20. Total = 6 factors"
      },
      {
        input: `7`,
        output: `2`,
        explanation: "Factors of 7 are: 1, 7. Total = 2 factors (7 is prime)"
      }
    ],
  },
  {
    id: 2,
    title: "Sum of Digits",
    description: `Given a positive integer n, find the sum of all its digits.

Problem Statement:
You are given a positive integer n. Calculate the sum of all digits in n.

Input Format:
- A single positive integer n (0 ≤ n ≤ 10^9)

Output Format:
- A single integer representing the sum of digits

Example:
For n = 12345:
- Digits are: 1, 2, 3, 4, 5
- Sum = 1 + 2 + 3 + 4 + 5 = 15

Constraints:
- 0 ≤ n ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `12345`,
        output: `15`,
        explanation: "Sum of digits: 1 + 2 + 3 + 4 + 5 = 15"
      },
      {
        input: `999`,
        output: `27`,
        explanation: "Sum of digits: 9 + 9 + 9 = 27"
      },
      {
        input: `100`,
        output: `1`,
        explanation: "Sum of digits: 1 + 0 + 0 = 1"
      }
    ],
  },
  {
    id: 3,
    title: "Largest Number in Array",
    description: `Given an array of n integers, find the largest (maximum) element.

Problem Statement:
You are given an integer n and an array of n integers. Find and return the largest number in the array.

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer representing the largest element

Note:
- The array can contain negative numbers
- If all numbers are negative, return the least negative number

Constraints:
- 1 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `5
3 7 2 9 1`,
        output: `9`,
        explanation: "The largest number in the array is 9"
      },
      {
        input: `4
-5 -2 -10 -1`,
        output: `-1`,
        explanation: "All numbers are negative. -1 is the largest (least negative)"
      },
      {
        input: `6
100 200 50 150 300 250`,
        output: `300`,
        explanation: "The largest number is 300"
      }
    ],
  },
];

// ==================== TEST 3 - FINDING MINIMUM ====================
export const test3Problems = [
  {
    id: 1,
    title: "Smallest Number",
    description: `Given an array of n integers, find the smallest (minimum) element.

Problem Statement:
You are given an integer n and an array of n integers. Find and return the smallest number in the array.

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer representing the smallest element

Note:
- The array can contain negative numbers
- If all numbers are positive, return the smallest positive number
- If array has negative numbers, the most negative number is the smallest

Constraints:
- 1 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `5
3 7 2 9 1`,
        output: `1`,
        explanation: "The smallest number in the array is 1"
      },
      {
        input: `4
-5 -2 -10 -1`,
        output: `-10`,
        explanation: "-10 is the smallest (most negative) number"
      },
      {
        input: `6
100 50 200 25 300 75`,
        output: `25`,
        explanation: "The smallest number is 25"
      }
    ],
  },
  {
    id: 2,
    title: "Smallest Even Number",
    description: `Given an array of n integers, find the smallest even number. If no even number exists, return -1.

Problem Statement:
You are given an integer n and an array of n integers. Find and return the smallest even number in the array. If there are no even numbers, return -1.

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer: the smallest even number, or -1 if no even numbers exist

Note:
- A number is even if it's divisible by 2
- Zero (0) is considered even
- Negative even numbers (like -2, -4) are also considered

Constraints:
- 1 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `6
3 8 5 2 9 4`,
        output: `2`,
        explanation: "Even numbers are: 8, 2, 4. Smallest even = 2"
      },
      {
        input: `5
10 6 8 12 4`,
        output: `4`,
        explanation: "All numbers are even. Smallest = 4"
      },
      {
        input: `4
1 3 5 7`,
        output: `-1`,
        explanation: "No even numbers found, so return -1"
      }
    ],
  },
  {
    id: 3,
    title: "Smallest Odd Number",
    description: `Given an array of n integers, find the smallest odd number. If no odd number exists, return -1.

Problem Statement:
You are given an integer n and an array of n integers. Find and return the smallest odd number in the array. If there are no odd numbers, return -1.

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer: the smallest odd number, or -1 if no odd numbers exist

Note:
- A number is odd if it's NOT divisible by 2
- Negative odd numbers (like -1, -3) are also considered

Constraints:
- 1 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `6
2 7 4 3 8 5`,
        output: `3`,
        explanation: "Odd numbers are: 7, 3, 5. Smallest odd = 3"
      },
      {
        input: `5
1 9 3 11 5`,
        output: `1`,
        explanation: "All numbers are odd. Smallest = 1"
      },
      {
        input: `4
2 4 6 8`,
        output: `-1`,
        explanation: "No odd numbers found, so return -1"
      }
    ],
  },
];

// ==================== TEST 4 - ADVANCED OPERATIONS ====================
export const test4Problems = [
  {
    id: 1,
    title: "Max Difference Between Any Two Numbers",
    description: `Given an array of n integers, find the maximum difference between any two elements.

Problem Statement:
You are given an integer n and an array of n integers. Find the maximum absolute difference between any two elements in the array.

The difference is calculated as: |array[i] - array[j]| for any valid i, j.

Input Format:
- First line: An integer n (2 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer representing the maximum difference

Note:
- The maximum difference is always: (max element - min element)
- The difference is always positive (absolute value)

Constraints:
- 2 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `5
2 7 3 1 9`,
        output: `8`,
        explanation: "Max = 9, Min = 1. Difference = 9 - 1 = 8"
      },
      {
        input: `4
10 5 20 15`,
        output: `15`,
        explanation: "Max = 20, Min = 5. Difference = 20 - 5 = 15"
      },
      {
        input: `6
-5 10 3 -8 7 2`,
        output: `18`,
        explanation: "Max = 10, Min = -8. Difference = 10 - (-8) = 18"
      }
    ],
  },
  {
    id: 2,
    title: "Max Product of Any Three Numbers",
    description: `Given an array of n integers, find the maximum product that can be obtained by multiplying any three numbers.

Problem Statement:
You are given an integer n (n ≥ 3) and an array of n integers. Find the maximum product that can be obtained by multiplying any three elements.

Input Format:
- First line: An integer n (3 ≤ n ≤ 1000)
- Second line: n space-separated integers

Output Format:
- A single integer representing the maximum product

Note:
- The array can contain negative numbers
- The maximum product might be obtained from:
  - Three largest positive numbers, OR
  - Two smallest negative numbers and the largest positive number
  - Consider both cases!

Constraints:
- 3 ≤ n ≤ 1000
- -1000 ≤ array elements ≤ 1000

Time Limit: 1 second`,
    examples: [
      {
        input: `5
1 2 3 4 5`,
        output: `60`,
        explanation: "Maximum product: 3 × 4 × 5 = 60"
      },
      {
        input: `4
-10 -5 2 3`,
        output: `150`,
        explanation: "Maximum product: (-10) × (-5) × 3 = 150 (two negatives make positive!)"
      },
      {
        input: `6
1 10 2 6 5 3`,
        output: `300`,
        explanation: "Maximum product: 10 × 6 × 5 = 300"
      }
    ],
  },
  {
    id: 3,
    title: "Number of Vowels in String",
    description: `Given a string, count the total number of vowels (a, e, i, o, u) in it.

Problem Statement:
You are given a string consisting of letters (both uppercase and lowercase), spaces, and possibly other characters. Count and return the total number of vowels in the string.

Vowels: a, e, i, o, u, A, E, I, O, U

Input Format:
- A single line containing a string (length ≤ 10^5)

Output Format:
- A single integer representing the count of vowels

Note:
- Both uppercase and lowercase vowels should be counted
- Spaces and other characters should be ignored

Constraints:
- 1 ≤ string length ≤ 10^5
- String may contain letters, spaces, digits, and special characters

Time Limit: 1 second`,
    examples: [
      {
        input: `hello world`,
        output: `3`,
        explanation: "Vowels: e, o, o. Count = 3"
      },
      {
        input: `AEIOU`,
        output: `5`,
        explanation: "All characters are vowels. Count = 5"
      },
      {
        input: `Programming is fun`,
        output: `5`,
        explanation: "Vowels: o, a, i, i, u. Count = 5"
      }
    ],
  },
];

// Export all tests
export const allTests = {
  1: test1Problems,
  2: test2Problems,
  3: test3Problems,
  4: test4Problems,
};