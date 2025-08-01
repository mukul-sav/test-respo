import React, { useState, useEffect } from 'react'

export const documentProps = {
  title: 'SSR Example | React SSR/SSG Test App',
  description: 'Server-side rendering example page'
}

// This function disables prerendering, making the page SSR
export const prerender = false

export function Page() {
  const [serverTime, setServerTime] = useState('')
  const [clientTime, setClientTime] = useState('')
  const [clicks, setClicks] = useState(0)
  
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
      <h1>Server-Side Rendering Example</h1>
      <p>This page is rendered on the server for each request.</p>
      
      <div className="card">
        <h2>Time Comparison</h2>
        <p><strong>Server Time (at render):</strong> {serverTime || new Date().toLocaleString()}</p>
        <p><strong>Client Time (updating):</strong> {clientTime || 'Loading...'}</p>
        <p><small>The server time shows when the page was rendered on the server. The client time updates every second in the browser.</small></p>
      </div>
      
      <div className="card">
        <h2>Interactive Counter</h2>
        <p>Button clicks: {clicks}</p>
        <button className="button" onClick={() => setClicks(clicks + 1)}>
          Click me
        </button>
        <p><small>This counter demonstrates client-side interactivity after SSR hydration.</small></p>
      </div>
      
      <div className="card">
        <h2>SSR Characteristics</h2>
        <ul>
          <li>Content is generated on each request</li>
          <li>Always shows up-to-date information</li>
          <li>Requires a server to run at all times</li>
          <li>First meaningful paint may be faster than CSR</li>
          <li>Time to Interactive depends on hydration speed</li>
        </ul>
      </div>
    </>
  )
}