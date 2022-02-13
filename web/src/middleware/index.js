const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { apis } = require('./apis');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
const port = process.env.PORT || 3001;

app.post('/apis', (req, res) => {
  switch (req.body.api) {
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
