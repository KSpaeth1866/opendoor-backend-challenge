const express = require('express');
const router = express.Router();
const d3 = require('d3-dsv');
const fs = require('fs');

// import data and read from csv into a usable object
let data;
fs.readFile('./data/listing-details.csv', 'utf8', (error, resp) => {
  data = d3.csvParse(resp);
});

// test route to see if server lives and data is properly read
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hello World!',
    data,
  })
})

// get route that sends listing based on query parameters
router.get('/listings', (req, res) => {
  const {
    min_price,
    max_price,
    min_bed,
    max_bed,
    min_bath,
    max_bath,
  } = req.query;

  res.json({
    success: true,
  })
})

module.exports = router;
