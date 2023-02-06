const express = require('express');
const attributes = require('../routes/attributes');
const subattributes = require('../routes/subattributes');
// const customers = require('../routes/customers');
// const movies = require('../routes/movies');
// const rentals = require('../routes/rentals');
// const users = require('../routes/users');
// const auth = require('../routes/auth');
// const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/attributes', attributes);
  app.use('/api/subattributes', subattributes);
  // app.use('/api/customers', customers);
  // app.use('/api/movies', movies);
  // app.use('/api/rentals', rentals);
  // app.use('/api/users', users);
  // app.use('/api/auth', auth);
  app.use(error);
}