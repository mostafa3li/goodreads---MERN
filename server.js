const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("API Running"));

// Define Admin Routes
app.use("/adminAuth", require("./routes/admin/adminAuth"));
app.use("/adminCategories", require("./routes/admin/adminCategories"));
app.use("/adminAuthors", require("./routes/admin/adminAuthors"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
