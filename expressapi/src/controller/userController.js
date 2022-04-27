const { userRepository } = require("../model/userRepository");
const user = new userRepository();
module.exports = {
  getAllUsers(req, res) {
    user.getUsers().then((result) => {
      res.status(200).json(result);
    });
  },
  getUserById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).text("Invalid user id");
      return;
    }
    user.getUserById(req.params.id).then((result) => {
      if (result.length === 0) {
        res.status(404).send("The user not found");
        return;
      }
      res.status(200).json(result);
    });
  },
  createUser(req, res) {
    const { name, age } = req.body;
    if (isNaN(age)) {
      res.status(400).send('"age" parameter must be an integer');
      return;
    }
    if (name.length === 0) {
      res.status(400).send('"name" parameter is empty');
      return;
    }
    user.createUser(name, age).then((result) => {
      res.status(201).json({ id: result["id"], name: name, age: age });
    });
  },
  updateUser(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid user id");
      return;
    }
    const { name, age } = req.body;
    user.updateUser(id, name, age).then((result) => {
      res.status(200).json(result);
    });
  },
  deleteUser(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid user id");
      return;
    }
    user.deleteUser(id).then((result) => {
      res.status(200).json(result);
    });
  },
};
