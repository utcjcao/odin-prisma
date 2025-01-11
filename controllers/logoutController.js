class logoutController {
  constructor() {}
  postLogOut = async (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  };
}

module.exports = new logoutController();
