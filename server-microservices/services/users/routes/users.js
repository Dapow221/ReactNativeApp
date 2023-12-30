const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.post("/", users.createUsers);
router.get("/", users.readUsers);
router.get("/:id", users.findUserById);
router.delete("/:id", users.deleteUsers);  

module.exports = router;
