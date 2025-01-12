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
    // Upload the file to Cloudinary (replace filePath with the file to upload)
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.filename,
      resource_type: "auto", // detect file type
    });

    req.fileUrl = uploadResponse.secure_url;
    next();
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
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
