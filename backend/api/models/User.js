/**
 * User.js
 *
 * @description :: User object
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      unique: true,
      email: true
    },

    password: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 72
    },

    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function() {
      let obj = this.toObject();
      // Do not expose password hash to the world
      delete obj.password;
      return obj;
    },

    checkPassword: function (password, cb) {
      bcrypt.compare(password, this.password, cb);
    },

  },

  /**
   * Hash password before storing new user
   */
  beforeCreate: function (user, cb) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) return cb(err);
      user.isAdmin = false; // force not admin
      user.password = hash;
      cb(); // Continue creation
    });
  }

};
