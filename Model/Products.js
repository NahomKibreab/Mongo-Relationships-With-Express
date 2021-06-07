const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
  name: String,
  price: Number,
  category: {
    type: String,
    enum: ['Diary', 'Fruits', 'Vegetables'],
  },
});

module.exports = mongoose.model('Product', productSchema);
