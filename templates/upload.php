<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['audio_data'])) {
    $file = $_FILES['audio_data'];
    $upload_dir = 'uploads/';
    $upload_file = $upload_dir . basename($file['name']);

    // Create uploads directory if it doesn't exist
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    if (move_uploaded_file($file['tmp_name'], $upload_file)) {
        echo "File is valid, and was successfully uploaded.\n";
    } else {
        echo "Possible file upload attack!\n";
    }
} else {
    echo "No file uploaded.\n";
}
?>