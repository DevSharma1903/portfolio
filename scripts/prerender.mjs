import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const output = path.resolve('dist');
const routes = ['/', '/projects', '/about', '/skills', '/contact'];
const server = await createServer({
  configFile: path.resolve('vite.config.js'),
  appType: 'custom',
  server: { middlewareMode: true },
});

try {
  const { site, pageMeta } = await server.ssrLoadModule('/src/data/site.js');
  const template = await fs.readFile(path.join(output, 'index.html'), 'utf8');
  const base = server.config.base;

  const updateTag = (html, pattern, replacement) => pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace('</head>', `${replacement}\n  </head>`);

  function documentFor(route, title, description, markup, missing = false) {
    let html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
    html = updateTag(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${description}" />`);
    html = updateTag(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`);
    html = updateTag(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}" />`);
    html = updateTag(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${site.url}og.png" />`);
    html = updateTag(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${site.url}${route === '/' ? '' : `${route.slice(1)}/`}" />`);
    html = updateTag(html, /<meta\s+name="twitter:card"[^>]*>/i, '<meta name="twitter:card" content="summary_large_image" />');
    html = updateTag(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`);
    html = updateTag(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${description}" />`);
    html = updateTag(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${site.url}${route === '/' ? '' : `${route.slice(1)}/`}" />`);
    if (missing) html = updateTag(html, /<meta\s+name="robots"[^>]*>/i, '<meta name="robots" content="noindex,follow" />');
    return html;
  }

  for (const route of routes) {
    const info = pageMeta[route];
    const markup = await server.ssrLoadModule('/src/entry-server.jsx').then(({ render }) => render(route));
    const html = documentFor(route, info.title, info.description, markup);
    const destination = route === '/' ? path.join(output, 'index.html') : path.join(output, route.slice(1), 'index.html');
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, html);
    console.log(`Prerendered ${route}`);
  }

  const missingRoute = '/__not_found__';
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  const missingMarkup = await render(missingRoute);
  const missingInfo = pageMeta['/404'];
  await fs.writeFile(path.join(output, '404.html'), documentFor('/404', missingInfo.title, missingInfo.description, missingMarkup, true));
  console.log('Prerendered 404.html');

  // Keep the project-pages base path addressable when the same dist folder is served at `/` for local QA.
  const deploymentPath = new URL(site.url).pathname.replace(/^\/+|\/+$/g, '');
  if (deploymentPath && await fs.stat(path.join(output, 'og.png')).then(() => true, () => false)) {
    const alias = path.join(output, deploymentPath, 'og.png');
    await fs.mkdir(path.dirname(alias), { recursive: true });
    await fs.copyFile(path.join(output, 'og.png'), alias);
  }

  if (base !== '/') console.log(`Asset base: ${base}`);
} finally {
  await server.close();
}
