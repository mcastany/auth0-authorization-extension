import { createApi } from '../../../lib/apiaccess';

export default () => ({
  method: 'POST',
  path: '/api/configuration/resource-server',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'create:resource-server' ]
    }
  },
  handler: (req, reply) => createApi(req)
    .then(api => reply(api))
    .catch(err => reply.error(err))
});
