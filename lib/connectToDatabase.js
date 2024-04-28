import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let mongoClient;    //cached connection

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return { mongoClient };
    }
    mongoClient = await (new MongoClient(uri, options)).connect();
    console.log("Just connected to the database");
    return { mongoClient };
  } catch (e) {
    console.error(e);
  }
}
