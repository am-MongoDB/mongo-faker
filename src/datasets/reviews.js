module.exports = {
  genDocument
};

const { faker, en } = require('@faker-js/faker');

function genEmailFromName(first, last) {
  return `${first}.${last}@${faker.internet.domainName()}`;
}

function genDate() {
  return faker.date.past();
};

function genInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function genClass() {
  const classes = ['hotel', 'city', 'region', 'exhibition', 'attraction', 'restaurant', 'bar', 'cafe', 'park', 'beach', 'museum', 'theatre', 'cinema', 'shopping', 'nightlife'];
  return classes[Math.floor(Math.random() * classes.length)];
}

function genDocument(className, entityId) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  let doc = {
    class: className ? className : genClass(),
    entityId: entityId ? entityId : `${genInt(10000000, 90000000)}`,
    legacyId: `${genInt(10000000, 90000000)}`,
    date: genDate(),
    country: faker.location.country(),

    reviewer: {
      first: firstName,
      last: lastName,
      email: genEmailFromName(firstName, lastName),
      full: `${firstName} ${lastName}`
    },
    review: faker.lorem.paragraphs({ min: 1, max: 3 }),
    rating: genInt(1, 5),
    image: {
      url: faker.internet.url(),
      width: genInt(200, 2000),
      height: genInt(200, 2000),
      alt: faker.lorem.words({ min: 2, max: 5 })
    },
    tags: faker.lorem.words({ min: 3, max: 10 }).split(' ')
  };
  return doc;
};