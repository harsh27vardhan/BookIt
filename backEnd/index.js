const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const app = express();

const jwtSecret = "randomstring";

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // this is the frontend address
    credentials: true,
  })
);
app.use(express.json()); // to parse JSON data
app.use(
  express.urlencoded({
    extended: true,
  })
); // to parse form data
app.use(cookieParser()); // to parse cookies
app.use("/uploads", express.static(__dirname + "/uploads")); //middleware for uploading photos to the server

// Database connection
mongoose.connect(process.env.MONGO_URL);

//Routes
app.get("/test", (req, res) => {
  res.json("test ok");
});
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const passMatch = bcrypt.compareSync(password, user.password);
    if (!passMatch)
      return res.status(401).json({ message: "Invalid Password" });
    jwt.sign(
      { username: user.username, email, id: user._id },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            httpOnly: false,
            secure: false,
          })
          .json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, jwtSecret, {}, (err, user) => {
    if (err) throw err;
    const { username, email, id } = user;
    res.json({ username, email, id });
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photoMiddleware = multer({ dest: __dirname + "/uploads" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
