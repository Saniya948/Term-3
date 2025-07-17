<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username' LIMIT 1";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($password, $row['password'])) {
            $_SESSION['username'] = $username;
            echo "<h2>Login Successful! Welcome, $username</h2>";
            echo '<br><a href="logout.php">Logout</a>';
        } else {
            echo "<h2>Invalid Password!</h2>";
        }
    } else {
        echo "<h2>User not found!</h2>";
    }
}
?>
