class fileController {
  constructor() {}
  postFile = async (req, res) => {
    res.render("file", { message: "file uploaded" });
  };
  getFilePage = async (req, res, message = "") => {
    res.render("file", { message: message });
  };
}

module.exports = new fileController();
