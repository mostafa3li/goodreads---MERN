const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("API Running"));

// Define Admin Routes
app.use("/admin", require("./routes/admin/adminAuth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
