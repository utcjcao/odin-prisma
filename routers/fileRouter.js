const { Router } = require("express");
const multer = require("multer");
const { getFilePage, postFile } = require("../controllers/fileController");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.get("", async (req, res) => {
  await getFilePage(req, res);
});

fileRouter.post("", upload.single("file"), async (req, res) => {
  await postFile(req, res);
});

module.exports = { fileRouter };
