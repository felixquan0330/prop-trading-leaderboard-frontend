import { util } from './utils.js';

export function getOrCreateVisitorId() {
    let visitorId = util.getCookie('visitor_id') ||
        (window.localStorage && window.localStorage.getItem('visitor_id'));
    if (visitorId) {
        util.log('Loaded existing visitorId:', visitorId);
    }
    if (!visitorId) {
        visitorId = util.generateId();
        util.log('Generated new visitorId:', visitorId);
        if (!util.setCookie('visitor_id', visitorId)) {
            try {
                if (window.localStorage) {
                    window.localStorage.setItem('visitor_id', visitorId);
                    util.log('Stored visitorId in localStorage:', visitorId);
                }
            } catch (e) {
                util.log('LocalStorage error when saving visitorId', e);
            }
        } else {
            util.log('Stored visitorId in cookie:', visitorId);
        }
    }
    return visitorId;
}

export function getOrCreateSessionId() {
    let sessionId;
    try {
        sessionId = window.sessionStorage && window.sessionStorage.getItem('session_id');
        if (sessionId) {
            util.log('Loaded existing sessionId:', sessionId);
        }
        if (!sessionId) {
            sessionId = util.generateId();
            window.sessionStorage && window.sessionStorage.setItem('session_id', sessionId);
            util.log('Generated and stored new sessionId:', sessionId);
        }
    } catch (e) {
        sessionId = 'fallback_' + util.generateId();
        util.log('SessionStorage error, using fallback sessionId:', sessionId, e);
    }
    return sessionId;
} 