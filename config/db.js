// require("dotenv").config();
// const { MongoClient } = require("mongodb");

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri);
// let db;
// async function connectToMongodb() {
//     try {
//         console.log("i am here inside db------------")
//         await client.connect();
//         db = client.db("MyDowryDb")
//         console.log("connected to mongodb")
//     } catch (error) {
//         console.log("error connecting mongodb-=-=-=-=-=-=", error)
//     }
// }

// function getDb() {
//     return db
// }


// module.exports = {
//     connectToMongodb,
//     getDb
// }
//  mongod --dbpath /usr/local/var/mongodb
const mongoose = require("mongoose");

const connectToMongodb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("✅ Mongoose connected to MongoDB");
    } catch (error) {
        console.error("❌ Mongoose connection error:", error);
    }
};

module.exports = { connectToMongodb };