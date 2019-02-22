<?php
$data = [];
$id = $_POST['id'];

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error){
  die("Connection failed: " . $conn->connect_error);
}

$q1="select * from hdetails where hid=$id;";
$result = $conn->query($q1);

if ($result==TRUE){
  $row = $result->fetch_assoc();
  $data['email']=$row['email'];
  $data['name']=$row['name'];
  $data['location']=$row['location'];
  $data['contact']=$row['contact'];
}

echo json_encode($data);
$conn->close();
?>
