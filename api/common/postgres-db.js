const { Pool } = require('pg');

(function startPostgresDb() {
  // connection to the app db
  const appPool = new Pool({
    connectionString: global.__settings.monax.pg.app_db_url,
  });
  // connection to chain/vent db
  const chainPool = new Pool({
    connectionString: global.__settings.monax.pg.chain_db_url,
  });
  module.exports = {
    appPool,
    chainPool,
  };
}());
