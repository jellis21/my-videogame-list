const express = require("express");
const router = express.Router();
const models = require("../models");
const checkAuth = require("../checkAuth");

router.post("/", checkAuth, (req, res) => {
    models.List.findAll({ where: { UserId: req.body.UserId } }).then((games) => {
      if (games.length === 0) {
        res.status(400).json({ error: "there are no games in your list" });
        return;
      }
      res.json(games);
    });
})

// GET /api/v1/social/
router.get("/:username", checkAuth, (req, res) => {
  models.User.findAll({
    where: { username: req.params.username },
    attributes: ["id"],
  }).then((user) => {
    // console.log(user[0])
    res.send(user[0].toJSON())
  })
});

// router.get("/:id", checkAuth, (req, res) => {
//   models.List.findAll({ where: { UserId: req.params.id } }).then((games) => {
//     if (games.length === 0) {
//       res.status(400).json({ error: "there are no games in your list" });
//       return;
//     }
//     res.json(games);
//   });
// });

// where: { UserId: req.user.id }

module.exports = router;
