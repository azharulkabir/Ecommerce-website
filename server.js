const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files (CSS, JS, images) from a 'public' directory
app.use(express.static(__dirname));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/illiyeen';
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String },
    sizes: [{ type: String }],
    details: [String],
    description: String,
    images: [String] // Multiple images for product details
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// API Routes
app.get('/api/perfumes', async (req, res) => {
    console.log("GET /api/perfumes hit");
    try {
        const products = await Product.find({ category: 'Fragrance' }).sort({ code: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/platinum-polo', async (req, res) => {
    console.log("GET /api/products/platinum-polo hit");
    try {
        const products = await Product.find({ category: 'Platinum Polo Shirt' }).sort({ code: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:code', async (req, res) => {
    console.log(`GET /api/products/${req.params.code} hit`);
    try {
        const product = await Product.findOne({ code: req.params.code });
        if (!product) {
            console.log(`Product with code ${req.params.code} not found.`);
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Temporary route to get all categories
app.get('/api/debug/categories', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Temporary route to add a sample perfume
app.get('/api/debug/add-perfume', async (req, res) => {
    try {
        const perfume = new Product({
            name: "ILLIYEEN Signature Perfume",
            code: "P001",
            price: 2499,
            category: "Fragrance",
            image: "https://i.ibb.co/ZcsmS2S/photo-1617801003287-1a71d7792fdc.jpg",
            details: [
                "Eau de Parfum",
                "100ml",
                "For Men"
            ],
            description: "A captivating fragrance for the modern man. This signature scent from ILLIYEEN is a blend of woody and spicy notes, creating a timeless and sophisticated aroma."
        });
        await perfume.save();
        res.status(201).json({ message: 'Sample perfume added successfully', product: perfume });
    } catch (error) {
        // If the product already exists (unique code), send a message
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Product with this code already exists.' });
        }
        res.status(500).json({ error: error.message });
    }
});


// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML pages like polo.html
app.get('/:pageName.html', (req, res) => {
    res.sendFile(path.join(__dirname, req.params.pageName + '.html'));
});

// Serve product details page
app.get('/product/:code', (req, res) => {
    res.sendFile(path.join(__dirname, 'product-details.html'));
});

// Also handle direct access to product-details.html
app.get('/product-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'product-details.html'));
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${PORT} is already in use!\n`);
        console.log('Solutions:');
        console.log('1. Stop the other process using port 3000:');
        console.log('   Windows: netstat -ano | findstr :3000');
        console.log('   Then: taskkill /PID <PID_NUMBER> /F');
        console.log('\n2. Or use a different port:');
        console.log('   Set PORT environment variable: set PORT=3001');
        console.log('   Then run: npm start\n');
        process.exit(1);
    } else {
        throw err;
    }
});