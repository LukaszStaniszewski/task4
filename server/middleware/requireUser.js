const requreUser = (req, res, next) => {
  const user = res.locals.user
  if (!user) return res.sendStatus(403); 
  return next()
}

module.exports = requreUser;