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

  const dataWithImage = (data) => {
    const newData = data.map((item) => {return item.id});
    console.log(newData)
    fetch("https://api.igdb.com/v4/covers", {
    method: "post",
    body: `fields url; where game = (${newData});`,
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: process.env.AUTHORIZATION,
    },
  })
    .then((response) => response.json())
    .then((finalData) => {
      
      for (let i = 0; i < data.length; i++) {
        data[i].url = finalData[i].url
      }
      res.send(data)
    });
  }

  fetch("https://api.igdb.com/v4/games", {
    method: "post",
    body: body,
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: process.env.AUTHORIZATION,
    },
  })
    .then((response) => response.json())
    .then((data) => dataWithImage(data));
    // .then((data) => res.send(data))

  // res.send("search");
});

module.exports = router;