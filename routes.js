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

  let features = data
  .filter(listing => {
    if (listing.price < min_price) return false;
    if (listing.price > max_price) return false;
    if (listing.bedrooms < min_bed) return false;
    if (listing.bedrooms > max_bed) return false;
    if (listing.bathrooms < min_bath) return false;
    if (listing.bathrooms > max_bath) return false;
    return true;
  })
  .map(listing => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [listing.lng, listing.lat]
      },
      "properties": {
        "id": listing.id,
        "price": listing.price,
        "street": listing.street,
        "bedrooms": listing.bedrooms,
        "bathrooms": listing.bathrooms,
        "sq_ft": listing.sq_ft,
      }
    }
  });
  res.json({
    type: "FeatureCollection",
    features: features.slice(0, 3),
  })
})

module.exports = router;
