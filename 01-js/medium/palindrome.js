/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isAlphabet(c) {
  return c >= "a" && c <= "z";
}

function isPalindrome(str) {
  str = str.toLowerCase();
  strWithOnlyChars = "";
  for (let i = 0; i < str.length; i++) {
    if (isAlphabet(str[i])) {
      strWithOnlyChars += str[i];
    }
  }
  // console.log(strWithOnlyChars);
  for (let i = 0; i < strWithOnlyChars.length / 2; i++) {
    if (
      strWithOnlyChars[i] != strWithOnlyChars[strWithOnlyChars.length - i - 1]
    ) {
      // console.log(i);
      return false;
    }
  }
  return true;
}
// console.log(isPalindrome("A man a plan a canal Panama"));
module.exports = isPalindrome;
