require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER || "jhkim",
  database: process.env.DB_NAME || "users",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
});
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
  }
});
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, age } = request.body;
  pool.query(
    "INSERT INTO users ( name, age) VALUES ( $1, $2)",
    [name, age],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`User added with success! name: ${name}, age: ${age}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, age } = request.body;
  pool.query(
    "UPDATE users SET name = $1, age = $2 WHERE id = $3",
    [name, age, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
