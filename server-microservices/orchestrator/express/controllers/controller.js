const APP_URL = process.env.APP_URL || "http://localhost:4002";
const USERS_URL = process.env.USERS_URL || "http://localhost:4001";
const axios = require("axios");
const redis = require("../config/redis");

class Controller {
  static async getMovies(req, res, next) {
    try {
      const movies = await redis.get("movies");
      if (movies) {
        res.status(200).json(JSON.parse(movies));
      } else {
        const { data } = await axios.get(`${APP_URL}/movies`);
        await redis.set("movies", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postMovies(req, res, next) {
    try {
      const { data } = await axios.post(`${APP_URL}/movies`, req.body);
      await redis.del("movies");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateMovies(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.put(`${APP_URL}/movies/${id}`, req.body);
      await redis.del("movies");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteMovies(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(`${APP_URL}/movies/${id}`);
      await redis.del("movies");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getMoviesById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(`${APP_URL}/movies/${id}`);
      const { data: user } = await axios.get(
        `${USERS_URL}/users/${data.authorId}`
      );
      data.User = user;
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async readUsers(req, res, next) {
    try {
      const users = await redis.get("users");
      if (users) {
        res.status(200).json(JSON.parse(users));
      } else {
        const { data } = await axios.get(`${USERS_URL}/users`);
        await redis.set("users", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postUsers(req, res, next) {
    try {
      const { data } = await axios.post(`${USERS_URL}/users`, req.body);
      await redis.del("users");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findUsersById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(`${USERS_URL}/users/${id}`);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteUsers(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(`${USERS_URL}/users/${id}`);
      await redis.del("users");

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;

