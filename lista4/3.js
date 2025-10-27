var Person = function (name, surname) {
  this.name = name;
  this.surname = surname;
};
Person.prototype.say = function () {
  return `${this.name} ${this.surname}`;
};

var Worker = function (name, surname, age) {
  Person.call(this, name, surname);
  this.age = age;
};
Worker.prototype = Object.create(Person.prototype);
Worker.prototype.say = function () {
  var _ = Person.prototype.say.call(this);
  return `${_} ${this.age}`;
};
