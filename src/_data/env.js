const environment = process.env.ELEVENTY_ENV;
const DEV_ENV = 'dev';
const devUrl = 'http://localhost:8080';
const isProd = environment !== DEV_ENV;
let url = devUrl;
if (isProd) {
    const configured = (process.env.SITE_URL ?? process.env.URL ?? '').trim();
    const setupMessage = 'Set SITE_URL to your public site origin (for example https://your-site.web.app) before building for production. Netlify supplies URL automatically.';
    let origin;
    try {
        origin = new URL(configured);
    } catch {
        throw new Error(setupMessage);
    }
    if (!/^https?:\/\//i.test(configured) ||
        !['http:', 'https:'].includes(origin.protocol) ||
        origin.username || origin.password ||
        origin.pathname !== '/' || origin.search || origin.hash ||
        /^(?:www\.)?my-domain\.com$/i.test(origin.hostname) ||
        /^(?:(?:.*\.)?localhost|127(?:\.\d+){3}|\[::1\])$/i.test(origin.hostname.replace(/\.$/, ''))) {
        throw new Error(setupMessage);
    }
    url = origin.origin;
}

export default {
    environment,
    isProd,
    url,
    tracking: {
        gtag: 'MY-GTAG-ID',
        pixelId: 'MY-PIXEL-ID',
    },
};
