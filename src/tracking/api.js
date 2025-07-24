import {util} from './utils.js';

export function sendRequest(url, data, isSync = false) {
    // Use sendBeacon for sync requests if available (better for beforeunload)
    if (isSync && navigator.sendBeacon) {
        try {
            const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
            navigator.sendBeacon(url, blob);
            return;
        } catch (e) {
            util.log('sendBeacon error, falling back to fetch', e);
        }
    }

    // Use fetch for async requests
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        keepalive: isSync
    }).catch(error => {
        util.log('Request error:', error);
    });
}
