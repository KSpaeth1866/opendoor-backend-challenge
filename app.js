const express = require('express');
const app = express();
const axios = require('axios');
const d3 = require('d3-dsv');
const fs = require('fs');

const routes = require('./routes')
app.use('/', routes);

let port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    let obj = await axios.get('https://s3.amazonaws.com/opendoor-problems/listing-details.csv');
    fs.writeFile('./data/listing-details.csv', obj.data, 'utf8', (error, resp) => {
      if (error) console.log(`\n*******\n\nERROR in CSV PARSE:\n${error}\n\n*******\n`);
    });
    console.log(`\n*******\n\nRunning on port ${port}\n\n*******\n`)
  }
  catch (error) {
    console.log(`\n*******\n\nERROR:\n${error}\n\n*******\n`);
  }
})
