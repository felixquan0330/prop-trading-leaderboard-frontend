import {util} from './utils.js';
import {sendRequest} from './api.js';

export function setupFormTracking(forms, config, state) {
    state.forms.forEach(form => {
        if (form.form_type === 'Contact Form 7') {
            document.addEventListener('wpcf7mailsent', (event) => {
                util.log('Contact Form 7 form submitted', event.detail);
                if (event.detail.contactFormId == form.form_id) {
                    util.log('Contact Form 7 form submitted', event.detail.inputs);
                    trackFormSubmission('Contact Form 7', event.detail.contactFormId, event.detail.inputs, config, state);
                }
            });
        } else if (form.form_type === 'Gravity Forms') {
            document.addEventListener('gform_confirmation_loaded', (event) => {
                trackFormSubmission('Gravity Forms', event.detail, {formId: event.detail}, config, state);
            });
        } else {
            document.addEventListener('submit', (event) => {
                const formEl = event.target;
                if (formEl.classList.contains('wpcf7-form') || formEl.classList.contains('gform_wrapper')) {
                    return;
                }
                const formId = formEl.id || formEl.name || 'unknown_form';
                trackFormSubmission('generic', formId, {
                    action: formEl.action,
                    formId: formId
                }, config, state);
            });
        }
    });
}

function trackFormSubmission(formType, formId, formData, config, state) {
    const url = `http://localhost:8000/api/v1/form-submission`;
    const data = {
        visit_id: state.visitId,
        session_id: state.sessionId,
        website_id: config.websiteId,
        company_id: config.companyId,
        form_type: formType,
        form_id: formId,
        form_data: formData,
        gclid: state.urlParams.get('gclid'),
        visitor_id: state.visitorId,
        fingerprint: state.fingerprint,
        ip_address: state.ipAddress,
        browser: util.getBrowserInfo(),
        os: util.getOSInfo(),
        language: navigator.language || navigator.userLanguage || '',
        device_type: util.getDeviceType(),
        user_agent: navigator.userAgent
    };
    sendRequest(url, data);
}