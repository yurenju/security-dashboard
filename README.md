# Security Dashboard [![Build Status](https://travis-ci.org/yurenju/security-dashboard.svg?branch=master)](https://travis-ci.org/yurenju/security-dashboard)

This is a coding exercise project for security dashboard. it connect to a heroku server by websocket to get realtime data for alarm event. once user click an event record, that record will be expanded and mark as viewed.

since this is a demo project, there is no real data traffic. you can open this website:

https://yurenju.github.io/security-dashboard/

Open a terminal and type:
```shell
curl -X POST https://security-dashboard-backend.herokuapp.com/create/5
```

to create 5 alarm events and send to client via websocket.

## Scripts

* `npm install` to install dependencies
* `npm start` to run a develop server
* `npm test` to run all tests
* `npm test -- --coverage` to get coverage report
* `npm run build` to get a production optimized build in `build/` directory

## Travis-CI

you can visit travis page to see every single build for testing and deploy. after test success, production build will be deployed to `gh-pages` via travis.

https://travis-ci.org/yurenju/security-dashboard
