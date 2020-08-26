const config = require('../lib/config');

const register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/admins/login',
    config: { auth: false },
    handler: (request, reply) => reply('Redirecting to login page...').redirect(`${config('PUBLIC_WT_URL')}/login`)
  });
  next();
};

register.attributes = {
  name: 'routes'
};

module.exports = register;
