const express = require('express');
const helmet = require('helmet');
const { apis } = require('./apis');

const app = express();
app.use(helmet());
const port = 3000;

app.get('/apis', (req, res) => {
  switch (req.query.name) {
    case 'get_users':
      apis.getUsers(res);
      break;
    default:
      res.send('That api does\'nt exits');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
