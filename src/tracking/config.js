export function getConfig() {
    console.log('getConfig', window.trackerConfig);
    return window.TrackerConfig || {};
}
