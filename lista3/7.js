function* take(it, top) {
  for (let i = 0; i < top; i++) {
    const { value, done } = it.next();
    if (done) return;
    yield value;
  }
}

function fib() {
  let a = 0,
    b = 1;
  return {
    next() {
      const value = a;
      [a, b] = [b, a + b];
      return { value, done: false };
    },
  };
}

for (let num of take(fib(), 10)) {
  console.log(num);
}
