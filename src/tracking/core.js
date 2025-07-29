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
        stitchingInfo: {
            method: 'unknown',
            confidence: 'unknown',
            factors: []
        }
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

    function detectEnvironment() {
        const environment = {
            cookiesEnabled: areCookiesEnabled(),
            localStorage: !!window.localStorage,
            sessionStorage: !!window.sessionStorage,
            fingerprintAvailable: false,
            consentLevel: 'unknown'
        };

        const consent = getConsent();
        if (consent.statistics) {
            environment.consentLevel = 'statistics';
        } else if (consent.preferences) {
            environment.consentLevel = 'preferences';
        } else {
            environment.consentLevel = 'none';
        }

        return environment;
    }

    function determineStitchingStrategy(environment, fingerprint) {
        const strategy = {
            method: 'unknown',
            confidence: 'unknown',
            factors: []
        };

        if (environment.cookiesEnabled && fingerprint) {
            const cookieVisitorId = util.getCookie('visitor_id');
            const localVisitorId = window.localStorage?.getItem('visitor_id');
            
            if (cookieVisitorId || localVisitorId) {
                strategy.method = 'cookie_fingerprint';
                strategy.confidence = 'high';
                strategy.factors = ['cookie', 'fingerprint'];
            } else {
                strategy.method = 'fingerprint_fallback';
                strategy.confidence = 'medium';
                strategy.factors = ['fingerprint'];
            }
        }
        else if (environment.cookiesEnabled && !fingerprint) {
            const cookieVisitorId = util.getCookie('visitor_id');
            const localVisitorId = window.localStorage?.getItem('visitor_id');
            
            if (cookieVisitorId || localVisitorId) {
                strategy.method = 'cookie_only';
                strategy.confidence = 'medium';
                strategy.factors = ['cookie'];
            } else {
                strategy.method = 'new_cookie';
                strategy.confidence = 'low';
                strategy.factors = ['new'];
            }
        }
        else if (!environment.cookiesEnabled && fingerprint) {
            const localVisitorId = window.localStorage?.getItem('visitor_id');
            
            if (localVisitorId) {
                strategy.method = 'localstorage_fingerprint';
                strategy.confidence = 'medium';
                strategy.factors = ['localstorage', 'fingerprint'];
            } else {
                strategy.method = 'fingerprint_only';
                strategy.confidence = 'medium';
                strategy.factors = ['fingerprint'];
            }
        }
        else {
            const localVisitorId = window.localStorage?.getItem('visitor_id');
            
            if (localVisitorId) {
                strategy.method = 'localstorage_only';
                strategy.confidence = 'low';
                strategy.factors = ['localstorage'];
            } else {
                strategy.method = 'random_fallback';
                strategy.confidence = 'none';
                strategy.factors = ['random'];
            }
        }
        
        return strategy;
    }

    getFingerprint().then(fingerprint => {
        state.fingerprint = fingerprint;
        const environment = detectEnvironment();
        
        state.visitorId = getOrCreateVisitorId();
        state.sessionId = getOrCreateSessionId();
        
        const strategy = determineStitchingStrategy(environment, fingerprint);
        
        state.stitchingInfo = {
            method: strategy.method,
            confidence: strategy.confidence,
            factors: strategy.factors
        };

        util.log('Session stitching strategy:', {
            method: strategy.method,
            confidence: strategy.confidence,
            factors: strategy.factors,
            visitorId: state.visitorId,
            sessionId: state.sessionId,
            environment: environment
        });

        if (config.debugMode) {
            console.log(`[Tracker] Session Stitching: ${strategy.method} method, ${strategy.confidence} confidence`);
            console.log(`[Tracker] Factors: ${strategy.factors.join(', ')}`);
        }

        startTracking();
    }).catch(error => {
        util.log('FingerprintJS error:', error);
        
        const environment = detectEnvironment();
        
        state.visitorId = getOrCreateVisitorId();
        state.sessionId = getOrCreateSessionId();
        
        const strategy = determineStitchingStrategy(environment, null);
        
        state.stitchingInfo = {
            method: strategy.method,
            confidence: strategy.confidence,
            factors: strategy.factors
        };

        util.log('Fallback session stitching strategy:', {
            method: strategy.method,
            confidence: strategy.confidence,
            factors: strategy.factors
        });

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
        const url = `${config.apiUrl}/track-visit`;
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
            device_type: util.getDeviceType(),
            browser: util.getBrowserInfo(),
            os: util.getOSInfo(),
            language: navigator.language || navigator.userLanguage || '',
            page_title: document.title
        };
        sendRequest(url, data);
    }

    function sendUpdateVisit(isSync = false) {
        const url = `${config.apiUrl}/update-visit`;
        const data = {
            visit_id: state.visitId,
            company_id: config.companyId,
            time_on_page: state.timeOnPage,
        };
        sendRequest(url, data, isSync);
    }

    function trackScriptLoad() {
        const url = `${config.apiUrl}/track-script-load`;
        sendRequest(url, {
            website_id: config.websiteId,
            company_id: config.companyId,
        });
    }
}
