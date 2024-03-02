const express = require("express");
const app = express();
const PORT = process.env.port || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const { mongoURL } = require("./keys");
const path = require("path");

require("./models/model");
require("./models/post");

app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));

mongoose.connect(mongoURL);

mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});
mongoose.connection.on("error", () => {
  console.log("Not connected to DB");
});

//serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
