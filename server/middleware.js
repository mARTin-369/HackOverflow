require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.ROLES = {
  ADMIN: 2022,
  PATIENT: 3023,
  DOCTOR: 4024,
  RETAILER: 5025,
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader)
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "unauthenticated" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(err)
    if (err)
      return res.status(403).json({ message: "token invalid or expired" });
    req.user = user;
    next();
  });
};

exports.userAuth = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      // console.log(req.user.role, role)
      return res.status(401).json({
        message: "You are not Authorized",
      });
    }
    next();
  };
};
