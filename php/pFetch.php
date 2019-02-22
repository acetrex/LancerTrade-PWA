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

$q1="select *,curdate() as date from fdetails where fid=$id;";
$result = $conn->query($q1);

if ($result==TRUE){
  $row = $result->fetch_assoc();
  $data['email']=$row['Email'];
  $d1=$row['Birthday'];
  $d2=$row['date'];
  $data['bday']=round(abs((strtotime($d2)-strtotime($d1)))/(86400*365))+"";
  $data['link']=$row['Linkedin'];
  $data['name']=$row['Name'];
  $data['desc']=$row['Description'];
  $data['gender']=$row['gender'];
  if($row['Cpublic']=="true"){$data['contact']=$row['Contact'];}
  else {$data['contact']="Null";}
}

echo json_encode($data);
$conn->close();
?>
