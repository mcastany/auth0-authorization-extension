import { getDb } from '../lib/storage/getdb';

const register = (server, options, next) => {
  const db = getDb();
  server.decorate('server', 'storage', db);
  server.decorate('request', 'storage', db);

  next();
};

register.attributes = {
  name: 'storage'
};

export default register;
