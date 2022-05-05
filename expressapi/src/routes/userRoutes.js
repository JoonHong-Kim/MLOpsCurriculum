const { UserController } = require("../controller/userController");
const { userRepository } = require("../model/userRepository");
const express = require("express");
const router = express.Router();

const userRepo=new userRepository();
// console.log(userRepo.getUsers());
const controller = new UserController(userRepo);

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;