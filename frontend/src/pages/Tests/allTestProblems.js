// Test 1 - Fundamentals (your existing test)
export const test1Problems = [
    {
      id: 1,
      title: "Sunlight for the Plants (Prefix Sum)",
      description: `In a long garden, each plant receives some amount of sunlight every day.
  You are given an array where each value represents sunlight received by a plant.
  
  The gardener asks Q queries.
  Each query gives a range [L, R].
  For each query, find the total sunlight received by plants from L to R.
  
  Use an efficient approach.`,
      examples: [
        {
          input: "arr = [3, 1, 4, 2, 5], Q = 2, queries = [[1, 3], [0, 4]]",
          output: "[8, 15]",
        },
      ],
    },
    {
      id: 2,
      title: "Array Manipulation",
      description: "Second problem for test 1...",
      examples: [],
    },
    {
      id: 3,
      title: "Basic Algorithm",
      description: "Third problem for test 1...",
      examples: [],
    },
  ];
  
  // Test 2 - Core DS&A
  export const test2Problems = [
    {
      id: 1,
      title: "Binary Search - Find Peak Element",
      description: `A peak element is an element that is strictly greater than its neighbors.
  Given a 0-indexed integer array nums, find a peak element, and return its index.
  If the array contains multiple peaks, return the index to any of the peaks.
  
  You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always 
  considered to be strictly greater than a neighbor that is outside the array.
  
  You must write an algorithm that runs in O(log n) time.`,
      examples: [
        {
          input: "nums = [1,2,3,1]",
          output: "2",
          explanation: "3 is a peak element and your function should return index 2.",
        },
        {
          input: "nums = [1,2,1,3,5,6,4]",
          output: "5",
          explanation: "Your function can return either index 1 (peak is 2) or index 5 (peak is 6).",
        },
      ],
    },
    {
      id: 2,
      title: "Linked List - Reverse in Groups",
      description: `Given the head of a linked list, reverse the nodes of the list k at a time, 
  and return the modified list.
  
  k is a positive integer and is less than or equal to the length of the linked list. 
  If the number of nodes is not a multiple of k then left-out nodes, in the end, should 
  remain as it is.
  
  You may not alter the values in the list's nodes, only nodes themselves may be changed.`,
      examples: [
        {
          input: "head = [1,2,3,4,5], k = 2",
          output: "[2,1,4,3,5]",
        },
        {
          input: "head = [1,2,3,4,5], k = 3",
          output: "[3,2,1,4,5]",
        },
      ],
    },
    {
      id: 3,
      title: "Dynamic Programming - Coin Change",
      description: `You are given an integer array coins representing coins of different 
  denominations and an integer amount representing a total amount of money.
  
  Return the fewest number of coins that you need to make up that amount. 
  If that amount of money cannot be made up by any combination of the coins, return -1.
  
  You may assume that you have an infinite number of each kind of coin.`,
      examples: [
        {
          input: "coins = [1,2,5], amount = 11",
          output: "3",
          explanation: "11 = 5 + 5 + 1",
        },
        {
          input: "coins = [2], amount = 3",
          output: "-1",
        },
      ],
    },
  ];
  
  // Test 3 - Advanced Structures
  export const test3Problems = [
    {
      id: 1,
      title: "Two Pointers - Container With Most Water",
      description: `You are given an integer array height of length n. There are n vertical 
  lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
  
  Find two lines that together with the x-axis form a container, such that the container 
  contains the most water.
  
  Return the maximum amount of water a container can store.`,
      examples: [
        {
          input: "height = [1,8,6,2,5,4,8,3,7]",
          output: "49",
          explanation: "The max area is between index 1 and 8: min(8,7) * (8-1) = 49",
        },
      ],
    },
    {
      id: 2,
      title: "Tree - Lowest Common Ancestor",
      description: `Given a binary tree, find the lowest common ancestor (LCA) of two given 
  nodes in the tree.
  
  The lowest common ancestor is defined as the lowest node in the tree that has both nodes 
  as descendants (where we allow a node to be a descendant of itself).`,
      examples: [
        {
          input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
          output: "3",
          explanation: "The LCA of nodes 5 and 1 is 3.",
        },
      ],
    },
    {
      id: 3,
      title: "Graph - Number of Islands",
      description: `Given an m x n 2D binary grid which represents a map of '1's (land) and 
  '0's (water), return the number of islands.
  
  An island is surrounded by water and is formed by connecting adjacent lands horizontally 
  or vertically. You may assume all four edges of the grid are all surrounded by water.`,
      examples: [
        {
          input: `grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]`,
          output: "3",
        },
      ],
    },
  ];
  
  // Test 4 - Problem Solving
  export const test4Problems = [
    {
      id: 1,
      title: "Array - Product of Array Except Self",
      description: `Given an integer array nums, return an array answer such that answer[i] 
  is equal to the product of all the elements of nums except nums[i].
  
  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
  
  You must write an algorithm that runs in O(n) time and without using the division operation.`,
      examples: [
        {
          input: "nums = [1,2,3,4]",
          output: "[24,12,8,6]",
        },
        {
          input: "nums = [-1,1,0,-3,3]",
          output: "[0,0,9,0,0]",
        },
      ],
    },
    {
      id: 2,
      title: "String - Longest Palindromic Substring",
      description: `Given a string s, return the longest palindromic substring in s.
  
  A palindrome is a string that reads the same forward and backward.`,
      examples: [
        {
          input: 's = "babad"',
          output: '"bab"',
          explanation: '"aba" is also a valid answer.',
        },
        {
          input: 's = "cbbd"',
          output: '"bb"',
        },
      ],
    },
    {
      id: 3,
      title: "Backtracking - N-Queens",
      description: `The n-queens puzzle is the problem of placing n queens on an n x n chessboard 
  such that no two queens attack each other.
  
  Given an integer n, return all distinct solutions to the n-queens puzzle. You may return 
  the answer in any order.
  
  Each solution contains a distinct board configuration of the n-queens' placement, where 
  'Q' and '.' both indicate a queen and an empty space, respectively.`,
      examples: [
        {
          input: "n = 4",
          output: `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`,
        },
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