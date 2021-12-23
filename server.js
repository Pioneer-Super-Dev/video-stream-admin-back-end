const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Define Routes
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/setting", require("./routes/api/setting"));
app.use("/api/verification", require("./routes/api/verification"));
app.use("/api/payment", require("./routes/api/payment"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
