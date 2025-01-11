const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("", async (req, res) => {
  res.render("index", { user: req.user });
});

module.exports = { indexRouter };
