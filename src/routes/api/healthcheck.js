var router = require("express").Router();

router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "success",
  });
});

module.exports = router;
