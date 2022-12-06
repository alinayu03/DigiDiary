const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "diary",
  password: "password",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

module.exports = mysqlConnection;
