// import { connectToDatabase } from "../../lib/connectToDatabase";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "bson";
export default async function handler(req, res) {
  // try {
  //   const mongoClient  = await clientPromise;
  //   const db = mongoClient.db("sample_restaurants");
  //   const collection = db.collection("restaurants");
  //   const results = await collection
  //     .find({})
  //     .project({
  //       grades: 0,
  //       borough: 0,
  //       restaurant_id: 0,
  //     })
  //     .limit(10)
  //     .toArray();
  //   res.status(200).json(results);
  // } catch (e) {
  //   console.error(e);
  // }

  try {
    if (req.method === "POST") {
      const mongoClient = await clientPromise;
      const db = mongoClient.db("bookStoreDatabase");
      try {
        const collection = db.collection('Bookstore');
        const book = await collection.insertOne(req.body);
        res.status(201).json({ success: true, data: book });

      } catch (error) {
        res.status(400).json({ success: false, error: "Failed to add Book" });
        console.error("Error adding Book:", error);
      }
    } else if (req.method === "GET") {
      const mongoClient = await clientPromise;
      const db = mongoClient.db("bookStoreDatabase");

      const collection = db.collection("Bookstore");

      const results = await collection
        .find({})
        .project({})
        .limit(10)
        .toArray();
      res.status(200).json(results);
    } else if (req.method === "DELETE") {
      const mongoClient = await clientPromise;
      const db = mongoClient.db("bookStoreDatabase");
      const collection = db.collection("Bookstore");
      const { id } = req.query;
      try {
        const deletedBook = await collection.deleteOne({ _id: new ObjectId(id) });
        if (deletedBook.deletedCount === 1) {
          res.status(200).json({ success: true, message: "Book deleted successfully" });
        } else {
          res.status(404).json({ success: false, error: "Book not found" });
          console.log(id);
        }
      } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
        console.error("Error deleting Book:", error);
      }
    } else if (req.method === "PUT" || req.method === "PATCH") {
      const mongoClient = await clientPromise;
      const db = mongoClient.db("bookStoreDatabase");
      const collection = db.collection("Bookstore");
      const { id } = req.query;
      try {
        const updatedBook = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );
        if (updatedBook.matchedCount === 1) {
          res.status(200).json({ success: true, message: "Book updated successfully" });
        } else {
          res.status(404).json({ success: false, error: "Book not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
        console.error("Error updating Book:", error);
      }
    }
    else {
      res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}