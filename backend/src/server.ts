import express from "express";
import { json, urlencoded } from "body-parser";
import imageRoutes from "./routes/imageRoutes";

const fileUpload = require("express-fileupload");

const fs = require("fs");
const cors = require("cors");

const path = require("path");

const app = express();
const port = 5000;

app.use(fileUpload());

app.use(
  cors({
    origin: "*",
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

const TEMP_DIR = path.join(__dirname, "../temp");
console.log("Serving static files from: ", TEMP_DIR);

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// Serve static files from 'temp' folder
app.use("/temp", express.static(TEMP_DIR));

app.use("/api/images", imageRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
