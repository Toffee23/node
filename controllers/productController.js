const { Product, validate } = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');


exports.getAllProduct = catchAsync(async (req, res) => {
    const products = await Product.find().sort("categories");
    res.send(products);
});

exports.createProduct = catchAsync(async (req, res) => {
    const { error  } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = await new Product({
        category: req.body.category,
        subCategories: req.body.subCategories
    });

    product = await product.save();    

    res.send(product);
    
});