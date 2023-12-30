const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const Session = require("../controllers/session");
// const authorization = require("../middlewares/authorization");
// const authentication = require("../middlewares/authentication");
const userRouter = require("./user");

router.post("/login", Session.login);
router.post("/register", Session.register);
router.use("/user", userRouter);

// router.use(authentication);

router.get("/movies", Controller.getMovies);
router.get("/genres", Controller.getGenres);
router.post("/movies", Controller.addMovies);
router.put("/movies/:id", Controller.putMovies);
router.delete("/movies/:id", Controller.deletedMovies);
router.get("/movies/:id", Controller.getMoviesById);

module.exports = router;
