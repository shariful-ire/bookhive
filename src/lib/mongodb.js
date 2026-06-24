import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
