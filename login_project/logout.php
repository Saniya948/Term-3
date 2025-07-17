<?php
session_start();
session_destroy();
echo "<h2>You have been logged out.</h2>";
echo '<a href="index.html">Login Again</a>';
?>
