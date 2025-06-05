<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'] ?? '';

if ($name !== '') {
    $stmt = $pdo->prepare("INSERT INTO items (name) VALUES (?)");
    $stmt->execute([$name]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Empty name']);
}
?>
