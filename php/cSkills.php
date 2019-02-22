<?php
$data = [];
$id = $_POST['id'];
$data['x']=$id;
$Arr = json_decode($_POST['cArr']);
$data['arr']=$Arr;
$x=count($Arr);
$data['cc']=$x;

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$q1="delete from skills where fid=".$id;

$result = $conn->query($q1);

for($i=0;$i<$x;$i++){
  $z=$Arr[$i];
  $q3="insert into skills(Fid,Sid) values('$id','$z');";
  $result = $conn->query($q3);
};
echo json_encode($data);
$conn->close();
?>
