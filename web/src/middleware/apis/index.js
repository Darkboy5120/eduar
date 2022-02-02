import GetUsers from './getUsers.mjs';
const mysql = require('mysql');

export {
  getUsers: GetUsers(mysql),
};
