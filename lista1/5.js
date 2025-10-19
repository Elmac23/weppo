function reccFib(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;

  return reccFib(n - 1) + reccFib(n - 2);
}

function loopFib(nthNumber) {
  let previouspreviousNumber,
    previousNumber = 1,
    currentNumber = 1;

  for (let i = 1; i < nthNumber; i++) {
    previouspreviousNumber = previousNumber;

    previousNumber = currentNumber;

    currentNumber = previouspreviousNumber + previousNumber;
  }
  return currentNumber;
}

const result = [];

for (let i = 10; i < 45; i++) {
  const startLoop = performance.now();
  loopFib(i);
  const endLoop = performance.now();
  const loopTime = endLoop - startLoop;

  const startRecc = performance.now();
  reccFib(i);
  const endRecc = performance.now();
  const reccTime = endRecc - startRecc;

  result.push({
    i,
    "ITERATION TIME": loopTime + "ms",
    "RECCURSION TIME": reccTime + "ms",
  });
}

console.table(result);
