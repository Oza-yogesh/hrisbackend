const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY_JWT;
const expiresIn = process.env.TOKEN_EXPIRATION;

const generateToken = async (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

const validateToken = (req, res, next) => {
  const token_data = req.headers.authorization;
  const token = token_data.split(" ")[1];
  console.log(req.headers.authorization);

  if (!token) {
    return res.status(401).json("Unauthorized. No token provided");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json("Unauthorized. Invalid token");
    }

    req.user = decoded.user;
    next();
  });
};

module.exports = { generateToken, validateToken };
