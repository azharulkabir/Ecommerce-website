const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/illiyeen';

// Product Schema (same as in server.js)
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
    images: [String]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Sample Perfumes Data with local images that exist in the directory
const perfumes = [
    {
        name: "ILLIYEEN Signature Pour Homme",
        code: "PERF001",
        price: 2499,
        category: "Fragrance",
        image: "/photo-1617801003287-1a71d7792fdc.jpg",
        details: [
            "Eau de Parfum",
            "100ml",
            "For Men",
            "Long Lasting"
        ],
        description: "A captivating fragrance for the modern man. This signature scent blends woody and spicy notes, creating a timeless and sophisticated aroma."
    },
    {
        name: "ILLIYEEN Royal Oud",
        code: "PERF002",
        price: 3499,
        category: "Fragrance",
        image: "/2420026__4_5__20240903061724313_width_1024.jpg",
        details: [
            "Eau de Parfum",
            "100ml",
            "Unisex",
            "Premium Quality"
        ],
        description: "An exotic blend of oud and amber, creating a rich and luxurious fragrance that captivates the senses."
    },
    {
        name: "ILLIYEEN Fresh Citrus",
        code: "PERF003",
        price: 1999,
        category: "Fragrance",
        image: "/2420022__4_5__20240903095112239.jpg",
        details: [
            "Eau de Toilette",
            "75ml",
            "For Men & Women",
            "Fresh & Energizing"
        ],
        description: "A refreshing citrus fragrance with notes of bergamot, lemon, and orange. Perfect for everyday wear."
    },
    {
        name: "ILLIYEEN Midnight Rose",
        code: "PERF004",
        price: 2799,
        category: "Fragrance",
        image: "/2420029__4_5__20240903061753662.jpg",
        details: [
            "Eau de Parfum",
            "100ml",
            "For Women",
            "Romantic & Elegant"
        ],
        description: "A romantic floral fragrance featuring rose, jasmine, and vanilla. Perfect for special occasions."
    },
    {
        name: "ILLIYEEN Ocean Breeze",
        code: "PERF005",
        price: 2299,
        category: "Fragrance",
        image: "/250609__4_5__20250624062419757_width_1024.jpg",
        details: [
            "Eau de Toilette",
            "100ml",
            "For Men",
            "Aquatic & Fresh"
        ],
        description: "An aquatic fragrance with marine notes and fresh bergamot. Evokes the feeling of ocean breeze."
    },
    {
        name: "ILLIYEEN Velvet Musk",
        code: "PERF006",
        price: 2999,
        category: "Fragrance",
        image: "/244617__4_5__20250415120450756_width_1024.jpg",
        details: [
            "Eau de Parfum",
            "100ml",
            "Unisex",
            "Warm & Sensual"
        ],
        description: "A warm and sensual musk fragrance with hints of vanilla and sandalwood. Perfect for evening wear."
    },
    {
        name: "ILLIYEEN Golden Amber",
        code: "PERF007",
        price: 3299,
        category: "Fragrance",
        image: "/233039_1_4___5__20240815134311831.jpg",
        details: [
            "Eau de Parfum",
            "100ml",
            "For Women",
            "Luxurious & Warm"
        ],
        description: "A luxurious amber fragrance with notes of honey, vanilla, and patchouli. Warm and inviting."
    },
    {
        name: "ILLIYEEN Sport Energy",
        code: "PERF008",
        price: 1799,
        category: "Fragrance",
        image: "/233040back_1_4___5__20240815134311192.jpg",
        details: [
            "Eau de Toilette",
            "75ml",
            "For Men",
            "Fresh & Sporty"
        ],
        description: "An energizing sporty fragrance with citrus and mint notes. Perfect for active lifestyle."
    }
];

// Seed Function
async function seedPerfumes() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected');

        console.log('\nClearing existing perfumes...');
        const deleteResult = await Product.deleteMany({ category: 'Fragrance' });
        console.log(`✅ Removed ${deleteResult.deletedCount} existing perfumes`);

        console.log('\nAdding new perfumes...');
        const insertedPerfumes = await Product.insertMany(perfumes);
        console.log(`✅ Successfully added ${insertedPerfumes.length} perfumes!`);

        console.log('\n📦 Perfumes added:');
        insertedPerfumes.forEach(perfume => {
            console.log(`   - ${perfume.name} (${perfume.code}) - BDT ${perfume.price}`);
        });

        console.log('\n✨ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedPerfumes();