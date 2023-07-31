const User = require("../models/User.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

exports.postHandler = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username)
      return res.status(400).json({
        success: false,
        message: "Username Required !",
      });

    const user = await User.create({
      username,
    });

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.image.public_id = result.public_id;
          user.image.secure_url = result.secure_url;

          // Remove file from server
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (e) {
        res.status(500).json({
          success: false,
          message: e.message,
        });
      }
    }
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
