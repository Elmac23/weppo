function pipe(xs, ...fns) {
  return fns.reduce((prevResult, fn) => fn(prevResult), xs);
}

function groupBy(selector) {
  return (arr) => {
    const groups = {};

    for (const el of arr) {
      const key = selector(el);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(el);
    }

    return Object.keys(groups).map((key) => {
      const group = groups[key];
      group.key = key; // dodanie właściwości key
      return group;
    });
  };
}

function sort(selector) {
  return (arr) =>
    [...arr].sort((a, b) => {
      const ka = selector(a);
      const kb = selector(b);

      if (ka < kb) return -1;
      if (ka > kb) return 1;
      return 0;
    });
}

const take = (n) => (arr) => arr.slice(0, n);
const map = (fn) => (arr) => arr.map(fn);

const result = pipe(
  [
    { ip: "192.168.0.1" },
    { ip: "192.168.0.1" },
    { ip: "192.168.0.2" },
    { ip: "192.168.0.2" },
    { ip: "192.168.0.3" },
    { ip: "192.168.0.17" },
    { ip: "192.168.0.1" },
  ],
  groupBy((e) => e.ip),
  sort((g) => -g.length),
  take(3),
  map((a) => ({ ip: a.key, count: a.length }))
);

console.log(result);
