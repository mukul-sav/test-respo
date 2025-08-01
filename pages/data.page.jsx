import React, { useState, useEffect } from 'react'

export const documentProps = {
  title: 'Data Comparison | React SSR/SSG Test App',
  description: 'Comparing data fetching with SSR vs SSG'
}

// Mock API function (simulates fetching from a real API)
async function fetchData() {
  return {
    items: [
      { id: 1, name: 'Item 1', description: 'Description for item 1' },
      { id: 2, name: 'Item 2', description: 'Description for item 2' },
      { id: 3, name: 'Item 3', description: 'Description for item 3' }
    ],
    timestamp: new Date().toISOString()
  }
}

// This enables prerendering (SSG)
export const prerender = true

// Server-side data fetching for SSG
export async function onBeforeRender() {
  console.log('Fetching data during build...')
  const staticData = await fetchData()
  
  return {
    pageContext: {
      pageProps: {
        staticData
      }
    }
  }
}

export function Page({ staticData }) {
  const [dynamicData, setDynamicData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Client-side data fetching
  useEffect(() => {
    async function loadDynamicData() {
      setLoading(true)
      try {
        const data = await fetchData()
        setDynamicData(data)
      } catch (error) {
        console.error('Error fetching dynamic data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadDynamicData()
  }, [])
  
  return (
    <>
      <h1>Data Fetching Comparison</h1>
      <p>This page demonstrates different data fetching strategies for SSR and SSG.</p>
      
      <div className="card">
        <h2>Static Data (SSG)</h2>
        <p>This data was fetched during build time:</p>
        {staticData ? (
          <>
            <p><strong>Timestamp:</strong> {staticData.timestamp}</p>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {staticData.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No static data available</p>
        )}
      </div>
      
      <div className="card">
        <h2>Dynamic Data (Client-side)</h2>
        <p>This data was fetched on the client after the page loaded:</p>
        {loading ? (
          <p>Loading dynamic data...</p>
        ) : dynamicData ? (
          <>
            <p><strong>Timestamp:</strong> {dynamicData.timestamp}</p>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {dynamicData.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Failed to load dynamic data</p>
        )}
      </div>
      
      <div className="card">
        <h2>Key Differences</h2>
        <ul>
          <li><strong>SSG</strong>: Data fetched at build time, cannot change without rebuilding</li>
          <li><strong>CSR</strong>: Data fetched on the client, always fresh but requires loading state</li>
          <li><strong>SSR</strong>: Would fetch data on each server request (not shown here)</li>
          <li><strong>ISR</strong>: Combines SSG with revalidation at specific intervals (not shown here)</li>
        </ul>
      </div>
    </>
  )
}