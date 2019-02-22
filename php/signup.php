<?php
$data = [];
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$type = $_POST['selection'];
$check=0;

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$q1="SELECT * from logininfo where user='$username';";
$q2="SELECT * from login where email='$email';";

$result = $conn->query($q1);
$result2 = $conn->query($q2);

if ($result->num_rows > 0) {$check=2;}
elseif ($result2->num_rows > 0) {$check=3;}
else{$check=1;}
if($check==1)
{
  if($type==1)
  {$q3="INSERT INTO logininfo(user,pass,email,type) values ('$username','$password','$email','F')";}
  if($type==2)
  {$q3="INSERT INTO logininfo(username,password,email,type) values ('$username','$password','$email','H')";}

  $result = $conn->query($q3);
}
$conn->close();
echo json_encode($check);
?>
