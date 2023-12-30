const bcrypt = require("bcryptjs");
const SECRET = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const hashPass = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
const comparePass = (pass, hash) => bcrypt.compareSync(pass, hash);
const signToken = (payload) => jwt.sign(payload, SECRET);
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = { hashPass, comparePass, signToken, verifyToken };
