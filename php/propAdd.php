<?php
$data = [];
$Hid = $_POST['id'];
$title = $_POST['ptit'];
$dur = $_POST['dur'];
$neg = $_POST['neg'];
$desc = $_POST['desc'];
$pay = $_POST['pay'];

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$q1="insert into prop(pName,pDur,pay,neg,pdesc,Hid) values('$title','$dur','$pay',$neg,'$desc','$Hid');";
$result = $conn->query($q1);
$conn->close();
echo json_encode($data);
?>
