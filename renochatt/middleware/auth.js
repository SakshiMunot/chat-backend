const jwt = require("jsonwebtoken");
const config = process.env;
const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log(token)
    console.log(config)
    const userInfo = jwt.verify(token, config.JWT_KEY);
    req.headers.user = userInfo;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
