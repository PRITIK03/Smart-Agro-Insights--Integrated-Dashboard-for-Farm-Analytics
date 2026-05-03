/**
 * API Client Tests
 * Unit tests for the centralized API client
 */

(function() {
    'use strict';

    // Test suite for API Client
    const ApiClientTests = {
        name: 'API Client Tests',
        tests: [],

        /**
         * Add a test
         */
        addTest(name, fn) {
            this.tests.push({ name, fn });
        },

        /**
         * Run all tests
         */
        async runAll() {
            console.log(`\n🧪 Running ${this.name}...\n`);
            const results = {
                passed: 0,
                failed: 0,
                errors: []
            };

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

            this.printSummary(results);
            return results;
        },

        /**
         * Print test summary
         */
        printSummary(results) {
            console.log(`\n📊 ${this.name} Results:`);
            console.log(`   Passed: ${results.passed}/${results.passed + results.failed}`);
            if (results.failed > 0) {
                console.log(`   Failed: ${results.failed}`);
            }
            console.log('');
        },

        /**
         * Assertion helpers
         */
        assert(condition, message) {
            if (!condition) {
                throw new Error(message || 'Assertion failed');
            }
        },

        assertEquals(actual, expected, message) {
            if (actual !== expected) {
                throw new Error(
                    message || `Expected ${expected}, got ${actual}`
                );
            }
        },

        assertNotNull(value, message) {
            if (value === null || value === undefined) {
                throw new Error(message || 'Value is null or undefined');
            }
        },

        assertHasProperty(obj, prop, message) {
            if (!(prop in obj)) {
                throw new Error(message || `Object missing property: ${prop}`);
            }
        }
    };

    // Test: API Client exists
    ApiClientTests.addTest('API Client is defined', () => {
        ApiClientTests.assertNotNull(window.ApiClient, 'ApiClient should be defined');
    });

    // Test: GET request
    ApiClientTests.addTest('GET request returns cached data on second call', async () => {
        // Mock fetch for testing
        let fetchCount = 0;
        const originalFetch = window.fetch;
        window.fetch = () => {
            fetchCount++;
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ test: 'data', timestamp: Date.now() })
            });
        };

        // First request should hit the API
        await window.ApiClient.get('/test-endpoint');
        ApiClientTests.assertEquals(fetchCount, 1, 'First request should call fetch');

        // Second request should use cache
        await window.ApiClient.get('/test-endpoint');
        ApiClientTests.assertEquals(fetchCount, 1, 'Second request should use cache');

        // Restore fetch
        window.fetch = originalFetch;
    });

    // Test: Retry mechanism
    ApiClientTests.addTest('Retry mechanism works on failure', async () => {
        let attempts = 0;
        const originalFetch = window.fetch;
        window.fetch = () => {
            attempts++;
            if (attempts < 2) {
                return Promise.reject(new Error('Network error'));
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true })
            });
        };

        try {
            await window.ApiClient.get('/retry-test', {}, { retries: 2 });
            ApiClientTests.assertEquals(attempts, 2, 'Should retry on failure');
        } finally {
            window.fetch = originalFetch;
        }
    });

    // Test: Timeout handling
    ApiClientTests.addTest('Request timeout is respected', async () => {
        const originalFetch = window.fetch;
        window.fetch = () => new Promise(() => {}); // Never resolves

        const startTime = Date.now();
        try {
            await window.ApiClient.get('/timeout-test', {}, { timeout: 100 });
            throw new Error('Should have timed out');
        } catch (error) {
            const elapsed = Date.now() - startTime;
            ApiClientTests.assert(
                elapsed < 200,
                `Timeout should be around 100ms, took ${elapsed}ms`
            );
        } finally {
            window.fetch = originalFetch;
        }
    });

    // Test: POST request
    ApiClientTests.addTest('POST request sends correct data', async () => {
        let receivedData = null;
        const originalFetch = window.fetch;
        window.fetch = (url, options) => {
            receivedData = JSON.parse(options.body);
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ received: true })
            });
        };

        const testData = { crop: 'wheat', area: 5 };
        await window.ApiClient.post('/post-test', testData);
        ApiClientTests.assertEquals(receivedData.crop, 'wheat', 'Should send correct crop');
        ApiClientTests.assertEquals(receivedData.area, 5, 'Should send correct area');

        window.fetch = originalFetch;
    });

    // Test: Error handling
    ApiClientTests.addTest('Error responses are handled correctly', async () => {
        const originalFetch = window.fetch;
        window.fetch = () => {
            return Promise.resolve({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });
        };

        try {
            await window.ApiClient.get('/not-found');
            throw new Error('Should have thrown error');
        } catch (error) {
            ApiClientTests.assert(error.message.includes('404'), 'Should include status code');
        } finally {
            window.fetch = originalFetch;
        }
    });

    // Test: Cache expiration
    ApiClientTests.addTest('Cache expires after TTL', async () => {
        let fetchCount = 0;
        const originalFetch = window.fetch;
        window.fetch = () => {
            fetchCount++;
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ count: fetchCount })
            });
        };

        // Override cache TTL for testing
        const originalTTL = window.ApiClient.cache?.ttl || 300000;
        if (window.ApiClient.cache) {
            window.ApiClient.cache.ttl = 100; // 100ms for testing
        }

        await window.ApiClient.get('/ttl-test');
        
        // Wait for cache to expire
        await new Promise(resolve => setTimeout(resolve, 150));
        
        await window.ApiClient.get('/ttl-test');
        ApiClientTests.assertEquals(fetchCount, 2, 'Should fetch again after TTL');

        // Restore
        window.fetch = originalFetch;
        if (window.ApiClient.cache) {
            window.ApiClient.cache.ttl = originalTTL;
        }
    });

    // Test: Clear cache
    ApiClientTests.addTest('Clear cache removes all entries', async () => {
        // Add some test cache entries
        if (window.ApiClient.cache && window.ApiClient.cache.store) {
            window.ApiClient.cache.store.set('/test1', { data: 1 });
            window.ApiClient.cache.store.set('/test2', { data: 2 });
            
            ApiClientTests.assertEquals(window.ApiClient.cache.store.size, 2, 'Should have 2 entries');
            
            window.ApiClient.clearCache();
            
            ApiClientTests.assertEquals(window.ApiClient.cache.store.size, 0, 'Cache should be empty');
        }
    });

    // Export test runner
    window.ApiClientTests = ApiClientTests;

    // Auto-run if ?test=true in URL
    if (window.location.search.includes('test=true')) {
        window.addEventListener('load', () => {
            setTimeout(() => ApiClientTests.runAll(), 1000);
        });
    }

    console.log('✅ API Client Tests loaded. Run with: window.ApiClientTests.runAll()');
})();
