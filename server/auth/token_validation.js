const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid Token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied! Unauthorized user",
      });
    }
  },
  checkLoggedIn: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token",
          });
        } else {
          return res.json({
            success: 1,
            message: "User logged in",
            userId: decoded.result[0].id,
          });

          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied! Unauthorized user",
      });
    }
  },
};
