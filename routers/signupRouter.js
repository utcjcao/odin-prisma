const { Router } = require("express");
const {
  getSignUpPage,
  postSignUp,
} = require("../controllers/signupController");

const signupRouter = Router();

signupRouter.get("", async (req, res) => {
  await getSignUpPage(req, res);
});

signupRouter.post("", async (req, res) => {
  await postSignUp(req, res);
});

module.exports = { signupRouter };
