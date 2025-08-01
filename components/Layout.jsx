import React from 'react'
import { Link } from './Link'
import './Layout.css'

export function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/ssr-page">SSR Example</Link>
          <Link href="/ssg-page">SSG Example</Link>
          <Link href="/data">Data Comparison</Link>
          <Link href="/metrics">Metrics</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>React SSR/SSG Test Project</p>
      </footer>
    </div>
  )
}