<?php
$errors = [];
$fname = $lname = $email = $accountNum = $year = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = htmlspecialchars(trim($_POST['fname']));
    $lname = htmlspecialchars(trim($_POST['lname']));
    $email = htmlspecialchars(trim($_POST['email']));
    $accountNum = htmlspecialchars(trim($_POST['accountNum']));
    $year = htmlspecialchars(trim($_POST['year']));

    // Validation
    if (empty($fname) || !preg_match("/^[a-zA-Z ]+$/", $fname)) {
        $errors[] = "First name must contain only letters and spaces.";
    }
    if (empty($lname) || !preg_match("/^[a-zA-Z ]+$/", $lname)) {
        $errors[] = "Last name must contain only letters and spaces.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    if (!preg_match("/^[A-Za-z0-9]{12}$/", $accountNum)) {
        $errors[] = "Account number must be 12 alphanumeric characters.";
    }
    if (!preg_match("/^(2021|2022|2023|2024|2025)$/", $year)) {
        $errors[] = "Invalid year selected.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Submitted Data</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <?php if (!empty($errors)): ?>
        <h2>There were errors with your submission:</h2>
        <ul>
            <?php foreach ($errors as $error): ?>
                <li><?= $error ?></li>
            <?php endforeach; ?>
        </ul>
        <a href="index.html">Back to Form</a>
    <?php else: ?>
        <h1>Success!</h1>
        <h2>Submitted Information</h2>
        <p>First Name: <?= $fname ?></p>
        <p>Last Name: <?= $lname ?></p>
        <p>Email: <?= $email ?></p>
        <p>Account Number: <?= $accountNum ?></p>
        <p>Year: <?= $year ?></p>
        <a href="index.html">Back to Form</a>
    <?php endif; ?>
</body>
</html>
