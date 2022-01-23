const cookieParser = require('cookie-parser');
const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");
const http = require("http");
const logger = require('morgan');
const path = require('path');

// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(app);

/* Middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
// app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);

app.get("/", (req, res) => {
  res.send("landing");
});

app.get("/search", (req, res) => {
  const body = `fields id, name, summary; search "destiny 2"; where version_parent = null;`;

  fetch("https://api.igdb.com/v4/games", {
    method: "post",
    body: body,
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: process.env.AUTHORIZATION,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  res.send("search");
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
