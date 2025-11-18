"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processPersonAndAnimal(entity) {
    return `${entity.name} ${entity.surname} is a ${entity.species}`;
}
function processPersonAndString(entity) { }
function processStringAndNumber(value) { }
function processPersonOrAnimal(entity) {
    if ("surname" in entity) {
        return `Person: ${entity.name} ${entity.surname}`;
    }
    else {
        return `Animal: ${entity.name} (${entity.species})`;
    }
}
function isPerson(entity) {
    return "surname" in entity;
}
function isAnimal(entity) {
    return "species" in entity;
}
function processPersonOrAnimalAlt(entity) {
    if (isPerson(entity)) {
        return `Person: ${entity.name} ${entity.surname}`;
    }
    else if (isAnimal(entity)) {
        return `Animal: ${entity.name} (${entity.species})`;
    }
    else {
        return "Unknown entity";
    }
}
function processPersonOrString(value) {
    if (typeof value === "string") {
        return `String value: ${value}`;
    }
    else {
        return `Person object: ${value.name} ${value.surname}`;
    }
}
function processStringOrNumber(value) {
    if (typeof value === "string") {
        return `String: ${value}`;
    }
    else {
        return `Number: ${value}`;
    }
}
