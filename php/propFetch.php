<?php
$data = [];
$id = $_POST['id'];
$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//$q1="SELECT * from prop;";
$q1="select Hid,pName,pDur,pay,neg,pdesc,user,fid from pprop inner join logininfo on pprop.Hid=logininfo.ID where fid='$id';";
$result = $conn->query($q1);

if ($result->num_rows > 0){
  while($row = $result->fetch_assoc()){
    array_push($data,$row["pName"]);
    array_push($data,$row["pDur"]);
    array_push($data,$row["pay"]);
    array_push($data,$row["neg"]);
    array_push($data,$row["pdesc"]);
    array_push($data,$row["Hid"]);
  }}
//$data['x']='hello';
$conn->close();
echo json_encode($data);
?>
