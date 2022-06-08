const SessionModel = require("../models/session.model");
const { verifyJwt, signJwt } = require("../utils/jwt.utils");
const { findUser } = require("./user.service");

exports.createSession = async (userId) => {
  const session = await SessionModel.create({user: userId})
  return session.toJSON();
}

exports.findSession = async (query) => {
  return await SessionModel.find(query).lean()
}

exports.updateSession = async (query, update) => {
  return SessionModel.updateOne(query, update);
}

exports.refreshAccessToken = async (refreshToken) => {
  const {decoded} = verifyJwt(refreshToken)
  if(!decoded || !decoded.sessionId) return false

  const session = await SessionModel.findById(decoded.sessionId)
  
  if(!session || !session.valid) return false
  const user = await findUser({_id: session.user})

  if(!user) return false
  const accessToken = signJwt({...user, sessionId: session._id}, "1h")
  return accessToken
}