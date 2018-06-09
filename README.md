This sample project illustrates a React/Redux application with optional server-side rendering bundled with Webpack.

Features

* React
* Redux
* Universal rendering (optional)
* Webpack 2
* Development mode: hot reload for React components, hot reload for Redux reducers and actions

DB: Postgres (psql.scripts & app-api.js has the details)


Quick Start
===========

* `npm install`
* `npm start`
* wait for it to finish (it will say "Now go to http://127.0.0.1:3000" in the end)
* go to `http://localhost:3000` for web
* go to 'http://localhost:3003` for api


Summary
=======

This application consists of both frontend UI and backend APIs

*Backend APIs*

POST http://localhost:3003/subscribe
 subscriberId: int
 publisherId: int

GET http://localhost:3003/users/${:int}}

GET http://localhost:3003/subscriptions/${:int}}

POST http://localhost:3003/login
  name: string
  password: string



