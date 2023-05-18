const {
  createTrip,
  getTrips,
  getTripById,
  deleteTrip,
  getTripByUserId,
} = require("./trip.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createTrip);
router.get("/:id", checkToken, getTripById);
router.get("/user/:user_id", checkToken, getTripByUserId);
router.post("/", checkToken, createTrip);
router.delete("/", checkToken, deleteTrip);
router.patch("/", checkToken, deleteTrip);

module.exports = router;
