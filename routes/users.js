const bcrypt = require("bcrypt");
const express = require("express");
const models = require("../models");
const router = express.Router();
const Sequelize = require('sequelize');

/* POST /api/v1/users/register */
router.post("/register", function (req, res, next) {
  // If fields are missing
  if (!req.body.username || !req.body.email || !req.body.password) {
    // then send an error back
    res.status(400).json({error: "please include all required fields"})
    return;
  }

  // check if email in use
  models.User.findAll({ where: { email: req.body.email }
  }).then((users) => {
    // if yes, send error
    if (users.length > 0) {
      res.status(400).json({ error: `${users}email already in use` });
      return;
    }

    // if not, create new user
    // hash password
    bcrypt.hash(req.body.password, 10).then((hash) => {
      // store in db
      models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      }).then((user) => {
        // send back new user
        res.status(201).json(user);
      });
    });
  });
});

/* POST /api/v1/users/login */
router.post('./login', (req, res, next) => {
  // check for required fields
  if (!req.body.username || !req.body.email || !req.body.password) {
    // then send an error back
    res.status(400).json({error: "please include all required fields"})
    return;
  }
  // check for user with email
  models.User.findOne({ where: { email: req.body.email }})
    .then(user => {
      // if no user, send error
      if (!user) {
        res.status(404).json({ error: "could not find the email" });
        return;
      }
      // check password against has in db
      bcrypt.compare(req.body.password, user.password)
        .then(match => {
          // if no match, send error
          if (!match) {
            res.status(400).json({ error: "password incorrect" });
            return;
          }
          // log the user in
          // JWT - JSON Web Tokens

          // send success response
          res.json({ success: "logged in" })
        })
    })
})


module.exports = router;
