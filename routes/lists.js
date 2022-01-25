const express = require("express");
const router = express.Router();
const models = require("../models");
const checkAuth = require("../checkAuth");

// GET /api/v1/lists/
router.get("/", checkAuth, (req, res) => {
  models.List.findAll({ where: { UserId: req.user.id } }).then((games) => {
    if (games.length === 0) {
      res.status(400).json({ error: "there are no games in your list" });
      return;
    }
    res.json(games);
  });
});

// DELETE /api/v1/lists/delete
router.delete("/:id", checkAuth, (req, res) => {
  // try and remove team with id, so long as it is owned by the logged in user
  models.List.destroy({
    where: {
      id: req.params.id,
      UserId: req.user.id,
    },
  }).then((numberDeleted) => {
    // if nothing was deleted, return error message
    if (numberDeleted === 0) {
      res.status(404).json({ error: "couldn't find that game in your list" });
      return;
    }
    // once game deleted, send updated list as the response
    models.List.findAll({ where: { UserId: req.user.id } }).then((games) => {
      if (games.length === 0) {
        res.status(400).json({ error: "there are no games in your list" });
        return;
      }
      res.json(games);
    });
  });
});

// POST /api/v1/lists/
router.post("/", checkAuth, (req, res) => {
  // check for required fields
  if (!req.body.game_name || !req.body.ranking) {
    res.status(400).json({ error: "please include all required fields" });
    return;
  }
  //create list in db
  models.List.create({
    game_name: req.body.game_name,
    ranking: req.body.ranking,
    UserId: req.user.id,
  }).then((game) => {
    // respond to client with new game
    res.status(201).json(game);
  });
});

module.exports = router;
