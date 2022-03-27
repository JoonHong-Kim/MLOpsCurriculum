const { pool } = require("./db");

class UserRepository {
  constructor() {}
  async getUsers() {
    return new Promise((res, rej) => {
      pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (error) {
          rej(error);
        } else {
          res(results.rows);
        }
      });
    });
  }
  async getUserById(id) {
    return new Promise((res, rej) => {
      pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            rej(error);
          } else {
            res(results.rows);
          }
        }
      );
    });
  }

  async createUser(name, age) {
    return new Promise((res, rej) => {
      pool.query(
        "INSERT INTO users ( name, age) VALUES ( $1, $2)",
        [name, age],
        (error, results) => {
          if (error) {
            rej(error);
          } else {
            res(results.rows);
          }
        }
      );
    });
  }

  async updateUser(id, name, age) {
    return new Promise((res, rej) => {
      pool.query(
        "UPDATE users SET name = $1, age = $2 WHERE id = $3",
        [name, age, id],
        (error, results) => {
          if (error) {
            rej(error);
          } else {
            res(results.rows);
          }
        }
      );
    });
  }

  async deleteUser(id) {
    return new Promise((res, rej) => {
      pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
          rej(error);
        } else {
          res(results.rows);
        }
      });
    });
  }
}

module.exports = { UserRepository };
