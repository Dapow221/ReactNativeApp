const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/movies", Controller.getMovies);
router.get("/genres", Controller.getGenres);
router.get("/movies/:id", Controller.getMoviesById);

module.exports = router;
