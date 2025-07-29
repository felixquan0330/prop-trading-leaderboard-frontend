export const util = {
    log: function (message, data) {
        if (window.TrackerConfig?.debugMode && console && console.log) {
            console.log(`[Tracker] ${message}`, data || '');
        }
    },
    getCookie: function (name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    },
    setCookie: function (name, value, days = 365, sameSite = 'Lax') {
        try {
            let expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            const cookieValue = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=${sameSite};`
            document.cookie = cookieValue;
            return true;
        } catch (e) {
            util.log('Cookie error', e);
            return false;
        }
    },
    generateId: function () {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    },
    getUrlParams: function () {
        return new URLSearchParams(window.location.search);
    },
    debounce: function (func, wait) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    },

    getDeviceType: function () {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    },
    getBrowserInfo: function () {
        const ua = navigator.userAgent;
        let browser = 'unknown';
        if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
        else if (ua.indexOf('Safari') > -1) browser = 'Safari';
        else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
        else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) browser = 'IE';
        else if (ua.indexOf('Edge') > -1) browser = 'Edge';
        return browser;
    },
    getOSInfo: function () {
        const ua = navigator.userAgent;
        let os = 'unknown';
        if (ua.indexOf('Windows') > -1) os = 'Windows';
        else if (ua.indexOf('Mac') > -1) os = 'MacOS';
        else if (ua.indexOf('Linux') > -1) os = 'Linux';
        else if (ua.indexOf('Android') > -1) os = 'Android';
        else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';
        return os;
    },
};
