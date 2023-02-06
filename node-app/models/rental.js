const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
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
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          trim: true,
          minlength: 3,
          maxlength: 255,
          required: true,
        },
        dailyRentalRate: { type: Number, min: 0, max: 255, required: true },
      }),
      required: true,
    },
    dateOut: { type: Date, default: Date.now, required: true },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
