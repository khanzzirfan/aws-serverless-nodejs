var router = require("express").Router();
const cors = require("cors");
const compression = require("compression");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV === "test") {
  // NOTE: aws-serverless-express uses this app for its integration tests
  // and only applies compression to the /sam endpoint during testing.
  router.use("/sam", compression());
} else {
  router.use(compression());
}

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

router.use("/", require("./helloworld"));
router.use("/users", require("./users"));
router.use("/amadeus/shopping", require("./amadeus/shopping"));
router.use("/v2/amadeus/reference-data", require("./amadeus/airports"));

router.use(function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
