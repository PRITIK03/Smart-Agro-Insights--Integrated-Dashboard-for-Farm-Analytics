// Advanced Analytics Charts
let priceTrendChart, marketShareChart, cropProductionChart, weatherAnalysisChart, profitAnalysisChart, regionalAnalysisChart, riskAssessmentChart;

// Initialize all analytics charts
function initializeAnalytics() {
    console.log('Starting analytics initialization...');
    
    try {
        initializePriceTrendChart();
        console.log('Price trend chart initialized');
    } catch (e) { console.error('Error initializing price trend chart:', e); }
    
    try {
        initializeMarketShareChart();
        console.log('Market share chart initialized');
    } catch (e) { console.error('Error initializing market share chart:', e); }
    
    try {
        initializeCropProductionChart();
        console.log('Crop production chart initialized');
    } catch (e) { console.error('Error initializing crop production chart:', e); }
    
    try {
        initializeWeatherAnalysisChart();
        console.log('Weather analysis chart initialized');
    } catch (e) { console.error('Error initializing weather analysis chart:', e); }
    
    try {
        initializeProfitAnalysisChart();
        console.log('Profit analysis chart initialized');
    } catch (e) { console.error('Error initializing profit analysis chart:', e); }
    
    try {
        initializeRegionalAnalysisChart();
        console.log('Regional analysis chart initialized');
    } catch (e) { console.error('Error initializing regional analysis chart:', e); }
    
    try {
        initializeRiskAssessmentChart();
        console.log('Risk assessment chart initialized');
    } catch (e) { console.error('Error initializing risk assessment chart:', e); }
    
    console.log('Analytics initialization completed');
}

// Price Trend Chart
function initializePriceTrendChart() {
    const priceTrendCtx = document.getElementById('priceTrendChart');
    if (!priceTrendCtx) {
        console.error('Price trend chart canvas not found');
        return;
    }
    
    // Hide loading indicator and show chart
    const loadingEl = document.getElementById('priceTrendLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    priceTrendCtx.style.display = 'block';
    
    priceTrendChart = new Chart(priceTrendCtx.getContext('2d'), {
        type: 'line',
        data: {
            labels: window.sampleData.prices.labels,
            datasets: [{
                label: 'Wheat Price Trend',
                data: [1950, 2000, 2050, 1980, 2100, 2150, 2080, 2200, 2250, 2180, 2100, 2050],
                borderColor: '#FF6B6B',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#FF6B6B',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }, {
                label: 'Rice Price Trend',
                data: [1800, 1850, 1900, 1820, 1880, 1920, 1850, 1900, 1950, 1880, 1850, 1800],
                borderColor: '#4ECDC4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#4ECDC4',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }, {
                label: 'Cotton Price Trend',
                data: [4800, 5000, 5200, 5100, 5400, 5600, 5500, 5700, 5800, 5600, 5500, 5400],
                borderColor: '#45B7D1',
                backgroundColor: 'rgba(69, 183, 209, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#45B7D1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ₹${context.parsed.y}/Quintal`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Annual Price Trends',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Price (₹/Quintal)',
                        color: '#666',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Market Share Chart
function initializeMarketShareChart() {
    const marketShareCtx = document.getElementById('marketShareChart');
    if (!marketShareCtx) {
        console.error('Market share chart canvas not found');
        return;
    }
    
    // Hide loading indicator and show chart
    const loadingEl = document.getElementById('marketShareLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    marketShareCtx.style.display = 'block';
    
    marketShareChart = new Chart(marketShareCtx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: window.sampleData.market.labels,
            datasets: [{
                data: window.sampleData.market.marketShare,
                backgroundColor: [
                    '#FF6B6B',
                    '#4ECDC4',
                    '#45B7D1',
                    '#96CEB4',
                    '#FFEAA7',
                    '#DDA0DD'
                ],
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 15,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            interaction: {
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% of market`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Crop Market Share Distribution',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Crop Production Chart
function initializeCropProductionChart() {
    const cropProductionCtx = document.getElementById('cropProductionChart');
    if (!cropProductionCtx) {
        console.error('Crop production chart canvas not found');
        return;
    }
    
    // Hide loading indicator and show chart
    const loadingEl = document.getElementById('cropProductionLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    cropProductionCtx.style.display = 'block';
    
    cropProductionChart = new Chart(cropProductionCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: window.sampleData.market.labels,
            datasets: [{
                label: 'Production (Million Tons)',
                data: window.sampleData.market.production.map(val => val / 1000),
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(33, 150, 243, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(255, 87, 34, 0.8)',
                    'rgba(0, 150, 136, 0.8)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(255, 87, 34, 1)',
                    'rgba(0, 150, 136, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Production: ${context.parsed.y}M Tons`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Annual Crop Production',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Production (Million Tons)',
                        color: '#666',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Weather Analysis Chart
function initializeWeatherAnalysisChart() {
    const weatherAnalysisCtx = document.getElementById('weatherAnalysisChart');
    if (!weatherAnalysisCtx) {
        console.error('Weather analysis chart canvas not found');
        return;
    }
    
    // Hide loading indicator and show chart
    const loadingEl = document.getElementById('weatherAnalysisLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    weatherAnalysisCtx.style.display = 'block';
    
    weatherAnalysisChart = new Chart(weatherAnalysisCtx.getContext('2d'), {
        type: 'line',
        data: {
            labels: window.sampleData.weather.labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: window.sampleData.weather.temperature,
                borderColor: '#FF6B6B',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y',
                pointBackgroundColor: '#FF6B6B',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }, {
                label: 'Humidity (%)',
                data: window.sampleData.weather.humidity,
                borderColor: '#4ECDC4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y1',
                pointBackgroundColor: '#4ECDC4',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (label.includes('Temp')) {
                                    label += context.parsed.y + '°C';
                                } else if (label.includes('Humidity')) {
                                    label += context.parsed.y + '%';
                                }
                            }
                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Weekly Weather Analysis',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                        color: '#FF6B6B',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                        color: '#4ECDC4',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Profit Analysis Chart
function initializeProfitAnalysisChart() {
    const profitAnalysisCtx = document.getElementById('profitAnalysisChart');
    if (!profitAnalysisCtx) {
        console.error('Profit analysis chart canvas not found');
        return;
    }
    
    // Hide loading indicator and show chart
    const loadingEl = document.getElementById('profitAnalysisLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    profitAnalysisCtx.style.display = 'block';
    
    profitAnalysisChart = new Chart(profitAnalysisCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: window.sampleData.financial.labels,
            datasets: [{
                label: 'Profit (₹K)',
                data: window.sampleData.financial.profit.map(val => val / 1000),
                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Profit: ₹${context.parsed.y}K`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Monthly Profit Analysis',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Profit (₹K)',
                        color: '#666',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Regional Analysis Chart
function initializeRegionalAnalysisChart() {
    const regionalAnalysisCtx = document.getElementById('regionalAnalysisChart');
    if (!regionalAnalysisCtx) {
        console.error('Regional analysis chart canvas not found');
        return;
    }
    
    // Hide loading indicator and show chart
    const loadingEl = document.getElementById('regionalAnalysisLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    regionalAnalysisCtx.style.display = 'block';
    
    regionalAnalysisChart = new Chart(regionalAnalysisCtx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['Yield', 'Quality', 'Price', 'Demand', 'Growth', 'Sustainability'],
            datasets: [{
                label: 'North Zone',
                data: [window.sampleData.regional.yield[0], window.sampleData.regional.quality[0], window.sampleData.regional.price[0], 90, 85, 80],
                borderColor: 'rgba(76, 175, 80, 1)',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                pointBackgroundColor: 'rgba(76, 175, 80, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(76, 175, 80, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }, {
                label: 'South Zone',
                data: [75, 85, 80, 70, 75, 85],
                borderColor: 'rgba(33, 150, 243, 1)',
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                pointBackgroundColor: 'rgba(33, 150, 243, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(33, 150, 243, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            interaction: {
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.r}%`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Regional Performance Comparison',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Performance Score (%)',
                        color: '#666',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 11,
                            weight: 'bold'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Risk Assessment Chart
function initializeRiskAssessmentChart() {
    const riskAssessmentCtx = document.getElementById('riskAssessmentChart');
    if (!riskAssessmentCtx) {
        console.error('Risk assessment chart canvas not found');
        return;
    }
    
    // Hide loading indicator and show chart
    const loadingEl = document.getElementById('riskAssessmentLoading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
    riskAssessmentCtx.style.display = 'block';
    
    riskAssessmentChart = new Chart(riskAssessmentCtx.getContext('2d'), {
        type: 'polarArea',
        data: {
            labels: window.sampleData.risk.labels,
            datasets: [{
                data: window.sampleData.risk.data,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(255, 87, 34, 0.8)',
                    'rgba(33, 150, 243, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(0, 150, 136, 0.8)'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            interaction: {
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% risk`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Agricultural Risk Assessment',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 30,
                    title: {
                        display: true,
                        text: 'Risk Level (%)',
                        color: '#666',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 11,
                            weight: 'bold'
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Toggle Functions
function togglePriceTrendChart() {
    if (priceTrendChart) {
        priceTrendChart.update('active');
    }
}

function toggleMarketShareChart() {
    if (marketShareChart) {
        marketShareChart.update('active');
    }
}
