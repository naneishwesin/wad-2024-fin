const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  memberNumber: { type: Number, unique: true, required: true },
  interests: { type: String, required: true } // e.g. movies, football, gym, gaming
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
