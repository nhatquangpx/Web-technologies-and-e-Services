<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tính tuổi và chênh lệch ngày sinh</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f9f9f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        form, .result {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            width: 400px;
        }
        h2 { text-align: center; color: #333; }
        label { display: block; margin-top: 10px; }
        input[type="text"], input[type="date"] {
            width: 100%; padding: 8px; margin-top: 5px;
        }
        input[type="submit"] {
            margin-top: 15px;
            background: #007BFF; color: white;
            border: none; padding: 10px; width: 100%;
            border-radius: 5px; cursor: pointer;
        }
        input[type="submit"]:hover { background: #0056b3; }
        .result { margin-top: 20px; }
    </style>
</head>
<body>

<form method="post">
    <h2>Thông tin hai người</h2>

    <label>Họ tên người 1:</label>
    <input type="text" name="name1" required>

    <label>Ngày sinh người 1:</label>
    <input type="date" name="dob1" required>

    <label>Họ tên người 2:</label>
    <input type="text" name="name2" required>

    <label>Ngày sinh người 2:</label>
    <input type="date" name="dob2" required>

    <input type="submit" name="submit" value="Tính toán">
</form>

<?php
if (isset($_POST['submit'])) {
    $name1 = $_POST['name1'];
    $dob1 = new DateTime($_POST['dob1']);
    $name2 = $_POST['name2'];
    $dob2 = new DateTime($_POST['dob2']);

    $today = new DateTime();
    $age1 = $today->diff($dob1)->y;
    $age2 = $today->diff($dob2)->y;

    $diff = $dob1->diff($dob2);
    $days_diff = $diff->days;

    echo "<div class='result'>";
    echo "<h2>Kết quả</h2>";
    echo "<p><strong>$name1</strong> hiện tại <strong>$age1 tuổi</strong>.</p>";
    echo "<p><strong>$name2</strong> hiện tại <strong>$age2 tuổi</strong>.</p>";
    echo "<p>Hai người chênh nhau <strong>$days_diff ngày</strong>.</p>";
    echo "</div>";
}
?>

</body>
</html>
