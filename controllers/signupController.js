const { registerUser, createUserFiles, findUser } = require("../db/queries");
const bcryptjs = require("bcryptjs");

class signUpController {
  constructor() {}
  getSignUpPage = async (req, res) => {
    res.render("signup", { message: "", user: req.user });
  };
  postSignUp = async (req, res) => {
    try {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      await registerUser(req.body.username, hashedPassword);
      const user = await findUser(req.body.username);
      await createUserFiles(user[0]);
      res.render("signup", {
        message: "user created! you can login now",
        user: req.user,
      });
    } catch (error) {
      res.render("signup", { message: error.message, user: req.user });
    }
  };
}

module.exports = new signUpController();
