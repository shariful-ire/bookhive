import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error("DATABASE_URL environment variable is not set");
}

if (!globalThis._mongoClient) {
  globalThis._mongoClient = new MongoClient(uri);
  globalThis._mongoClientPromise = globalThis._mongoClient.connect();
}

const client = globalThis._mongoClient;
const clientPromise = globalThis._mongoClientPromise;

export { client, clientPromise };

export function getDb() {
  return client.db();
}
