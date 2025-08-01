import fs from 'fs'
import path from 'path'

// This script analyzes the render stats collected during production runs
const statsPath = path.join(process.cwd(), 'render-stats.json')

try {
  if (!fs.existsSync(statsPath)) {
    console.log('No stats file found. Run the app in production mode to generate stats.')
    process.exit(0)
  }
  
  const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
  
  console.log('\n===== RENDER PERFORMANCE ANALYSIS =====\n')
  
  Object.entries(stats).forEach(([path, entries]) => {
    console.log(`\nPath: ${path}`)
    
    // Separate SSR and SSG renders
    const ssrEntries = entries.filter(entry => entry.isSSR)
    const ssgEntries = entries.filter(entry => !entry.isSSR)
    
    if (ssrEntries.length > 0) {
      const ssrTimes = ssrEntries.map(entry => entry.renderTime)
      const avgSsrTime = ssrTimes.reduce((a, b) => a + b, 0) / ssrTimes.length
      const minSsrTime = Math.min(...ssrTimes)
      const maxSsrTime = Math.max(...ssrTimes)
      
      console.log(`  SSR Renders: ${ssrEntries.length}`)
      console.log(`  Average SSR Render Time: ${avgSsrTime.toFixed(2)}ms`)
      console.log(`  Min SSR Render Time: ${minSsrTime.toFixed(2)}ms`)
      console.log(`  Max SSR Render Time: ${maxSsrTime.toFixed(2)}ms`)
    }
    
    if (ssgEntries.length > 0) {
      const ssgTimes = ssgEntries.map(entry => entry.renderTime)
      const avgSsgTime = ssgTimes.reduce((a, b) => a + b, 0) / ssgTimes.length
      const minSsgTime = Math.min(...ssgTimes)
      const maxSsgTime = Math.max(...ssgTimes)
      
      console.log(`  Static Serves: ${ssgEntries.length}`)
      console.log(`  Average Static Serve Time: ${avgSsgTime.toFixed(2)}ms`)
      console.log(`  Min Static Serve Time: ${minSsgTime.toFixed(2)}ms`)
      console.log(`  Max Static Serve Time: ${maxSsgTime.toFixed(2)}ms`)
    }
  })
  
  console.log('\n=======================================\n')
} catch (error) {
  console.error('Error analyzing stats:', error)
}