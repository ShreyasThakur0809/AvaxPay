// public/widget.js
/**
 * AvaxPay Payment Button Widget
 * Universal payment button for any website
 */

(function() {
  'use strict';

  // Configuration
  const AVAXPAY_APP_URL = 'https://avaxpay.xyz'; // Change to your domain
  const WIDGET_VERSION = '1.0.0';

  console.log(`AvaxPay Widget v${WIDGET_VERSION} loaded`);

  /**
   * Initialize all AvaxPay buttons on page load
   */
  function initAvaxPayButtons() {
    const buttons = document.querySelectorAll('[data-avaxpay-button]');
    
    buttons.forEach(button => {
      // Get button data
      const amount = button.getAttribute('data-amount');
      const recipient = button.getAttribute('data-recipient');
      const label = button.getAttribute('data-label') || 'Pay Now';
      const token = button.getAttribute('data-token') || 'AVAX';
      const theme = button.getAttribute('data-theme') || 'blue';
      
      // Validate required fields
      if (!amount || !recipient) {
        console.error('AvaxPay: Missing required attributes (data-amount, data-recipient)');
        return;
      }

      // Create button HTML
      button.innerHTML = createButtonHTML(label, amount, token, theme);
      button.style.cursor = 'pointer';
      
      // Add click handler
      button.addEventListener('click', function() {
        openPaymentModal(recipient, amount, token, label);
      });
    });
  }

  /**
   * Create button HTML
   */
  function createButtonHTML(label, amount, token, theme) {
    const themes = {
      blue: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
      green: 'background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);',
      purple: 'background: linear-gradient(135deg, #a445b2 0%, #d41872 100%);',
      black: 'background: linear-gradient(135deg, #232526 0%, #414345 100%);'
    };

    return `
      <button style="
        ${themes[theme] || themes.blue}
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        width: 100%;
        justify-content: center;
      "
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)';"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span>${label} (${amount} ${token})</span>
      </button>
    `;
  }

  /**
   * Open payment modal
   */
  function openPaymentModal(recipient, amount, token, label) {
    // Encode payment request
    const paymentData = encodeURIComponent(JSON.stringify({
      to: recipient,
      amount: amount,
      token: token,
      label: label
    }));

    // Create payment URL
    const paymentUrl = `${AVAXPAY_APP_URL}/pay?data=${paymentData}`;

    // Open in modal (iframe) or new window
    if (window.innerWidth > 768) {
      // Desktop: Show modal
      createModal(paymentUrl);
    } else {
      // Mobile: Open new tab
      window.open(paymentUrl, '_blank');
    }
  }

  /**
   * Create modal overlay with iframe
   */
  function createModal(url) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'avaxpay-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      animation: fadeIn 0.3s;
    `;

    // Create modal container
    const modal = document.createElement('div');
    modal.style.cssText = `
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      height: 600px;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s;
    `;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: -15px;
      right: -15px;
      background: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 1;
    `;
    closeBtn.onclick = () => document.body.removeChild(overlay);

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 12px;
    `;

    // Assemble modal
    modal.appendChild(closeBtn);
    modal.appendChild(iframe);
    overlay.appendChild(modal);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    });

    // Add to page
    document.body.appendChild(overlay);

    // Listen for payment completion
    window.addEventListener('message', (event) => {
      if (event.data.type === 'avaxpay-payment-complete') {
        document.body.removeChild(overlay);
        alert('Payment successful! ✅');
        // Trigger custom event for merchant
        window.dispatchEvent(new CustomEvent('avaxpay-success', {
          detail: event.data.payment
        }));
      }
    });
  }

  // Add animations CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvaxPayButtons);
  } else {
    initAvaxPayButtons();
  }

  // Re-initialize if new buttons are added dynamically
  window.initAvaxPay = initAvaxPayButtons;

})();
