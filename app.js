const http = require('http');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('landing')
})

app.get('/search', (req, res) => {
  res.send('search')
})





server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});