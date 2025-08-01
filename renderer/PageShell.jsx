import React from 'react'
import { PageContextProvider } from './usePageContext'
import { Layout } from '../components/Layout'

export function PageShell({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>{children}</Layout>
    </PageContextProvider>
  )
}