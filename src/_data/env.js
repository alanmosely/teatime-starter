const environment = process.env.ELEVENTY_ENV;
const DEV_ENV = 'dev';
const devUrl = 'http://localhost:8080';
// Netlify injects URL (the site's primary URL) into every build, so deploys
// get correct absolute URLs with zero config; the placeholder is the fallback
const prodUrl = process.env.URL || 'https://MY-DOMAIN.com';
const isProd = environment !== DEV_ENV;
const url = isProd ? prodUrl : devUrl;

export default {
    environment,
    isProd,
    url,
    tracking: {
        gtag: 'MY-GTAG-ID',
        pixelId: 'MY-PIXEL-ID',
    },
};
