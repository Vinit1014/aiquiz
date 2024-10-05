const redis = require('redis');

// Create a Redis client using the modern async API
const redisClient = redis.createClient({
    url: 'redis://redis:6379'
});

// Promisify the redis client methods
redisClient.connect().catch(console.error);

// Handle connection errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redisClient;
