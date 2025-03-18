module.exports = {
  genDocument
};

const { faker } = require('@faker-js/faker');

function genEmailFromName(first, last) {

  return `${first}.${last}@${faker.internet.domainName()}`;
}

function genDate() {
  return faker.date.past();
};

function genRefNumber(prefix, length) {
  return `${prefix}${Array.from({ length: length }, () => Math.floor(Math.random() * 10)).join('')}`
};

function genInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function genRoundInt(min, max, unit) {
  return genInt(min, max) * unit;
};

function genBoolean() {
  return Math.random() < 0.5;
};

function genOffence() {
  const offences = [
    "Speeding",
    "Driving without insurance",
    "Driving under the influence of alcohol",
    "Driving under the influence of drugs",
    "Using a mobile phone while driving",
    "Running a red light",
    "Careless driving",
    "Dangerous driving",
    "Driving without a valid license",
    "Failing to stop after an accident",
    "Driving a vehicle in a dangerous condition",
    "Driving without an MOT",
    "Parking in a restricted area",
    "Failing to wear a seatbelt",
    "Driving in a bus lane"
  ];
  return offences[Math.floor(Math.random() * offences.length)];
};

function genPastDate(earliestDate) {
  return faker.date.between({ from: earliestDate, to: new Date() });
}

genArrayOfConvictions = (maxElements, startDate) => {
  const numElements = 
    Math.random() < 0.5 ? 0 : Math.floor(Math.random() * maxElements);
  return Array.from({ length: numElements }, () => ({
    offence: genOffence(),
    date: genPastDate(startDate),
    points: genInt(1, 12),
    fine: genRoundInt(5, 500, 10)
  }));
};

function genArrayOfLetters(maxElements) {
  const numElements = Math.floor(Math.random() * maxElements) + 1;
  return  Array.from({ length: numElements }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
};

function genDrivingLicence(dob) {
  const startDate = faker.date.between({
    from: new Date(dob.getTime() + 17 * 365 * 24 * 60 * 60 * 1000), // 17 years
    to: new Date()
  });
  return {
    number: `DOE${genInt(1000000000, 9999999999)}`,
    issueDate: startDate,
    expiryDate: faker.date.future({ years: 20, refDate: new Date() }),
    categories: genArrayOfLetters(10)
  };
}

function genDateOfBirth() {
  return faker.date.between({ from: '1950-01-01T00:00:00.000Z', to: '2006-01-01T00:00:00.000Z' });
}

function genCars(maxElements) {
  const numElements = 
    Math.random() < 0.5 ? 1 : Math.floor(Math.random() * maxElements);
  return Array.from({ length: numElements }, () => ({
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: genInt(2000, 2025),
    registration: faker.vehicle.vrm(),
    vin: faker.vehicle.vin(),
    fuel: faker.vehicle.fuel(),
    color: faker.vehicle.color(),
    type: faker.vehicle.type(),
    taxExpires: faker.date.future()
  }));
}

const sampleDoc = 
  {
    "name": {
      "first": "John",
      "last": "Doe"
    },
    dateOfBirth: new Date("1980-05-15T00:00:00.000Z"),
    "address": {
      "street": "123 Oakwood Drive",
      "city": "London",
      "postcode": "SW1A 1AA",
      "country": "UK"
    },
    "drivingLicense": {
      "number": "DOE1234567890",
      "issueDate": Date("2015-06-20T00:00:00Z"),
      "expiryDate": Date("2025-06-20T00:00:00Z"),
      "categories": ["B", "BE", "C"]
    },
    "carsOwned": [
      {
        "make": "Ford",
        "model": "Fiesta",
        "year": 2018,
        "registration": "AB12 CDE"
      },
      {
        "make": "Tesla",
        "model": "Model 3",
        "year": 2022,
        "registration": "EF34 GHI"
      }
    ],
    "motoringConvictions": [
      {
        "offense": "Speeding",
        "date": Date("2021-03-15T00:00:00Z"),
        "points": 3,
        "fine": 100
      },
      {
        "offense": "Running a red light",
        "date": Date("2019-07-10T00:00:00Z"),
        "points": 3,
        "fine": 200
      }
    ]
};

function genNationality(mostCommon) {
  return Math.random() < 0.9 ? mostCommon : faker.location.country();
};

function removeEmptyFields(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      removeEmptyFields(obj[key]);
    } else if (Array.isArray(obj[key]) && obj[key].length === 0) {
      delete obj[key];
    } else if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

function genDocument() {
  const dob = genDateOfBirth();
  const drivingLicense = genDrivingLicence(dob);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  let doc = {
    ...sampleDoc,
    name: {
      first: firstName,
      last: lastName
    },
    dateOfBirth: dob,
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      postcode: faker.location.zipCode(),
      country: faker.location.country()
    },
    phone: faker.phone.number(),
    email: genEmailFromName(firstName, lastName),
    nationality: genNationality("United Kingdom"),
    jobTitle: faker.person.jobTitle(),
    drivingLicense: drivingLicense,
    carsOwned: genCars(5),
    motoringConvictions: genArrayOfConvictions(5, drivingLicense.issueDate),
  };

  return removeEmptyFields(doc);
};