"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const people = [
    {
        name: "Jan Kowalski",
        age: 17,
        occupation: "Student",
    },
    {
        name: "Tomasz Malinowski",
        age: 20,
        role: "Administrator",
    },
];
function logPerson(person) {
    let additionalInformation;
    if ("role" in person) {
        additionalInformation = person.role;
    }
    else {
        additionalInformation = person.occupation;
    }
    console.log(`- ${person.name}, ${person.age}, ${additionalInformation}`);
}
people.forEach((p) => logPerson(p));
