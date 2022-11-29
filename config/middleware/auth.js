const { verify, decode } = require("jsonwebtoken");
const auth = {};

auth.checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.split(" ")[1];
    verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({
          ...err,
          success: false,
          status: 401,
        });
      } else {
        req.user_id = decode.id
        next();
      }
    });
  } else {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Token not found",
    });
  }
};

auth.checkRefreshToken = async (req, res, next) => {
  const authorization = req.get("authorization");
  const { refreshToken } = req.body;

  if (refreshToken && authorization) {
    const accessToken = authorization?.split(" ")[1];
    const decodeAccessToken = decode(accessToken, process.env.JWT_KEY);
    verify(accessToken, process.env.JWT_KEY, (errAccessToken) => {
      if (errAccessToken) {
        verify(refreshToken, process.env.JWT_KEY_REFRESH, (err, decode) => {
          if (err) {
            return res.status(401).json({
              ...err,
              success: false,
              status: 401,
            });
          } else if (decode?.username !== decodeAccessToken?.username) {
            return res.status(401).json({
              success: false,
              status: 401,
              message: "Invalid token",
            });
          } else {
            req.user_id = decode.id
            req.locales = {
              username: decode.username,
              id: decode.id,
            };
            next();
          }
        });
      } else {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Current token is still valid",
          accessToken,
          refreshToken,
        });
      }
    });
  } else {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Token not found",
    });
  }
};

auth.checkTokenOptional = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.split(" ")[1];
    verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({
          ...err,
          success: false,
          status: 401,
        });
      } else {
        req.user_id = decode.id
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = auth;
