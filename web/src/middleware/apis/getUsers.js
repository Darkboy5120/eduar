const { mysqlConn } = require('../utils/mysqlConn');

exports.getUsers = (res) => {
  const connection = mysqlConn('root');

  connection.connect();

  connection.query('SELECT * FROM Usuario', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
  connection.end();
};
