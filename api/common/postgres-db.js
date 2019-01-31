const { Pool } = require('pg');

(function connectToDb() {
  const app_db_pool = new Pool({
    connectionString: global.__settings.db.app_db_url,
  });
  app_db_pool.on('connect', (client) => {
    client.query(`SET SCHEMA '${global.__settings.db.app_db_schema}'`);
  });
  const chain_db_pool = new Pool({
    connectionString: global.__settings.db.chain_db_url,
  });
  chain_db_pool.on('connect', (client) => {
    client.query(`SET SCHEMA '${global.__settings.db.chain_db_schema}'`);
  });
  module.exports = {
    app_db_pool,
    chain_db_pool,
  };
}());
