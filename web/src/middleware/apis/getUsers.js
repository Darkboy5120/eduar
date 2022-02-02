const GetUsers = (mysql) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'traelo',
  });

  connection.connect();

  connection.query('SELECT * FROM Usuario', (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
  });

  connection.end();
};

export default GetUsers;
