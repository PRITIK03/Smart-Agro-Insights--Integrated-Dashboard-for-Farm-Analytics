// Enhanced Dashboard functionality with advanced analytics
let weatherChart, priceChart, yieldChart, productivityChart, soilHealthChart, financialChart, profitChart, riskAnalysisChart, weatherPatternChart, priceTrendChart, marketShareChart, cropProductionChart, weatherAnalysisChart, profitAnalysisChart, regionalAnalysisChart, riskAssessmentChart;
let realTimeData = {};

// Sample data is now loaded from data.js

// Initialize all dashboard features
function initializeDashboard() {
    console.log('Starting dashboard initialization...');
    
    // Initialize core charts first
    try {
        initializeWeatherChart();
        console.log('Weather chart initialized');
    } catch (e) { console.error('Error initializing weather chart:', e); }
    
    try {
        initializePriceChart();
        console.log('Price chart initialized');
    } catch (e) { console.error('Error initializing price chart:', e); }
    
    try {
        initializeYieldChart();
        console.log('Yield chart initialized');
    } catch (e) { console.error('Error initializing yield chart:', e); }
    
    try {
        initializeProductivityChart();
        console.log('Productivity chart initialized');
    } catch (e) { console.error('Error initializing productivity chart:', e); }
    
    // Initialize market-related charts
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
    
    // Initialize analysis charts
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
    
    // Initialize secondary features
    try {
        initializeSoilHealthChart();
        console.log('Soil health chart initialized');
    } catch (e) { console.error('Error initializing soil health chart:', e); }
    
    try {
        initializeFinancialChart();
        console.log('Financial chart initialized');
    } catch (e) { console.error('Error initializing financial chart:', e); }
    
    try {
        initializeProfitChart();
        console.log('Profit chart initialized');
    } catch (e) { console.error('Error initializing profit chart:', e); }
    
    try {
        initializeRiskAnalysisChart();
        console.log('Risk analysis chart initialized');
    } catch (e) { console.error('Error initializing risk analysis chart:', e); }
    
    try {
        initializeWeatherPatternChart();
        console.log('Weather pattern chart initialized');
    } catch (e) { console.error('Error initializing weather pattern chart:', e); }
    
    try {
        initializeRiskAssessmentChart();
        console.log('Risk assessment chart initialized');
    } catch (e) { console.error('Error initializing risk assessment chart:', e); }
    
    // Initialize real-time features
    try {
        initializeRealTimeMonitoring();
        console.log('Real-time monitoring initialized');
    } catch (e) { console.error('Error initializing real-time monitoring:', e); }
    
    try {
        initializeHeroAnimations();
        console.log('Hero animations initialized');
    } catch (e) { console.error('Error initializing hero animations:', e); }
    
    try {
        startRealTimeUpdates();
        console.log('Real-time updates started');
    } catch (e) { console.error('Error starting real-time updates:', e); }
    
    try {
        initializeParticleEffect();
        console.log('Particle effect initialized');
    } catch (e) { console.error('Error initializing particle effect:', e); }
    
    try {
        initializeMarketFeatures();
        console.log('Market features initialized');
    } catch (e) { console.error('Error initializing market features:', e); }
    
    // Force a chart update after a short delay to ensure DOM is fully loaded
    setTimeout(() => {
        try {
            updateCharts();
            console.log('Charts updated successfully');
        } catch (e) { console.error('Error updating charts:', e); }
    }, 1000);
    
    console.log('Dashboard initialization completed');
}

// Enhanced Weather Forecast Chart with Sample Data
function initializeWeatherChart() {
    const weatherCtx = document.getElementById('weatherChart').getContext('2d');
    
    // Generate weather icons based on conditions
    const weatherIcons = window.window.sampleData.weather.rainfall.map(rain => {
        if (rain > 4) return '🌧️';
        if (rain > 0) return '🌦️';
        return '☀️';
    });
    
    weatherChart = new Chart(weatherCtx, {
        type: 'line',
        data: {
            labels: window.sampleData.weather.labels.map((label, i) => `${label} ${weatherIcons[i]}`),
            datasets: [{
                label: 'Temperature (°C)',
                data: window.sampleData.weather.temperature,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y',
                fill: true,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Humidity (%)',
                data: window.sampleData.weather.humidity,
                borderColor: '#4cc9f0',
                backgroundColor: 'rgba(76, 201, 240, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y1',
                borderDash: [5, 5],
                fill: false,
                pointBackgroundColor: '#4cc9f0',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Rainfall (mm)',
                data: window.sampleData.weather.rainfall,
                type: 'bar',
                backgroundColor: 'rgba(100, 181, 246, 0.6)',
                borderColor: 'rgba(100, 181, 246, 1)',
                borderWidth: 1,
                yAxisID: 'y2',
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
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
                                } else if (label.includes('Rainfall')) {
                                    label += context.parsed.y + 'mm';
                                }
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                title: {
                    display: true,
                    text: '7-Day Weather Forecast',
                    font: {
                        size: 16,
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
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    min: Math.min(...window.sampleData.weather.temperature) - 5,
                    max: Math.max(...window.sampleData.weather.temperature) + 5
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    min: 0,
                    max: 100
                },
                y2: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    min: 0,
                    max: Math.max(...window.sampleData.weather.rainfall) * 1.5
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Enhanced Market Prices Chart with Sample Data
function initializePriceChart() {
    const priceCtx = document.getElementById('priceChart').getContext('2d');
    
    // Calculate price changes
    const priceChanges = window.sampleData.prices.current.map((current, i) => {
        const previous = window.sampleData.prices.previous[i];
        return ((current - previous) / previous * 100).toFixed(1);
    });
    
    priceChart = new Chart(priceCtx, {
        type: 'bar',
        data: {
            labels: window.sampleData.prices.labels,
            datasets: [{
                label: 'Current Price (₹/Quintal)',
                data: window.sampleData.prices.current,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(33, 150, 243, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(255, 87, 34, 0.8)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(255, 87, 34, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
                barPercentage: 0.6
            }, {
                label: 'Previous Week (₹/Quintal)',
                data: window.sampleData.prices.previous,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(33, 150, 243, 0.4)',
                    'rgba(255, 193, 7, 0.4)',
                    'rgba(156, 39, 176, 0.4)',
                    'rgba(255, 87, 34, 0.4)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(255, 87, 34, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.datasets.map((dataset, i) => ({
                                    text: dataset.label,
                                    fillStyle: dataset.backgroundColor[0],
                                    strokeStyle: dataset.borderColor[0],
                                    lineWidth: 1,
                                    hidden: !chart.isDatasetVisible(i),
                                    index: i
                                }));
                            }
                            return [];
                        }
                    },
                    onClick: function(e, legendItem, legend) {
                        const index = legendItem.datasetIndex;
                        const ci = legend.chart;
                        const meta = ci.getDatasetMeta(index);
                        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                        ci.update();
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                const datasetIndex = context.datasetIndex;
                                const dataIndex = context.dataIndex;
                                let tooltipText = `${label}₹${context.parsed.y.toLocaleString()}/Quintal`;
                                
                                // Add change percentage for current prices
                                if (datasetIndex === 0) {
                                    const change = priceChanges[dataIndex];
                                    tooltipText += ` (${change >= 0 ? '+' : ''}${change}%)`;
                                }
                                
                                return tooltipText;
                            }
                            return label;
                        },
                        footer: function(tooltipItems) {
                            const dataIndex = tooltipItems[0].dataIndex;
                            const current = window.sampleData.prices.current[dataIndex];
                            const previous = window.sampleData.prices.previous[dataIndex];
                            const change = ((current - previous) / previous * 100).toFixed(1);
                            const changeType = parseFloat(change) >= 0 ? 'increase' : 'decrease';
                            
                            return [`Week over week: ${change >= 0 ? '+' : ''}${change}% ${changeType}`];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 7000,
                    title: {
                        display: true,
                        text: 'Price (₹/Quintal)',
                        color: '#666',
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        padding: { top: 10, bottom: 10 }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        padding: 8,
                        callback: function(value) {
                            if (value >= 1000) {
                                return '₹' + (value / 1000).toFixed(1) + 'k';
                            }
                            return '₹' + value;
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
                            size: 11,
                            weight: '500'
                        },
                        padding: 8
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

// Enhanced Yield Prediction Chart
function initializeYieldChart() {
    const yieldCtx = document.getElementById('yieldChart').getContext('2d');
    yieldChart = new Chart(yieldCtx, {
        type: 'bar',
        data: {
            labels: ['Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Vegetables'],
            datasets: [{
                label: 'Current Yield (T/ha)',
                data: [3.2, 2.8, 2.1, 1.8, 2.5, 1.9],
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
            }, {
                label: 'Predicted Yield (T/ha)',
                data: [3.5, 3.0, 2.3, 2.0, 2.7, 2.1],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(33, 150, 243, 0.4)',
                    'rgba(255, 193, 7, 0.4)',
                    'rgba(156, 39, 176, 0.4)',
                    'rgba(255, 87, 34, 0.4)',
                    'rgba(0, 150, 136, 0.4)'
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
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} T/ha`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    title: {
                        display: true,
                        text: 'Yield (Tons/Hectare)',
                        color: '#666',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
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

// Real-time Monitoring System
function initializeRealTimeMonitoring() {
    realTimeData = {
        soilTemp: 24,
        soilMoisture: 68,
        sunlight: 8.2,
        pestRisk: 'Low',
        maxTemp: 32,
        minTemp: 18,
        humidity: 65,
        windSpeed: 12
    };
    
    updateRealTimeData();
}

// Update real-time monitoring data
function updateRealTimeData() {
    // Update soil temperature
    const soilTempEl = document.getElementById('soilTemp');
    if (soilTempEl) {
        realTimeData.soilTemp = (24 + (Math.random() - 0.5) * 4).toFixed(1);
        soilTempEl.textContent = `${realTimeData.soilTemp}°C`;
    }
    
    // Update soil moisture
    const soilMoistureEl = document.getElementById('soilMoisture');
    if (soilMoistureEl) {
        realTimeData.soilMoisture = Math.floor(60 + Math.random() * 20);
        soilMoistureEl.textContent = `${realTimeData.soilMoisture}%`;
    }
    
    // Update sunlight hours
    const sunlightEl = document.getElementById('sunlight');
    if (sunlightEl) {
        realTimeData.sunlight = (7.5 + Math.random() * 2).toFixed(1);
        sunlightEl.textContent = `${realTimeData.sunlight} hrs`;
    }
    
    // Update pest risk
    const pestRiskEl = document.getElementById('pestRisk');
    if (pestRiskEl) {
        const risks = ['Low', 'Medium', 'High'];
        realTimeData.pestRisk = risks[Math.floor(Math.random() * risks.length)];
        pestRiskEl.textContent = realTimeData.pestRisk;
    }
    
    // Update weather summary
    updateWeatherSummary();
}

// Update weather summary
function updateWeatherSummary() {
    const maxTempEl = document.getElementById('maxTemp');
    const minTempEl = document.getElementById('minTemp');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('windSpeed');
    
    if (maxTempEl) {
        realTimeData.maxTemp = Math.floor(30 + Math.random() * 6);
        maxTempEl.textContent = `${realTimeData.maxTemp}°C`;
    }
    
    if (minTempEl) {
        realTimeData.minTemp = Math.floor(15 + Math.random() * 6);
        minTempEl.textContent = `${realTimeData.minTemp}°C`;
    }
    
    if (humidityEl) {
        realTimeData.humidity = Math.floor(50 + Math.random() * 30);
        humidityEl.textContent = `${realTimeData.humidity}%`;
    }
    
    if (windSpeedEl) {
        realTimeData.windSpeed = Math.floor(8 + Math.random() * 10);
        windSpeedEl.textContent = `${realTimeData.windSpeed} km/h`;
    }
}

// Hero animations and counter effects
function initializeHeroAnimations() {
    animateCounters();
    startParticleAnimation();
}

// Animate counter numbers
function animateCounters() {
    const counters = [
        { id: 'totalFarmers', target: 2847, duration: 2000 },
        { id: 'cropsMonitored', target: 156, duration: 1500 },
        { id: 'accuracyRate', target: 94, duration: 2500 }
    ];
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            animateCounter(element, counter.target, counter.duration);
        }
    });
}

// Counter animation function
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Particle effect for hero section
function initializeParticleEffect() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (particlesContainer) {
        createParticles(particlesContainer);
    }
}

// Create floating particles
function createParticles(container) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        container.appendChild(particle);
    }
}

// Start real-time updates
function startRealTimeUpdates() {
    setInterval(() => {
        updateRealTimeData();
        updateCharts();
    }, 5000);
}

// Update charts with new data
function updateCharts() {
    if (weatherChart) {
        // Update weather chart data
        const newTempData = weatherChart.data.datasets[0].data.map(() => 
            Math.floor(20 + Math.random() * 15)
        );
        const newRainData = weatherChart.data.datasets[1].data.map(() => 
            Math.floor(Math.random() * 30)
        );
        
        weatherChart.data.datasets[0].data = newTempData;
        weatherChart.data.datasets[1].data = newRainData;
        weatherChart.update('none');
    }
    
    if (priceChart) {
        // Update price chart data
        const newPriceData = priceChart.data.datasets[0].data.map(price => 
            Math.floor(price * (0.95 + Math.random() * 0.1))
        );
        priceChart.data.datasets[0].data = newPriceData;
        priceChart.update('none');
    }
}

// Crop Productivity Trends Chart
function initializeProductivityChart() {
    const productivityCtx = document.getElementById('productivityChart');
    if (!productivityCtx) {
        console.error('Productivity chart canvas not found');
        return;
    }
    
    productivityChart = new Chart(productivityCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: window.sampleData.productivity.labels,
            datasets: [{
                label: 'Wheat (Tons/Hectare)',
                data: window.sampleData.productivity.wheat,
                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }, {
                label: 'Rice (Tons/Hectare)',
                data: window.sampleData.productivity.rice,
                backgroundColor: 'rgba(33, 150, 243, 0.8)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }, {
                label: 'Maize (Tons/Hectare)',
                data: window.sampleData.productivity.maize,
                backgroundColor: 'rgba(255, 193, 7, 0.8)',
                borderColor: 'rgba(255, 193, 7, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                            return `${context.dataset.label}: ${context.parsed.y} T/ha`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Monthly Crop Productivity Trends',
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
                    max: 4,
                    title: {
                        display: true,
                        text: 'Yield (Tons/Hectare)',
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

// Toggle weather chart (refresh button)
function toggleWeatherChart() {
    if (weatherChart) {
        weatherChart.update('active');
    }
}

function toggleProductivityChart() {
    if (productivityChart) {
        productivityChart.update('active');
    }
}

// Soil Health Analysis Chart
function initializeSoilHealthChart() {
    const soilCtx = document.getElementById('soilHealthChart');
    if (!soilCtx) {
        console.error('Soil health chart canvas not found');
        return;
    }
    
    soilHealthChart = new Chart(soilCtx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: window.sampleData.soilHealth.labels,
            datasets: [{
                data: window.sampleData.soilHealth.data,
                backgroundColor: window.sampleData.soilHealth.colors,
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 15,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                            return `${context.label}: ${context.parsed}% of fields`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Soil Health Distribution',
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

function toggleSoilChart() {
    if (soilHealthChart) {
        soilHealthChart.update('active');
    }
}

// Financial Performance Chart
function initializeFinancialChart() {
    const financialCtx = document.getElementById('financialChart');
    if (!financialCtx) {
        console.error('Financial chart canvas not found');
        return;
    }
    
    financialChart = new Chart(financialCtx.getContext('2d'), {
        type: 'line',
        data: {
            labels: window.sampleData.financial.labels,
            datasets: [{
                label: 'Revenue (₹ Lakhs)',
                data: window.sampleData.financial.revenue.map(val => val / 1000), // Convert to lakhs
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#4CAF50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Expenses (₹ Lakhs)',
                data: window.sampleData.financial.expenses.map(val => val / 1000), // Convert to lakhs
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#F44336',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Profit (₹ Lakhs)',
                data: window.sampleData.financial.profit.map(val => val / 1000), // Convert to lakhs
                borderColor: '#FF9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#FF9800',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                            return `${context.dataset.label}: ₹${context.parsed.y}L`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Financial Performance Overview',
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
                        text: 'Amount (₹ Lakhs)',
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

function toggleFinancialChart() {
    if (financialChart) {
        financialChart.update('active');
    }
}

// Profit Margins Chart
function initializeProfitChart() {
    const profitCtx = document.getElementById('profitChart').getContext('2d');
    profitChart = new Chart(profitCtx, {
        type: 'radar',
        data: {
            labels: ['Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Vegetables'],
            datasets: [{
                label: 'Profit Margin (%)',
                data: [25, 18, 22, 35, 28, 40],
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(33, 150, 243, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 50,
                    title: {
                        display: true,
                        text: 'Profit Margin (%)',
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 12
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

// Risk Analysis Chart
function initializeRiskAnalysisChart() {
    const riskCtx = document.getElementById('riskAnalysisChart');
    if (!riskCtx) {
        console.error('Risk analysis chart canvas not found');
        return;
    }
    
    riskAnalysisChart = new Chart(riskCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: window.sampleData.risk.labels,
            datasets: [{
                label: 'Risk Level (%)',
                data: window.sampleData.risk.data,
                backgroundColor: window.sampleData.risk.colors,
                borderColor: window.sampleData.risk.colors.map(color => color.replace('0.8', '1')),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                            return `Risk Level: ${context.parsed.y}%`;
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
                y: {
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

function toggleRiskChart() {
    if (riskAnalysisChart) {
        riskAnalysisChart.update('active');
    }
}

// Weather Patterns Chart
function initializeWeatherPatternChart() {
    const weatherPatternCtx = document.getElementById('weatherPatternChart');
    if (!weatherPatternCtx) {
        console.error('Weather pattern chart canvas not found');
        return;
    }
    
    weatherPatternChart = new Chart(weatherPatternCtx.getContext('2d'), {
        type: 'line',
        data: {
            labels: window.sampleData.weatherPatterns.labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: window.sampleData.weatherPatterns.temperature,
                borderColor: '#FF6B6B',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y',
                pointBackgroundColor: '#FF6B6B',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Rainfall (mm)',
                data: window.sampleData.weatherPatterns.rainfall,
                borderColor: '#4ECDC4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y1',
                pointBackgroundColor: '#4ECDC4',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Humidity (%)',
                data: window.sampleData.weatherPatterns.humidity,
                borderColor: '#45B7D1',
                backgroundColor: 'rgba(69, 183, 209, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y2',
                pointBackgroundColor: '#45B7D1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                                } else if (label.includes('Rainfall')) {
                                    label += context.parsed.y + 'mm';
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
                    text: 'Annual Weather Patterns',
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
                        text: 'Rainfall (mm)',
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
                y2: {
                    type: 'linear',
                    display: false,
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

function toggleWeatherPatternChart() {
    if (weatherPatternChart) {
        weatherPatternChart.update('active');
    }
}

// Price Trend Chart
function initializePriceTrendChart() {
    const priceTrendCtx = document.getElementById('priceTrendChart').getContext('2d');
    priceTrendChart = new Chart(priceTrendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                pointRadius: 5
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
                pointRadius: 5
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
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ₹${context.parsed.y}/Quintal`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Price (₹/Quintal)',
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
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
    const marketShareCtx = document.getElementById('marketShareChart').getContext('2d');
    marketShareChart = new Chart(marketShareCtx, {
        type: 'doughnut',
        data: {
            labels: ['Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Others'],
            datasets: [{
                data: [35, 25, 15, 12, 8, 5],
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
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% of market`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Market Features Initialization
function initializeMarketFeatures() {
    updatePriceSummaryCards();
    updateMarketSentiment();
    startMarketDataUpdates();
}

// Update Price Summary Cards
function updatePriceSummaryCards() {
    const priceCards = document.querySelectorAll('.price-summary-card');
    priceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Update Market Sentiment
function updateMarketSentiment() {
    const sentimentFill = document.querySelector('.sentiment-fill');
    const sentimentLabel = document.querySelector('.sentiment-label');
    
    if (sentimentFill && sentimentLabel) {
        const sentiment = Math.floor(Math.random() * 40) + 60; // 60-100% bullish
        sentimentFill.style.width = sentiment + '%';
        sentimentLabel.textContent = `Bullish (${sentiment}%)`;
    }
}

// Start Market Data Updates
function startMarketDataUpdates() {
    setInterval(() => {
        updatePriceSummaryCards();
        updateMarketSentiment();
        updatePriceCharts();
    }, 10000); // Update every 10 seconds
}

// Update Price Charts
function updatePriceCharts() {
    if (priceTrendChart) {
        // Update price trend chart with new data
        const newWheatData = priceTrendChart.data.datasets[0].data.map(price => 
            Math.floor(price * (0.98 + Math.random() * 0.04))
        );
        const newRiceData = priceTrendChart.data.datasets[1].data.map(price => 
            Math.floor(price * (0.98 + Math.random() * 0.04))
        );
        const newCottonData = priceTrendChart.data.datasets[2].data.map(price => 
            Math.floor(price * (0.98 + Math.random() * 0.04))
        );
        
        priceTrendChart.data.datasets[0].data = newWheatData;
        priceTrendChart.data.datasets[1].data = newRiceData;
        priceTrendChart.data.datasets[2].data = newCottonData;
        priceTrendChart.update('none');
    }
}

// Toggle Functions for New Charts
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

// Market Alert Functions
function refreshAlerts() {
    const alertItems = document.querySelectorAll('.alert-item');
    alertItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 200);
        }, index * 100);
    });
}

function showPricePrediction() {
    // Show price prediction modal or alert
    alert('Price Prediction: Based on current trends, wheat prices are expected to increase by 3-5% in the next month, while rice prices may stabilize around current levels.');
}

// Crop Production Chart
function initializeCropProductionChart() {
    const cropProductionCtx = document.getElementById('cropProductionChart').getContext('2d');
    cropProductionChart = new Chart(cropProductionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Wheat', 'Rice', 'Maize', 'Cotton', 'Vegetables'],
            datasets: [{
                data: [35, 28, 20, 12, 5],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(33, 150, 243, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(255, 87, 34, 0.8)'
                ],
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 10
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% of production`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1500
            }
        }
    });
}

// Weather Analysis Chart
function initializeWeatherAnalysisChart() {
    const weatherAnalysisCtx = document.getElementById('weatherAnalysisChart').getContext('2d');
    weatherAnalysisChart = new Chart(weatherAnalysisCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [28, 30, 32, 29, 31, 33, 30],
                borderColor: '#FF6B6B',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y'
            }, {
                label: 'Humidity (%)',
                data: [65, 60, 55, 70, 58, 52, 68],
                borderColor: '#4ECDC4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 10
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
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
                        color: '#FF6B6B'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                        color: '#4ECDC4'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Profit Analysis Chart
function initializeProfitAnalysisChart() {
    const profitAnalysisCtx = document.getElementById('profitAnalysisChart').getContext('2d');
    profitAnalysisChart = new Chart(profitAnalysisCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Profit (₹K)',
                data: [35, 42, 38, 45, 48, 52],
                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `Profit: ₹${context.parsed.y}K`;
                        }
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
                            size: 10
                        }
                    },
                    ticks: {
                        font: {
                            size: 9
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 9
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Regional Analysis Chart
function initializeRegionalAnalysisChart() {
    const regionalAnalysisCtx = document.getElementById('regionalAnalysisChart').getContext('2d');
    regionalAnalysisChart = new Chart(regionalAnalysisCtx, {
        type: 'radar',
        data: {
            labels: ['Yield', 'Quality', 'Price', 'Demand', 'Growth', 'Sustainability'],
            datasets: [{
                label: 'North Zone',
                data: [85, 80, 75, 90, 85, 80],
                borderColor: 'rgba(76, 175, 80, 1)',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                pointBackgroundColor: 'rgba(76, 175, 80, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(76, 175, 80, 1)'
            }, {
                label: 'South Zone',
                data: [75, 85, 80, 70, 75, 85],
                borderColor: 'rgba(33, 150, 243, 1)',
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                pointBackgroundColor: 'rgba(33, 150, 243, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(33, 150, 243, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 10
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: {
                            size: 9
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Risk Assessment Chart
function initializeRiskAssessmentChart() {
    const riskAssessmentCtx = document.getElementById('riskAssessmentChart').getContext('2d');
    riskAssessmentChart = new Chart(riskAssessmentCtx, {
        type: 'polarArea',
        data: {
            labels: ['Weather', 'Pests', 'Disease', 'Market', 'Price', 'Quality'],
            datasets: [{
                data: [15, 25, 20, 10, 20, 10],
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
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 10
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}% risk`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1500
            }
        }
    });
}

    // Add click animations to cards
    document.querySelectorAll('.metric-card, .recommendation-item, .insight-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });