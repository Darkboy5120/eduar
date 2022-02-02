const express = require('express');
const apis = require('./apis');

const app = express();
const port = 3000;

app.get('/apis', (req, res) => {
  switch (req.query.name) {
    case 'get_users':
      apis.GetUsers();
      break;
    default:
      res.send('That api does\'nt exits');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
