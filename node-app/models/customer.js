const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      minlength: 11,
      maxlength: 11,
      required: true,
    },
    isGold: { type: Boolean, default: false },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
    phone: Joi.string().trim().min(11).max(11).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
