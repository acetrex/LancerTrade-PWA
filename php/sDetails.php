<?php
$data = [];
$id = $_POST['id'];
$name = $_POST['sName'];
$email = $_POST['sEmail'];
$contact = $_POST['sContact'];
$showc = $_POST['sShowC'];
$birth = $_POST['sBirth'];
$gender = $_POST['sGender'];
$desc = $_POST['sDesc'];
$link = $_POST['sLink'];
$loc = $_POST['sLok'];

$x=$gender[0];

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$q1="delete from fdetails where FID='$id';";
$q2="insert into fdetails(FID,Name,Email,Contact,Cpublic,Birthday,Description,LinkedIn,gender,Location) values('$id','$name','$email','$contact','$showc','$birth','$desc','$link','$x','$loc');";

$result = $conn->query($q1);
$result = $conn->query($q2);

$conn->close();

?>
