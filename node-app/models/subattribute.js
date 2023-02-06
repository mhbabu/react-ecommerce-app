const mongoose = require("mongoose");
const Joi = require("joi");

const subattributeSchema = new mongoose.Schema({
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
    default: "Active",
    required: true,
  },
  attribute: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attribute" }],
});

const Subattribute = mongoose.model("Subattribute", subattributeSchema);

function validateSubattribute(subattribute) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
    status: Joi.string().valid("Active", "Inactive"),
    attributeId: Joi.objectId().required(),
  });

  return schema.validate(subattribute);
}

module.exports.Subattribute = Subattribute;
module.exports.subattributeSchema = subattributeSchema;
module.exports.validate = validateSubattribute;
