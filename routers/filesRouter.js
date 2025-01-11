const { Router } = require("express");
const multer = require("multer");
const {
  getFilePage,
  postFile,
  deleteFile,
  postFolder,
} = require("../controllers/filesController");
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

const filesRouter = Router();

filesRouter.get("/:id", async (req, res) => {
  await getFilePage(req, res);
});

filesRouter.get("/delete/:id/:cId", async (req, res) => {
  await deleteFile(req, res);
});

filesRouter.post(
  "/upload_file/:id",
  upload.single("file"),
  async (req, res) => {
    await postFile(req, res);
  }
);
filesRouter.post("/upload_folder/:id", async (req, res) => {
  await postFolder(req, res);
});

module.exports = { filesRouter };