# Quick Setup Guide

## সমস্যা সমাধান (Troubleshooting)

যদি product details page-এ "Loading..." দেখাচ্ছে, তাহলে নিচের steps follow করুন:

### Step 1: MongoDB চালু করুন
```bash
# Windows-এ MongoDB service start করুন
net start MongoDB

# অথবা MongoDB manually start করুন
mongod
```

### Step 2: Dependencies Install করুন
```bash
npm install
```

### Step 3: Database Seed করুন
```bash
node seed.js
```

আপনি এই message দেখবেন:
```
MongoDB Connected
Cleared existing Platinum Polo Shirts
Successfully seeded Platinum Polo Shirts
Database connection closed
```

### Step 4: Server Start করুন
```bash
npm start
```

আপনি এই message দেখবেন:
```
MongoDB Connected
Server running on http://localhost:3000
```

### Step 5: Browser-এ Test করুন

1. Polo Section: `http://localhost:3000/polo`
   - এখানে সব Platinum Polo Shirts দেখাবে
   
2. Product Details: `http://localhost:3000/product/264805`
   - এখানে specific product-এর details দেখাবে

## Common Issues

### Issue 1: "MongoDB Connection Error"
**সমাধান:**
- MongoDB service চালু আছে কিনা check করুন
- MongoDB default port (27017) ব্যবহার করছে কিনা check করুন

### Issue 2: "Product not found"
**সমাধান:**
- Database seed করা হয়েছে কিনা check করুন: `node seed.js`
- Product code URL-এ সঠিক কিনা check করুন

### Issue 3: "Error loading products"
**সমাধান:**
- Server running আছে কিনা check করুন
- Browser console-এ error message check করুন (F12 press করুন)
- MongoDB connection check করুন

### Issue 4: Images load হচ্ছে না
**সমাধান:**
- Image files project root directory-তে আছে কিনা check করুন
- Image file names seed.js-এ দেওয়া names-এর সাথে match করছে কিনা check করুন

## Testing API Endpoints

আপনি browser-এ directly API test করতে পারেন:

1. **All Platinum Polo Shirts:**
   ```
   http://localhost:3000/api/products/platinum-polo
   ```

2. **Specific Product:**
   ```
   http://localhost:3000/api/products/264805
   ```

এই URLs-এ JSON data দেখাবে যদি সব কিছু ঠিক থাকে।

## Database Check

MongoDB-তে data আছে কিনা check করতে:

```bash
# MongoDB shell-এ যান
mongo

# Database select করুন
use illiyeen

# Products দেখুন
db.products.find().pretty()
```

## Need Help?

যদি এখনও সমস্যা থাকে:
1. Browser console (F12) check করুন
2. Server terminal-এ error messages check করুন
3. MongoDB logs check করুন

