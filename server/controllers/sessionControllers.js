const userService = require("../service/user.service")
const sessionService = require("../service/session.service")
const jwtUtils = require("../utils/jwt.utils")

exports.authenticateUser = async (req, res, next) => {
  const user = await userService.validatePassword(req.body)
  
  if(!user) return res.status(401).send("invalid email or password")
  if(user.status === "blocked") return res.sendStatus(406)
  const session = await sessionService.createSession(user._id)

  const accessToken = jwtUtils.signJwt({...user, sessionId: session._id}, '60000')

  const refreshToken = jwtUtils.signJwt({sessionId:  session._id}, '1d')

  return res.json({accessToken, refreshToken})
}

exports.getUserSession = async (req, res) => {
  const userId = res.locals.user._id
  const session = await sessionService.findSession({user: userId, valid: true })
  return res.send(session)
}

exports.deleteSession = async (req, res) => {
  const sessionId = res.locals.user.sessionId
  const updateSession = await sessionService.updateSession({_id: sessionId}, {valid: false})

  return res.sendStatus(200)
}