const cloudinary = require("../utils/cloudinaryConfig");
const sharp = require("sharp");

exports.uploadImage = [
  async (req, res) => {
    try {
      // Resize and compress image using sharp
      const optimizedBuffer = await sharp(req.file.buffer)
        .resize({ width: 800 }) // Resize to 800px width
        .jpeg({ quality: 80 }) // Compress to 80% quality
        .toBuffer();

      // Convert buffer to base64
      const fileStr = optimizedBuffer.toString("base64");

      // Upload optimized image to Cloudinary
      cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${fileStr}`,
        (error, result) => {
          if (error) {
            return res.status(500).send(error);
          }

          res.json({ imageUrl: result.secure_url });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },
];
