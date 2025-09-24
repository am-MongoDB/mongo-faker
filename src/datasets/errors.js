const { faker, base } = require('@faker-js/faker');
const { ObjectId } = require('mongodb');

module.exports = { genDocument };

function genInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function genHttpMethod() {
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"];
  return methods[Math.floor(Math.random() * methods.length)];
}

function genMongoDBObjectId() {
  return new ObjectId();
}

function getHttpStatusCode() {
  const codes = [200, 201, 202, 204, 301, 302, 400, 401, 403, 404, 500, 502, 503];
  return codes[Math.floor(Math.random() * codes.length)];
}

function getOrigin() {
  const origins = ["web", "mobile", "api", "partner"];
  return origins[Math.floor(Math.random() * origins.length)];
}

getTopic = () => {
  const topics = ["retryTopic1", "retryTopic2", "retryTopic3", "retryTopic4"];
  return topics[Math.floor(Math.random() * topics.length)];
}

getSubjectName = () => {
  const subjects = ["SubjectA", "SubjectB", "SubjectC", "SubjectD"];
  return subjects[Math.floor(Math.random() * subjects.length)];
}

getError = () => {
  const errors = ["No error", "Timeout error", "Connection error", "Validation error"];
  return errors[Math.floor(Math.random() * errors.length)];
}

getDlt = () => {
  const dlts = ["dlq", "dlt1", "dlt2"];
  return dlts[Math.floor(Math.random() * dlts.length)];
}

genKey = () => {
  return faker.string.alphanumeric(10);
}

genBaseURLs = (count) => {
  const urls = [];
  for (let i = 0; i < count; i++) {
    urls.push(faker.internet.url());
  }
  return urls;
}

pickURLFromList = (urls) => {
  return urls[Math.floor(Math.random() * urls.length)];
}

genURL = (baseUrl) => {
  return `${baseUrl}?${faker.string.alphanumeric(5)}`;
}

const payload = "{\n  \"key1\": \"value1\",\n  \"key2\": \"value2\",\n  \"key3\": \"value3\"\n}"; 

let urls = null

function genDocument() {
  const id = genMongoDBObjectId();
  if (!urls) urls = genBaseURLs(200);
  const baseUrl = pickURLFromList(urls);
  return {
    _id: id,  
    failedMessageId: id,
    dlt: getDlt(),
    messageKey: genKey(),
    messageOffset: genInt(1, 100),
    partitionKey: genInt(0, 9),
    method: genHttpMethod(),
    statusCode: getHttpStatusCode(),
    requestUrl: genURL(baseUrl),
    requestBaseUrl: baseUrl,
    origin: getOrigin(),
    originalBody: payload,
    errorMessage: getError(),
    stackTrace: "Stack trace is not included because of config option.",
    retryTopic: getTopic(),
    revisionCount: genInt(0, 5),
    failureDateTime: faker.date.recent(),
    subjectName: getSubjectName(),
    schemaVersion: genInt(1, 5),
    "_class": "org.opin.cisl.adapter.v2.ia.errorhandler.mongo.model.FailedMessage"
  };
}