require("dotenv").config();
const cookieParser = require('cookie-parser');
const express = require("express");
const fetch = require("node-fetch");
const http = require("http");
const logger = require('morgan');
const path = require('path');

/* Import routes */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const listsRouter = require("./routes/lists");
const searchRouter = require("./routes/search");
const socialRouter = require("./routes/social");

const app = express();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const server = http.createServer(app);

/* Middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/lists", listsRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/social", socialRouter);

/* Review if needed */
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
  console.log(`Server running`);
});
