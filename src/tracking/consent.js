import { util } from './utils.js';

export function getConsent() {
    let consent = {
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false
    };

    // Cookiebot
    const cookiebot = util.getCookie('CookieConsent');
    if (cookiebot) {
        try {
            const parsed = JSON.parse(cookiebot);
            if (typeof parsed === 'object') {
                return {
                    necessary: true,
                    preferences: !!parsed.preferences,
                    statistics: !!parsed.statistics,
                    marketing: !!parsed.marketing
                };
            }
        } catch (e) {
            if (cookiebot.includes('preferences:checked')) consent.preferences = true;
            if (cookiebot.includes('statistics:checked')) consent.statistics = true;
            if (cookiebot.includes('marketing:checked')) consent.marketing = true;
            return consent;
        }
    }

    // Complianz
    if (util.getCookie('cmplz_preferences') === '1') consent.preferences = true;
    if (util.getCookie('cmplz_statistics') === '1') consent.statistics = true;
    if (util.getCookie('cmplz_marketing') === '1') consent.marketing = true;

    // CookieYes
    const cookieyes = util.getCookie('cookieyes-consent');
    if (cookieyes) {
        try {
            const parsed = JSON.parse(cookieyes);
            if (typeof parsed === 'object') {
                consent.preferences = !!parsed.functional;
                consent.statistics = !!parsed.analytics;
                consent.marketing = !!parsed.advertisement;
                return consent;
            }
        } catch (e) {}
    }

    // Borlabs Cookie
    const borlabs = util.getCookie('borlabs-cookie');
    if (borlabs) {
        try {
            const parsed = JSON.parse(borlabs);
            if (typeof parsed === 'object' && parsed.consents) {
                consent.preferences = !!parsed.consents.preferences;
                consent.statistics = !!parsed.consents.statistics;
                consent.marketing = !!parsed.consents.marketing;
                return consent;
            }
        } catch (e) {}
    }

    return consent;
} 