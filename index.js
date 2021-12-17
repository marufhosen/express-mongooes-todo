const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const todoHandler = require("./Route/todoHandler");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

//database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//todo route
app.use("/todo", todoHandler);

// app.use("/", (err, req, res, next) => {
//   if (err.message) {
//     res.status(500).send({ err: err.message });
//   } else {
//     res.status(500).send("There was an error");
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
