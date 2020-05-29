const faker = require('faker');

const randomName = faker.name.findName(); // Rowan Nikolaus

const randomAddress = faker.address.streetAddress() + faker.address.secondaryAddress()
console.log({randomName, randomAddress})