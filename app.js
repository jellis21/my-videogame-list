const http = require("http");
const express = require("express");
const app = express();
const fetch = require('node-fetch');

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("landing");
});

app.get("/search", (req, res) => {
  const body = `fields id, name, summary; search "destiny 2"; where version_parent = null;`;

  fetch('https://api.igdb.com/v4/games', {
          method: 'post',
          body: body,
          headers: {
                "Client-ID": "7gs9e0vhvxm1rc38a3323otdgw0g5w",
                Authorization: "Bearer ow0rr6woggladhfhtur83pfrilx8y5",
              }
      })
      .then(response => response.json())
      .then(data => console.log(data));

  res.send("search")

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
