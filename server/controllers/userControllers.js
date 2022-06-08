const userService = require('../service/user.service')
const UserModel = require('../models/user.model')

exports.registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
   
    if(user) {
      res.json({loggedIn: true, user: {user}})
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.sendUsers = async (req, res) => {
  const data = await UserModel.find();
  if(data) {
    return res.status(200).json(data)
  }
  res.status(400)
  throw new Error("no users in database")
}

exports.updateUser = async (req, res) => {
  const user = await userService.updateUsersData(req.body);
  if(user) {
    return res.json({_id: user.id})
  }
  res.status(400)
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUsers(req.body)
    return res.json({message: 'User has been deleted'})

  } catch(error) {
    res.status(400)   
  }
}

exports.sendLoggedInUser = async (req, res) => {
  const userId = res.locals.user._id
  const user = await userService.findUser({_id: userId})
  if(user) {
    res.send({loggedIn: true, user: {...user, password: ''}})
  } else {
    res.status(400).send({loggedIn: false})
  }
}


