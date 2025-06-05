<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$name = $data['name'] ?? '';

if ($id && $name !== '') {
    $stmt = $pdo->prepare("UPDATE items SET name = ? WHERE id = ?");
    $stmt->execute([$name, $id]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Invalid input']);
}
?>
