import _ from 'lodash';

import schema from '../schemas/configuration';
import compileRule from '../../../lib/compileRule';
import multipartRequest from '../../../lib/multipartRequest';

export default (server) => ({
  method: 'PATCH',
  path: '/api/configuration',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'update:configuration' ]
    },
    pre: [
      server.handlers.managementClient
    ],
    validate: {
      options: {
        allowUnknown: false
      },
      payload: schema
    }
  },
  handler: (req, reply) => {
    const config = req.payload;

    compileRule(req.storage, req.pre.auth0, config, req.auth.credentials.email || 'unknown')
      .then((script) => {
        multipartRequest(req.pre.auth0, 'rules', { fields: 'name,id' })
          .then(rules => {
            const payload = {
              name: 'auth0-authorization-extension',
              enabled: true,
              script
            };

            const rule = _.find(rules, { name: payload.name });
            if (!rule) {
              return req.pre.auth0.rules.create({ stage: 'login_success', ...payload });
            }

            return req.pre.auth0.rules.update({ id: rule.id }, payload);
          });
      })
      .then(() => req.storage.updateConfiguration(config))
      .then((updated) => reply(updated))
      .catch(err => reply.error(err));
  }
});
