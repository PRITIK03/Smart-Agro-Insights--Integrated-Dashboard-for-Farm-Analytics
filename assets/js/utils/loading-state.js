/**
 * Loading State Manager
 * Provides skeleton screens and loading indicators
 */

const LoadingState = {
  /**
   * Show skeleton loader for charts
   */
  showChartSkeleton(elementId, type = 'line') {
    const container = document.getElementById(elementId);
    if (!container) return;

    const skeleton = document.createElement('div');
    skeleton.className = 'chart-skeleton';
    skeleton.id = `${elementId}-skeleton`;
    
    const styles = {
      line: this.createLineSkeleton(),
      bar: this.createBarSkeleton(),
      pie: this.createPieSkeleton(),
      card: this.createCardSkeleton()
    };

    skeleton.innerHTML = styles[type] || styles.line;
    
    // Add base styles
    const baseStyles = document.createElement('style');
    baseStyles.textContent = `
      .chart-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 8px;
        height: 100%;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .skeleton-line, .skeleton-bar {
        background: rgba(255,255,255,0.8);
        margin: 10px;
        border-radius: 4px;
      }
      
      .skeleton-bar-item {
        height: 30px;
        background: linear-gradient(90deg, #ddd 25%, #ccc 50%, #ddd 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        margin: 8px 0;
        border-radius: 4px;
      }
      
      @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    if (!document.getElementById('skeleton-styles')) {
      baseStyles.id = 'skeleton-styles';
      document.head.appendChild(baseStyles);
    }

    container.style.display = 'none';
    container.parentNode.insertBefore(skeleton, container);
  },

  /**
   * Create line chart skeleton
   */
  createLineSkeleton() {
    return `
      <div style="padding: 20px;">
        <div class="skeleton-bar-item" style="height: 20px; width: 40%;"></div>
        <div style="display: flex; align-items: flex-end; height: 150px; gap: 10px; margin-top: 20px;">
          <div class="skeleton-bar-item" style="height: 60%; flex: 1;"></div>
          <div class="skeleton-bar-item" style="height: 80%; flex: 1;"></div>
          <div class="skeleton-bar-item" style="height: 40%; flex: 1;"></div>
          <div class="skeleton-bar-item" style="height: 90%; flex: 1;"></div>
          <div class="skeleton-bar-item" style="height: 70%; flex: 1;"></div>
          <div class="skeleton-bar-item" style="height: 50%; flex: 1;"></div>
          <div class="skeleton-bar-item" style="height: 85%; flex: 1;"></div>
        </div>
      </div>
    `;
  },

  /**
   * Create bar chart skeleton
   */
  createBarSkeleton() {
    return `
      <div style="padding: 20px;">
        <div class="skeleton-bar-item" style="height: 20px; width: 40%; margin-bottom: 20px;"></div>
        ${Array(5).fill(0).map(() => `
          <div class="skeleton-bar-item" style="height: 25px; width: ${Math.random() * 40 + 40}%;"></div>
        `).join('')}
      </div>
    `;
  },

  /**
   * Create pie/doughnut skeleton
   */
  createPieSkeleton() {
    return `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
        <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(90deg, #ddd 25%, #ccc 50%, #ddd 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s infinite;"></div>
        <div style="margin-top: 20px;">
          ${Array(4).fill(0).map(() => `
            <div class="skeleton-bar-item" style="height: 15px; width: 80px; display: inline-block; margin: 5px;"></div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Create card skeleton
   */
  createCardSkeleton() {
    return `
      <div style="padding: 20px;">
        <div class="skeleton-bar-item" style="height: 30px; width: 60%;"></div>
        <div class="skeleton-bar-item" style="height: 60px; width: 80%; margin-top: 15px;"></div>
        <div class="skeleton-bar-item" style="height: 15px; width: 40%; margin-top: 15px;"></div>
      </div>
    `;
  },

  /**
   * Hide skeleton and show actual content
   */
  hideSkeleton(elementId) {
    const skeleton = document.getElementById(`${elementId}-skeleton`);
    const container = document.getElementById(elementId);
    
    if (skeleton) {
      skeleton.remove();
    }
    
    if (container) {
      container.style.display = 'block';
    }
  },

  /**
   * Show loading spinner
   */
  showSpinner(containerId, message = 'Loading...') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const spinner = document.createElement('div');
    spinner.className = 'loading-container';
    spinner.id = `${containerId}-spinner`;
    spinner.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px;">
        <div class="loading-spinner"></div>
        <p style="margin-top: 15px; color: #666;">${message}</p>
      </div>
    `;
    spinner.style.cssText = 'text-align: center;';

    // Clear container and show spinner
    container.style.display = 'none';
    container.parentNode.insertBefore(spinner, container);
  },

  /**
   * Hide spinner
   */
  hideSpinner(containerId) {
    const spinner = document.getElementById(`${containerId}-spinner`);
    const container = document.getElementById(containerId);
    
    if (spinner) {
      spinner.remove();
    }
    
    if (container) {
      container.style.display = 'block';
    }
  },

  /**
   * Wrap async function with loading state
   */
  async wrapLoading(fn, elementId, options = {}) {
    const { type = 'line', message = 'Loading...', delay = 300 } = options;
    
    // Show loading state after small delay (to avoid flashing for fast loads)
    let skeletonShown = false;
    const timeoutId = setTimeout(() => {
      this.showChartSkeleton(elementId, type);
      skeletonShown = true;
    }, delay);

    try {
      const result = await fn();
      clearTimeout(timeoutId);
      if (skeletonShown) {
        this.hideSkeleton(elementId);
      }
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      if (skeletonShown) {
        this.hideSkeleton(elementId);
      }
      throw error;
    }
  }
};

window.LoadingState = LoadingState;
