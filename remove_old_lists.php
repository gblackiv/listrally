<?php

include_once('config/mySqlCredentials.php');


$query = "UPDATE lists SET status = 'inactive' WHERE eventTime <= DATE(NOW()) + INTERVAL -7 DAY";

$result = mysqli_query( $conn, $query );

print( $result );
?>