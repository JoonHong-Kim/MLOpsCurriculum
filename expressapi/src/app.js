const express = require("express");
// const app = express();
const makeApp = require("./routes/userRoutes");
const { userRepository } = require("./model/userRepository");
const user = new userRepository();

const app = makeApp(user);
const port = process.env.PORT || 3000;
app.set("port", port);
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});



module.exports = { app };
