const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'user name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  address: {
    type: Array
  },
  phone: {
    type: String,
    required: [true, 'phone number is required']
  },
  usertype: {
    type: String,
    required: [true, 'usertype is required'],
    enum: ['client', 'admin', 'vendor', 'driver'],
    default: 'client'
  },
  profile: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  },
  answer: {
    type: String,
    required: [true, "Answer is required"]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);