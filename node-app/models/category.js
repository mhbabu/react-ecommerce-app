const mongoose = require("mongoose");
const Joi = require("joi");

const category = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  },
});

const Category = mongoose.model("Category", category);

function validateCategory(Category) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
  });

  return schema.validate(Category);
}

module.exports.Category = Category;
module.exports.category = category;
module.exports.validate = validateCategory;
