function isOwnProperty(obj, prop) {
  return obj.hasOwnProperty(prop);
}

var p = {
  name: "jan",
};
var q = {
  surname: "kowalski",
};

Object.setPrototypeOf(p, q);

console.log(p.name);
console.log(p.surname);

console.log(isOwnProperty(p, "name"));
console.log(isOwnProperty(p, "surname"));

console.log("Pola własne obiektu p:");
for (let key of Object.keys(p)) {
  console.log(key);
}

console.log("Pola obiektu p + prototypów:");
for (let key in p) {
  console.log(key);
}
