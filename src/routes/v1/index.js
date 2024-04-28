const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')

/* GET home page. */
const routes = [
  {
    path: "/user",
    route: userRoutes
  },
  {
    path: "/auth",
    route: authRoutes
  },
]

routes.forEach((routeObj) => {
  router.use(routeObj.path, routeObj.route)
})

module.exports = router;
