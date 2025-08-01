// Production server entry point for Render
const { createServer } = require('http');
const { createPageRenderer } = require('vite-plugin-ssr');

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// The page renderer is the main API of vite-plugin-ssr
const renderPage = createPageRenderer({ isProduction });

const server = createServer(async (req, res) => {
  const url = req.url;

  // Render the page
  const pageContextInit = { urlOriginal: url };
  const pageContext = await renderPage(pageContextInit);
  
  // Handle 404s
  if (!pageContext.httpResponse) {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }
  
  const { body, statusCode, contentType, earlyHints } = pageContext.httpResponse;
  
  // Send early hints if available
  if (earlyHints) {
    res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
  }
  
  // Set status code and content type
  res.statusCode = statusCode;
  res.setHeader('Content-Type', contentType);
  
  // Send the response
  res.end(body);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});