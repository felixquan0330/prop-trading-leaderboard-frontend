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
};
