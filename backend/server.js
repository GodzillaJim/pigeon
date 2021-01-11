const express = require('express');

const app = express();

app.listen(process.env.PORT || 5000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Listening on port 5000');
});
