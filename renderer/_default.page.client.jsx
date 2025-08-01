import { hydrateRoot } from 'react-dom/client'
import React from 'react'
import { PageShell } from './PageShell'

// This hydrates the page on the client side
export async function render(pageContext) {
  const { Page, pageProps } = pageContext
  
  hydrateRoot(
    document.getElementById('page-view'),
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )
}