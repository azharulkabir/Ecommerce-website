const express = require('express');
const app = express();
const port = 3000; // আপনি যে পোর্টে সার্ভার চালাতে চান

// একটি বেসিক রুট (Home Page) সেটআপ করা
app.get('/', (req, res) => {
  res.send('Hello World! This is my Express App.');
});

// সার্ভার চালু করা
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});