var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var create_database = "CREATE DATABASE inventory";
  con.query(create_database, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    process.exit()
  });
});
