import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { PageShell } from './PageShell'

// This renders the page on the server
export function render(pageContext) {
  const { Page, pageProps } = pageContext
  
  // This is where the React page is rendered to HTML
  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  const { documentProps } = pageContext.exports
  const title = documentProps?.title || 'React SSR/SSG Test App'
  const description = documentProps?.description || 'Testing SSR and SSG capabilities'

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`
}