function fibbonacci(n: number): number {
  if (n < 0) {
    throw new Error("Fibonacci is not defined for negative numbers");
  }
  if (n <= 1) {
    return n;
  }
  return fibbonacci(n - 1) + fibbonacci(n - 2);
}

type NumberFunction = (n: number) => number;

function memoize(fn: NumberFunction): NumberFunction {
  const cache = new Map<number, number>();

  return (n: number): number => {
    if (cache.has(n)) {
      return cache.get(n)!;
    }

    const result = fn(n);
    cache.set(n, result);
    return result;
  };
}

const fibonacci_memo = memoize((n: number): number => {
  if (n < 0) {
    throw new Error("Fibonacci is not defined for negative numbers");
  }
  if (n <= 1) {
    return n;
  }
  return fibonacci_memo(n - 1) + fibonacci_memo(n - 2);
});

console.log(fibonacci_memo(100));
