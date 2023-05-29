// index.js ek express server rahega
const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')

connectToMongo();

const app = express();
const port = 5000;

app.use(cors())

//If want to use request.body then use this middleware
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth")); //app.use to make connectionn with routes
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`CloudJotter Backend listening on port http://localhost:${port}`);
});
