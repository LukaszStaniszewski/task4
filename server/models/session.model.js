const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  valid: {
    type: Boolean, 
    default: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    immutable: true
  }
})

const SessionModel = mongoose.model("Session", sessionSchema)

module.exports = SessionModel;