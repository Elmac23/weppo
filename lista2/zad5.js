const person = {
  name: "Ala",
  greet() {
    return "hi " + this.name;
  },
  _age: 30,
  get age() {
    return this._age;
  },
  set age(v) {
    this._age = v;
  },
};

console.log(person.name); // Ala
console.log(person.greet()); // hi Ala
console.log(person.age); // 30

person.city = "Warsaw";
person.sayCity = function () {
  return this.city;
};
console.log(person.city);
console.log(person.sayCity());

Object.defineProperty(person, "yearOfBirth", {
  get() {
    return new Date().getFullYear() - this._age;
  },
  set(y) {
    this._age = new Date().getFullYear() - y;
  },
  enumerable: true,
  configurable: true,
});

console.log(person.yearOfBirth);
person.yearOfBirth = 2000;
console.log(person.age);

Object.defineProperty(person, "country", {
  value: "PL",
  writable: true,
  enumerable: true,
  configurable: true,
});
console.log(person.country);
