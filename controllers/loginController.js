const { findUser } = require("../db/queries");
const bcryptjs = require("bcryptjs");

class loginController {
  constructor() {}
  getLoginPage = async (req, res) => {
    res.render("login", { message: req.flash("error") });
  };
  postLogin = async (req, res) => {
    // leaving this blank, work is done by passport.js middleware
  };
}

module.exports = new loginController();
