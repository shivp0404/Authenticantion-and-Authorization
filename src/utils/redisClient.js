const Redis = require("ioredis");


const redisClient = new Redis({
  host: process.env.REDIS_HOST ,
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD ,
  tls:{},
   connectTimeout: 10000 
});
// events
redisClient.on("connect", () => {
  console.log("✅ Redis Connected");
});

redisClient.on("ready", () => {
  console.log("🚀 Redis Ready");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err.message);
});

process.on("SIGINT", async () => {
  await redis.quit();
  console.log("Redis disconnected");
  process.exit(0);
});

module.exports = redisClient;