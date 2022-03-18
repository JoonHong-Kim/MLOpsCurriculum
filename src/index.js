const express = require("express");
const app = express();
const db = require("./queries");
const port = process.env.PORT || 3000;



app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/user", db.getUsers);
app.get("/user/:id", db.getUserById);
app.post("/user", db.createUser);
app.put("/user/:id", db.updateUser);
app.delete("/user/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
