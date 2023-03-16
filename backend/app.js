var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
const passport = require('passport')
const cors = require('cors') 
const cookieSession = require("cookie-session");
const authRouters = require('./routes/auth')
const session = require('express-session')
var app = express();
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch1'
}));
/*app.use(cors({
    credentials: true,
  }))*/
  //const cors = require('cors');
  const whitelist = ['http://localhost:3000','http://localhost:3600'];
  
  const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        console.log(origin)
      if(1==1)
        return callback(null, true)
  
        callback(new Error('Not allowed by CORS'));
    }
  }
  app.use(cors(corsOptions));

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouters);
app.use(passport.initialize())
//require('./passport')(passport)
app.use(passport.session());
require('./security/passport')(passport)



/* connect to db */
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to db"))
.catch(err=>console.log(err))


app.use('/api', indexRouter);



module.exports = app;
