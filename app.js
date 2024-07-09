const express = require('express');
const redis = require('redis');

// Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'redis'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  redisClient.incr('visit_count', (err, count) => {
    if (err) {
      console.error('Error incrementing counter:', err);
      return res.status(500).send('Error');
    }
    res.send(`<h1> Hello 4324332322324, welcome to my task,Visitor Count: ${count}</h1>`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

