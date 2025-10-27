function getLastProto(obj) {
  let proto = Object.getPrototypeOf(obj);
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return proto;
}

const obj1 = {};
const obj2 = { a: 10 };
const arr = [];
const date = new Date();
const func = function () {};

const p1 = getLastProto(obj1);
const p2 = getLastProto(obj2);
const p3 = getLastProto(arr);
const p4 = getLastProto(date);
const p5 = getLastProto(func);

console.log("obj1 === obj2 ?", p1 === p2);
console.log("obj1 === arr ?", p1 === p3);
console.log("obj1 === date ?", p1 === p4);
console.log("obj1 === func ?", p1 === p5);

console.log("Is Object.prototype:", p1 === Object.prototype);
