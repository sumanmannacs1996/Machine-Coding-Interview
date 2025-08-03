// Palindrom Number/string
function isPalindrom(inp = "") {
  let str = inp.toString();
  let length = str.length - 1;
  for (let i = 0; i < Math.ceil(length / 2); i++) {
    if (str[i] !== str[length - i]) {
      return false;
    }
  }
  return true;
}

console.log("IisPalindrom", isPalindrom(12321));
console.log("IisPalindrom", isPalindrom("sumanamus"));

// fibonacci serease

function getNthFibonacci(n) {
  let arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 2] + arr[i - 1];
  }
  return arr[n];
}

function getNthFibonacciRec(n, cache = new Map()) {
  if (n <= 1) return n;
  if (cache.has(n)) return cache.get(n);
  return getNthFibonacciRec(n - 1, cache) + getNthFibonacciRec(n - 2, cache);
}

console.log("getNthFibonacci", getNthFibonacci(10));
console.log("getNthFibonacciRec", getNthFibonacciRec(10));

// valid anagram number

function isValidAnagram(inp) {
  let str = inp.toString();
  let map = new Map();
  for (let char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  for (let [key, value] of map) {
    if (value > 1 && value % 2 !== 0) return false;
  }
  return true;
}
console.log("isValidAnagram", isValidAnagram("anagram")); // false
console.log("isValidAnagram", isValidAnagram("civic")); // true
console.log("isValidAnagram", isValidAnagram("aabbccdde")); // true

/// two sum
// given an array of intigers nums and target
// return the indices of two numbers such that tey add up to target

function twoSum(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [-1, -1];
}

console.log(twoSum([2, 7, 11, 15], 18));

function twoSumOptmized(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length - 1; i++) {
    const requireNum = target - nums[i];
    if (map.has(requireNum)) {
      return [map.get(requireNum), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [-1, -1];
}

console.log(twoSumOptmized([2, 7, 11, 15], 18));

// Best Time to Buy and Sell Stocks
// You are given an array prices where prices[i] is the price of a given stock
// on the ith day.
// You want to maximize your profit by choosing a single day to buy one stock
// and choosing a different day in the future to sell that stock.
// Return the maximum profit, If you cannot achieve any profit, return 0.

function getMaxProfit(priceList) {
  let maxProfit = 0;
  for (let i = 0; i < priceList.length - 1; i++) {
    for (j = i + 1; j < priceList.length; j++) {
      const profit = priceList[j] - priceList[i];
      if (profit > maxProfit) maxProfit = profit;
    }
  }
  return maxProfit;
}
console.log("getMaxProfit", getMaxProfit([7, 1, 5, 3, 6, 4])); // 5

// solve using greedy
function getMaxProfitOptmized(priceList) {
  let minPrice = priceList[0];
  let maxProfit = 0;

  for (let i = 1; i < priceList.length; i++) {
    minPrice = Math.min(minPrice, priceList[i]);
    maxProfit = Math.max(maxProfit, priceList[i] - minPrice);
  }
  return maxProfit;
}
console.log("getMaxProfitOptmized", getMaxProfitOptmized([7, 1, 5, 3, 6, 4])); // 5

// get the 3rd largest number

function get3rdLargestNumber(numberList) {
  let first = numberList[0],
    second = null,
    third = null;
  for (let i = 1; i < numberList.length; i++) {
    if (numberList[i] > first) {
      third = second;
      second = first;
      first = numberList[i];
    }
    if (numberList[i] > second && numberList[i] < first) {
      third = second;
      second = numberList[i];
    }
    if (numberList[i] > third && numberList[i] < second) {
      third = numberList[i];
    }
  }
  return [first, second, third];
}

console.log(
  "get3rdLargestNumber",
  get3rdLargestNumber([4, 8, 2, 3, 9, 10, 21, 5, 6, 15, 11])
); // [21, 15, 11]
console.log(
  "get3rdLargestNumber",
  get3rdLargestNumber([3, 3, 3, 3, 3, 3, 3, 3])
); // [3, null, null]

//Rotate Array by K
// Given an integer array nums, rotate the array to the right by k steps,
// where k is non - negative.

// Input: nums = [1,2,3,4,5,6,7], k = 3
// Input: nums = [-1,-100,3,99], k =2

// Explaination -
// [1, 2, 3, 4, 5, 6, 7] => [7, 1, 2, 3, 4, 5, 6] => [ 6, 7, 1, 2, 3, 4, 5]=> [5,6,7,1,2,3,4]

function rotateArray(numberList, k) {
  const length = numberList.length;
  if (k === length) return numberList;
  if (length < k) {
    k = k % length;
  }
  /*
  const subAray = numberList.slice(length - k, length);
  const subAray2 = numberList.slice(0, length - k);
  return [...subAray, ...subAray2];
  */
  // alternative
  /*
  const rotate = numberList.splice(length - k, length);
  return [...rotate, ...numberList];
  */
  // anther alternative optimized

  function rotate(list, left, right) {
    while (left < right) {
      const temp = list[left];
      list[left++] = list[right];
      list[right--] = temp;
    }
    return list;
  }

  // first rotate entire array
  rotate(numberList, 0, length - 1);
  // rotate 0 to k part
  rotate(numberList, 0, k - 1);
  // rotate k to remaining
  rotate(numberList, k, length - 1);
  return numberList;
}

console.log("rotateArray", rotateArray([1, 2, 3, 4, 5, 6, 7], 10));

// Remove Duplicates from Sorted Array
// Given an integer array nums sorted in non-decreasing order, remove
// the duplicates in-place such that each unique element appears
// only once.The relative order of the elements should be kept
// the same. Then return the number of unique elements in nums.

// Input: [1,1,2] -> 2
// Input: [0,0,1,1,1,2,2,3,3,4,4] -> 5

function removeDuplicatedInplace(numList) {
  let curent = 0;
  for (let i = 1; i < numList.length; i++) {
    if (numList[curent] !== numList[i]) {
      numList[++curent] = numList[i];
    }
  }
  return curent + 1;
}

console.log("removeDuplicatedInplace", removeDuplicatedInplace([1, 1, 2])); // 2
console.log(
  "removeDuplicatedInplace",
  removeDuplicatedInplace([0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4])
); // 5
