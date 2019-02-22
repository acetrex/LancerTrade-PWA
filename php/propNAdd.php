<?php
$data = [];

$id = $_POST['id'];
$Hid = $_POST['Hid'];
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
$q1="insert into pprop(pName,pDur,pay,neg,pdesc,Fid,Hid) values('$title','$dur','$pay',$neg,'$desc','$id','$Hid');";
$result = $conn->query($q1);
$conn->close();
echo json_encode($data);
?>
