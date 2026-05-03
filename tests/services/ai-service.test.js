/**
 * AI Service Tests
 * Unit tests for AI/ML prediction and detection functions
 */

(function() {
    'use strict';

    const AIServiceTests = {
        name: 'AI Service Tests',
        tests: [],

        addTest(name, fn) {
            this.tests.push({ name, fn });
        },

        async runAll() {
            console.log(`\n🧪 Running ${this.name}...\n`);
            const results = { passed: 0, failed: 0, errors: [] };

            for (const test of this.tests) {
                try {
                    await test.fn();
                    console.log(`  ✅ ${test.name}`);
                    results.passed++;
                } catch (error) {
                    console.error(`  ❌ ${test.name}`);
                    console.error(`     ${error.message}`);
                    results.failed++;
                    results.errors.push({ test: test.name, error });
                }
            }

            console.log(`\n📊 ${this.name} Results: ${results.passed}/${results.passed + results.failed} passed\n`);
            return results;
        },

        assert(condition, message) {
            if (!condition) throw new Error(message || 'Assertion failed');
        },

        assertNumber(value, message) {
            if (typeof value !== 'number' || isNaN(value)) {
                throw new Error(message || `Expected number, got ${typeof value}`);
            }
        },

        assertInRange(value, min, max, message) {
            if (value < min || value > max) {
                throw new Error(
                    message || `Expected ${value} to be between ${min} and ${max}`
                );
            }
        },

        assertHasProperties(obj, props, message) {
            for (const prop of props) {
                if (!(prop in obj)) {
                    throw new Error(message || `Missing property: ${prop}`);
                }
            }
        }
    };

    // Test: AI Service exists
    AIServiceTests.addTest('AI Service is defined', () => {
        AIServiceTests.assert(window.AIService !== undefined, 'AIService should be defined');
        AIServiceTests.assert(typeof window.AIService.predictYield === 'function', 'predictYield should be a function');
        AIServiceTests.assert(typeof window.AIService.detectDisease === 'function', 'detectDisease should be a function');
    });

    // Test: Yield prediction returns valid structure
    AIServiceTests.addTest('Yield prediction returns valid structure', async () => {
        const crop = { name: 'wheat', optimalTemp: { min: 15, max: 25 } };
        const weather = { temp: 20, humidity: 60, rain: 0 };
        const soil = { type: 'Loamy', ph: 7.0, nutrients: 'High' };
        const area = 2.5;

        const result = await window.AIService.predictYield(crop, weather, soil, area);

        AIServiceTests.assertHasProperties(result, ['yield', 'confidence', 'unit', 'factors']);
        AIServiceTests.assertNumber(result.yield, 'Yield should be a number');
        AIServiceTests.assertNumber(result.confidence, 'Confidence should be a number');
        AIServiceTests.assertInRange(result.confidence, 0, 1, 'Confidence should be between 0 and 1');
        AIServiceTests.assert(result.unit === 'tons', 'Unit should be tons');
    });

    // Test: Yield scales with area
    AIServiceTests.addTest('Yield scales correctly with area', async () => {
        const crop = { name: 'rice', optimalTemp: { min: 20, max: 35 } };
        const weather = { temp: 28, humidity: 70, rain: 10 };
        const soil = { type: 'Alluvial', ph: 6.5, nutrients: 'Medium' };

        const smallArea = await window.AIService.predictYield(crop, weather, soil, 1);
        const largeArea = await window.AIService.predictYield(crop, weather, soil, 5);

        AIServiceTests.assert(
            largeArea.yield > smallArea.yield,
            'Larger area should produce more yield'
        );

        // Should be roughly proportional
        const ratio = largeArea.yield / smallArea.yield;
        AIServiceTests.assertInRange(ratio, 4, 6, 'Yield should scale roughly with area');
    });

    // Test: Temperature factor calculation
    AIServiceTests.addTest('Temperature factor calculated correctly', () => {
        const optimalTemp = { min: 20, max: 30 };
        
        // Perfect temperature (25 is middle of range)
        let factor = window.AIService.calculateTempFactor(25, optimalTemp);
        AIServiceTests.assertInRange(factor, 0.9, 1.0, 'Optimal temp should give high factor');

        // Too cold
        factor = window.AIService.calculateTempFactor(10, optimalTemp);
        AIServiceTests.assert(factor < 0.8, 'Cold temp should reduce factor');

        // Too hot
        factor = window.AIService.calculateTempFactor(40, optimalTemp);
        AIServiceTests.assert(factor < 0.8, 'Hot temp should reduce factor');
    });

    // Test: Rainfall factor calculation
    AIServiceTests.addTest('Rainfall factor calculated correctly', () => {
        // Optimal rainfall (10mm for most crops)
        let factor = window.AIService.calculateRainFactor(10);
        AIServiceTests.assertInRange(factor, 0.9, 1.0, 'Optimal rain should give high factor');

        // Too much rain (flooding)
        factor = window.AIService.calculateRainFactor(100);
        AIServiceTests.assert(factor < 0.7, 'Excessive rain should reduce factor');

        // No rain (drought)
        factor = window.AIService.calculateRainFactor(0);
        AIServiceTests.assert(factor < 0.9, 'No rain should reduce factor');
    });

    // Test: Soil factor calculation
    AIServiceTests.addTest('Soil factor calculated correctly', () => {
        // Good soil
        let factor = window.AIService.calculateSoilFactor({ type: 'Loamy', ph: 7.0, nutrients: 'High' });
        AIServiceTests.assertInRange(factor, 1.0, 1.3, 'Good soil should give high factor');

        // Poor soil
        factor = window.AIService.calculateSoilFactor({ type: 'Sandy', ph: 4.5, nutrients: 'Low' });
        AIServiceTests.assert(factor < 1.0, 'Poor soil should reduce factor');

        // Moderate soil
        factor = window.AIService.calculateSoilFactor({ type: 'Clay', ph: 6.5, nutrients: 'Medium' });
        AIServiceTests.assertInRange(factor, 0.8, 1.1, 'Moderate soil should give medium factor');
    });

    // Test: Disease detection with symptoms
    AIServiceTests.addTest('Disease detection returns valid structure', async () => {
        const symptoms = ['yellow_leaves', 'brown_spots'];
        const result = await window.AIService.detectDisease(symptoms);

        AIServiceTests.assertHasProperties(result, ['detected', 'disease', 'confidence', 'method']);
        AIServiceTests.assert(typeof result.detected === 'boolean', 'Detected should be boolean');
        AIServiceTests.assertNumber(result.confidence, 'Confidence should be a number');
    });

    // Test: Smart recommendations
    AIServiceTests.addTest('Smart recommendations generated correctly', () => {
        const context = {
            weather: { temp: 35, humidity: 40, rain: 0 },
            soil: { type: 'Sandy', ph: 7.5 },
            crop: { name: 'cotton' },
            season: 'summer'
        };

        const recommendations = window.AIService.getSmartRecommendations(context);

        AIServiceTests.assert(Array.isArray(recommendations), 'Recommendations should be array');
        AIServiceTests.assert(recommendations.length > 0, 'Should have at least one recommendation');

        // With high temperature, should recommend irrigation
        const hasIrrigationRec = recommendations.some(r => 
            r.toLowerCase().includes('irrigation') || 
            r.toLowerCase().includes('water')
        );
        AIServiceTests.assert(hasIrrigationRec, 'Should recommend irrigation for hot weather');
    });

    // Test: Feature extraction
    AIServiceTests.addTest('Feature extraction returns valid vector', () => {
        const crop = { name: 'wheat' };
        const weather = { temp: 25, humidity: 60, rain: 5 };
        const soil = { type: 'Loamy' };
        const area = 3;

        const features = window.AIService.extractFeatures(crop, weather, soil, area);

        AIServiceTests.assert(Array.isArray(features), 'Features should be array');
        AIServiceTests.assert(features.length === 7, 'Should have 7 features');

        // All features should be numbers
        features.forEach((f, i) => {
            AIServiceTests.assertNumber(f, `Feature ${i} should be a number`);
        });
    });

    // Test: TensorFlow availability check
    AIServiceTests.addTest('TensorFlow availability detected correctly', () => {
        const hasTF = window.AIService.hasTensorFlow();
        AIServiceTests.assert(typeof hasTF === 'boolean', 'hasTensorFlow should return boolean');
    });

    // Test: Model status
    AIServiceTests.addTest('Model status can be retrieved', () => {
        const status = window.AIService.getModelStatus();
        AIServiceTests.assert(typeof status === 'object', 'Status should be object');
        AIServiceTests.assert('loaded' in status, 'Status should have loaded property');
        AIServiceTests.assert('hasTensorFlow' in status, 'Status should have hasTensorFlow property');
    });

    // Test: Season determination
    AIServiceTests.addTest('Season determined correctly from month', () => {
        const seasons = {
            0: 'winter', 1: 'winter',  // Jan, Feb
            2: 'summer', 3: 'summer', 4: 'summer',  // Mar, Apr, May
            5: 'monsoon', 6: 'monsoon', 7: 'monsoon', 8: 'monsoon',  // Jun-Sep
            9: 'post-monsoon', 10: 'post-monsoon',  // Oct, Nov
            11: 'winter'  // Dec
        };

        for (const [month, expected] of Object.entries(seasons)) {
            const season = window.AIService.getCurrentSeason(parseInt(month));
            AIServiceTests.assertEquals(season, expected, `Month ${month} should be ${expected}`);
        }
    });

    // Export
    window.AIServiceTests = AIServiceTests;

    // Auto-run if ?test=true
    if (window.location.search.includes('test=true')) {
        window.addEventListener('load', () => {
            setTimeout(() => AIServiceTests.runAll(), 1500);
        });
    }

    console.log('✅ AI Service Tests loaded. Run with: window.AIServiceTests.runAll()');
})();
