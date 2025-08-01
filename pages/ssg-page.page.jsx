import React, { useState, useEffect } from 'react'

export const documentProps = {
  title: 'SSG Example | React SSR/SSG Test App',
  description: 'Static site generation example page'
}

// This function enables prerendering (SSG)
export const prerender = true

export function Page() {
  const [clientTime, setClientTime] = useState('')
  const [clicks, setClicks] = useState(0)
  
  // Static content generated at build time
  const buildTime = new Date().toLocaleString()
  
  // Client-side effect to demonstrate hydration
  useEffect(() => {
    setClientTime(new Date().toLocaleString())
    
    // Update client time every second
    const timer = setInterval(() => {
      setClientTime(new Date().toLocaleString())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <>
      <h1>Static Site Generation Example</h1>
      <p>This page is generated at build time and served as static HTML.</p>
      
      <div className="card">
        <h2>Time Comparison</h2>
        <p><strong>Build Time (static):</strong> {buildTime}</p>
        <p><strong>Client Time (updating):</strong> {clientTime || 'Loading...'}</p>
        <p><small>The build time shows when the page was generated during the build process. The client time updates every second in the browser.</small></p>
      </div>
      
      <div className="card">
        <h2>Interactive Counter</h2>
        <p>Button clicks: {clicks}</p>
        <button className="button" onClick={() => setClicks(clicks + 1)}>
          Click me
        </button>
        <p><small>This counter demonstrates client-side interactivity after SSG hydration.</small></p>
      </div>
      
      <div className="card">
        <h2>SSG Characteristics</h2>
        <ul>
          <li>Content is generated at build time</li>
          <li>Can be served from a CDN</li>
          <li>Very fast page loads</li>
          <li>Lower hosting costs (no server required)</li>
          <li>Content may be stale between builds</li>
          <li>Build times increase with more pages</li>
        </ul>
      </div>
    </>
  )
}