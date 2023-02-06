const { genreSchema } = require("./genre");
const mongoose = require("mongoose");
const Joi = require("joi");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, min: 0, max: 255, required: true },
    dailyRentalRate: { type: Number, min: 0, max: 255, required: true },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });

  return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
