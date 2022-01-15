const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20, // 20 requests for 15 min
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
