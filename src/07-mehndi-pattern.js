/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  if ( typeof char !== "string" || char.trim() === ""  || n <= 0) {
    return "";
  }
  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  return sumOfNestedArrayHelper(arr.flat(Infinity), 0, 0);
}

export function flattenArray(arr) {
  const result = [];
  MyflattenArray(arr, 0, result);
  return result;
}

export function isPalindrome(str) {
  if (typeof str !== "string") return false;
  if (str.length === 1) return true;

  return checkIsPalindrome(str.toLowerCase(), 0, str.length-1);
} 

export function generatePattern(n) {
  let result = [];
  if (!Number.isInteger(n)||n <= 0) return result;
   patternHelper(1, n, result);
   return result;
}

function sumOfNestedArrayHelper(arr, index, result) {
  // base
  if (arr.length === index) {
    return result;
  }

  if (Number.isInteger(arr[index])) {
    result += arr[index];
  }

  return sumOfNestedArrayHelper(arr, index + 1, result);
}

function MyflattenArray(arr, index, result) {
  // base conditions
  if (!Array.isArray(arr) || arr.length === index) return;

  const curr = arr[index];
   
  if (Array.isArray(curr)) {
    MyflattenArray(curr, 0, result);
  }else {
     result.push(curr);
  }
  MyflattenArray(arr, index + 1, result);
}


function checkIsPalindrome(str, st, ed) {
  // base case
  if (st > ed) {
    return true;
  }

  if (str.charAt(st) !== str.charAt(ed)) {
    return false;
  }

  return checkIsPalindrome(str, st+1, ed-1);
}



function patternHelper (st, ed, result) {
   if (st > ed) {
    return;
   }

   result.push(repeatChar('*', st));
  patternHelper(st+1, ed, result);
  let str = repeatChar('*', st-1);
  if (str.trim() !== "") {
    result.push(str);
  }
}

console.log(generatePattern(3));