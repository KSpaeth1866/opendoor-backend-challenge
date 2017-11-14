const express = require('express')
const app = express();

const routes = require('./routes')
app.use('/', routes);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`\n*******\n\nRunning on port ${port}\n\n*******\n`)
})
