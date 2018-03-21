const express = require('express');
const app = express();
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const flash = require("connect-flash");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const path = require("path");
const moment = require('moment');

// Bring in Models
// const User = require('./models/user');
const Content = require('./models/content');

// Connection to DB using .env File
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connection established");
});

db.on("error", (err) => {
  console.log(err);
});

// Using Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash());

// Set Public Folder
app.use(express.static(path.join(__dirname, './../frontend/public')));

// Using session to create a cookie using passport
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport Config
require('./config/passport')(passport);
// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Home Route - Display the Slides
app.get("/", (req, res) => {
  Content.find({}, (err, slides) => {
      if (err) {
          console.log(err)
      } else {
          // if slides not expired display
          const today = new Date();
          const currentSlides = slides.filter((slide) => slide.expiryDate > today)
          res.send(currentSlides);
      } 
  }) 
});

app.use("/admin", adminRoutes)
app.use("/", userRoutes);

// Server Port
const PORT = process.env.PORT || 4000;
app.listen(PORT,() => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
