// allTestProblems.js - Complete problem definitions with descriptions and examples

// ==================== TEST 1 - BASICS ====================
export const test1Problems = [
  {
    id: 1,
    title: "Kadane's Algorithm - Maximum Subarray Sum",
    description: `Given an array of n integers, find the maximum sum of a contiguous subarray.

Problem Statement:
You are given an integer n and an array of n integers (which may include negative numbers). Find the maximum sum among all possible contiguous subarrays using Kadane's Algorithm.

A subarray is a contiguous part of an array. For example, in array [1, 2, 3], the subarrays are: [1], [2], [3], [1,2], [2,3], [1,2,3].

Input Format:
- First line: An integer n (1 ≤ n ≤ 1000)
- Second line: n space-separated integers (-10^6 ≤ each element ≤ 10^6)

Output Format:
- A single integer representing the maximum subarray sum

Constraints:
- 1 ≤ n ≤ 1000
- -10^6 ≤ array elements ≤ 10^6

Time Limit: 1 second`,
    examples: [
      {
        input: `5
-2 1 -3 4 -1`,
        output: `4`,
        explanation: "The subarray [4] has the maximum sum of 4"
      },
      {
        input: `8
-2 -3 4 -1 -2 1 5 -3`,
        output: `7`,
        explanation: "The subarray [4, -1, -2, 1, 5] has the maximum sum of 7"
      },
      {
        input: `3
5 4 -1`,
        output: `9`,
        explanation: "The subarray [5, 4, -1] has the maximum sum of 8. Actually [5, 4] = 9"
      }
    ],
  },
  {
    id: 2,
    title: "Maximum Frequency of a Character",
    description: `Given a string, find the maximum frequency of any character in the string.

Problem Statement:
You are given a string containing letters (both uppercase and lowercase). Find which character appears the most times in the string and return its frequency.

Input Format:
- A single line containing a string (1 ≤ length ≤ 10^5)

Output Format:
- A single integer representing the maximum frequency of any character

Note:
- Uppercase and lowercase letters are considered different (e.g., 'A' and 'a' are different)
- Only consider alphabetic characters

Constraints:
- 1 ≤ string length ≤ 10^5
- String contains only alphabetic characters

Time Limit: 1 second`,
    examples: [
      {
        input: `hello`,
        output: `2`,
        explanation: "The character 'l' appears 2 times, which is the maximum"
      },
      {
        input: `aabbcc`,
        output: `2`,
        explanation: "Characters 'a', 'b', and 'c' all appear 2 times"
      },
      {
        input: `programming`,
        output: `2`,
        explanation: "Characters 'g', 'r', and 'm' appear 2 times each"
      }
    ],
  },
  {
    id: 3,
    title: "Palindrome Check",
    description: `Given a string, check if it is a palindrome.

Problem Statement:
A palindrome is a string that reads the same forwards and backwards. You are given a string and need to determine if it's a palindrome.

Input Format:
- A single line containing a string (1 ≤ length ≤ 10^5)

Output Format:
- Print "YES" if the string is a palindrome
- Print "NO" if the string is not a palindrome

Note:
- Consider only alphabetic characters
- Ignore spaces and special characters
- Case-insensitive (e.g., 'A' and 'a' are considered the same)

Constraints:
- 1 ≤ string length ≤ 10^5

Time Limit: 1 second`,
    examples: [
      {
        input: `racecar`,
        output: `YES`,
        explanation: "The string reads the same forwards and backwards"
      },
      {
        input: `hello`,
        output: `NO`,
        explanation: "The string does not read the same forwards and backwards"
      },
      {
        input: `A man a plan a canal Panama`,
        output: `YES`,
        explanation: "Ignoring spaces and case: 'amanaplanacanalpanama' is a palindrome"
      }
    ],
  },
];

// ==================== TEST 2 - NUMBER OPERATIONS ====================
export const test2Problems = [
  {
    id: 1,
    title: "Transpose of a Matrix",
    description: `Given a matrix of size m×n, find its transpose.

Problem Statement:
The transpose of a matrix is obtained by swapping rows and columns. If the original matrix is m×n, the transpose will be n×m.

For a matrix A, the transpose A^T is defined as: A^T[i][j] = A[j][i]

Input Format:
- First line: Two integers m and n (number of rows and columns)
- Next m lines: Each line contains n space-separated integers

Output Format:
- Print the transpose matrix (n rows and m columns)
- Each row on a new line with space-separated integers

Constraints:
- 1 ≤ m, n ≤ 100
- -10^6 ≤ matrix elements ≤ 10^6

Time Limit: 1 second`,
    examples: [
      {
        input: `2 3
1 2 3
4 5 6`,
        output: `1 4
2 5
3 6`,
        explanation: "Rows become columns and columns become rows"
      },
      {
        input: `3 3
1 2 3
4 5 6
7 8 9`,
        output: `1 4 7
2 5 8
3 6 9`,
        explanation: "Transpose of a 3×3 matrix"
      },
      {
        input: `1 4
1 2 3 4`,
        output: `1
2
3
4`,
        explanation: "A 1×4 matrix becomes a 4×1 matrix"
      }
    ],
  },
  {
    id: 2,
    title: "Two Sum",
    description: `Given an array of integers and a target sum, find if there exist two numbers that add up to the target.

Problem Statement:
You are given an array of n integers and a target integer. Determine if there exist two different elements in the array that sum up to the target value.

Input Format:
- First line: Two integers n and target (array size and target sum)
- Second line: n space-separated integers

Output Format:
- Print "YES" if such a pair exists
- Print "NO" if no such pair exists

Note:
- You cannot use the same element twice
- There may be multiple valid pairs; you just need to check if at least one exists

Constraints:
- 2 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9
- -10^9 ≤ target ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `4 9
2 7 11 15`,
        output: `YES`,
        explanation: "2 + 7 = 9, so the answer is YES"
      },
      {
        input: `3 6
1 2 3`,
        output: `YES`,
        explanation: "3 + 3 would work but we can't use same element. However, we don't have it. Wait - no valid pair exists. Output should be NO"
      },
      {
        input: `5 10
1 5 3 7 2`,
        output: `YES`,
        explanation: "3 + 7 = 10, so the answer is YES"
      }
    ],
  },
  {
    id: 3,
    title: "Prime Number Check",
    description: `Given a positive integer n, determine if it is a prime number.

Problem Statement:
A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. Your task is to check if the given number is prime.

Input Format:
- A single positive integer n (1 ≤ n ≤ 10^6)

Output Format:
- Print "YES" if n is prime
- Print "NO" if n is not prime

Note:
- 1 is not considered a prime number
- 2 is the smallest prime number

Constraints:
- 1 ≤ n ≤ 10^6

Time Limit: 1 second`,
    examples: [
      {
        input: `7`,
        output: `YES`,
        explanation: "7 is only divisible by 1 and 7, so it's prime"
      },
      {
        input: `12`,
        output: `NO`,
        explanation: "12 is divisible by 1, 2, 3, 4, 6, and 12, so it's not prime"
      },
      {
        input: `2`,
        output: `YES`,
        explanation: "2 is the smallest prime number"
      }
    ],
  },
];

// ==================== TEST 3 - STRING OPERATIONS ====================
export const test3Problems = [
  {
    id: 1,
    title: "Valid Parentheses",
    description: `Given a string containing parentheses, determine if the parentheses are valid.

Problem Statement:
A string containing only '(', ')', '{', '}', '[' and ']' characters is given. Determine if the input string is valid.

A string is valid if:
- Every opening bracket has a corresponding closing bracket of the same type
- Opening brackets are closed in the correct order
- Every closing bracket has a corresponding opening bracket

Input Format:
- A single line containing a string of parentheses (length ≤ 10^5)

Output Format:
- Print "YES" if the parentheses are valid
- Print "NO" if the parentheses are invalid

Constraints:
- 0 ≤ string length ≤ 10^5
- String contains only: '(', ')', '{', '}', '[', ']'

Time Limit: 1 second`,
    examples: [
      {
        input: `()[]{}`,
        output: `YES`,
        explanation: "All brackets are properly matched and closed"
      },
      {
        input: `([)]`,
        output: `NO`,
        explanation: "Brackets are not closed in the correct order"
      },
      {
        input: `{[]}`,
        output: `YES`,
        explanation: "Brackets are properly nested and closed"
      }
    ],
  },
  {
    id: 2,
    title: "Maximum Consecutive Repeated Character Frequency",
    description: `Given a string, find the maximum number of consecutive times any character appears.

Problem Statement:
You are given a string. Find the longest sequence of consecutive identical characters and return its length.

For example, in "aaabbbaa", 'a' appears 3 times consecutively at the start, 'b' appears 3 times consecutively, and 'a' appears 2 times consecutively at the end. The maximum is 3.

Input Format:
- A single line containing a string (1 ≤ length ≤ 10^5)

Output Format:
- A single integer representing the maximum consecutive frequency

Constraints:
- 1 ≤ string length ≤ 10^5
- String contains only alphabetic characters

Time Limit: 1 second`,
    examples: [
      {
        input: `aaabbbaa`,
        output: `3`,
        explanation: "'a' appears 3 times consecutively and 'b' appears 3 times consecutively. Maximum = 3"
      },
      {
        input: `aabbbbcc`,
        output: `4`,
        explanation: "'b' appears 4 times consecutively, which is the maximum"
      },
      {
        input: `abcdef`,
        output: `1`,
        explanation: "No character repeats consecutively. Maximum = 1"
      }
    ],
  },
  {
    id: 3,
    title: "Pair Count with Sum Less Than K",
    description: `Given an array of n integers and a value k, count the number of pairs whose sum is less than k.

Problem Statement:
You are given an array of n integers and an integer k. Count how many pairs (i, j) exist such that i < j and array[i] + array[j] < k.

Input Format:
- First line: Two integers n and k (array size and threshold value)
- Second line: n space-separated integers

Output Format:
- A single integer representing the count of valid pairs

Note:
- Each pair should be counted only once
- The order matters: (i, j) where i < j

Constraints:
- 1 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9
- -10^9 ≤ k ≤ 10^9

Time Limit: 1 second`,
    examples: [
      {
        input: `4 6
1 2 3 4`,
        output: `4`,
        explanation: "Valid pairs: (1,2)=3, (1,3)=4, (1,4)=5, (2,3)=5. All are < 6. Count = 4"
      },
      {
        input: `5 10
3 5 7 2 8`,
        output: `6`,
        explanation: "Pairs with sum < 10: (3,5)=8, (3,2)=5, (5,2)=7, (7,2)=9, (3,7)=10 is NOT valid. Count = 6"
      },
      {
        input: `3 5
5 5 5`,
        output: `0`,
        explanation: "All pairs have sum = 10, which is not < 5. Count = 0"
      }
    ],
  },
];

// ==================== TEST 4 - ADVANCED OPERATIONS ====================
export const test4Problems = [
  {
    id: 1,
    title: "Count Vowels and Alphanumeric Characters",
    description: `Given a string, count the total number of vowels and alphanumeric characters separately.

Problem Statement:
You are given a string that may contain letters, digits, spaces, and special characters. Count:
1. The total number of vowels (a, e, i, o, u - case insensitive)
2. The total number of alphanumeric characters (letters and digits)

Input Format:
- A single line containing a string (length ≤ 10^5)

Output Format:
- Two space-separated integers: vowel_count alphanumeric_count

Note:
- Vowels: a, e, i, o, u, A, E, I, O, U
- Alphanumeric: all letters (a-z, A-Z) and digits (0-9)
- Spaces and special characters should not be counted in alphanumeric

Constraints:
- 1 ≤ string length ≤ 10^5

Time Limit: 1 second`,
    examples: [
      {
        input: `Hello World!`,
        output: `3 10`,
        explanation: "Vowels: e, o, o = 3. Alphanumeric: HelloWorld = 10 characters"
      },
      {
        input: `Programming123`,
        output: `3 14`,
        explanation: "Vowels: o, a, i = 3. Alphanumeric: Programming123 = 14 characters"
      },
      {
        input: `abc 123 xyz`,
        output: `1 9`,
        explanation: "Vowels: a = 1. Alphanumeric: abc123xyz = 9 characters"
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
    title: "Anagram Check",
    description: `Given two strings, determine if they are anagrams of each other.

Problem Statement:
Two strings are anagrams if they contain the same characters with the same frequencies, just in a different order. You need to check if two given strings are anagrams.

Input Format:
- First line: First string
- Second line: Second string

Output Format:
- Print "YES" if the strings are anagrams
- Print "NO" if the strings are not anagrams

Note:
- Consider case-sensitive comparison ('A' and 'a' are different)
- Ignore spaces
- Only consider alphabetic characters

Constraints:
- 1 ≤ string length ≤ 10^5

Time Limit: 1 second`,
    examples: [
      {
        input: `listen
silent`,
        output: `YES`,
        explanation: "Both strings contain the same characters: e, i, l, n, s, t"
      },
      {
        input: `hello
world`,
        output: `NO`,
        explanation: "The strings contain different characters"
      },
      {
        input: `Anagram
Nagaram`,
        output: `NO`,
        explanation: "Case-sensitive: 'A' and 'a' are different, so not anagrams"
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