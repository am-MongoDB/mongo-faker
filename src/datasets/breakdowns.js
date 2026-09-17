module.exports = {
  genDocument
};

const { Faker } = require('@faker-js/faker');

const faker = new Faker({
  locale: ['en_GB']
});

function genDate() {
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  return faker.date.between({ from: tenYearsAgo, to: new Date() });
};

function genInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function genCarRegistration() {
  return faker.vehicle.vrm();
}

function genVIN() {
  return faker.vehicle.vin();
}

function genBreakdownId() {
  return `BD${genInt(10000000, 99999999)}-${genInt(10000000, 99999999)}`;
}

function genIssue() {
  const issues = ['puncture', 'DPF', 'fuel', 'engine', 'suspension', 'brakes', 'transmission', 'electrical', 'exhaust', 'clutch', 'battery', 'cooling', 'ignition', 'tyres', 'windows', 'locks', 'mirrors', 'wipers', 'lights', 'other', 'unknown'];
  return issues[Math.floor(Math.random() * issues.length)];
}

function genBreakdown(numBreakdowns) {
  const breakdowns = [];
  for (let i = 0; i < numBreakdowns; i++) {
    breakdowns.unshift({
      id: genBreakdownId(),
      date: genDate(),
      issue: genIssue()
    });
  }
  return breakdowns.sort((first, second) => first.date - second.date);
}


function genDocument() {
  let doc = {
    _id: genVIN(),
    registration: genCarRegistration(),
    breakdowns: genBreakdown(genInt(0, 30))
  };
  return doc;
};