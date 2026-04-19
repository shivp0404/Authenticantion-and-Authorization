const redis = require("../utils/redisClient");

const RATE_LIMIT = 3;
const WINDOW = 60; 

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;

    const key = `rate_limit:${ip}`;

    const requests = await redis.incr(key);

    if (requests === 1) {
      await redis.expire(key, WINDOW);
    }

    if (requests > RATE_LIMIT) {
      const ttl = await redis.ttl(key);

      return res.status(429).json({
        message: "Too many requests",
        retryAfter: ttl,
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(); // don't block request if Redis fails
  }
};

module.exports = rateLimiter;