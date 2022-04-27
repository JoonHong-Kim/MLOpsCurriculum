const UserController = require("../controller/userController");

module.exports = (app) => {
  app.get("/user", UserController.getAllUsers);
  app.get("/user/:id", UserController.getUserById);
  app.post("/user", UserController.createUser);
  app.put("/user/:id", UserController.updateUser);
  app.delete("/user/:id", UserController.deleteUser);
};
