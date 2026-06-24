import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = new MongoClient(uri);

if (!globalThis._mongoClientPromise) {
  globalThis._mongoClientPromise = client.connect();
}
const clientPromise = globalThis._mongoClientPromise;

export { client, clientPromise };

export function getDb() {
  return client.db();
}
