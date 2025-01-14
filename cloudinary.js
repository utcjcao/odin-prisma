const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

async function saveToCloud(req, res, next) {
  try {
    const buffer = req.file.buffer;
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: req.file.originalname,
            resource_type: "auto",
          },
          (error, uploadResult) => {
            return resolve(uploadResult);
          }
        )
        .end(buffer);
    });
    req.fileUrl = uploadResult.secure_url;
    next();
  } catch (err) {
    res.status(500).json({
      error: "Failed to upload file to Cloudinary",
      message: err.message,
    });
  }
}

async function deleteFromCloud(filename) {
  try {
    const result = await cloudinary.uploader.destroy(filename);
    console.log("File deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error; // You can throw the error or handle it as needed
  }
}

module.exports = {
  deleteFromCloud,
  saveToCloud,
};
