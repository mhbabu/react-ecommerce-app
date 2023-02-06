const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");

let validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, minlength: 5, maxlength: 255, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().trim().min(5).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().trim().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
