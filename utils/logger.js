import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

// create pino-logflare console stream for serverless functions and send function for browser logs
const { stream, send } = logflarePinoVercel({
    apiKey: process.env.NEXT_PUBLIC_LOGFLARE_KEY,
    sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_SOURCE
});

// create pino loggger
const logger = pino(
    {
        browser: {
            transmit: {
                send: send
            }
        },
        level: 'debug',
        base: {
            env: process.env.NODE_ENV || 'NODE_ENV not set',
            revision: process.env.VERCEL_GITHUB_COMMIT_SHA
        }
    },
    stream
);

const prepObjectKeys = (headers) => {
    const keyValues = {};
    Object.keys(headers).map((key) => {
        const newKey = key.replace(/-/g, '_');
        keyValues[newKey] = headers[key];
    });

    return keyValues;
};

export { logger, prepObjectKeys };
