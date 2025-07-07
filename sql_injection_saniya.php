<?php
// Connect to database
$conn = new mysqli('localhost', 'root', '', 'test');

$username = $_GET['username'];
$password = $_GET['password'];

// Vulnerable to SQL Injection
$sql = "SELECT * FROM users WHERE name = '$username' AND password = '$password'"; 
echo "<script>console.log(\"SQL Query: " . addslashes($sql) . "\");</script>";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "<h3> LOgged in successfully!</h3>";
    echo "<h4> User Details:</h4>";

    // Loop through all matching users
    while ($user = mysqli_fetch_assoc($result)) {
        echo "<ul>";
        foreach ($user as $key => $value) {
            echo "<li><strong>$key:</strong> $value</li>";
        }
        echo "</ul><hr>";
    }
} else {
    echo "<h3> Invalid login!</h3>";
}

?>

