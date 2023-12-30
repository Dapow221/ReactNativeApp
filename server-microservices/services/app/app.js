const express = require("express");
const app = express();
const port = 4002;
const router = require("./routes/index");
const cors = require("cors");
const error = require("./middlewares/error");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(error);

app.listen(port, () => {
  console.log("server running in cila home");
});
