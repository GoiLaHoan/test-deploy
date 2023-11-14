// An example with custom cache adapter
// NOTE: we are no longer using next-boost
const Adapter = require('@next-boost/redis-cache').Adapter

const HOST =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_BOOST_REDIS_HOST
    : '127.0.0.1'

/** @type {import('@next-boost/next-boost/dist/types').HandlerConfig} */
module.exports = {
  rules: [
    { regex: '^/article.*', ttl: 300 },
    { regex: '.*', ttl: 60 },
  ],
  cacheAdapter: new Adapter({
    uri: `redis://${HOST}:6379`,
    ttl: 60,
    tbd: 3600,
  }),
}
