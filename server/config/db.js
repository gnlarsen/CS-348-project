// db.js

const mongoose = require("mongoose");
const db =
  "mongodb+srv://Cluster74912:Vk9CVXNnR3h9@cluster74912.gb8a04t.mongodb.net/?retryWrites=true&w=majority";
/* Replace <password> with your database password */

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
    
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;