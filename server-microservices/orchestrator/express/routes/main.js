const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/movies", Controller.getMovies);
router.get("/movies/:id", Controller.getMoviesById);
router.post("/movies", Controller.postMovies);
router.put("/movies/:id", Controller.updateMovies);
router.delete("/movies/:id", Controller.deleteMovies);

router.get("/users", Controller.readUsers);
router.post("/users", Controller.postUsers);
router.get("/users/:id", Controller.findUsersById);
router.delete("/users/:id", Controller.deleteUsers);

module.exports = router;
