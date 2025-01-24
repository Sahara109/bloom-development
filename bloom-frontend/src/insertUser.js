const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://localhost:27017';  // Replace with your MongoDB URI if different
const dbName = 'your_database_name';      // Replace with your database name
const collectionName = 'users';           // This is your collection name

// MongoDB client connection
const client = new MongoClient(uri);

async function insertUser() {
  try {
    await client.connect();  // Connect to MongoDB

    const db = client.db(dbName);  // Select the database
    const collection = db.collection(collectionName);  // Select the collection

    // Insert the user data (with hashed password)
    const result = await collection.insertOne({
      name: "John Doe",
      email: "john@example.com",
      password: "$2b$10$E8Vq2j2YX3wZwX8uuwfyBuayb2mrwrTz1sp2o1zJZG2y6qZZdxfkG",  // Pre-hashed password
      age: 30
    });

    console.log(`User inserted with ID: ${result.insertedId}`);  // Confirmation message
  } catch (err) {
    console.error('Error inserting user:', err);
  } finally {
    await client.close();  // Close the connection
  }
}

// Call the insert function
insertUser();
