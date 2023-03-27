var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
const authRouters = require("./routes/auth");

const passport = require("passport");

const cors = require("cors");

//const cookieSession = require("cookie-session");
const session = require("express-session");

//product
const productRoutes = require("./routes/productRoutes");


var app = express();

//?
app.use(
  session({
    secret: "ilovescotchscotchyscotchscotch1",
  })
);

app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//?
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    console.log(origin);
    if (1 == 1) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));


app.use("/api", indexRouter);
app.use("/product", productRoutes);
app.use("/auth", authRouters);

// passport
app.use(passport.initialize());
require("./security/passport")(passport);

//?
app.use(passport.session());


/* connect to db */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));



module.exports = app;
