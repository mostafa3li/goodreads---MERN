const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//*======================================================================================

// Connect Database
connectDB();

app.use(express.json());

//*======================================================================================

// app.get("/", (req, res) => res.send("API Running"));

// Define Admin Routes
app.use("/adminAuth", require("./routes/admin/adminAuth"));
app.use("/adminCategories", require("./routes/admin/adminCategories"));
app.use("/adminAuthors", require("./routes/admin/adminAuthors"));
app.use("/adminBooks", require("./routes/admin/adminBooks"));

// Define General Routes
app.use("/api/categories", require("./routes/api/categories"));
app.use("/api/authors", require("./routes/api/authors"));
app.use("/api/books", require("./routes/api/books"));

// Define Users Routes
app.use("/users", require("./routes/user_routes/users"));

//*======================================================================================

// Serve static assets in production
if (process.env.NODE_ENV == "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//*======================================================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
