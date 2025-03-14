module.exports = {
  genDocument
};

const { faker } = require('@faker-js/faker');

const sampleFields = [
  { key: "firstNames", values: Array.from({ length: 1000 }, () => faker.person.firstName()) },
  { key: "lastNames", values: Array.from({ length: 1000 }, () => faker.person.lastName()) },
  { key: "dates", values: Array.from({ length: 1000 }, () => faker.date.past()) },
  { key: "cities", values: Array.from({ length: 1000 }, () => faker.location.city()) },
  { key: "states", values: Array.from({ length: 1000 }, () => faker.location.state()) },
  { key: "zipCodes", values: Array.from({ length: 1000 }, () => faker.location.zipCode()) },
  { key: "streets", values: Array.from({ length: 1000 }, () => faker.location.streetAddress()) },
  { key: "phoneNumbers", values: Array.from({ length: 1000 }, () => faker.phone.number) },
  { key: "domains", values: Array.from({ length: 1000 }, () => faker.internet.domainName()) },
  { key: "policyTypes", values: ['Auto Insurance', 'Home Insurance', 'Life Insurance'] },
  { key: "providers", values: Array.from({ length: 1000 }, () => faker.company.name) },
  { key: "coverageTypes", values: ['Liability', 'Collision', 'Comprehensive'] },
  { key: "emails", values: Array.from({ length: 1000 }, () => faker.internet.email()) },
  { key: "descriptions", values: Array.from({ length: 1000 }, () => faker.lorem.sentence()) },
  { key: "urls", values: Array.from({ length: 1000 }, () => faker.internet.url()) },
  { key: "statuses", values: ['Pending', 'Under Review', 'Approved', 'Denied'] },
  { key: "willingToTestify", values: [true, false] }
];

function getValue(key) {
  const field = sampleFields.find(f => f.key === key);
    return field && field.values ? field.values[Math.floor(Math.random() * field.values.length)]: `No values found for ${key}`;
};

function genEmailFromName(first, last) {
  const domain = getValue("domains");
  return `${first}.${last}@${domain}`;
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

const sampleDoc = {
  "region": 27,
  "policy_holder": {
    "first_name": "John",
    "last_name": "Doe",
    "dob": {
      "$date": "1980-05-15T00:00:00.000Z"
    },
    "location": {
      "street": "123 Main St",
      "city": "Los Angeles",
      "state": "CA",
      "zip_code": "90001"
    },
    "contact": {
      "phone": "+1-555-123-4567",
      "email": "johndoe@email.com"
    }
  },
  "policy_details": {
    "policy_number": "POL987654321",
    "type": "Auto Insurance",
    "provider": "ABC Insurance Co.",
    "coverage": {
      "liability": 50000,
      "collision": 10000,
      "comprehensive": 5000
    }
  },
  "incident_details": {
    "date": "2025-02-15",
    "time": "14:30",
    "location": {
      "street": "456 Elm St",
      "city": "Los Angeles",
      "state": "CA",
      "zip_code": "90002"
    },
    "description": "Rear-end collision at traffic light.",
    "police_report": {
      "report_number": "LAPD20250215001",
      "officer_name": "Officer Smith",
      "contact_number": "+1-555-987-6543"
    }
  },
  "claim": {
    "status": "Denied",
    "amount": 19339
  },
  "witnesses": [
    {
      "name": "Alice Johnson",
      "contact_number": "+1-555-345-6789",
      "email": "alice@acme.com",
      "willing_to_testify": false
    },
    {
      "name": "Bob Brown",
      "contact_number": "+1-555-456-7890",
      "email": "bob@acme.com",
      "willing_to_testify": false
    }
  ],
  "documents": [
    {
      "type": "Accident Photos",
      "url": "https://insuranceco.com/uploads/claim123/photos.zip"
    },
    {
      "type": "Repair Estimate",
      "url": "https://insuranceco.com/uploads/claim123/estimate.pdf"
    }
  ],
  "adjuster": {
    "name": "Jane Smith",
    "contact_number": "+1-555-234-5678",
    "email": "janesmith@insuranceco.com"
  },
  "last_updated": {
    "$date": "2025-03-05T16:29:30.263Z"
  },
  "message_body": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<InsuranceClaim>\n    <ClaimID>CLM123456789</ClaimID>\n    <PolicyHolder>\n        <FirstName>John</FirstName>\n        <LastName>Doe</LastName>\n        <DOB>1980-05-15</DOB>\n        <Address>\n            <Street>123 Main St</Street>\n            <City>Los Angeles</City>\n            <State>CA</State>\n            <ZipCode>90001</ZipCode>\n        </Address>\n        <Contact>\n            <Phone>+1-555-123-4567</Phone>\n            <Email>johndoe@email.com</Email>\n        </Contact>\n    </PolicyHolder>\n    <PolicyDetails>\n        <PolicyNumber>POL987654321</PolicyNumber>\n        <Type>Auto Insurance</Type>\n        <Provider>ABC Insurance Co.</Provider>\n        <Coverage>\n            <Liability>50000</Liability>\n            <Collision>10000</Collision>\n            <Comprehensive>5000</Comprehensive>\n        </Coverage>\n    </PolicyDetails>\n    <IncidentDetails>\n        <Date>2025-02-15</Date>\n        <Time>14:30</Time>\n        <Location>\n            <Street>456 Elm St</Street>\n            <City>Los Angeles</City>\n            <State>CA</State>\n            <ZipCode>90002</ZipCode>\n        </Location>\n        <Description>Rear-end collision at traffic light.</Description>\n        <PoliceReport>\n            <ReportNumber>LAPD20250215001</ReportNumber>\n            <OfficerName>Officer Smith</OfficerName>\n            <ContactNumber>+1-555-987-6543</ContactNumber>\n        </PoliceReport>\n    </IncidentDetails>\n    <ClaimStatus>Under Review</ClaimStatus>\n    <ClaimAmount>8000</ClaimAmount>\n    <Documents>\n        <Document>\n            <Type>Accident Photos</Type>\n            <URL>https://insuranceco.com/uploads/claim123/photos.zip</URL>\n        </Document>\n        <Document>\n            <Type>Repair Estimate</Type>\n            <URL>https://insuranceco.com/uploads/claim123/estimate.pdf</URL>\n        </Document>\n    </Documents>\n    <Adjuster>\n        <Name>Jane Smith</Name>\n        <ContactNumber>+1-555-234-5678</ContactNumber>\n        <Email>janesmith@insuranceco.com</Email>\n    </Adjuster>\n    <LastUpdated>2025-02-20T10:00:00Z</LastUpdated>\n</InsuranceClaim>"
};

function genDocument() {
  const firstName = getValue("firstNames");
  const lastName = getValue("lastNames");
  const email = genEmailFromName(firstName, lastName);
  return {
    ...sampleDoc,
    region: genInt(1, 50),
    policy_holder: {
      first_name: firstName,
      last_name: lastName,
      dob: genDate(),
      location: {
        street: getValue("streets"),
        city: getValue("cities"),
        state: getValue("states"),
        zip_code: getValue("zipCodes")
      },
      contact: {
        phone: getValue("phoneNumbers"),
        email: email
      }
    },
    policy_details: {
      policy_number: genRefNumber("POL", 9),
      type: getValue("policyTypes"),
      provider: getValue("providers"),
      coverage: {
        liability: genRoundInt(1, 1000, 1000000),
        collision: genRoundInt(10, 1000, 1000),
        comprehensive: genRoundInt(1, 1000, 1000),
      }
    },
    incident_details: {
      date: genDate(),
      time: `${genInt(0, 23)}:${genInt(0, 59)}`,
      location: {
        street: getValue("streets"),
        city: getValue("cities"),
        state: getValue("states"),
        zip_code: getValue("zipCodes")
      },
      description: getValue("descriptions"),
      police_report: {
        report_number: genRefNumber("PD", 12),
        officer_name: getValue("lastNames"),
        contact_number: getValue("phoneNumbers")
      }
    },
    claim: {
      status: getValue("statuses"),
      amount: genInt(1000, 100000)
    },
    witnesses: Array.from({ length: 2 }, () => ({
      name: `${getValue("firstNames")} ${getValue("lastNames")}`,
      contact_number: getValue("phoneNumbers"),
      email: getValue("emails"),
      willing_to_testify: genBoolean()
    })),
    documents: Array.from({ length: 2 }, () => ({
      type: getValue("descriptions"),
      url: getValue("urls")
    })),
    adjuster: {
      name: `${getValue("firstNames")} ${getValue("lastNames")}`,
      contact_number: getValue("phoneNumbers"),
      email: getValue("emails")
    },
    last_updated: genDate()
  }
};