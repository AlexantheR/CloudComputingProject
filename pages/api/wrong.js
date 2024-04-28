import { MongoClient} from "mongodb";

const uri = process.env.MONGODB_URI;
const option = {};

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export default async function handler(request, response) {
    try {
        const mongoClient = await (new MongoClient(uri, option)).connect();
        console.log("Just connected to the database");
        const db = mongoClient.db("sample_restaurants");
        const collection = db.collection("restaurants");
        const results = await collection.find({}).project({
            grades: 0,
            borough: 0,
            restaurant_id: 0,
        }).limit(4).toArray();

        response.status(200).json(results);
    } catch (e) {
        console.log(e);
        response.status(500).json(e);
    }
}