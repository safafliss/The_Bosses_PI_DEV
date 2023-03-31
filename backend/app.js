var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require("cookie-session");
const authRouters = require("./routes/auth");
const session = require("express-session");
//product
const productRoutes = require("./routes/productRoutes");

var app = express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(logger("dev"));

app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRouters);
app.use(passport.initialize());
//require('./passport')(passport)
app.use(passport.session());
require("./security/passport")(passport);

/* connect to db */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use("/api", indexRouter);
app.use("/product", productRoutes);

module.exports = app;
