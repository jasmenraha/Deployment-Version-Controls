<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM items");
$items = $stmt->fetchAll();

echo json_encode($items);
?>
