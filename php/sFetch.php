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

$q1="select skill from skills inner join skill_list on skills.sid=skill_list.skillid where fid=".$id;
$result = $conn->query($q1);

if ($result->num_rows > 0){
  while($row = $result->fetch_assoc()){
      array_push($data,$row["skill"]);
  }
}
echo json_encode($data);
$conn->close();
?>
