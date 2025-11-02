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

var _it = fib();
for (var _result; (_result = _it.next()), !_result.done; ) {
  if (_result.value > 1000) break;
  console.log(_result.value);
}

console.log("-----");

for (var i of fibGen()) {
  console.log(i);
  if (i > 1000) break;
}
