const { pool } = require("./db");

const execute = async (query) => {
  try {
    await pool.connect(); // gets connection
    await pool.query(query); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};
const text = `
      CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          age int NOT NULL
      );`;

execute(text).then((result) => {
  if (result) {
    console.log("Table created");
    process.exit(0);
  }
  else{
    process.exit(1);
  }
});
