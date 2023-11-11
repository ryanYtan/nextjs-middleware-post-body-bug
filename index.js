const express = require('express');
const next = require('next');

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.set('PORT', PORT);
  expressApp.all('*', (req, res) => {
    console.log(`server  Entered express "all" handler, passing to Next handler  ${req.method}:${req.url}`);
    return handle(req, res);
  });
  expressApp.listen(PORT, () => {
    console.log(`@Server listening on port ${PORT}`);
  });
});
