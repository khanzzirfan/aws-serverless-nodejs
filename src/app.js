"use strict";
const express = require("express");
const app = express();
// const cors = require("cors");
const dotenv = require("dotenv");
// const { runEvery5secTask } = require("./services/cronService");

dotenv.config();

app.set("view engine", "pug");

// app.use(cors());
app.use(require("./routes"));

var isProduction = process.env.NODE_ENV === "production";

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// finally, let's start our server...

/* To run locally uncomment **/
// runEvery5secTask();
console.log("Starting server");
var server = app.listen(8080, function () {
  console.log("Listening on port " + server.address().port);
});

// Export your express server so you can import it in the lambda function.
module.exports = app;
