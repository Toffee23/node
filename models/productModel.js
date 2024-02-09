const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
   category: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
   },
   subCategories: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
   }
});


const Product =  mongoose.model('Product',  productSchema);


function validateProduct(product) {
    const schema = {
      category: Joi.string().min(3).required(),
       subCategories: Joi.string().min(3).required()
    }

    return Joi.validate(product, schema);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validate = validateProduct;