const path = require('path');

const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/app/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory: {
        path: path.join(__dirname, '../../dist'),
        redirectToSlash: true
      }
    }
  });

  next();
};

register.attributes = {
  name: 'assets'
};

module.exports = register;
