const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes.js')

/* GET home page. */
const routes = [
  {
    path: "/user",
    route: userRoutes
  }
]

routes.forEach((routeObj) => {
  router.use(routeObj.path, routeObj.route)
})

module.exports = router;
