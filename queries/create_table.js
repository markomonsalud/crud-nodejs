var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "inventory"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var create_table = "CREATE TABLE IF NOT EXISTS `items` (`id` int(8) NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `qty` int(12) NOT NULL, `amount` int(12) NOT NULL, PRIMARY KEY (`id`)) AUTO_INCREMENT = 1;";
  
  con.query(create_table, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    process.exit()
  });
});
