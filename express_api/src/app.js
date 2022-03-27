const express = require("express");
const app = express();
const userApi = require("./model/userRepository");
const port = process.env.PORT||3000;
const user = new userApi.UserRepository();
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/user",async (req,res)=> {
    const result=await user.getUsers();
    res.status(200).json(result);

});
app.get("/user/:id", user.getUserById);
app.post("/user", user.createUser);
app.put("/user/:id", user.updateUser);
app.delete("/user/:id", user.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports={app};