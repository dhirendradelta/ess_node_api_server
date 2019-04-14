var mysql=require('mysql');
var connection=mysql.createPool({ 
	host:'localhost',
 	user:'rahul',
 	password:'Delta123#',
 	database:'alhokdec'
});
module.exports=connection;
