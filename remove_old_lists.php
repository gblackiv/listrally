<?php

include_once('./config/mySqlCredentials.php');
$conn = new mysqli( $mySQLHost, $mySQLUser, $mySQLPassword, $mySQLDatabase );

$querry = "UPDATE lists SET status = 'inactive' WHERE eventTime <= DATE(NOW()) + INTERVAL -7 DAY";

$result = $conn->query( $query );

print( $result );
?>