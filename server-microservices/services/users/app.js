const express = require("express");
const app = express();
const port = 4001;
const users = require("./routes/users");
const cors = require("cors");
const { connect } = require("./config/mongo");
const Error = require("./controllers/error");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", users);
app.use(Error);

connect().then((db) => {
  app.listen(port, () => {
    console.log("app connected to " + port);
  });
});
