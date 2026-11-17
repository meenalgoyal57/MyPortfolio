/**
 * Google Ads & Google Analytics (GA4) Tracking Utility
 */

export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
    console.log(`[Google Analytics Event]: ${action}`, params);
  }
}

/**
 * Fires a Google Ads conversion event.
 * If you have a Google Ads Conversion ID & Label (e.g. 'AW-123456789/AbCdEfGhIjK'),
 * pass it here or configure it in your environment.
 */
export function trackGoogleAdsConversion({ sendTo, value = 1.0, currency = 'INR', transactionId } = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const payload = {
      value,
      currency,
    };
    if (sendTo) payload.send_to = sendTo;
    if (transactionId) payload.transaction_id = transactionId;

    window.gtag('event', 'conversion', payload);
    console.log('[Google Ads Conversion Triggered]:', payload);
  }
}

/**
 * Tracks lead generation (Contact Form Submission) for Google Ads & Analytics
 */
export function trackLeadSubmission(formData = {}) {
  // GA4 recommended event
  trackEvent('generate_lead', {
    currency: 'INR',
    value: formData.budget || 'Custom',
    lead_type: formData.projectType || 'General Inquiry',
  });

  // Google Ads conversion event (optional send_to if configured)
  const googleAdsSendTo = window.__GOOGLE_ADS_CONVERSION_TAG__;
  if (googleAdsSendTo) {
    trackGoogleAdsConversion({ sendTo: googleAdsSendTo });
  }
}

/**
 * Tracks Phone or Email Click Conversions
 */
export function trackContactClick(method = 'phone') {
  trackEvent('contact', { method });
}
