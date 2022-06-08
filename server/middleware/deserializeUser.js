const jwtUtils = require("../utils/jwt.utils")
const { refreshAccessToken, updateSession } = require("../service/session.service")

const deserializeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const accessToken = authHeader && authHeader.split(" ")[1].trim()
  const refreshToken = req.headers["x-refresh"]

  if (!accessToken) return next();
  const {decoded, expired, status} = jwtUtils.verifyJwt(accessToken);

  if(status && status === "blocked") {
    await updateSession({_id: decoded.sessionId}, {valid: false})
    return next()
  }

  if(decoded) {
    res.locals.user = decoded; 
    console.log("resssss", decoded)
    return next()
  }
  console.log(expired)
  console.log(2)
  if(expired && refreshToken) {
    console.log("hit")
    const newAccessToken = await refreshAccessToken(refreshToken)
  
    if(newAccessToken) {
      res.setHeader("x-access-token", newAccessToken)
    }
    const result = jwtUtils.verifyJwt(newAccessToken)
    res.locals.user = result.decoded
    return next()

  }
  return next()
}

module.exports = deserializeUser