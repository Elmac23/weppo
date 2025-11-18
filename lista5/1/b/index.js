import add from "./math.js";

const numbers = {
  a: 5,
  b: 3,
};

export { numbers };

import { resultFromMath } from "./math.js";

const result = add(5, 3);
console.log(`Wynik dodawania 5 i 3 to: ${result}`);

console.log(`Wynik z math.js to: ${resultFromMath()}`);
