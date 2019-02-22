<?php
$data = [];
$id = $_POST['id'];
$name = $_POST['sName'];
$email = $_POST['sEmail'];
$contact = $_POST['sContact'];
$loc = $_POST['sLoc'];

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$q1="delete from hdetails where HID='$id';";
$q2="insert into hdetails(HID,Name,Email,Contact,Location) values('$id','$name','$email','$contact','$loc');";

$result = $conn->query($q1);
$result = $conn->query($q2);

$conn->close();

?>
