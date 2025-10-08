function initializeHocTapChart() {
    const ctx = document.getElementById('hocTapChart');

    const hocTapData = {
        labels: ['Học kỳ 1 (N1)', 'Học kỳ 2 (N1)', 'Học kỳ 1 (N2)', 'Học kỳ 2 (N2)', 'Học kỳ 1 (N3)'],
        datasets: [
            {
                label: 'CPA',
                data: [2.80, 3.15, 3.40, 3.55, 3.70],
                borderColor: '#17a2b8', 
                backgroundColor: 'rgba(23, 162, 184, 0.2)',
                type: 'line',
                yAxisID: 'yRight',
                tension: 0.3,
                pointRadius: 5
            },
            {
                label: 'TC Tích lũy',
                data: [16, 32, 50, 80, 108],
                backgroundColor: '#007bff', 
                yAxisID: 'yLeft'
            }
        ]
    };

    new Chart(ctx, {
        type: 'bar', 
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
                    max: 150, 
                    grid: { drawOnChartArea: true }
                },
                yRight: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Điểm (CPA/GPA)' },
                    min: 0,
                    max: 4.0,
                    grid: { drawOnChartArea: false },
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
    const renLuyenData = {
        labels: ['2022-1', '2022-2', '2023-1', '2023-2', '2024-1'],
        datasets: [{
            label: 'Điểm Rèn luyện',
            data: [78, 85, 82, 90, 88],
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
    initializeHocTapChart();
    initializeRenLuyenChart();

    // --- Chức năng chuyển Tabs Chính ---
    const mainTabs = document.querySelectorAll('.main-tab-item');
    const mainContents = document.querySelectorAll('[id$="-main"]');

    const switchMainTab = (targetId) => {
        mainContents.forEach(content => {
            content.style.display = 'none';
        });
        mainTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
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
            
            subTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (targetTab === 'trangthai') {
                statusContent.style.display = 'block';
                manageContent.style.display = 'none';
            } else if (targetTab === 'quanly') {
                statusContent.style.display = 'none';
                manageContent.style.display = 'block';
            }
        });
    });

    switchMainTab('lylich'); 
});
