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
app.get("/user/:id", async (req,res)=>{
    const id = parseInt(req.params.id);
    const result = await user.getUserById(id);
    res.status(200).json(result);
});
app.post("/user", async (req,res)=>{
    const {name,age} = req.body;
    const result = await user.createUser(name,age);
    res.status(201).json(result);
});
app.put("/user/:id", async (req,res)=>{
  const id = parseInt(req.params.id);
    const {name,age} = req.body;
    const result = await user.updateUser(id,name,age);
    res.status(200).json(result);  
});
app.delete("/user/:id", async (req,res)=>{
    const id = parseInt(req.params.id);
    const result = await user.deleteUser(id);
    res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports={app};