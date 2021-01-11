const express = require('express');
const router = require('./routes/routes');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(router);
app.listen(process.env.PORT || 5000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Listening on port 5000');
});
