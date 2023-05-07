const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Vansh");
});

app.listen(3000);
