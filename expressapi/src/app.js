const express = require("express");
const app = express();
const user = require("./routes/userRoutes");
const port = process.env.PORT || 3000;
app.use(express.urlencoded());
app.use(express.json());

user(app);
app.set("port", port);
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});
app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});
module.exports = { app };
