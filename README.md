# Mongo Faker

Mongo Faker is a Node.js application that generates and inserts fake documents into a MongoDB collection. It is designed to simulate large-scale data insertion for testing and development purposes.

## Features

- Generates realistic fake data using the [Faker.js](https://github.com/faker-js/faker) library.
- Supports parallel insertion with configurable thread count.
- Tracks progress with estimated remaining time and percentage complete.
- Handles large-scale data insertion efficiently.

## Requirements

- Node.js (v14 or later)
- MongoDB (local or remote instance)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mongo-faker
```

2. Install dependencies:
```bash
npm install
```

3. Set up your MongoDB connection string in the MONGO_URI environment variable:
```bash
export MONGO_URI="mongodb://<username>:<password>@<host>:<port>"
```

## Configuration

The following parameters can be configured in `src/main.js`:

- `numDocs`: Total number of documents to insert (default: `1000000`).
- `threads`: Number of parallel threads to use for insertion (default: `200`).
- `batchSize`: Number of documents per batch (default: 1000).
- `dbName`: Name of the MongoDB database (default: `Objects`).
- `collectionName`: Name of the MongoDB collection (default: `policy`).

In `src/document.js` configure your template document (`sampleDoc`) and edit `genDocument` based on how you want to customise individual documents that will get added to MongoDB.


## Usage

1. Start the application:
```bash
npm start
```

2. The application will connect to MongoDB, generate fake data, and insert it into the specified collection. Progress will be displayed in the console, including the number of documents inserted, percentage complete, and estimated remaining time.

## Example Output

```
Connected to MongoDB
Inserted: 10,000 documents (10.00% complete). Estimated time remaining: 00:09:00
Inserted: 20,000 documents (20.00% complete). Estimated time remaining: 00:08:00
...
All threads completed. Total documents inserted: 100,000
Connection to MongoDB closed
```

## Customization

You can customize the fake data generation by modifying the genDocument function in src/document.js. The function uses the [Faker.js](https://github.com/faker-js/faker) library to generate realistic data.


## Author

Andrew Morgan – [ClusterDB.com](https://clusterdb.com)