var router = require("express").Router();

router.get("/", function(req, res, next) {
  res.status(200).json({
    message: "Hello World!"
  });
});

router.post("/", function(req, res, next) {
  res.status(201).json(req.body.text);
});

router.put("/:id", function(req, res, next) {
  res.status(201).json({
    id: req.params.id,
    body: req.body.text
  });
});

router.delete("/:id", function(req, res, next) {
  res.status(200).json({
    id: req.params.id,
    message: "deleted"
  });
});

module.exports = router;
