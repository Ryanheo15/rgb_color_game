<?php

include "connection.php";


$user = $_POST["username"];
$pass = $_POST["password"];
$score = $_POST["score"];

$select_query = "SELECT * FROM users WHERE username='$user'";
$select_result = mysqli_query($connection, $select_query);

if(!$select_result){
  die("select query failed". sqli_error($connection));
}

if(mysqli_num_rows($select_result) == 0){
  $add_query = "INSERT INTO users(username, password, score) VALUES ('$user', '$pass', '$score')";
  $add_result = mysqli_query($connection, $add_query);

  if(!$add_result){
    die("add query failed". sqli_error($connection));
  }
  else {
    echo "user added";
  }
}
else {
  echo "user exists";
}






 ?>
