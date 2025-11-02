const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from DevOps Capstone Backend!');
});

server.listen(5000);

