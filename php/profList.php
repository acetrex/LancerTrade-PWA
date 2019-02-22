<?php
$data = [];

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error){
  die("Connection failed: " . $conn->connect_error);
}

$q1="select * from fdetails;";
$result = $conn->query($q1);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($data,$row['Name']);
    array_push($data,$row['location']);
    array_push($data,$row['Email']);
    array_push($data,$row['gender']);
    array_push($data,$row['rating']);
    array_push($data,$row['fid']);

  }
}

echo json_encode($data);
$conn->close();
?>
