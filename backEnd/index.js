const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

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
        res.cookie("token", token).json(user);
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

app.get("/test", async (req, res) => {
  return res.json("Test completed successfully");
});

app.listen(4000);
