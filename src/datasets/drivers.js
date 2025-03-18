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

const payload = `Two households, both alike in dignity,
In fair Verona, where we lay our scene,
From ancient grudge break to new mutiny,
Where civil blood makes civil hands unclean.
From forth the fatal loins of these two foes
A pair of star-cross'd lovers take their life;
Whose misadventured piteous overthrows
Do with their death bury their parents' strife.
The fearful passage of their death-mark'd love,
And the continuance of their parents' rage,
Which, but their children's end, nought could remove,
Is now the two hours' traffic of our stage;
The which if you with patient ears attend,
What here shall miss, our toil shall strive to mend.

[Enter SAMPSON and GREGORY, of the house of Capulet, armed with swords and bucklers]

SAMPSON
Gregory, o' my word, we'll not carry coals.

GREGORY
No, for then we should be colliers.

SAMPSON
I mean, an we be in choler, we'll draw.

GREGORY
Ay, while you live, draw your neck out of collar.

SAMPSON
I strike quickly, being moved.

GREGORY
But thou art not quickly moved to strike.

SAMPSON
A dog of the house of Montague moves me.

GREGORY
To move is to stir; and to be valiant is to stand: therefore, if thou art moved, thou runn'st away.

SAMPSON
A dog of that house shall move me to stand: I will take the wall of any man or maid of Montague's.

GREGORY
That shows thee a weak slave; for the weakest goes to the wall.

SAMPSON
True; and therefore women, being the weaker vessels, are ever thrust to the wall: therefore I will push Montague's men from the wall, and thrust his maids to the wall.

GREGORY
The quarrel is between our masters and us their men.

SAMPSON
'Tis all one, I will show myself a tyrant: when I have fought with the men, I will be cruel with the maids, and cut off their heads.

GREGORY
The heads of the maids?

SAMPSON
Ay, the heads of the maids, or their maidenheads; take it in what sense thou wilt.

GREGORY
They must take it in sense that feel it.

SAMPSON
Me they shall feel while I am able to stand: and 'tis known I am a pretty piece of flesh.

GREGORY
'Tis well thou art not fish; if thou hadst, thou hadst been poor John. Draw thy tool! here comes two of the house of the Montagues.

[Enter ABRAHAM and BALTHASAR]

SAMPSON
My naked weapon is out: quarrel, I will back thee.

GREGORY
How! turn thy back and run?

SAMPSON
Fear me not.

GREGORY
No, marry; I fear thee!

SAMPSON
Let us take the law of our sides; let them begin.

GREGORY
I will frown as I pass by, and let them take it as they list.

SAMPSON
Nay, as they dare. I will bite my thumb at them; which is a disgrace to them, if they bear it.

ABRAHAM
Do you bite your thumb at us, sir?

SAMPSON
I do bite my thumb, sir.

ABRAHAM
Do you bite your thumb at us, sir?

SAMPSON
[Aside to GREGORY] Is the law of our side, if I say ay?

GREGORY
No.

SAMPSON
No, sir, I do not bite my thumb at you, sir, but I bite my thumb, sir.

GREGORY
Do you quarrel, sir?

ABRAHAM
Quarrel sir! no, sir.

SAMPSON
If you do, sir, I am for you: I serve as good a man as you.

ABRAHAM
No better.

SAMPSON
Well, sir.

GREGORY
Say 'better:' here comes one of my master's kinsmen.

SAMPSON
Yes, better, sir.

ABRAHAM
You lie.

SAMPSON
Draw, if you be men. Gregory, remember thy swashing blow.

[They fight]

[Enter BENVOLIO]

BENVOLIO
Part, fools!
Put up your swords; you know not what you do.

[Beats down their swords]

[Enter TYBALT]

TYBALT
What, art thou drawn among these heartless hinds?
Turn thee, Benvolio, look upon thy death.

BENVOLIO
I do but keep the peace: put up thy sword,
Or manage it to part these men with me.

TYBALT
What, drawn, and talk of peace! I hate the word,
As I hate hell, all Montagues, and thee:
Have at thee, coward!

[They fight]

[Enter, several of both houses, who join the fray; then enter Citizens, with clubs]

First Citizen
Clubs, bills, and partisans! strike! beat them down!
Down with the Capulets! down with the Montagues!

[Enter CAPULET in his gown, and LADY CAPULET]

CAPULET
What noise is this? Give me my long sword, ho!

LADY CAPULET
A crutch, a crutch! why call you for a sword?

CAPULET
My sword, I say! Old Montague is come,
And flourishes his blade in spite of me.

[Enter MONTAGUE and LADY MONTAGUE]

MONTAGUE
Thou villain Capulet,--Hold me not, let me go.

LADY MONTAGUE
Thou shalt not stir one foot to seek a foe.

[Enter PRINCE, with Attendants]

PRINCE
Rebellious subjects, enemies to peace,
Profaners of this neighbour-stained steel,--
Will they not hear? What, ho! you men, you beasts,
That quench the fire of your pernicious rage
With purple fountains issuing from your veins,
On pain of torture, from those bloody hands
Throw your mistemper'd weapons to the ground,
And hear the sentence of your moved prince.
Three civil brawls, bred of an airy word,
By thee, old Capulet, and Montague,
Have thrice disturb'd the quiet of our streets,
And made Verona's ancient citizens
Cast by their grave beseeming ornaments,
To wield old partisans, in hands as old,
Canker'd with peace, to part your canker'd hate:
If ever you disturb our streets again,
Your lives shall pay the forfeit of the peace.
For this time, all the rest depart away:
You Capulet; shall go along with me:
And, Montague, come you this afternoon,
To know our further pleasure in this case,
To old Free-town, our common judgment-place.
Once more, on pain of death, all men depart.

[Exeunt all but MONTAGUE, LADY MONTAGUE, and BENVOLIO]`;

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
    payload: payload
  };

  return removeEmptyFields(doc);
};