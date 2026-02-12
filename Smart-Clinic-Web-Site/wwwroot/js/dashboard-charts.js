document.addEventListener('DOMContentLoaded', function() {
    // Department Distribution Pie Chart (if you want to add)
    const departmentCtx = document.getElementById('departmentChart');
    if (departmentCtx) {
        const departmentChart = new Chart(departmentCtx, {
            type: 'pie',
            data: {
                labels: ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'Oncology'],
                datasets: [{
                    data: [245, 189, 156, 312, 134, 98],
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#8B5CF6',
                        '#F59E0B',
                        '#EF4444',
                        '#EC4899'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
});