const pool = require("../../config/database");

module.exports = {
  createTrip: (data, callBack) => {
    pool.query(
      `INSERT INTO trips (pickup, dropoff, price, date, user_id)
                    VALUES(?,?,?,?,?)`,
      [data.pickup, data.dropoff, data.price, data.date, data.user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  // getTrips: (callBack) => {
  //   pool.query(`SELECT * FROM trips`, [], (error, result, fields) => {
  //     if (error) {
  //       return callBack(error);
  //     }
  //     return callBack(null, result);
  //   });
  // },
  getTripById: (id, callBack) => {
    pool.query(
      `SELECT * FROM trips WHERE trip_id = ?`,
      [id],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result[0]);
      }
    );
  },
  getTripByUserId: (id, callBack) => {
    pool.query(
      `SELECT * FROM trips WHERE user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteTrip: (id, callBack) => {
    pool.query(
      `DELETE FROM trips WHERE trip_id = ?`,
      [id],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result[0]);
      }
    );
  },
  updateTrip: (data, callBack) => {
    pool.query(
      `UPDATE users SET pickup = ?, dropoff = ?, price = ?, date = ?, user_id = ? WHERE trip_id = ?`,
      [
        data.pickup,
        data.dropoff,
        data.price,
        data.date,
        data.user_id,
        data.trip_id,
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
};
