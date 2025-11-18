type Person = {
  name: string;
  surname: string;
};

type Animal = {
  name: string;
  species: string;
};

type PersonAndAnimal = Person & Animal;

function processPersonAndAnimal(entity: PersonAndAnimal): string {
  return `${entity.name} ${entity.surname} is a ${entity.species}`;
}

type PersonAndString = Person & string;

function processPersonAndString(entity: PersonAndString): string {}

type StringAndNumber = string & number;

function processStringAndNumber(value: StringAndNumber): string {}

type PersonOrAnimal = Person | Animal;

function processPersonOrAnimal(entity: PersonOrAnimal): string {
  if ("surname" in entity) {
    return `Person: ${entity.name} ${entity.surname}`;
  } else {
    return `Animal: ${entity.name} (${entity.species})`;
  }
}

function isPerson(entity: PersonOrAnimal): entity is Person {
  return "surname" in entity;
}

function isAnimal(entity: PersonOrAnimal): entity is Animal {
  return "species" in entity;
}

function processPersonOrAnimalAlt(entity: PersonOrAnimal): string {
  if (isPerson(entity)) {
    return `Person: ${entity.name} ${entity.surname}`;
  } else if (isAnimal(entity)) {
    return `Animal: ${entity.name} (${entity.species})`;
  } else {
    return "Unknown entity";
  }
}

type PersonOrString = Person | string;

function processPersonOrString(value: PersonOrString): string {
  if (typeof value === "string") {
    return `String value: ${value}`;
  } else {
    return `Person object: ${value.name} ${value.surname}`;
  }
}

type StringOrNumber = string | number;

function processStringOrNumber(value: StringOrNumber): string {
  if (typeof value === "string") {
    return `String: ${value}`;
  } else {
    return `Number: ${value}`;
  }
}
