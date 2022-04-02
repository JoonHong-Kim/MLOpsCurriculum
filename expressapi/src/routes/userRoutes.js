const { userRepository } = require("../model/userRepository");
const user = new userRepository();

module.exports = (app) => {
  app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
  });
  app.get("/user", async (req, res) => {
    const result = await user.getUsers();
    res.status(200).json(result);
  });

  app.get("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400);
    }
    const result = await user.getUserById(id);
    res.status(200).json(result);
  });

  app.post("/user", async (req, res) => {
    const { name, age } = req.body;
    if (isNaN(name) || isNaN(age)) {
      res.status(400);
    }
    const result = await user.createUser(name, age);
  });
  app.put("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400);
    }
    const { name, age } = req.body;
    if (isNaN(name) || isNaN(age)) {
      res.status(400);
    }
    const result = await user.updateUser(id, name, age);
    console.log(result)
    res.status(200).json({"id":id, "name":name, "age":age});
  });
  app.delete("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400);
    }
    const result = await user.deleteUser(id);
    res.status(200).json(result);
  });
};