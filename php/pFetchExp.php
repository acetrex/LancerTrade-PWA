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

$q1="SELECT * from exp where Fid=".$id;
$result = $conn->query($q1);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()){
      array_push($data,$row['compant']);
      array_push($data,$row['title']);
      array_push($data,$row['start']);
      array_push($data,$row['ongoing']);
      array_push($data,$row['end']);
  }
}

echo json_encode($data);
$conn->close();
?>
