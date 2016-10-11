'use strict'

var mongoose = require('../io/mongoose')();
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
  mail: String,
  name: String,
  firstname: String,
  username: String,
  password: String,
  resetToken: String,
  gender: String,
  preference: String,
  bio: String,
  interest: [String],
  photos: [String],
  created_at: { type: Date, default: Date.now },
  lastlogin_at: {type: Date, default: Date.now },
  online: Boolean
});

userSchema.statics.getNewUser = function () {
  return new this();
};

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
