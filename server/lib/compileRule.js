const ejs = require('ejs');
const config = require('./config');
const generateApiKey = require('./generateApiKey');
const authorizeRule = require('./rules/authorize');

module.exports = (storage, auth0, configuration = { }, userName = '') =>
  storage.getApiKey()
    .then((key) => {
      if (!key) {
        return generateApiKey(storage, auth0);
      }

      return null;
    })
    .then(() =>
      ejs.render(authorizeRule, {
        extensionUrl: config('PUBLIC_WT_URL').replace(/\/$/g, ''),
        updateTime: () => new Date().toISOString(),
        config: configuration,
        userName
      })
    );
