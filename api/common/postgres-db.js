const { Pool } = require('pg');

(function startPostgresDb() {
  const pool = new Pool({
    connectionString: global.__settings.monax.pg.database_url,
  });
  module.exports = pool;
}());
