<?php

include "connection.php";

$user = $_POST["username"];
$pass = $_POST["password"];
$score = $_POST["score"];


$select_query = "SELECT * FROM users WHERE username='$user' and password='$pass' limit 1";

$select_result = mysqli_query($connection, $select_query);

if(!$select_result){
  $message = mysqli_error($connection);
  die("select query failed .$message");
}


if(mysqli_num_rows($select_result) == 1){
  echo "correct";

  $user_array = mysqli_fetch_array($select_result);
  
  if($score > $user_array["score"]){
    $update_query = "UPDATE users SET score='$score' WHERE username='$user'";
    $update_result = mysqli_query($connection, $update_query);
  }
}

if(mysqli_num_rows($select_result) == 0){
  echo "incorrect";
}
?>
