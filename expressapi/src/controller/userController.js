const { userRepository } = require("../model/userRepository");
const userRepo=new userRepository();

class UserController {
  constructor({userRepo}) {
    this.user = userRepo;
  }
  async getAllUsers(req, res) {
    this.user.getUsers().then((result) => {
      res.status(200).json(result);
    });
  }
  async getUserById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid user id");
      return;
    }
    this.user.getUserById(req.params.id).then((result) => {
      if (result.length === 0) {
        res.status(404).send("The user not found");
        return;
      }
      res.status(200).json(result);
    });
  }
  async createUser(req, res) {
    const { name, age } = req.body;
    if (isNaN(age)) {
      res.status(400).send('"age" parameter must be an integer');
      return;
    }
    if (name.length === 0) {
      res.status(400).send('"name" parameter is empty');
      return;
    }
    const result = this.user.createUser(name, age);
    res.status(201).send(result);
  }
  async updateUser(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid user id");
      return;
    }
    const { name, age } = req.body;
    this.user.updateUser(id, name, age).then((result) => {
      res.status(200).json(result);
    });
  }
  async deleteUser(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid user id");
      return;
    }
    this.user.deleteUser(id).then((result) => {
      res.status(200).json(result);
    });
  }
}

module.exports = { UserController };
