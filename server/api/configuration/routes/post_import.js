import schema from '../schemas/storage';

export default () => ({
  method: 'POST',
  path: '/api/configuration/import',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'update:configuration' ]
    },
    validate: {
      payload: schema
    }
  },
  handler: (req, reply) => {
    if (
      !req.storage.provider ||
      !req.storage.provider.storageContext ||
      typeof req.storage.provider.storageContext.write !== 'function'
    ) {
      return reply.error(new Error('Unable to use "import" without proper storage'));
    }

    if (req.storage.provider.storageContext.storage && req.storage.provider.storageContext.storage.set) {
      return req.storage.provider.storageContext.storage.set(req.payload, { force: true }, (err) => {
        if (err) {
          return reply.error(err);
        }

        return reply().code(204);
      });
    }

    return req.storage.provider.storageContext.write(req.payload)
      .then(() => reply().code(204))
      .catch(err => reply.error(err));
  }
});
