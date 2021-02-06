const express = require('express');
const router = require('./routes/routes');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

app.use(morgan('combined'));
app.use(express.json());
app.use(router);
if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  );
}
app.listen(process.env.PORT || 5000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Listening on port 5000');
});
