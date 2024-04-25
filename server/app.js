const express = require("express");
const connectDB = require("./config/db");
const lampsRoutes = require("./routes/api/lamps");
const usersRoutes = require("./routes/api/users");
const commentsRoutes = require("./routes/api/comments");
const ordersRoutes = require("./routes/api/orders");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/lamps path
app.use("/api/lamps", lampsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/orders", ordersRoutes);

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));