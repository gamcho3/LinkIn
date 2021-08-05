const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    res.status(401).json({ msg: "no token auth denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwt")); //토큰화된 id객체 해제

    req.user = decoded.user; //전달할 req.user에 저장
    next(); //api/auth에 데이터를 넘겨줌
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
