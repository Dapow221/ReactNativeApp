const { User } = require("../models");
const { comparePass, signToken } = require("../helpers/helper");

class Session {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      const checkPassword = comparePass(password, user.password);
      const payload = {
        id: user.id,
      };
      const access_token = signToken(payload);

      if (!user) {
        throw { name: "email/password invalid" };
      } else if (!checkPassword) {
        throw { name: "email/password invalid" };
      }

      res.status(200).json({
        access_token: access_token,
        message: `user ${user.email} has successfully login in`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({
        message: "New user has been created",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Session;
