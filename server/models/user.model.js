const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema  = new mongoose.Schema({
  username: {
    type: String, 
    required: [true, 'Username cannot be blank'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be blank'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true
  },
  lastLogin: {
    type: Date,
    default: () => Date.now(),
  },
  status: {
    type: String,
    default: 'active'
  }
})


userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  return next()
})

userSchema.pre('save', function(next) {
  this.lastLogin = Date.now();
  next()
})

userSchema.methods.comparePassword = async function(plaintextPassword) {
  const result = await bcrypt.compare(plaintextPassword, this.password)
  .catch(e => false)
  return result
}

const UserModel =  mongoose.model('User', userSchema);
module.exports = UserModel