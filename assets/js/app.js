// Initialize slideshow functionality
function initSlideshow() {
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  let currentSlide = 0;
  
  // Show first slide
  if (slides.length > 0) {
    slides[0].style.opacity = 1;
  }
  
  // Auto-advance slides every 5 seconds
  setInterval(() => {
    // Fade out current slide
    slides[currentSlide].style.opacity = 0;
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Fade in next slide
    setTimeout(() => {
      slides[currentSlide].style.opacity = 1;
    }, 1500); // Match this with CSS transition time
  }, 5000);
}

// Initialize the application
;(function(){
  // Initialize slideshow
  if (document.querySelector('.hero-slideshow')) {
    initSlideshow();
  }
  
  const districtSelect = document.getElementById('districtSelect')
  const languageSelect = document.getElementById('languageSelect')
  const cropTypeSelect = document.getElementById('cropTypeSelect')
  const riskTableBody = document.querySelector('#riskTable tbody')
  const speakSummaryBtn = document.getElementById('speakSummaryBtn')
  const exportPdfBtn = document.getElementById('exportPdfBtn')
  const refreshBtn = document.getElementById('refreshBtn')
  const cropCalendarEl = document.getElementById('cropCalendar')
  const soilInfoEl = document.getElementById('soilInfo')

  const weatherEls = {
    temp: document.getElementById('tempValue'),
    humidity: document.getElementById('humidityValue'),
    rain: document.getElementById('rainValue'),
    wind: document.getElementById('windValue')
  }

  // Free OpenWeather API key (demo purposes)
  const WEATHER_API_KEY = 'b6907d289e10d714a6e88b30761fae22'

  // Populate districts with state information
  window.DISTRICTS.forEach(d => {
    const opt = document.createElement('option')
    opt.value = d.id
    opt.textContent = `${d.name} (${d.state})`
    districtSelect.appendChild(opt)
  })

  // Initialize map with agricultural focus
  const map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
    dragging: true,
    touchZoom: true
  })
  
  // Use CartoDB Positron for cleaner agricultural view
  const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  })
  cartoLayer.addTo(map)
  map.setView([20.5937, 78.9629], 5) // Center on India

  let districtMarkers = {}

  function getRiskColor(risk){
    return (window.RISK_DISPLAY[risk] || window.RISK_DISPLAY.low).color
  }

  function renderMarkers(selectedId){
    // Clear existing
    Object.values(districtMarkers).forEach(m => map.removeLayer(m))
    districtMarkers = {}

    window.DISTRICTS.forEach(d => {
      const riskList = window.CROP_RISKS[d.id] || []
      const worst = riskList.some(r => r.risk === 'high') ? 'high' : (riskList.some(r => r.risk === 'medium') ? 'medium' : 'low')

      // Create custom icon based on risk level
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-${worst}" style="
          width: ${d.id === selectedId ? '20px' : '16px'};
          height: ${d.id === selectedId ? '20px' : '16px'};
          border-radius: 50%;
          background: ${getRiskColor(worst)};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${d.id === selectedId ? '10px' : '8px'};
          color: white;
          font-weight: bold;
        ">${d.id === selectedId ? '★' : '●'}</div>`,
        iconSize: [d.id === selectedId ? 20 : 16, d.id === selectedId ? 20 : 16],
        iconAnchor: [d.id === selectedId ? 10 : 8, d.id === selectedId ? 10 : 8]
      })

      const marker = L.marker([d.lat, d.lon], { icon }).addTo(map)
      
      const riskCounts = riskList.reduce((acc, crop) => {
        acc[crop.risk] = (acc[crop.risk] || 0) + 1
        return acc
      }, {})
      
      const popupContent = `
        <div style="min-width: 200px;">
          <h6 style="margin: 0 0 8px 0; color: #333;">${d.name}, ${d.state}</h6>
          <div style="margin-bottom: 8px;">
            <span class="badge" style="background: ${getRiskColor('high')}; color: white; margin-right: 4px;">
              High: ${riskCounts.high || 0}
            </span>
            <span class="badge" style="background: ${getRiskColor('medium')}; color: white; margin-right: 4px;">
              Medium: ${riskCounts.medium || 0}
            </span>
            <span class="badge" style="background: ${getRiskColor('low')}; color: white;">
              Low: ${riskCounts.low || 0}
            </span>
          </div>
          <small style="color: #666;">Click to view details</small>
        </div>
      `
      
      marker.bindPopup(popupContent)
      marker.on('click', () => {
        districtSelect.value = d.id
        onDistrictChange()
      })
      districtMarkers[d.id] = marker
    })
  }

  function renderTable(districtId){
    const items = window.CROP_RISKS[districtId] || []
    const cropType = cropTypeSelect.value
    
    // Filter by crop type if not "all"
    const filteredItems = cropType === 'all' ? items : items.filter(item => item.category === cropType)
    
    if(filteredItems.length === 0){
      const noDataText = window.i18n.t('table.select_district')
      riskTableBody.innerHTML = `<tr><td colspan="4" class="text-muted text-center">${noDataText}</td></tr>`
      return
    }
    
    riskTableBody.innerHTML = ''
    filteredItems.forEach((item, idx) => {
      const tr = document.createElement('tr')
      const disp = window.RISK_DISPLAY[item.risk] || window.RISK_DISPLAY.low
      tr.className = 'animate__animated animate__fadeIn'
      tr.style.animationDelay = `${idx * 0.1}s`
      
      tr.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <i class="bi bi-${getCropIcon(item.category)} me-2 text-muted"></i>
            <strong>${item.crop}</strong>
          </div>
        </td>
        <td>
          <span class="badge-risk ${disp.badgeClass} animate__animated animate__pulse">
            ${disp.label}
          </span>
        </td>
        <td>
          <small class="text-muted">${item.suggestion}</small>
        </td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-success btn-voice animate__animated animate__pulse" 
                  aria-label="Speak row ${idx+1}">
            <i class="bi bi-volume-up"></i>
          </button>
        </td>
      `
      const btn = tr.querySelector('button')
      btn.addEventListener('click', () => speakRow(item))
      riskTableBody.appendChild(tr)
    })
  }

  function getCropIcon(category) {
    const icons = {
      'cereals': 'grain',
      'pulses': 'droplet',
      'vegetables': 'carrot',
      'fruits': 'apple'
    }
    return icons[category] || 'plant'
  }

  function speak(text, lang){
    if(!('speechSynthesis' in window)){
      alert('Speech synthesis not supported in this browser.')
      return
    }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang
    utter.rate = 0.95
    utter.pitch = 1
    window.speechSynthesis.speak(utter)
  }

  function speakRow(item){
    const lang = languageSelect.value
    const dict = window.VOICE_LINES[lang]
    const disp = window.RISK_DISPLAY[item.risk] || window.RISK_DISPLAY.low
    const line = `${dict.crop}: ${item.crop}. ${dict.risk}: ${disp.label}. ${dict.suggestion}: ${item.suggestion}.`
    speak(line, lang)
  }

  function speakSummary(districtId){
    const lang = languageSelect.value
    const dict = window.VOICE_LINES[lang]
    const dObj = window.DISTRICTS.find(d => d.id === districtId)
    const items = window.CROP_RISKS[districtId] || []
    const parts = [ `${dict.summaryIntro} ${dObj ? dObj.name : ''}.` ]
    items.forEach(it => {
      const disp = window.RISK_DISPLAY[it.risk] || window.RISK_DISPLAY.low
      parts.push(`${dict.crop}: ${it.crop}, ${dict.risk}: ${disp.label}.`)
    })
    speak(parts.join(' '), lang)
  }

  async function loadWeather(districtId){
    const dObj = window.DISTRICTS.find(d => d.id === districtId)
    if(!dObj){
      setWeatherDummy()
      return
    }
    try{
      // Fetch from backend instead of directly from OpenWeather
      const url = `/api/weather?lat=${dObj.lat}&lon=${dObj.lon}`
      const res = await fetch(url)
      if(!res.ok) throw new Error('Weather fetch failed')
      const data = await res.json()
      renderWeather({
        temp: data.temp,
        humidity: data.humidity,
        rain: data.rain,
        wind: data.wind
      })
    }catch(e){
      console.log('Using fallback weather data:', e.message)
      setWeatherDummy(districtId)
    }
  }

  function setWeatherDummy(districtId){
    // Simple deterministic dummy values per district
    const seed = (districtId || 'seed').split('').reduce((a,c)=>a+c.charCodeAt(0),0)
    const rnd = (min,max) => Math.floor((min + (seed % (max-min+1))))
    renderWeather({
      temp: rnd(24,34),
      humidity: rnd(45,80),
      rain: rnd(0,20),
      wind: rnd(1,8)
    })
  }

  function renderWeather(values){
    weatherEls.temp.textContent = `${values.temp}°C`
    weatherEls.humidity.textContent = `${values.humidity}%`
    const rainText = typeof values.rain === 'number' && values.rain <= 1 ? `${values.rain} mm` : `${values.rain}%`
    weatherEls.rain.textContent = rainText
    weatherEls.wind.textContent = `${values.wind} m/s`
  }

  function onDistrictChange(){
    const id = districtSelect.value
    if(!id) return
    renderTable(id)
    renderMarkers(id)
    const dObj = window.DISTRICTS.find(d => d.id === id)
    if(dObj){
      map.setView([dObj.lat, dObj.lon], 8)
    }
    loadWeather(id)
    loadCropCalendar(id)
    loadSoilInfo(id)
  }

  function loadCropCalendar(districtId) {
    const dObj = window.DISTRICTS.find(d => d.id === districtId)
    if (!dObj) return

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    
    const calendarHtml = `
      <div class="row g-2">
        ${months.map((month, idx) => `
          <div class="col-4 col-md-3">
            <div class="calendar-month ${idx === currentMonth ? 'current-month' : ''}">
              <div class="month-name">${month}</div>
              <div class="crop-indicators">
                ${getCropsForMonth(districtId, idx).map(crop => 
                  `<span class="crop-indicator ${crop.risk}">${crop.name}</span>`
                ).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `
    
    cropCalendarEl.innerHTML = calendarHtml
  }

  function getCropsForMonth(districtId, month) {
    // Simple seasonal crop mapping
    const seasonalCrops = {
      0: [{ name: 'Wheat', risk: 'low' }, { name: 'Mustard', risk: 'medium' }], // Jan
      1: [{ name: 'Wheat', risk: 'low' }, { name: 'Potato', risk: 'low' }], // Feb
      2: [{ name: 'Wheat', risk: 'low' }, { name: 'Onion', risk: 'low' }], // Mar
      3: [{ name: 'Rice', risk: 'medium' }, { name: 'Maize', risk: 'low' }], // Apr
      4: [{ name: 'Rice', risk: 'medium' }, { name: 'Sugarcane', risk: 'low' }], // May
      5: [{ name: 'Rice', risk: 'high' }, { name: 'Cotton', risk: 'high' }], // Jun
      6: [{ name: 'Rice', risk: 'high' }, { name: 'Cotton', risk: 'high' }], // Jul
      7: [{ name: 'Rice', risk: 'high' }, { name: 'Soybean', risk: 'high' }], // Aug
      8: [{ name: 'Rice', risk: 'medium' }, { name: 'Soybean', risk: 'medium' }], // Sep
      9: [{ name: 'Wheat', risk: 'low' }, { name: 'Mustard', risk: 'low' }], // Oct
      10: [{ name: 'Wheat', risk: 'low' }, { name: 'Potato', risk: 'low' }], // Nov
      11: [{ name: 'Wheat', risk: 'low' }, { name: 'Mustard', risk: 'low' }] // Dec
    }
    return seasonalCrops[month] || []
  }

  function loadSoilInfo(districtId) {
    const dObj = window.DISTRICTS.find(d => d.id === districtId)
    if (!dObj) return

    const soilTypes = {
      'Maharashtra': { type: 'Black Soil', ph: '7.2-8.5', nutrients: 'High in Calcium, Magnesium' },
      'Haryana': { type: 'Alluvial Soil', ph: '6.5-7.5', nutrients: 'Rich in Potash, Phosphorous' },
      'Punjab': { type: 'Alluvial Soil', ph: '6.8-7.8', nutrients: 'High in Organic Matter' },
      'Madhya Pradesh': { type: 'Black Soil', ph: '7.0-8.5', nutrients: 'High in Iron, Aluminium' },
      'Chhattisgarh': { type: 'Red Soil', ph: '6.0-7.5', nutrients: 'Rich in Iron Oxide' },
      'Odisha': { type: 'Laterite Soil', ph: '5.5-7.0', nutrients: 'High in Iron, Aluminium' },
      'Jharkhand': { type: 'Red Soil', ph: '6.0-7.0', nutrients: 'Rich in Iron, Phosphorous' }
    }

    const soil = soilTypes[dObj.state] || { type: 'Mixed Soil', ph: '6.5-7.5', nutrients: 'Balanced' }

    const soilHtml = `
      <div class="soil-info">
        <div class="row g-3">
          <div class="col-12">
            <div class="soil-card">
              <h6><i class="bi bi-droplet me-2"></i>Soil Type</h6>
              <p class="mb-0">${soil.type}</p>
            </div>
          </div>
          <div class="col-6">
            <div class="soil-card">
              <h6><i class="bi bi-thermometer me-2"></i>pH Level</h6>
              <p class="mb-0">${soil.ph}</p>
            </div>
          </div>
          <div class="col-6">
            <div class="soil-card">
              <h6><i class="bi bi-nutrition me-2"></i>Nutrients</h6>
              <p class="mb-0 small">${soil.nutrients}</p>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class="alert alert-info">
            <i class="bi bi-lightbulb me-2"></i>
            <strong>Tip:</strong> Test your soil regularly for optimal crop growth.
          </div>
        </div>
      </div>
    `
    
    soilInfoEl.innerHTML = soilHtml
  }

  districtSelect.addEventListener('change', onDistrictChange)
  cropTypeSelect.addEventListener('change', () => {
    const id = districtSelect.value
    if(id) renderTable(id)
  })
  speakSummaryBtn.addEventListener('click', () => {
    const id = districtSelect.value
    if(id) speakSummary(id)
  })
  refreshBtn.addEventListener('click', () => {
    const id = districtSelect.value
    if(id) loadWeather(id)
  })

  exportPdfBtn.addEventListener('click', () => {
    const root = document.getElementById('report-root')
    const opt = {
      margin:       10,
      filename:     'climate-risk-report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    window.html2pdf().from(root).set(opt).save()
  })

  // initial render
  renderMarkers()
  setWeatherDummy()
  loadCropCalendar()
  loadSoilInfo()
})()


