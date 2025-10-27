function fib(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;

  return fib(n - 1) + fib(n - 2);
}

const ans = {
  0: 1,
  1: 1,
};

function fib_cache(n) {
  if (Object.keys(ans).includes(n.toString())) {
    return ans[n];
  }

  const answer = fib_cache(n - 1) + fib_cache(n - 2);

  ans[n] = answer;

  return answer;
}

const t0 = performance.now();
fib(40);
const t1 = performance.now();
console.log("fib(40):", t1 - t0, "ms");

const t2 = performance.now();
fib_cache(40);
const t3 = performance.now();
console.log("fib(40):", t3 - t2, "ms");
