# NextJS Middleware POST Request Hanging

## Overview
`POST` requests with a request body in this setup will hang indefinitely
(or until timeout) when passed through the NextJS middleware.

## Testing
Clone the repo and run `npm install`. Serve using `node server.js`. The server
runs on `http://localhost:3000`.

The repository as-is will run the NextJS middleware on all routes except for
`/update`. Attempt to (using Postman, the same behaviour is not exhibited in
`curl` which may be indicative of the underlying issue) to make the following
queries:
```sh
#expected behaviour: 404
#actual behaviour: 404
POST http://localhost:3000/update     #with an empty body

#expected behaviour: 404
#actual behaviour: 404
POST http://localhost:3000/update     #with any valid json body

#expected behaviour: 404
#actual behaviour: 404
POST http://localhost:3000/about      #with an empty body

#expected behaviour: 404
#actual behaviour: request hangs indefinitely in Postman (the main issue)
POST http://localhost:3000/about      #with any valid json body
```
The final test case is the problematic issue. For us, we are attempting to
use `next-auth` to update the session on the server from our React front-end
using `useSession`, which queries `POST /api/auth/session`. On our front-end,
this results in the UI freezing when `await update()` is called.
