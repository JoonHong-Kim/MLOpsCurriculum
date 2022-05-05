const UserController = require("../controller/userController");
const userRoutes =require("../routes/userRoutes");
var express = require('express');
var router = express.Router();
const routes=new userRoutes();
const controller=new UserController(routes); 

module.exports = (app) => {
  app.get("/user", controller.getAllUsers);
  app.get("/user/:id", controller.getUserById);
  app.post("/user", controller.createUser);
  app.put("/user/:id", controller.updateUser);
  app.delete("/user/:id", controller.deleteUser);
};
