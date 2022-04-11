const express = require("express");

module.exports = function (user) {
  const app = express();
  app.use(express.urlencoded());
  app.use(express.json());
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
  });
  app.get("/", (request, response) => {
    response.json({ status: "OK" });
  });
  app.get("/user", async (req, res) => {
    const result = await user.getUsers();
    res.status(200).json(result);
  });

  app.get("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(Number(id))) {
      res.status(400).send("Invalid user id");
      return;
    }
    const result = await user.getUserById(id);
    console.log(result)
    if (result.length === 0) {
      res.status(404).send("The user not found");
      return;
    }
    res.status(200).json(result);
  });

  app.post("/user", async (req, res) => {
    const { name, age } = req.body;
    if (!Number.isInteger(Number(age))) {
      res.status(400).send('\"age\" parameter must be an integer');
      return;
    }
    if (name.length === 0) {
      res.status(400).send('"name" parameter is empty');
      return;
    }

    const result = await user.createUser(name, age);
    res.status(201).json({ id: result["id"], name: name, age: age });
  });
  app.put("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (!Number.isInteger(Number(id))) {
      res.status(400).send("Invalid user id");
      return;
    }
    const { name, age } = req.body;
    const result = await user.updateUser(id, name, age);
    res.status(200).json(result);
  });
  app.delete("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(Number(id))) {
      res.status(400).send("Invalid user id");
      return;
    }
    const result = await user.deleteUser(id);
    res.status(200).json(result);
  });
  return app;
};
