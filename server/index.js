// This file is used by Vercel to handle SSR requests
const { createPageRenderer } = require('vite-plugin-ssr');

// The page renderer is the main API of vite-plugin-ssr
const renderPage = createPageRenderer({ isProduction: true });

module.exports = async (req, res) => {
  const { url } = req;
  
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
};