<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tạo mã QR Code Vaccine</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        input[type="text"], input[type="number"], input[type="date"], select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
            height: 44px; 
        }
        .form-row {
            display: flex;
            gap: 20px;
        }
        .form-row .form-group {
            flex: 1;
        }
        @media (max-width: 768px) {
            .form-row {
                flex-direction: column;
                gap: 15px;
            }
        }
        button {
            background-color: #28a745;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            margin-top: 20px;
        }
        button:hover {
            background-color: #218838;
        }
        .result {
            margin-top: 30px;
            padding: 20px;
            background-color: #e8f5e8;
            border-radius: 5px;
            border-left: 4px solid #28a745;
            text-align: center;
        }
        .result h2 {
            color: #28a745;
            margin-top: 0;
        }
        .qr-info {
            background-color: white;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        .qr-code {
            margin: 20px 0;
            padding: 20px;
            background-color: white;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
        }
        .vaccine-info {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        .download-btn {
            background-color: #007bff;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .download-btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tạo mã QR Code Vaccine COVID-19</h1>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="fullname">Họ và tên:</label>
                <input type="text" id="fullname" name="fullname" 
                       value="<?php echo isset($_POST['fullname']) ? htmlspecialchars($_POST['fullname']) : ''; ?>" 
                       required placeholder="Nhập họ và tên đầy đủ">
            </div>

            <div class="form-group">
                <label for="mssv">Mã số sinh viên:</label>
                <input type="text" id="mssv" name="mssv" 
                       value="<?php echo isset($_POST['mssv']) ? htmlspecialchars($_POST['mssv']) : ''; ?>" 
                       required placeholder="Nhập mã số sinh viên">
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="vaccine_count">Số mũi vaccine đã tiêm:</label>
                    <select id="vaccine_count" name="vaccine_count" required>
                        <option value="">Chọn số mũi</option>
                        <option value="1" <?php echo (isset($_POST['vaccine_count']) && $_POST['vaccine_count'] == '1') ? 'selected' : ''; ?>>1 mũi</option>
                        <option value="2" <?php echo (isset($_POST['vaccine_count']) && $_POST['vaccine_count'] == '2') ? 'selected' : ''; ?>>2 mũi</option>
                        <option value="3" <?php echo (isset($_POST['vaccine_count']) && $_POST['vaccine_count'] == '3') ? 'selected' : ''; ?>>3 mũi</option>
                        <option value="4" <?php echo (isset($_POST['vaccine_count']) && $_POST['vaccine_count'] == '4') ? 'selected' : ''; ?>>4 mũi</option>
                        <option value="5" <?php echo (isset($_POST['vaccine_count']) && $_POST['vaccine_count'] == '5') ? 'selected' : ''; ?>>5 mũi</option>
                    </select>
                </div>

            </div>

            <button type="submit">Tạo mã QR Code</button>
        </form>

        <?php
        $is_post = isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST";
        
        if ($is_post) {
            $fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
            $mssv = isset($_POST['mssv']) ? trim($_POST['mssv']) : '';
            $vaccine_count = isset($_POST['vaccine_count']) ? $_POST['vaccine_count'] : '';
            $vaccine_date = isset($_POST['vaccine_date']) ? $_POST['vaccine_date'] : '';

            if (empty($fullname) || empty($mssv) || empty($vaccine_count) || empty($vaccine_date)) {
                echo '<div class="error">Vui lòng nhập đầy đủ thông tin!</div>';
            } else {
                $today = new DateTime();
                $vaccine_datetime = new DateTime($vaccine_date);
                
                if ($vaccine_datetime > $today) {
                    echo '<div class="error">Ngày tiêm vaccine không được lớn hơn ngày hiện tại!</div>';
                } else {
                    $qr_data = "COVID-19 VACCINE CERTIFICATE\n";
                    $qr_data .= "Họ tên: $fullname\n";
                    $qr_data .= "MSSV: $mssv\n";
                    $qr_data .= "Số mũi vaccine: $vaccine_count\n";
                    $qr_data .= "Ngày tiêm cuối: " . $vaccine_datetime->format('d/m/Y') . "\n";
                    $qr_data .= "Ngày tạo: " . $today->format('d/m/Y H:i:s');

                    $qr_url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($qr_data);

                    echo '<div class="result">';
                    echo '<h2>Mã QR Code Vaccine COVID-19</h2>';
                    
                    echo '<div class="qr-info">';
                    echo '<strong>Thông tin vaccine:</strong><br>';
                    echo "<div class='vaccine-info'>";
                    echo "<span><strong>Họ tên:</strong> $fullname</span>";
                    echo "<span><strong>MSSV:</strong> $mssv</span>";
                    echo "</div>";
                    echo "<div class='vaccine-info'>";
                    echo "<span><strong>Số mũi vaccine:</strong> $vaccine_count</span>";
                    echo "<span><strong>Ngày tiêm cuối:</strong> " . $vaccine_datetime->format('d/m/Y') . "</span>";
                    echo "</div>";
                    echo '</div>';

                    echo '<div class="qr-code">';
                    echo '<strong>Mã QR Code:</strong><br>';
                    echo "<img src='$qr_url' alt='QR Code' style='margin: 10px 0;'>";
                    echo '<br>';
                    echo '<button class="download-btn" onclick="downloadQR()">Tải xuống QR Code</button>';
                    echo '</div>';

                    echo '<div class="qr-info">';
                    echo '<strong>Dữ liệu trong QR Code:</strong><br>';
                    echo '<textarea readonly style="width: 100%; height: 120px; margin-top: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">' . htmlspecialchars($qr_data) . '</textarea>';
                    echo '</div>';

                    echo '</div>';

                    echo '<script>
                    function downloadQR() {
                        const qrUrl = "' . $qr_url . '";
                        const link = document.createElement("a");
                        link.href = qrUrl;
                        link.download = "vaccine_qr_' . preg_replace('/[^a-zA-Z0-9]/', '_', $fullname) . '_' . $mssv . '.png";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                    </script>';
                }
            }
        }
        ?>
    </div>
</body>
</html>
