const { Router } = require("express");
const { postLogOut } = require("../controllers/logoutController");

const logoutRouter = Router();

logoutRouter.get("", async (req, res) => {
  await postLogOut(req, res);
});

module.exports = { logoutRouter };
