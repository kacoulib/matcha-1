'use strict';
var env = process.env.NODE_ENV || 'development';
var conf = {
  fqdn: 'http://localhost:3000/',
  env,
  sessions: {
    key: 'matcha.sid',
    secret: 'q4qsd65df45s4d5f45ds5fsf4s',
    ttl: 7 * 24 * 3600 // 1 week, in seconds
  },
  oauth: {
    secret: 'QmFzZTY0DQoNCkJhc2U2NCBpcyBhIGdlbmVyaWMgdGVybSBmb3IgYSBudW1iZ',
    expire: 7 * 24 * 3600 // 1 week, in seconds
  },
  mongodb: {
    uri: 'mongodb://localhost:27017/data'
  }
};

module.exports = conf;
