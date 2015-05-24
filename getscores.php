<?php
header('Access-Control-Allow-Origin: *');




$host="66.147.244.241"; // Host name 
$username="jpnoisec_gamer"; // Mysql username 
$password="X@D4PxL3%O{_"; // Mysql password 
$db_name="jpnoisec_game"; // Database name 
$tbl_name="scores"; // Table name

// Connect to server and select database.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");

// Retrieve data from database 
$sql="SELECT * FROM scores ORDER BY score DESC LIMIT 10";
$result=mysql_query($sql);

// Start looping rows in mysql database.
while($rows=mysql_fetch_array($result)){
echo $rows['name'] . "|" . $rows['score'] . "|";

// close while loop 
}

// close MySQL connection 
mysql_close();
?>