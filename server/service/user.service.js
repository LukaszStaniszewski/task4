const {omit} = require("lodash")
const UserModel = require('../models/user.model')

exports.createUser = async (input) => {
  try {
    const user = await UserModel.create(input)
    return omit(user.toJSON(), 'password')
  } catch (error) {
    throw new Error(error)
  }
}

exports.validatePassword = async({email, password}) => {
  const user = await UserModel.findOne({email})
  if(!user) return false
  const isValid = await user.comparePassword(password)
  if(!isValid) return false
  return omit(user.toJSON(), 'password', 'email')

}

exports.updateUsersData = async(usersArray) => {
 const updatedUsers = await Promise.all(usersArray.map(userToUpdate => {
    let user = UserModel.findByIdAndUpdate(userToUpdate._id, userToUpdate);
    return user
  }))
  return updatedUsers
}

exports.deleteUsers = async(usersArray) => {
  await UserModel.deleteMany(...usersArray)
  return true
}

exports.findUser = async (query) => {
  return UserModel.findOne(query).lean()
}