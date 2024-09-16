const sharp = require("sharp");
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const TEMP_DIR = path.join(__dirname, "../../temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

export const uploadImage = async (req: any, res: any) => {
  console.log("Uploaded files:", req.files);

  if (!req?.files || !req?.files.image) {
    return res.status(400).send("No image uploaded.");
  }

  const image = req.files.image as any;
  const tempFilename = uuidv4() + path.extname(image.name);
  const tempPath = path.join(TEMP_DIR, tempFilename);

  image.mv(tempPath, (err: any) => {
    if (err) {
      return res.status(500).send("Error saving image.");
    }

    // Send the relative URL to access the image (not the file system path)
    const publicUrl = `http://localhost:5000/temp/${tempFilename}`;
    res.send({ previewUrl: publicUrl });
  });
};

export const processImage = async (req: any, res: any) => {
  const {
    path: imageUrl, // This is the URL of the image passed from the frontend
    brightness = 1,
    contrast = 1,
    saturation = 1,
    rotate = 0,
  } = req.body;

  console.log(req.body);

  // Extract the file name from the URL to get the local file path
  const imageFilename = path.basename(imageUrl);
  const imagePath = path.join(TEMP_DIR, imageFilename); // Local file path

  if (!fs.existsSync(imagePath)) {
    return res.status(400).send("Image file not found.");
  }

  console.log(imagePath);

  try {
    const outputPath = path.join(TEMP_DIR, uuidv4() + ".jpg");

    // Process the image with sharp
    await sharp(imagePath)
      .modulate({
        brightness: Number(brightness),
        saturation: Number(saturation),
      })
      .rotate(Number(rotate))
      .toFile(outputPath);

    console.log(outputPath);

    // Optionally delete the original image after processing if not needed
    // fs.unlinkSync(imagePath);

    res.send({
      previewUrl: `http://localhost:5000/temp/${path.basename(outputPath)}`,
    });
  } catch (err) {
    console.error("Error processing image:", err);
    res.status(500).send("Error processing image.");
  }
};
