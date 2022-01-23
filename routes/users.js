const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require('jsonwebtoken');
const models = require("../models");
const router = express.Router();

/* POST /api/v1/users/register */
router.post("/register", function (req, res, next) {
  // If fields are missing
  if (!req.body.username || !req.body.email || !req.body.password) {
    // then send an error back
    res.status(400).json({ error: "please include all required fields" });
    return;
  }

  // check if email in use
  // models.User.findAll({ where: { email: req.body.email }
  // }).then((users) => {
  // if yes, send error
  // if (users.length > 0) {
  //   res.status(400).json({ error: "email already in use" });
  //   return;
  // }

  const checkCredentials = async () => {
    // check if username or email is in use
    const username = await models.User.findAll({
      where: { username: req.body.username },
    });
    const email = await models.User.findAll({
      where: { email: req.body.email },
    });
    // if yes, send error
    if (email.length > 0) {
      res.status(400).json({ error: "email already in use" });
      return;
    } else if (username.length > 0) {
      res.status(400).json({ error: "username already in use" });
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
  };
  checkCredentials();
});
// });

/* POST /api/v1/users/login */
router.post("/login", (req, res, next) => {
  // check for required fields
  if (!req.body.username || !req.body.password) {
    // then send an error back
    res.status(400).json({ error: "please include all required fields" });
    return;
  }
  // check for user with username
  models.User.findOne({ where: { username: req.body.username } }).then((user) => {
    // if no user, send error
    if (!user) {
      res.status(404).json({ error: "could not find the username" });
      return;
    }
    // check password against hash in db
    bcrypt.compare(req.body.password, user.password).then((match) => {
      // if no match, send error
      if (!match) {
        res.status(400).json({ error: "password incorrect" });
        return;
      }
      // log the user in with JSON web token
      const token = jwt.sign(user.get({ plain: true }), process.env.JWT_SECRET)
      // send success response
      res.json({ success: "logged in", token });
    });
  });
});

module.exports = router;
