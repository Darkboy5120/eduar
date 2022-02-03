const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { apis } = require('./apis');

const app = express();
app.use(cors());
app.use(helmet());
const port = 3001;

app.get('/apis', (req, res) => {
  switch (req.query.api) {
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
