function fib() {
  let a = 0,
    b = 1;
  return {
    next: function () {
      const value = a;
      [a, b] = [b, a + b];
      return {
        value: value,
        done: false,
      };
    },
  };
}

function* fibGen() {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

for (var i of fibGen()) {
  console.log(i);
  if (i > 1000) break;
}
