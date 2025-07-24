import { util } from './utils.js';
import { setupFormTracking } from './forms.js';
import { sendRequest } from './api.js';
import { getConsent } from './consent.js';
import { getFingerprint } from './fingerprint.js';
import { getOrCreateVisitorId, getOrCreateSessionId } from './visitor.js';

export function initTracker(config) {
    // State
    let state = {
        timeOnPage: 0,
        startTime: Date.now(),
        isVisible: true,
        visitId: util.generateId(),
        forms: config.forms,
        companyId: config.companyId,
        urlParams: util.getUrlParams(),
    };

    function areCookiesEnabled() {
        try {
            document.cookie = "cf_test=1; SameSite=Strict";
            const enabled = document.cookie.indexOf("cf_test=1") !== -1;
            document.cookie = "cf_test=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            return enabled;
        } catch (e) {
            return false;
        }
    }

    getFingerprint().then(visitorId => {
        state.fingerprint = visitorId;
        if (visitorId) {
            util.log('FingerprintJS Visitor ID:', state.fingerprint);
        } else {
            util.log('FingerprintJS returned null or failed to identify visitor.');
        }

        state.cookiesEnabled = areCookiesEnabled();
        // Try to restore visitorId from both cookie and localStorage
        let cookieVisitorId = util.getCookie('visitor_id');
        let localVisitorId = window.localStorage && window.localStorage.getItem('visitor_id');
        if (state.cookiesEnabled && (cookieVisitorId || localVisitorId)) {
            state.visitorId = cookieVisitorId || localVisitorId;
            // Sync both storage locations
            util.setCookie('visitor_id', state.visitorId);
            if (window.localStorage) {
                window.localStorage.setItem('visitor_id', state.visitorId);
            }
            state.sessionId = getOrCreateSessionId();
            util.log('Visitor/session ID from cookies/localStorage:', state.visitorId, state.sessionId);
            state.idMethod = 'cookie';
        } else if (state.fingerprint) {
            // If cookies are unavailable or missing, use fingerprint as visitorId and sync to storage
            state.visitorId = state.fingerprint;
            state.sessionId = state.fingerprint;
            util.setCookie('visitor_id', state.visitorId);
            if (window.localStorage) {
                window.localStorage.setItem('visitor_id', state.visitorId);
            }
            util.log('Cookies unavailable, using fingerprint as visitor/session ID:', state.visitorId);
            state.idMethod = 'fingerprint-fallback';
        } else {
            state.visitorId = util.generateId();
            state.sessionId = util.generateId();
            util.log('Cookies unavailable and fingerprint failed, using random ID.');
            state.idMethod = 'random-fallback';
        }
    }).catch(error => {
        util.log('FingerprintJS error:', error);
        state.cookiesEnabled = areCookiesEnabled();
        if (state.cookiesEnabled) {
            state.visitorId = getOrCreateVisitorId();
            state.sessionId = getOrCreateSessionId();
            util.log('Visitor/session ID from cookies/localStorage:', state.visitorId, state.sessionId);
            state.idMethod = 'cookie';
        } else {
            state.visitorId = util.generateId();
            state.sessionId = util.generateId();
            util.log('Cookies unavailable and fingerprint failed, using random ID.');
            state.idMethod = 'random-fallback';
        }
    }).finally(() => {
        startTracking();
    });

    function startTracking() {
        state.trafficSource = detectTrafficSource();

        startTimeTracking();
        setupVisibilityHandling();
        trackPageVisit();
        trackScriptLoad();
        setupFormTracking(state.forms, config, state);
        setupUnloadHandling();
        util.log('Tracker initialized');

        const consent = getConsent();
        // Voorkeuren
        if (consent.preferences) {
            // Code voor voorkeuren, bijvoorbeeld: taal opslaan, dark mode, etc.
        }

        // Statistieken
        if (consent.statistics) {
            // Alleen statistieken-tracking uitvoeren als toestemming is gegeven
        }

        // Marketing
        if (consent.marketing) {
            // Alleen marketing-tracking uitvoeren als toestemming is gegeven
        }
    }

    function detectTrafficSource() {
        const referrer = document.referrer ? new URL(document.referrer) : null;
        const urlParams = state.urlParams;
        if (urlParams.get('utm_source')) {
            return urlParams.get('utm_source');
        }
        if (!referrer) {
            return 'direct';
        }
        const hostname = referrer.hostname.replace('www.', '');
        const currentHostname = window.location.hostname.replace('www.', '');
        const searchEnginePatterns = [
            /google\./i, /bing\./i, /yahoo\./i, /duckduckgo\./i,
            /yandex\./i, /baidu\./i, /ecosia\./i, /aol\./i, /ask\./i
        ];
        const socialMediaPatterns = [
            /facebook\./i, /twitter\./i, /x\.com/i, /linkedin\./i,
            /instagram\./i, /t\.co/i, /reddit\./i, /pinterest\./i,
            /snapchat\./i, /tiktok\./i
        ];
        for (let pattern of searchEnginePatterns) {
            if (pattern.test(hostname)) {
                return 'organic';
            }
        }
        for (let pattern of socialMediaPatterns) {
            if (pattern.test(hostname)) {
                return 'social';
            }
        }
        if (hostname !== currentHostname) {
            return 'referral';
        }
        return 'internal';
    }

    function startTimeTracking() {
        setInterval(() => {
            if (state.isVisible) {
                const now = Date.now();
                const secondsElapsed = Math.floor((now - state.startTime) / 1000);
                state.timeOnPage += secondsElapsed;
                state.startTime = now;
            }
        }, config.updateInterval * 1000 || 5000);
    }

    function setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                state.isVisible = false;
                sendUpdateVisit();
            } else {
                state.isVisible = true;
                state.startTime = Date.now();
            }
        });
        setInterval(() => {
            if (state.isVisible) {
                sendUpdateVisit();
            }
        }, 5000);
    }

    function setupUnloadHandling() {
        window.addEventListener('beforeunload', () => {
            sendUpdateVisit(true);
        });
        window.addEventListener('pagehide', () => {
            sendUpdateVisit(true);
        });
    }

    function trackPageVisit() {
        const url = `http://localhost:8000/api/v1/track-visit`;
        const data = {
            visit_id: state.visitId,
            website_id: config.websiteId,
            company_id: config.companyId,
            visitor_id: state.visitorId,
            session_id: state.sessionId,
            fingerprint: state.fingerprint,
            url: window.location.href,
            referrer: document.referrer,
            traffic_source: state.trafficSource,
            gclid: state.urlParams.get('gclid'),
            time_on_page: state.timeOnPage,
            utm_source: state.urlParams.get('utm_source') || '',
            utm_medium: state.urlParams.get('utm_medium') || '',
            utm_campaign: state.urlParams.get('utm_campaign') || '',
            utm_term: state.urlParams.get('utm_term') || '',
            utm_content: state.urlParams.get('utm_content') || '',
            device_type: getDeviceType(),
            browser: getBrowserInfo(),
            os: getOSInfo(),
            language: navigator.language || navigator.userLanguage || '',
            page_title: document.title
        };
        sendRequest(url, data);
    }

    function sendUpdateVisit(isSync = false) {
        const url = `http://localhost:8000/api/v1/update-visit`;
        const data = {
            visit_id: state.visitId,
            company_id: config.companyId,
            time_on_page: state.timeOnPage,
        };
        sendRequest(url, data, isSync);
    }

    function trackScriptLoad() {
        const url = `http://localhost:8000/api/v1/track-script-load`;
        sendRequest(url, {
            website_id: config.websiteId,
            company_id: config.companyId,
        });
    }

    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }

    function getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'unknown';
        if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
        else if (ua.indexOf('Safari') > -1) browser = 'Safari';
        else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
        else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) browser = 'IE';
        else if (ua.indexOf('Edge') > -1) browser = 'Edge';
        return browser;
    }

    function getOSInfo() {
        const ua = navigator.userAgent;
        let os = 'unknown';
        if (ua.indexOf('Windows') > -1) os = 'Windows';
        else if (ua.indexOf('Mac') > -1) os = 'MacOS';
        else if (ua.indexOf('Linux') > -1) os = 'Linux';
        else if (ua.indexOf('Android') > -1) os = 'Android';
        else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';
        return os;
    }
}
