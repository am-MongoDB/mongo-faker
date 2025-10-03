const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
const readline = require('readline');
const { genDocument } = require('./datasets/reviews');

const numDocs = 1000000;
const threads = 10;
const batchSize = 200;
const shouldEmptyCollection = false;

let uri = process.env.MONGO_URI;
const dbName = 'Travel';
const collectionName = 'reviews';

let totalStarted = 0; // Counter to track total reserved documents (batches started)
let completedInserted = 0; // Counter to track total successfully inserted documents
const startTime = Date.now(); // Record the start time of the application

// Function to prompt the user for MONGO_URI if it's not set
async function promptForMongoUri() {
  if (!uri) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    uri = await new Promise((resolve) => {
      rl.question('MONGO_URI is not set. Please enter your MongoDB connection string: ', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });

    if (!uri) {
      console.error('No MongoDB connection string provided. Exiting...');
      process.exit(1);
    }
  }
}

async function emptyCollection(client) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  try {
    const result = await collection.deleteMany({});
    console.log(`Emptied collection. Deleted ${result.deletedCount} documents.`);
  } catch (error) {
    console.error('Error emptying collection:', error);
  }
}

async function insertFakeData(threadId, client) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  while (true) {
    if (totalStarted >= numDocs) {
      break;
    } else {
      totalStarted += batchSize;
    }

    try {
      // let className = null; 
      // let entityId = null; 
      // let numImages = (30 + (Math.floor(Math.random() * 50)));
      // Generate and insert fake documents
      // let documents = [];
      // for (let i = 0; i < batchSize; i++) {
      //   const doc = genDocument(className, entityId);
      //   documents.push(doc);
      //   if (i % numImages === 0) {
      //     className = null;
      //     entityId = null;
      //     numImages = 30 + Math.floor(Math.random() * 50);
      //   } else {
      //     className = doc.class;
      //     entityId = doc.entityId;
      //   }
      // }

      const documents = Array.from({ length: batchSize }, () => genDocument());
      const result = await collection.insertMany(documents);
      completedInserted += result.insertedCount;
      const formattedCompleted = completedInserted.toLocaleString();
      const percentComplete = ((completedInserted / numDocs) * 100).toFixed(2);
      const elapsedTime = (Date.now() - startTime) / 1000; // Elapsed time in seconds
      const estimatedTotalTime = (elapsedTime / completedInserted) * numDocs; 
      const remainingTime = Math.max(0, estimatedTotalTime - elapsedTime); 

      // Format remaining time as HH:MM:SS
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = Math.floor(remainingTime % 60);
      const formattedRemainingTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      console.log(
        `Inserted: ${formattedCompleted} documents (${percentComplete}% complete). Time remaining: ${formattedRemainingTime}`
      );
    } catch (error) {
      console.error(`Thread ${threadId}: Error inserting documents:`, error);
    }
  }
}

async function main() {
  await promptForMongoUri(); // Ensure MONGO_URI is set
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    const promises = [];

    if (shouldEmptyCollection) {
      await emptyCollection(client);
    }

    // Start "threads" number of parallel workers
    for (let i = 0; i < threads; i++) {
      promises.push(insertFakeData(i, client));
    }

    // Wait for all threads to complete
    await Promise.all(promises);
    console.log('All threads completed. Total documents inserted:', completedInserted);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

main().catch(console.error);