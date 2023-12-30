const { Movie, Genre, User, sequelize, Casts } = require("../models");
const casts = require("../models/casts");

class Controller {
  static async getMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [Genre],
      });

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }
  static async getGenres(req, res, next) {
    try {
      const genres = await Genre.findAll();
      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  static async addMovies(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId,
        cast,
        slug,
      } = req.body;
      const movies = await Movie.create(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          authorId,
          slug,
        },
        { transaction: t }
      );
      const dataMovies = cast.map((el) => {
        if (typeof el === "string") {
          el = JSON.parse(el);
        }
        el.movieId = movies.id;
        return el;
      });

      const newMovies = await Casts.bulkCreate(dataMovies, { transaction: t });

      await t.commit();

      res.status(201).json(movies);
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async deletedMovies(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await Movie.destroy({
        where: { id },
      });

      res.status(200).json({
        message: `done delete movies from id ${id} `,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getMoviesById(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await Movie.findByPk(id, {
        include: [Genre],
      });

      if (!movies) {
        throw { name: "not found movies" };
      }

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async readAllMovies(req, res, next) {
    try {
      const genre = await Genre.findAll();

      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }

  static async putMovies(req, res, next) {
    try {
      const { id } = req.params;
      const putMovies = await Movie.findByPk(id);

      if (!putMovies) {
        throw { name: "data not found" };
      }

      const { title, synopsis, trailerUrl, imgUrl, rating, authorId, genreId } =
        req.body;
      const updateMovies = await Movie.update(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          authorId,
          genreId,
        },
        { where: { id } }
      );

      if (!updateMovies) {
        throw { name: "cannot update movies" };
      }
      res.status(201).json({
        message: `done updated movies from id ${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
