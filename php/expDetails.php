<?php
$data = [];
$id = $_POST['id'];
$Arr = json_decode($_POST['expArr']);
//$Arr = explode(',',substr($Arr,1,-1));
$x=count($Arr);

$data['arr']=$Arr;
$data['x']=$x;

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$q1="delete from exp where Fid=".$id;
$result = $conn->query($q1);

for($i=0;$i<($x/5);$i++){
$q2="insert into exp(Fid,title,start,compant,ongoing,end) values('$id','".$Arr[$i*5+0]."','".$Arr[$i*5+1]."','".$Arr[$i*5+2]."',".$Arr[$i*5+3].",'".$Arr[$i*5+4]."');";
$result = $conn->query($q2);
};

echo json_encode($data);
$conn->close();
?>
