const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter.js')

/* GET home page. */
const routes = [
  {
    path: "/users",
    route: userRouter
  }
]

routes.forEach((routeObj) => {
  router.use(routeObj.path, routeObj.route)
})

module.exports = router;
