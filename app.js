const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
// const csurf = require("csurf");
const { default: mongoose } = require("mongoose");
const router = require("./routers/Router");
const StoreRouter = require("./routers/Store");
require("dotenv").config();

const limiter = rateLimit({
  // @note need to determine how many request per minute might be there in our platform and thus set the limit
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app
  .use(express.json())
  .use(morgan("dev"))
  .use(
    cors({
      origin: "*",
    })
  )
  .use(limiter)
  .use(helmet())
  .use(hpp());
// .use(csurf());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app
  .use("/api/v1/product", router)
  .use("/api/v1/store", StoreRouter)
  .use("*", (req, res) => res.status(404).send("API not found!"));

module.exports = app;
