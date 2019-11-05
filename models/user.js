/* eslint-disable arrow-parens */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        console.log(validator.isURL(v));
        return validator.isURL(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
