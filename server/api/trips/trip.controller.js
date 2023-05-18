const {
  createTrip,
  getTripById,
  deleteTrip,
  updateTrip,
  getTripByUserId,
} = require("./trip.service");

module.exports = {
  createTrip: (req, res) => {
    const body = req.body;
    createTrip(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getTripById: (req, res) => {
    const id = req.params.id;
    getTripById(id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getTripByUserId: (req, res) => {
    const user_id = req.params.user_id;
    getTripByUserId(user_id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateTrip: (req, res) => {
    const body = req.body;
    updateTrip(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfully",
      });
    });
  },
  deleteTrip: (req, res) => {
    const trip_id = req.body.id;
    deleteTrip(trip_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },
};
