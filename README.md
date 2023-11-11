# NextJS Middleware POST Request Hanging

## Overview
`POST` requests with a request body in this setup will hang indefinitely
(or until timeout) when passed through the NextJS middleware.

## Testing
Clone the repo and run `npm install`. Serve using `node index.js`. The server
runs on `http://localhost:3000`.

The repository as-is will run the NextJS middleware on all routes except for
`/update`. Attempt to make the following HTTP requests:
queries:
```sh
#expected behaviour: 404
#actual behaviour: 404
curl -X POST http://localhost:3000/update -H "Content-Type: application/json"

#expected behaviour: 404
#actual behaviour: 404
curl -X POST http://localhost:3000/update -H "Content-Type: application/json" -d ''
curl -X POST http://localhost:3000/update -H "Content-Type: application/json" -d '{}'

#expected behaviour: 404
#actual behaviour: 404
curl -X POST http://localhost:3000/about -H "Content-Type: application/json"

#expected behaviour: 404
#actual behaviour: request hangs indefinitely in Postman (the main issue)
curl -X POST http://localhost:3000/about -H "Content-Type: application/json" -d ''
curl -X POST http://localhost:3000/about -H "Content-Type: application/json" -d '{}'
```
For further testing, uncomment the commented `matcher` line in `middleware.js`
to match all routes to enter the middleware and attempt to `POST` to `/update`
again. The request with no body should return `404`, but the request with
a body hangs indefinitely.

The final test case is the problematic issue. For us, we are attempting to
use `next-auth` to update the session on the server from our React front-end
using `useSession`, which queries `POST /api/auth/session`. On our front-end,
this results in the UI freezing when `await update()` is called.

## Other Info
```
$ npx next info

Operating System:
  Platform: darwin
  Arch: arm64
  Version: Darwin Kernel Version 22.5.0: Thu Jun  8 22:21:34 PDT 2023; root:xnu-8796.121.3~7/RELEASE_ARM64_T8112
Binaries:
  Node: 20.8.0
  npm: 10.1.0
  Yarn: 1.22.19
  pnpm: N/A
Relevant Packages:
  next: 14.0.3-canary.2
  eslint-config-next: N/A
  react: 18.2.0
  react-dom: 18.2.0
  typescript: N/A
Next.js Config:
  output: N/A
```
