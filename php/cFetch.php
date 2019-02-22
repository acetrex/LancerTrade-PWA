<?php
$data = [];

$servername = "localhost";
$user = "root";
$pass = null;
$dbname="proj1";

$conn = new mysqli($servername, $user, $pass,$dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$q1="SELECT * from skill_list;";
$result = $conn->query($q1);

if ($result->num_rows > 0){
  while($row = $result->fetch_assoc()){
    array_push($data,$row["skillid"]);
    array_push($data,$row["skill"]);
  }}
$conn->close();

echo json_encode($data);
?>
