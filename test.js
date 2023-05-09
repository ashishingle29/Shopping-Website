// // // 153. Find Minimum in Rotated Sorted Array
// // // Medium

// // // 10428

// // // 476

// // // Add to List

// // // Share
// // // Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

// // // [4,5,6,7,0,1,2] if it was rotated 4 times.
// // // [0,1,2,4,5,6,7] if it was rotated 7 times.
// // // Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

// // // Given the sorted rotated array nums of unique elements, return the minimum element of this array.

// // // You must write an algorithm that runs in O(log n) time.

 

// // // Example 1:

// // // Input: nums = [3,4,5,1,2]
// // // Output: 1
// // // Explanation: The original array was [1,2,3,4,5] rotated 3 times.
// // // Example 2:

// // // Input: nums = [4,5,6,7,0,1,2]
// // // Output: 0
// // // Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
// // // Example 3:

// // // Input: nums = [11,13,15,17]
// // // Output: 11
// // // Explanation: The original array was [11,13,15,17] and it was rotated 4 times.

// // // solve this question with time complexity O(log n)

// // // solution 1
// // var findMin = function(nums) {
// //     let left = 0;
// //     let right = nums.length - 1;
// //     while (left < right) {
// //         let mid = Math.floor((left + right) / 2);
// //         if (nums[mid] > nums[right]) {
// //             left = mid + 1;
// //         } else {
// //             right = mid;
// //         }
// //     }
// //     return nums[left];
// // };
// // // timecomplexity of solution 1 is O(log n)

// // // solution 2
// // var findMin = function (nums) {
// //     let left = 0;
// //     let right = nums.length - 1;
// //     if (nums[left] < nums[right]) return nums[left];
// //     while (left < right) {
// //         let mid = Math.floor((left + right) / 2);
// //         if (nums[mid] < nums[right]) {
// //             right = mid;
// //         } else {
// //             left = mid + 1;
// //         }
// //     }
// //     return nums[left];
// // }

// // // solution 3
// // var findMin = function (nums) {
// //     let left = 0;
// //     let right = nums.length - 1;
// //     if (nums[left] < nums[right]) return nums[left];
// //     while (left < right) {
// //         let mid = Math.floor((left + right) / 2);
// //         if (nums[mid] < nums[right]) {
// //             right = mid;
// //         } else if (nums[mid] > nums[right]) {
// //             left = mid + 1;
// //         } else {
// //             right--;
// //         }
// //     }
// //     return nums[left];
// // }

// // // solution 4

// // var findMin = function (nums) {
// //     let left = 0;
// //     let right = nums.length - 1;
// //     if (nums[left] < nums[right]) return nums[left];
// //     while (left < right) {
// //         let mid = Math.floor((left + right) / 2);
// //         if (nums[mid] < nums[right]) {
// //             right = mid;
// //         } else if (nums[mid] > nums[right]) {
// //             left = mid + 1;
// //         } else {
// //             right--;
// //         }
// //     }
// //     return nums[left];
// // }

// // // time complexity O(log n)



// // another question

// // 16. 3Sum Closest
// // Medium

// // 9100

// // 477

// // Add to List

// // Share
// // Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

// // Return the sum of the three integers.

// // You may assume that each input would have exactly one solution.



// //   Example 1:

// // Input: nums = [-1, 2, 1, -4], target = 1
// // Output: 2
// // Explanation: The sum that is closest to the target is 2.(-1 + 2 + 1 = 2).
// //   Example 2:

// // Input: nums = [0, 0, 0], target = 1
// // Output: 0
// // Explanation: The sum that is closest to the target is 0.(0 + 0 + 0 = 0).



// // solution of this question no 16

// // var threeSumClosest = function (nums, target) {
// //   nums.sort((a, b) => a - b);
// //   let closest = Infinity;
// //   for (let i = 0; i < nums.length - 2; i++) {
// //     let left = i + 1;
// //     let right = nums.length - 1;
// //     while (left < right) {
// //       let sum = nums[i] + nums[left] + nums[right];
// //       if (Math.abs(target - sum) < Math.abs(target - closest)) {
// //         closest = sum;
// //       }
// //       if (sum > target) {
// //         right--;
// //       } else {
// //         left++;
// //       }
// //     }
// //   }
// //   return closest;
// // };

// // // time complexity O(n^2)



// // // other solution

// // var threeSumClosest = function (nums, target) {
// //   nums.sort((a, b) => a - b);
// //   let closest = Infinity;
// //   for (let i = 0; i < nums.length - 2; i++) {
// //     let left = i + 1;
// //     let right = nums.length - 1;

// //     while (left < right) {
// //       let sum = nums[i] + nums[left] + nums[right];
// //       if (Math.abs(target - sum) < Math.abs(target - closest)) {
// //         closest = sum;
// //       }
// //       if (sum > target) {
// //         right--;
// //       } else {
// //         left++;
// //       }
// //     }
// //   }
// //   return closest;
// // }

// // // time complexity O(n^2)


// // 18. 4Sum
// // Medium

// // 9203

// // 1086

// // Add to List

// // Share
// // Given an array nums of n integers, return an array of all the unique quadruplets[nums[a], nums[b], nums[c], nums[d]] such that:

// // 0 <= a, b, c, d < n
// // a, b, c, and d are distinct.
// //   nums[a] + nums[b] + nums[c] + nums[d] == target
// // You may return the answer in any order.



// //   Example 1:

// // Input: nums = [1, 0, -1, 0, -2, 2], target = 0
// // Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
// // Example 2:

// // Input: nums = [2, 2, 2, 2, 2], target = 8
// // Output: [[2, 2, 2, 2]]


// // solution of this question no 18

// var fourSum = function (nums, target) {
//   nums.sort((a, b) => a - b);
//   let result = [];
//   for (let i = 0; i < nums.length - 3; i++) {
//     if (i > 0 && nums[i] === nums[i - 1]) continue;
//     for (let j = i + 1; j < nums.length - 2; j++) {
//       if (j > i + 1 && nums[j] === nums[j - 1]) continue;
//       let left = j + 1;
//       let right = nums.length - 1;
//       while (left < right) {
//         let sum = nums[i] + nums[j] + nums[left] + nums[right];
//         if (sum === target) {
//           result.push([nums[i], nums[j], nums[left], nums[right]]);
//           while (left < right && nums[left] === nums[left + 1]) left++;
//           while (left < right && nums[right] === nums[right - 1]) right--;
//           left++;
//           right--;
//         } else if (sum < target) {
//           left++;
//         } else {
//           right--;
//         }
//       }
//     }
//   }
//   return result;
// };

// // // time complexity O(n^3)




// 39. Combination Sum
// Medium

// 15833

// 316

// Add to List

// Share
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times.Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.



//   Example 1:

// Input: candidates = [2, 3, 6, 7], target = 7
// Output: [[2, 2, 3], [7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.
//   Example 2:

// Input: candidates = [2, 3, 5], target = 8
// Output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
// Example 3:

// Input: candidates = [2], target = 1
// Output: []

// solution of this question no 39

// var combinationSum = function (candidates, target) {
//   let result = [];
//   let dfs = (remain, path, start) => {
//     if (remain < 0) return;
//     if (remain === 0) {
//       result.push(path);
//       return;
//     }
//     for (let i = start; i < candidates.length; i++) {
//       dfs(remain - candidates[i], [...path, candidates[i]], i);
//     }
//   }
//   dfs(target, [], 0);
//   return result;
// };


// another solution

var combinationSum = function (candidates, target) {
  let result = [];
  let dfs = (remain, path, start) => {
    if (remain < 0) return;
    if (remain === 0) {
      result.push([...path]);
      return;
    }
    console.log(start)
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(remain - candidates[i], path, i);
      path.pop();
    }
  }
  dfs(target, [], 0);
  return result;
}

combinationSum([2, 3, 5], 8)