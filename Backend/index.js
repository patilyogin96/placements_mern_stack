const express = require("express");
const passport = require("passport");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes/index");

app.use(
  session({
    secret: "loginkeys",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
