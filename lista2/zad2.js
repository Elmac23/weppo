// Przykłady wykorzystania operatorów . oraz [] dla obiektów
const human = {
  name: "Jakub Sternik",
  age: 21,
  "favourite color": "green",
};

console.log(human.name); // Jakub Sternik

console.log(human["favourite color"]); // green
const key = "age";
console.log(human[key]); // 21

const obj = {};
obj[1] = "one"; // '1'
console.log(obj[1]); // one
console.log(Object.keys(obj)); // ['1']

const keyObj = {
  toString() {
    return "k";
  },
};
obj[keyObj] = 42; // użyje klucza 'k'
console.log(obj.k); // 42

const arr = [10, 20, 30];

arr["1"] = 200;
console.log(arr[1]); // 200 (zastąpi 20)

arr["foo"] = "bar";
console.log(arr.foo); // bar
console.log(Object.keys(arr)); // ['0','1','2','foo']

const idxObj = {
  toString() {
    return "2";
  },
};
arr[idxObj] = 300; // ustawi arr[2]
console.log(arr[2]); // 300

arr.nonNumber = "x";
console.log(arr.nonNumber); // x

const a = [1, 2, 3, 4, 5];
console.log(a.length); // 5

a.length = 3;
console.log(a.length, a); // 3 [1,2,3]

a.length = 6;
console.log(a.length, a); // 6 [1,2,3, <3 empty items>]

a.someProp = "z";
console.log(a.length, a.someProp);
