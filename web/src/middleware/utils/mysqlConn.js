const mysql = require('mysql');

const users = {
  root: { user: 'root', password: '' },
};

const getUser = (user) => users[user] ?? users.root;

exports.mysqlConn = (user) => mysql.createConnection({
  host: 'localhost',
  ...getUser(user),
  database: 'traelo',
});
