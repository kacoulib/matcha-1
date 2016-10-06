'use strict'

var mongoose = require('../io/mongoose')();
var Schema = mongoose.Schema;

var userSchema = new Schema({
  mail: String,
  name: String,
  firstname: String,
  username: String,
  password: String,
  gender: String,
  preference: String,
  bio: String,
  interest: [String],
  photos: [String],
  created_at: { type: Date, default: Date.now },
  lastlogin_at: {type: Date},
  online: Boolean,
  confirmed: { type: Boolean, default: false }
});

userSchema.statics.getNewUser = function () {
  return new this();
};

module.exports = mongoose.model('User', userSchema);
