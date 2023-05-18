const {
  registerUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
  checkUserLoggedIn,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken, checkLoggedIn } = require("../../auth/token_validation");

router.post("/", registerUser);
router.post("/login", login);
router.get("/", checkToken, getUsers);
router.get("/checkLoggedIn", checkLoggedIn);
router.get("/:id", checkToken, getUserById);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);

module.exports = router;
