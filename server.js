const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const passport = require("passport");
const passportconfig = require("./config/passport");
const flash = require("connect-flash");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const configDB = require("./config/database");

mongoose.connect(configDB.url);

app.use(passportconfig);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

//  passport config
app.use(session({ secret: "ilovescotchscotchyscotchscotch" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./app/routes")(app, passport);

app.listen(port);
console.log("Server is running on port", +port);
