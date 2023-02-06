const mongoose = require("mongoose");
const Joi = require("joi");

const Attribute = mongoose.model(
  "Attribute",
  new mongoose.Schema({
    name: {
      
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: true,
    },
  })
);

function validateAttribute(attribute) {
  const schema = Joi.object({
    name: Joi.string().trim().min(4).max(255).required(),
    status: Joi.string().valid("Active", "Inactive"),
  });

  return schema.validate(attribute);
}

module.exports.Attribute = Attribute;
module.exports.validate = validateAttribute;
