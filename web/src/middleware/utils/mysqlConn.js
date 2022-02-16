const mysql = require('mysql');

const users = {
  root: { user: 'root', password: '' },
};

const getUser = (user) => users[user] ?? users.root;

exports.mysqlConn = (res, user) => {
  let log = 'fua';
  const connection = mysql.createConnection({
    host: 'localhost',
    ...getUser(user),
    database: 'traelo',
  });

  const query = (sql, callback) => {
    connection.query(sql, (err, rows) => {
      log = err?.sqlMessage ?? '';
      if (err) throw err;
      if (callback) callback(rows);
    });
  };

  const end = (code, data) => {
    connection.end();
    res.send({ code, data, log });
  };

  const commit = (code, data) => {
    query('COMMIT');
    end(code, data);
  };

  const rollback = (code, data) => {
    query('ROLLBACK');
    end(code, data);
  };

  query('START TRANSACTION');
  query('SET autocommit = OFF');

  return {
    query, commit, rollback, end, log,
  };
};
