const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
const { genDocument } = require('./document');

const numDocs = 1000000;
const threads = 200;
const batchSize = 1000;

const uri = process.env.MONGO_URI;
const dbName = 'Objects';
const collectionName = 'policy';

let totalStarted = 0; // Counter to track total reserved documents (batches started)
let completedInserted = 0; // Counter to track total successfully inserted documents
const startTime = Date.now(); // Record the start time of the application

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
      // Generate and insert fake documents
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
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    const promises = [];

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