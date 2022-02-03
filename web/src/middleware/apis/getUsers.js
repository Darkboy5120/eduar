const { mysqlConn } = require('../utils/mysqlConn');

exports.getUsers = (res) => {
  const conn = mysqlConn(res, 'root');

  conn.query('SELECT * FROM Usuario', (rows) => {
    conn.end(0, rows);
  });
};
