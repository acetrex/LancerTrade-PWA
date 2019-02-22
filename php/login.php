<?php
$data = [];
$username = $_POST['username'];
$password = $_POST['password'];

$data['user'] = $username;
$data['check']="NO";

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$q1="SELECT ID,type from logininfo where user='$username' AND pass='$password';";
$result = $conn->query($q1);
if ($result==TRUE){
  $row = $result->fetch_assoc();
  $data['check']="YES";
  $data['type']=$row['type'];
  $data['id']=$row['ID'];
}
$conn->close();
echo json_encode($data);
?>
