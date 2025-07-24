import {getConfig} from './config.js';
import {initTracker} from './core.js';

const config = getConfig();
initTracker(config);
