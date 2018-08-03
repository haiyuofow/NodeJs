var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'haiyu199001',
  database : 'henrydata'
});
 
connection.connect();
 
connection.query('SELECT * AS 收支表', function(err, rows, fields) {
  if (err) {
    console.log(err);
    return;
  };
 
  console.log('The solution is: ', rows[0].收支表);
});

 
connection.end();