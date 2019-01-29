const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactsListSchema = new Schema({
  name: String,
  createdBy: String,
  createdAt: String,
  type: String,
  category: String,
});

module.exports = mongoose.model('ContactsList', ContactsListSchema);
