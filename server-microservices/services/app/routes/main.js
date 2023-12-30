const express = require("express");
const router = express.Router();
const serverRouter = require("./index");

router.use("/", serverRouter);

module.exports = router;
