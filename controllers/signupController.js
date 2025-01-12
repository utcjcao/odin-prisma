const { registerUser, createUserFiles, findUser } = require("../db/queries");
const bcryptjs = require("bcryptjs");

class signUpController {
  constructor() {}
  getSignUpPage = async (req, res) => {
    res.render("signup", { message: "" });
  };
  postSignUp = async (req, res) => {
    try {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      await registerUser(req.body.username, hashedPassword);
      const user = await findUser(req.body.username);
      await createUserFiles(user[0]);
      res.render("signup", { message: "user created! you can login now" });
    } catch (error) {
      res.render("signup", { message: error.message });
    }
  };
}

module.exports = new signUpController();
