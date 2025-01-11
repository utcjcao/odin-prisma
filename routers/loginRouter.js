const { Router } = require("express");
const { passport } = require("../passport");
const { getLoginPage } = require("../controllers/loginController");

const loginRouter = Router();

loginRouter.get("", async (req, res) => {
  await getLoginPage(req, res);
});

loginRouter.post("", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message || "Invalid credentials");
      return res.redirect("login");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = { loginRouter };
