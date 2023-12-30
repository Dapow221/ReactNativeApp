const User = require("../models/users");

class Users {
  static async createUsers(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const result = await User.createUser({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async readUsers(req, res, next) {
    try {
      const result = await User.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.findByPk(id);
      if (!result) {
        throw { name: "not found" };
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async deleteUsers(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = Users;
