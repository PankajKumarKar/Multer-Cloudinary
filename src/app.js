require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./configs/db.config");
const { cloudinaryConnect } = require("./configs/cloudinary.config");
const userRouter = require("./routes/user.route");

const app = express();

dbConnect();
cloudinaryConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["process.env.FRONDEND_URL"],
  })
);

app.use("/api", userRouter);

module.exports = app;
