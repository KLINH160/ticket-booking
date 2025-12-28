const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Bất kỳ request nào bắt đầu bằng /api
    createProxyMiddleware({
      target: 'http://localhost:5000', // Chuyển hướng đến Backend (API Gateway)
      changeOrigin: true,
    })
  );
};