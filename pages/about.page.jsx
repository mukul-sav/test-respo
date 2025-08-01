import React from 'react'

export const documentProps = {
  title: 'About | React SSR/SSG Test App',
  description: 'About this test application'
}

// About page - SSG by default
export function Page() {
  return (
    <>
      <h1>About This Test Project</h1>
      <p>
        This project is designed to help evaluate the differences between Server-Side Rendering (SSR) 
        and Static Site Generation (SSG) for React applications across different hosting platforms.
      </p>
      
      <div className="card">
        <h2>Project Goals</h2>
        <ul>
          <li>Compare build and deployment times between SSR and SSG</li>
          <li>Evaluate developer experience for both approaches</li>
          <li>Test how preview URLs are handled on different platforms</li>
          <li>Compare performance characteristics</li>
          <li>Determine the complexity of implementation for each approach</li>
        </ul>
      </div>
      
      <div className="card">
        <h2>Testing Platforms</h2>
        <ul>
          <li><strong>Vercel</strong>: Integrated build system with preview deployments</li>
          <li><strong>Fly.io</strong>: Global application platform with distributed edge servers</li>
          <li><strong>Railway</strong>: Simple infrastructure platform with automatic deployments</li>
          <li><strong>Render</strong>: Unified platform for static sites and server-side applications</li>
        </ul>
      </div>
    </>
  )
}