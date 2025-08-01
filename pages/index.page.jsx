import React from 'react'

export const documentProps = {
  title: 'Home | React SSR/SSG Test App',
  description: 'Testing SSR and SSG capabilities in React'
}

// Home page - SSG by default
export function Page() {
  return (
    <>
      <h1>React SSR vs SSG Test Project</h1>
      <p>This project demonstrates the differences between Server-Side Rendering (SSR) and Static Site Generation (SSG) in React.</p>
      
      <div className="card">
        <h2>Rendering Strategies</h2>
        <p>This application demonstrates two main rendering strategies:</p>
        <ul>
          <li><strong>SSR (Server-Side Rendering)</strong>: Content is generated on each request</li>
          <li><strong>SSG (Static Site Generation)</strong>: Content is generated at build time</li>
        </ul>
      </div>
      
      <div className="card">
        <h2>Test Pages</h2>
        <ul>
          <li><a href="/ssr-page">SSR Example</a> - Dynamic content rendered on each request</li>
          <li><a href="/ssg-page">SSG Example</a> - Static content generated at build time</li>
          <li><a href="/data">Data Comparison</a> - Compare how data fetching works with SSR vs SSG</li>
          <li><a href="/metrics">Metrics</a> - View performance metrics</li>
        </ul>
      </div>
    </>
  )
}