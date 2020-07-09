<?php

include "connection.php";

$select_query = "SELECT * FROM users ORDER BY score DESC";

$select_result = mysqli_query($connection, $select_query);

if(!$select_result){
  echo "query failed". sqli_error($connection);
}

$users = mysqli_fetch_all($select_result, MYSQLI_ASSOC);

echo json_encode($users);
?>
