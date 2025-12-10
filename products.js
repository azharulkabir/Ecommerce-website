const express = require('express');
const router = express.Router();
const Product = require('./product.js'); // Corrected path

// Get all Platinum Polo Shirts
router.get('/platinum-polo', async (req, res) => {
    try {
        const products = await Product.find({ 
            category: 'Platinum Polo Shirt' 
        }).sort({ code: 1 });
        console.log(`Found ${products.length} Platinum Polo Shirts`);
        res.json(products);
    } catch (error) {
        console.error('Error fetching Platinum Polo Shirts:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get product by code
router.get('/:code', async (req, res) => {
    try {
        const code = req.params.code;
        console.log('Fetching product with code:', code);
        
        const product = await Product.findOne({ code: code });
        if (!product) {
            console.log('Product not found for code:', code);
            return res.status(404).json({ error: 'Product not found', code: code });
        }
        
        console.log('Product found:', product.name);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all products (for admin or general use)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ code: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;