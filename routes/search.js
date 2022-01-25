const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const models = require("../models");
const checkAuth = require("../checkAuth");

// GET /api/v1/search/
router.post("/", (req, res) => {
  const body = `fields id, name, summary; search "${req.body.searchValue}"; where version_parent = null;`;

  fetch("https://api.igdb.com/v4/games", {
    method: "post",
    body: body,
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: process.env.AUTHORIZATION,
    },
  })
    .then((response) => response.json())
    .then((data) => res.send(data));

  // res.send("search");
});

module.exports = router;