const express = require('express');
const app = express();
const path = require('path');
const Product = require('./Model/Products');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
mongoose
  .connect('mongodb://localhost:27017/shopFarm3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch((err) => {
    console.log('MongoDB got an error!');
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));

app.get('/product', async (req, res) => {
  const products = await Product.find({});
  res.render('./product/index', { products });
});

app.get('/product/new', (req, res) => {
  res.render('./product/new');
});

app.post('/product', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

app.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('./product/show', { product });
});

app.get('/product/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('./product/edit', { product });
});

app.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body);
  res.redirect(`/product/${id}`);
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
