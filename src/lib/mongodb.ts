// src/lib/mongodb.ts

import { MongoClient } from 'mongodb';

declare global {
  // Declaring a new property on the global object
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri:any = process.env.MONGODB_URI; // Your MongoDB connection string
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

console.log("MongoDB URI:", uri); // Log the MongoDB URI being used

if (process.env.NODE_ENV === 'development') {
  // In development mode, we reuse the same MongoClient instance to avoid warnings.
  if (!global._mongoClientPromise) {
    console.log("Creating new MongoClient in development mode...");
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
    global._mongoClientPromise
      .then(() => {
        console.log("Connected to MongoDB successfully (development mode).");
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB (development mode):", error);
      });
  } else {
    console.log("Reusing existing MongoClient in development mode...");
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, we create a new MongoClient instance for each request.
  console.log("Creating new MongoClient in production mode...");
  client = new MongoClient(uri);
  clientPromise = client.connect();
  clientPromise
    .then(() => {
      console.log("Connected to MongoDB successfully (production mode).");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB (production mode):", error);
    });
}

export default clientPromise;
