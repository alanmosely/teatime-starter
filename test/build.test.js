import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const environment = (overrides = {}) => {
  const env = { ...process.env };
  delete env.SITE_URL;
  delete env.URL;
  delete env.ELEVENTY_ENV;
  return { ...env, ...overrides };
};
const run = (args, env) => spawnSync(process.execPath, args, {
  env: environment(env), encoding: 'utf8', windowsHide: true, maxBuffer: 8 * 1024 * 1024,
});
const build = (command, env) => run([process.env.npm_execpath, 'run', command], env);

test('production rejects missing, placeholder and non-origin configuration', () => {
  for (const value of [undefined, '', 'https://MY-DOMAIN.com', 'https://localhost', 'https://localhost.', 'https://preview.localhost', 'https://127.0.0.1', 'https://[::1]', 'javascript:alert(1)', 'https:site.test', 'https://site.test/path', 'https://user:password@site.test', 'https://site.test/?query=1', 'https://site.test/#fragment']) {
    const result = run(['--input-type=module', '-e', 'await import("./src/_data/env.js")'], value === undefined ? {} : { SITE_URL: value });
    assert.notEqual(result.status, 0, String(value));
    assert.match(result.stderr, /Set SITE_URL to your public site origin/);
  }
  const result = build('build:prod', { ELEVENTY_ENV: 'dev' });
  assert.notEqual(result.status, 0, 'production command must not inherit dev mode');
  assert.match(result.stdout + result.stderr, /Set SITE_URL/);
});

test('dev, explicit Firebase and automatic Netlify builds generate correct URLs', () => {
  for (const [command, env, origin] of [
    ['build', {}, 'http://localhost:8080'],
    ['build:prod', { SITE_URL: 'https://teatime-fixture.web.app/' }, 'https://teatime-fixture.web.app'],
    ['build:prod', { URL: 'https://teatime-fixture.netlify.app' }, 'https://teatime-fixture.netlify.app'],
    ['build:prod', { SITE_URL: 'https://custom.teatime.test', URL: 'https://teatime-fixture.netlify.app' }, 'https://custom.teatime.test'],
  ]) {
    const result = build(command, env);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const sitemap = readFileSync('public/sitemap.xml', 'utf8');
    const robots = readFileSync('public/robots.txt', 'utf8');
    const homepage = readFileSync('public/index.html', 'utf8');
    const missing = readFileSync('public/404.html', 'utf8');
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    assert.ok(locations.length > 0);
    assert.ok(locations.every(location => location === origin || location.startsWith(origin + '/')));
    assert.ok(locations.some(location => location === origin));
    assert.doesNotMatch(sitemap, /robots\.txt|404(?:\.html)?|sitemap\.xml|\/css\//);
    assert.match(robots, new RegExp(`Sitemap: ${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/sitemap.xml`));
    assert.ok(missing.includes(origin + '/#about'));
    assert.ok(homepage.includes('aria-controls="menu"'));
    for (const output of [sitemap, robots, homepage, missing]) {
      assert.doesNotMatch(output, /MY-DOMAIN\.com/i);
      if (command === 'build:prod') assert.doesNotMatch(output, /localhost:8080/);
    }
  }
});
