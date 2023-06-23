const express = require('express');
const router = require('./routes/routes');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

app.use('/', router);

app.listen(3302, function () {
  console.log('App listening on port 3000!');
});