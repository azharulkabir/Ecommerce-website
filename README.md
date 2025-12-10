# ILLIYEEN E-commerce Website

This is an e-commerce website for ILLIYEEN built with Node.js, Express, and MongoDB.

## Features

- **Platinum Polo Shirt Section**: Browse all Platinum Polo Shirts
- **Product Details Page**: View detailed information about each product
- **Dynamic Product Loading**: Products are loaded from MongoDB database
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - If using local MongoDB, make sure MongoDB is running on `localhost:27017`
   - Or update the `MONGODB_URI` in `server.js` to point to your MongoDB instance

3. Seed the database with sample products:
```bash
node seed.js
```

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

5. Open your browser and navigate to:
   - Home: `http://localhost:3000`
   - Polo Section: `http://localhost:3000/polo`
   - Product Details: `http://localhost:3000/product/{product-code}`

## API Endpoints

- `GET /api/products/platinum-polo` - Get all Platinum Polo Shirts
- `GET /api/products/:code` - Get product by code
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (for admin use)

## Project Structure

```
├── server.js              # Express server and API routes
├── seed.js                # Database seeding script
├── package.json           # Dependencies
├── polo.html              # Platinum Polo Shirt listing page
├── polo.js                # JavaScript for polo page
├── product-details.html   # Product details page
├── product-details.js     # JavaScript for product details
├── product-details.css    # Styles for product details page
└── ...                    # Other existing files
```

## Usage

1. Navigate to the Polo section to see all Platinum Polo Shirts
2. Click on any product card to view its detailed information
3. On the product details page, you can:
   - View product images (navigate with arrows or thumbnails)
   - Select size
   - Add product to bag
   - View product details and description

## Notes

- Make sure MongoDB is running before starting the server
- The database will be automatically created if it doesn't exist
- Product images should be in the root directory or update image paths accordingly

