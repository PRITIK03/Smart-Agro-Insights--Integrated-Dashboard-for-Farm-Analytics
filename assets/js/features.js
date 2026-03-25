// Additional features and enhancements for the agricultural app

// PWA Installation Prompt
class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.hideInstallButton();
        });
    }

    showInstallButton() {
        const installBtn = document.createElement('button');
        installBtn.id = 'install-btn';
        installBtn.className = 'btn btn-success position-fixed';
        installBtn.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50px;';
        installBtn.innerHTML = '<i class="bi bi-download me-2"></i>Install App';
        
        installBtn.addEventListener('click', () => this.installApp());
        document.body.appendChild(installBtn);
    }

    hideInstallButton() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.remove();
        }
    }

    async installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            this.deferredPrompt = null;
            this.hideInstallButton();
        }
    }
}

// Weather Alerts System
class WeatherAlerts {
    constructor() {
        this.alerts = [];
        this.init();
    }

    init() {
        this.checkWeatherConditions();
        setInterval(() => this.checkWeatherConditions(), 300000); // Check every 5 minutes
    }

    checkWeatherConditions() {
        // Simulate weather condition checking
        const conditions = this.getWeatherConditions();
        
        if (conditions.temperature > 35) {
            this.addAlert('high-temp', 'High temperature alert! Consider irrigation and shade.', 'warning');
        }
        
        if (conditions.rainfall > 50) {
            this.addAlert('heavy-rain', 'Heavy rainfall expected. Check drainage systems.', 'info');
        }
        
        if (conditions.humidity > 80) {
            this.addAlert('high-humidity', 'High humidity detected. Watch for fungal diseases.', 'danger');
        }
    }

    getWeatherConditions() {
        // This would normally fetch from weather API
        return {
            temperature: 28 + Math.random() * 10,
            rainfall: Math.random() * 100,
            humidity: 60 + Math.random() * 30
        };
    }

    addAlert(type, message, level) {
        const alert = {
            id: Date.now(),
            type,
            message,
            level,
            timestamp: new Date()
        };
        
        this.alerts.unshift(alert);
        this.showAlert(alert);
        this.updateAlertsDisplay();
    }

    showAlert(alert) {
        const alertContainer = document.getElementById('alert-container') || this.createAlertContainer();
        
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${alert.level} alert-dismissible fade show`;
        alertElement.innerHTML = `
            <i class="bi bi-${this.getAlertIcon(alert.level)} me-2"></i>
            ${alert.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        alertContainer.appendChild(alertElement);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.remove();
            }
        }, 10000);
    }

    createAlertContainer() {
        const container = document.createElement('div');
        container.id = 'alert-container';
        container.className = 'position-fixed top-0 start-50 translate-middle-x';
        container.style.cssText = 'z-index: 1050; width: 90%; max-width: 500px;';
        document.body.appendChild(container);
        return container;
    }

    getAlertIcon(level) {
        const icons = {
            'success': 'check-circle',
            'info': 'info-circle',
            'warning': 'exclamation-triangle',
            'danger': 'x-circle'
        };
        return icons[level] || 'info-circle';
    }

    updateAlertsDisplay() {
        // Update alerts in dashboard if it exists
        const alertsList = document.getElementById('alerts-list');
        if (alertsList) {
            alertsList.innerHTML = this.alerts.slice(0, 5).map(alert => `
                <div class="alert-item alert-${alert.level}">
                    <i class="bi bi-${this.getAlertIcon(alert.level)} me-2"></i>
                    <span>${alert.message}</span>
                    <small class="text-muted ms-auto">${this.formatTime(alert.timestamp)}</small>
                </div>
            `).join('');
        }
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    }
}

// Crop Disease Detection (Mock)
class CropDiseaseDetector {
    constructor() {
        this.diseases = {
            'wheat': ['Rust', 'Smut', 'Powdery Mildew'],
            'rice': ['Blast', 'Bacterial Blight', 'Sheath Blight'],
            'cotton': ['Boll Rot', 'Leaf Curl', 'Wilt'],
            'maize': ['Downy Mildew', 'Rust', 'Leaf Blight']
        };
    }

    detectDisease(cropType, imageData) {
        // Mock disease detection - in real implementation, this would use ML
        const possibleDiseases = this.diseases[cropType.toLowerCase()] || ['Unknown Disease'];
        const randomDisease = possibleDiseases[Math.floor(Math.random() * possibleDiseases.length)];
        const confidence = 70 + Math.random() * 25; // 70-95% confidence
        
        return {
            disease: randomDisease,
            confidence: Math.round(confidence),
            treatment: this.getTreatment(randomDisease),
            prevention: this.getPrevention(randomDisease)
        };
    }

    getTreatment(disease) {
        const treatments = {
            'Rust': 'Apply fungicide spray containing propiconazole',
            'Smut': 'Use certified disease-free seeds and crop rotation',
            'Powdery Mildew': 'Apply sulfur-based fungicide',
            'Blast': 'Use resistant varieties and proper water management',
            'Bacterial Blight': 'Apply copper-based bactericide',
            'Sheath Blight': 'Improve drainage and apply validamycin',
            'Boll Rot': 'Remove infected bolls and apply fungicide',
            'Leaf Curl': 'Control whitefly population with insecticides',
            'Wilt': 'Use resistant varieties and soil solarization',
            'Downy Mildew': 'Apply metalaxyl-based fungicide',
            'Leaf Blight': 'Use resistant varieties and proper spacing'
        };
        return treatments[disease] || 'Consult local agricultural extension officer';
    }

    getPrevention(disease) {
        const preventions = {
            'Rust': 'Plant resistant varieties and maintain proper spacing',
            'Smut': 'Use certified seeds and practice crop rotation',
            'Powdery Mildew': 'Ensure good air circulation and avoid overhead irrigation',
            'Blast': 'Use resistant varieties and maintain proper water levels',
            'Bacterial Blight': 'Avoid overhead irrigation and use clean seeds',
            'Sheath Blight': 'Improve drainage and avoid excessive nitrogen',
            'Boll Rot': 'Maintain proper plant spacing and avoid waterlogging',
            'Leaf Curl': 'Control whitefly vectors and use resistant varieties',
            'Wilt': 'Use disease-free seeds and practice crop rotation',
            'Downy Mildew': 'Ensure good drainage and avoid overcrowding',
            'Leaf Blight': 'Use resistant varieties and proper plant spacing'
        };
        return preventions[disease] || 'Follow good agricultural practices';
    }
}

// Market Price Tracker
class MarketPriceTracker {
    constructor() {
        this.prices = {};
        this.init();
    }

    init() {
        this.fetchPrices();
        setInterval(() => this.fetchPrices(), 3600000); // Update every hour
    }

    async fetchPrices() {
        // Mock price fetching - in real implementation, this would use commodity APIs
        const crops = ['wheat', 'rice', 'maize', 'soybean', 'cotton'];
        
        crops.forEach(crop => {
            this.prices[crop] = {
                current: this.generateMockPrice(crop),
                change: (Math.random() - 0.5) * 10, // -5% to +5% change
                trend: Math.random() > 0.5 ? 'up' : 'down',
                lastUpdated: new Date()
            };
        });
        
        this.updatePriceDisplay();
    }

    generateMockPrice(crop) {
        const basePrices = {
            'wheat': 2000,
            'rice': 1800,
            'maize': 1600,
            'soybean': 3200,
            'cotton': 5500
        };
        
        const base = basePrices[crop] || 2000;
        const variation = (Math.random() - 0.5) * 200; // ±100 variation
        return Math.round(base + variation);
    }

    updatePriceDisplay() {
        const priceContainer = document.getElementById('price-tracker');
        if (priceContainer) {
            priceContainer.innerHTML = Object.entries(this.prices).map(([crop, data]) => `
                <div class="price-item">
                    <div class="crop-name">${crop.charAt(0).toUpperCase() + crop.slice(1)}</div>
                    <div class="price-value">₹${data.current}/quintal</div>
                    <div class="price-change ${data.trend}">
                        <i class="bi bi-arrow-${data.trend === 'up' ? 'up' : 'down'}"></i>
                        ${Math.abs(data.change).toFixed(1)}%
                    </div>
                </div>
            `).join('');
        }
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize PWA installer
    new PWAInstaller();
    
    // Initialize weather alerts
    new WeatherAlerts();
    
    // Initialize market price tracker
    new MarketPriceTracker();
    
    // Initialize disease detector
    window.cropDiseaseDetector = new CropDiseaseDetector();
    
    // Add camera functionality for disease detection
    addCameraFeature();
});

// Camera feature for disease detection
function addCameraFeature() {
    const cameraBtn = document.createElement('button');
    cameraBtn.id = 'camera-btn';
    cameraBtn.className = 'btn btn-outline-primary position-fixed';
    cameraBtn.style.cssText = 'bottom: 20px; left: 20px; z-index: 1000; border-radius: 50px;';
    cameraBtn.innerHTML = '<i class="bi bi-camera me-2"></i>Scan Crop';
    
    cameraBtn.addEventListener('click', openCamera);
    document.body.appendChild(cameraBtn);
}

function openCamera() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                analyzeCropImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    
    input.click();
}

function analyzeCropImage(imageData) {
    // Mock analysis - in real implementation, this would use ML
    const cropType = prompt('Enter crop type (wheat, rice, maize, cotton):', 'wheat');
    
    if (cropType && window.cropDiseaseDetector) {
        const result = window.cropDiseaseDetector.detectDisease(cropType, imageData);
        
        showDiseaseResult(result);
    }
}

function showDiseaseResult(result) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crop Disease Analysis</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-${result.confidence > 80 ? 'success' : 'warning'}">
                        <strong>Detected Disease:</strong> ${result.disease}<br>
                        <strong>Confidence:</strong> ${result.confidence}%
                    </div>
                    <div class="mt-3">
                        <h6>Treatment:</h6>
                        <p class="small">${result.treatment}</p>
                    </div>
                    <div class="mt-3">
                        <h6>Prevention:</h6>
                        <p class="small">${result.prevention}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}
