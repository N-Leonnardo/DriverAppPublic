const pool = require("../../config/database");

module.exports = {
  createUser: (data, callBack) => {
    pool.query(
      `INSERT INTO users (first_name, last_name, email, password, phone)
                VALUES(?,?,?,?,?)`,
      [data.first_name, data.last_name, data.email, data.password, data.phone],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `SELECT id, first_name, last_name, email, phone FROM users`,
      [],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result);
      }
    );
  },
  getUserById: (id, callBack) => {
    pool.query(
      `SELECT id, first_name, last_name, email, phone FROM users WHERE id = ?`,
      [id],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ? WHERE id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.phone,
        data.id,
      ],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, result[0]);
        }
      }
    );
  },
  deleteUser: (id, callBack) => {
    pool.query(
      `DELETE FROM users WHERE id = ?`,
      [id],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result[0]);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
