function createGenerator(limit) {
  var _state = 0;
  return {
    next: function () {
      return {
        value: _state,
        done: _state++ >= limit,
      };
    },
  };
}

let foo1 = {
  [Symbol.iterator]: function () {
    return createGenerator(3);
  },
};

let foo2 = {
  [Symbol.iterator]: function () {
    return createGenerator(7);
  },
};

let foo3 = {
  [Symbol.iterator]: function () {
    return createGenerator(1);
  },
};

console.log("foo1:");
for (let f of foo1) console.log(f);

console.log("foo2:");
for (let f of foo2) console.log(f);

console.log("foo3:");
for (let f of foo3) console.log(f);
