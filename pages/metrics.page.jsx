import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const documentProps = {
  title: 'Performance Metrics | React SSR/SSG Test App',
  description: 'Metrics comparing SSR and SSG performance'
}

// This disables prerendering, making it SSR
export const prerender = false

export function Page() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // In a real app, this would fetch from an API
        // For this example, we'll use mock data
        const mockData = {
          buildTimes: {
            ssg: 12.5, // seconds
            ssr: 8.2
          },
          averageRenderTimes: {
            ssg: 145, // ms
            ssr: 320
          },
          coldStartTimes: {
            ssg: 110, // ms
            ssr: 850
          },
          ttfb: {
            ssg: 80, // ms
            ssr: 270
          }
        }
        
        setMetrics(mockData)
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMetrics()
  }, [])
  
  const renderChart = (title, data, label1, label2) => {
    if (!data) return null
    
    const chartData = {
      labels: [label1, label2],
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }
      ]
    }
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: title
        }
      }
    }
    
    return <Bar data={chartData} options={options} />
  }
  
  return (
    <>
      <h1>Performance Metrics</h1>
      <p>This page shows performance metrics comparing SSR and SSG approaches.</p>
      
      {loading ? (
        <p>Loading metrics data...</p>
      ) : metrics ? (
        <div className="metrics-container">
          <div className="card">
            <h2>Build Times (seconds)</h2>
            {renderChart('Build Times (seconds)', 
              [metrics.buildTimes.ssg, metrics.buildTimes.ssr], 'SSG', 'SSR')}
            <p><small>Lower is better. SSR typically has faster build times as it doesn't pre-generate all pages.</small></p>
          </div>
          
          <div className="card">
            <h2>Average Render Times (ms)</h2>
            {renderChart('Render Times (ms)', 
              [metrics.averageRenderTimes.ssg, metrics.averageRenderTimes.ssr], 'SSG', 'SSR')}
            <p><small>Lower is better. SSG pages are pre-rendered and served statically, while SSR renders on each request.</small></p>
          </div>
          
          <div className="card">
            <h2>Cold Start Times (ms)</h2>
            {renderChart('Cold Start Times (ms)', 
              [metrics.coldStartTimes.ssg, metrics.coldStartTimes.ssr], 'SSG', 'SSR')}
            <p><small>Lower is better. SSG has no server cold start, while SSR functions need to initialize.</small></p>
          </div>
          
          <div className="card">
            <h2>Time to First Byte (ms)</h2>
            {renderChart('TTFB (ms)', 
              [metrics.ttfb.ssg, metrics.ttfb.ssr], 'SSG', 'SSR')}
            <p><small>Lower is better. SSG content can be served from edge CDNs with minimal latency.</small></p>
          </div>
          
          <div className="card">
            <h2>Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>SSG</th>
                  <th>SSR</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Build Time</td>
                  <td>{metrics.buildTimes.ssg}s</td>
                  <td>{metrics.buildTimes.ssr}s</td>
                  <td>{metrics.buildTimes.ssg < metrics.buildTimes.ssr ? 'SSR' : 'SSG'}</td>
                </tr>
                <tr>
                  <td>Render Time</td>
                  <td>{metrics.averageRenderTimes.ssg}ms</td>
                  <td>{metrics.averageRenderTimes.ssr}ms</td>
                  <td>{metrics.averageRenderTimes.ssg < metrics.averageRenderTimes.ssr ? 'SSG' : 'SSR'}</td>
                </tr>
                <tr>
                  <td>Cold Start</td>
                  <td>{metrics.coldStartTimes.ssg}ms</td>
                  <td>{metrics.coldStartTimes.ssr}ms</td>
                  <td>{metrics.coldStartTimes.ssg < metrics.coldStartTimes.ssr ? 'SSG' : 'SSR'}</td>
                </tr>
                <tr>
                  <td>TTFB</td>
                  <td>{metrics.ttfb.ssg}ms</td>
                  <td>{metrics.ttfb.ssr}ms</td>
                  <td>{metrics.ttfb.ssg < metrics.ttfb.ssr ? 'SSG' : 'SSR'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Failed to load metrics data</p>
      )}
    </>
  )
}