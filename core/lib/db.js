const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'workbench_db'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Mysql Connected..!');
	}
});

module.exports = connection;