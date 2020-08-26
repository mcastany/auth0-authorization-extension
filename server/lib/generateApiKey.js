const crypto = require('crypto');
const config = require('./config');

const hashApiKey = (key) => crypto.createHmac('sha256', `${key} + ${config('AUTH0_CLIENT_SECRET')}`)
  .update(config('EXTENSION_SECRET'))
  .digest('hex');

module.exports = (storage, auth0) => {
  const key = crypto.randomBytes(32).toString('hex');
  const hash = hashApiKey(key);

  return auth0.rulesConfigs.set({ key: 'AUTHZ_EXT_API_KEY' }, { value: hash })
    .then(() => storage.updateApiKey(key))
    .then(() => hash);
};
