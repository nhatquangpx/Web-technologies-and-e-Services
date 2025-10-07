// Hàm khởi tạo biểu đồ học tập
function initializeHocTapChart() {
    const ctx = document.getElementById('hocTapChart');

    // Dữ liệu mẫu (Mô phỏng 2 trục Y: TC Tích lũy (trái) và Điểm/CPA (phải))
    const hocTapData = {
        labels: ['Năm thứ nhất', 'Năm thứ hai', 'Năm thứ ba', 'Năm thứ tư'],
        datasets: [
            // Dữ liệu CPA (Đường, Trục Y bên phải)
            {
                label: 'CPA',
                data: [3.20, 3.45, 3.67, 3.55],
                borderColor: '#17a2b8', // Xanh lam nhạt
                backgroundColor: 'rgba(23, 162, 184, 0.2)',
                type: 'line',
                yAxisID: 'yRight',
                tension: 0.3,
                pointRadius: 5
            },
            // Dữ liệu TC Tích lũy (Cột, Trục Y bên trái)
            {
                label: 'TC Tích lũy',
                data: [32, 64, 108, 140],
                backgroundColor: '#007bff', // Xanh đậm
                yAxisID: 'yLeft'
            }
        ]
    };

    new Chart(ctx, {
        type: 'bar', // Loại biểu đồ mặc định là cột
        data: hocTapData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'bottom' }
            },
            scales: {
                yLeft: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'TC Tích lũy' },
                    min: 0,
                    max: 200,
                    grid: { drawOnChartArea: true }
                },
                yRight: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Điểm (CPA/GPA)' },
                    min: 0,
                    max: 4.0,
                    grid: { drawOnChartArea: false }, // Không vẽ grid line cho trục phải
                    ticks: { stepSize: 0.5 }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Hàm khởi tạo biểu đồ rèn luyện
function initializeRenLuyenChart() {
    const ctx = document.getElementById('renLuyenChart');

    // Dữ liệu mẫu điểm rèn luyện
    const renLuyenData = {
        labels: ['2022-1', '2022-2', '2023-1', '2023-2', '2024-1'],
        datasets: [{
            label: 'Điểm Rèn luyện',
            data: [85, 90, 88, 92, 89],
            borderColor: '#28a745', // Xanh lá
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: renLuyenData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    min: 60,
                    max: 100,
                    ticks: { stepSize: 10 },
                    title: { display: true, text: 'Điểm Rèn luyện' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}


// Khởi tạo các chức năng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    // --- Khởi tạo Biểu đồ ---
    initializeHocTapChart();
    initializeRenLuyenChart();

    // --- Chức năng chuyển Tabs Chính ---
    const mainTabs = document.querySelectorAll('.main-tab-item');
    const mainContents = document.querySelectorAll('[id$="-main"]');

    const switchMainTab = (targetId) => {
        // Ẩn tất cả nội dung chính
        mainContents.forEach(content => {
            content.style.display = 'none';
        });
        // Loại bỏ active khỏi tất cả tabs
        mainTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Hiển thị nội dung target và đặt tab active
        const targetContent = document.getElementById(`content-${targetId}-main`);
        if (targetContent) {
            targetContent.style.display = 'block';
            document.querySelector(`.main-tab-item[data-tab="${targetId}"]`).classList.add('active');
        }
    };

    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');
            switchMainTab(targetId);
        });
    });

    // --- Chức năng chuyển Tabs Phụ ---
    const subTabs = document.querySelectorAll('.sub-tab-item');
    const statusContent = document.getElementById('content-trangthai-status');
    const manageContent = document.getElementById('content-quanly-status');

    subTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Loại bỏ active khỏi tất cả tabs phụ
            subTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Hiển thị nội dung tương ứng
            if (targetTab === 'trangthai') {
                statusContent.style.display = 'block';
                manageContent.style.display = 'none';
            } else if (targetTab === 'quanly') {
                statusContent.style.display = 'none';
                manageContent.style.display = 'block';
            }
        });
    });

    // Mặc định hiển thị tab "Lý lịch" và tab phụ "Trạng thái" khi tải trang
    switchMainTab('lylich'); 
});
