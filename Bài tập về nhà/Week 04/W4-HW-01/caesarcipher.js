function rot13(str) {
  let decoded = "";

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (char >= 'A' && char <= 'Z') {
      let code = str.charCodeAt(i) - 65; 
      code = (code + 13) % 26; 
      decoded += String.fromCharCode(code + 65);
    } else {
      decoded += char;
    }
  }

  return decoded;
}

console.log(rot13("SERR PBQR PNZC"));   // "FREE CODE CAMP"
console.log(rot13("SERR CVMMN!"));      // "FREE PIZZA!"
console.log(rot13("SERR YBIR?"));       // "FREE LOVE?"
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));
// "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
