<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Gửi bình luận</title>
    <style>
        /* Toàn trang */
        body {
            font-family: "Inter", Arial, sans-serif;
            background: linear-gradient(160deg, #fff6e5, #ffffff);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        /* Tiêu đề chính */
        h2 {
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
            text-align: center
        }

        /* Khung form */
        form {
            background: #fff;
            padding: 35px 40px;
            border-radius: 14px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            width: 400px;
            text-align: left;
        }

        label {
            display: block;
            margin-top: 15px;
            font-weight: 600;
            color: #444;
        }

        /* Input và textarea */
        input, textarea {
            width: 100%;
            margin-top: 6px;
            height: 32px;
            border: 1.5px solid #ddd;
            border-radius: 8px;
            font-size: 15px;
            outline: none;
            transition: all 0.2s ease-in-out;
        }

        input:focus, textarea:focus {
            border-color: #4CAF50;
            box-shadow: 0 0 4px rgba(76, 175, 80, 0.3);
        }

        textarea {
            resize: none;
            min-height: 100px;
        }

        /* Nút gửi */
        button {
            margin-top: 25px;
            width: 100%;
            background-color: #26a641;
            border: none;
            color: white;
            font-weight: 600;
            font-size: 16px;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.25s;
        }

        button:hover {
            background-color: #23923a;
        }

        /* Thông báo lỗi */
        .error {
            color: #d93025;
            font-size: 14px;
            margin-top: 4px;
        }

        /* Thông báo thành công */
        .success {
            text-align: center;
            margin-top: 20px;
            color: #26a641;
            font-weight: 600;
            font-size: 16px;
        }

        /* Logo hoặc tiêu đề trên cùng */
        .brand {
            font-size: 26px;
            font-weight: 700;
            color: #ff7a00;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

<div class="brand">Nhóm 20</div>

<?php
$name = $email = $comment = "";
$nameErr = $emailErr = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $comment = trim($_POST["comment"]);

    // Kiểm tra họ tên
    if (empty($name)) {
        $nameErr = "Vui lòng nhập họ tên.";
    } elseif (!preg_match("/^[A-Za-zÀ-ỹ\s]+$/u", $name)) {
        $nameErr = "Họ tên chỉ được chứa ký tự chữ và dấu cách.";
    } elseif (strlen(trim($name)) == 0) {
        $nameErr = "Họ tên không được toàn bộ là dấu cách.";
    }

    // Kiểm tra email
    if (empty($email)) {
        $emailErr = "Vui lòng nhập email.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Email không hợp lệ.";
    }

    // Nếu hợp lệ
    if (empty($nameErr) && empty($emailErr)) {
        $success = "🌿 Bình luận của bạn đã được ghi nhận!";
    }
}
?>

<form method="post" action="">
    <h2>Gửi bình luận</h2>

    <label for="name">Họ tên *</label>
    <input type="text" id="name" name="name" placeholder="e.g. Nguyễn Văn A"
           value="<?php echo htmlspecialchars($name); ?>">
    <div class="error"><?php echo $nameErr; ?></div>

    <label for="email">Email *</label>
    <input type="text" id="email" name="email" placeholder="e.g. nguyenvana@gmail.com"
           value="<?php echo htmlspecialchars($email); ?>">
    <div class="error"><?php echo $emailErr; ?></div>

    <label for="comment">Bình luận (tùy chọn)</label>
    <textarea id="comment" name="comment" placeholder="Nhập bình luận của bạn..."><?php echo htmlspecialchars($comment); ?></textarea>

    <button type="submit">Gửi bình luận</button>

    <?php if ($success): ?>
        <p class="success"><?php echo $success; ?></p>
    <?php endif; ?>
</form>

</body>
</html>
