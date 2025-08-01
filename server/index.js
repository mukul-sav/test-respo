import express from 'express'
import { renderPage } from 'vite-plugin-ssr/server'
import { performance } from 'perf_hooks'
import fs from 'fs'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const root = process.cwd()
const statsPath = path.join(root, 'render-stats.json')

const app = express()

if (isProduction) {
  app.use(express.static(`${root}/dist/client`))
} else {
  const vite = await import('vite')
  const viteDevMiddleware = (
    await vite.createServer({
      root,
      server: { middlewareMode: true }
    })
  ).middlewares
  app.use(viteDevMiddleware)
}

app.get('*', async (req, res, next) => {
  const startTime = performance.now()
  
  try {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      userAgent: req.headers['user-agent'],
      renderStartTime: startTime
    }
    
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    
    if (!httpResponse) return next()
    
    const { body, statusCode, contentType, earlyHints } = httpResponse
    
    if (earlyHints) {
      res.writeEarlyHints({
        link: earlyHints.map((e) => e.earlyHintLink)
      })
    }
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Log render stats
    if (isProduction) {
      let stats = {}
      try {
        if (fs.existsSync(statsPath)) {
          stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
        }
      } catch (e) {
        console.error('Error reading stats file:', e)
      }
      
      const pagePath = req.path
      if (!stats[pagePath]) stats[pagePath] = []
      stats[pagePath].push({
        timestamp: new Date().toISOString(),
        renderTime,
        isSSR: !pageContext.isStatic
      })
      
      fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2))
    }
    
    res.status(statusCode).type(contentType)
    res.send(body)
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server running at http://localhost:${port}`)