const config = require('./lib/config');
const Database = require('./lib/storage/database');
const { init: initDb } = require('./lib/storage/getdb');
const createProvider = require('./lib/storage/providers');

const createServer = require('./');
const logger = require('./lib/logger');

module.exports = (cfg, storageContext, cb) => {
  if (cb == null) {
    cb = err => {
      if (err) {
        logger.error('Hapi initialization failed.');
        logger.error(err);
      } else {
        logger.info('Hapi initialization completed.');
      }
    };
  }

  // Set configuration provider.
  config.setProvider(key => cfg(key) || process.env[key]);
  // Initialize the storage layer.
  initDb(
    new Database({
      provider: createProvider(storageContext)
    })
  );

  // Start the server.
  return createServer(cb);
};
