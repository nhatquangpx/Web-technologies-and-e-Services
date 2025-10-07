function palindrome(str) {
  let cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  let reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log(palindrome("racecar"));      // true
console.log(palindrome("RaceCar"));      // true
console.log(palindrome("race CAR"));     // true
console.log(palindrome("2A3*3a2"));      // true
console.log(palindrome("hello"));        // false
console.log(palindrome("No 'x' in Nixon")); // true
