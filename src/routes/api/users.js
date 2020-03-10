var router = require("express").Router();

function wait(ms) {
  return function(v) {
    return new Promise(resolve => setTimeout(() => resolve(v), ms));
  };
}

router.get("/", (req, res) => {
  // promisify response
  return Promise.resolve(1)
    .then(wait(5000))
    .then(() => {
      return res.status(200).json(users);
    });
});

router.get("/:userId", (req, res) => {
  const user = getUser(req.params.userId);

  if (!user) return res.status(404).json({});

  return res.json(user);
});

router.post("/", (req, res) => {
  const user = {
    id: ++userIdCounter,
    name: req.body.name
  };
  users.push(user);
  res.status(201).json(user);
});

router.put("/:userId", (req, res) => {
  const user = getUser(req.params.userId);

  if (!user) return res.status(404).json({});

  user.name = req.body.name;
  res.json(user);
});

router.delete("/:userId", (req, res) => {
  const userIndex = getUserIndex(req.params.userId);

  if (userIndex === -1) return res.status(404).json({});

  users.splice(userIndex, 1);
  res.json(users);
});

const getUser = userId => users.find(u => u.id === parseInt(userId));
const getUserIndex = userId => users.findIndex(u => u.id === parseInt(userId));

// Ephemeral in-memory data store
const users = [
  {
    id: 1,
    name: "Joe"
  },
  {
    id: 2,
    name: "Jane"
  }
];
let userIdCounter = users.length;

module.exports = router;
