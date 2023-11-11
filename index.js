const express = require('express');
const next = require('next');
const spdy = require('spdy')
const fs = require('fs')

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.set('PORT', PORT);
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });
  const server = spdy.createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    },
    expressApp
  );

  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});
