'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.addColumn('users', 'created_at', {
    type: 'timestamp',
    notNull: true,
    defaultValue: new String('now()'),
  });
  await db.addColumn('users', 'updated_at', {
    type: 'timestamp',
    notNull: true,
    defaultValue: new String('now()'),
  });
  await db.runSql(
    'CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;',
  );
  await db.runSql(
    'CREATE TRIGGER set_timestamp BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();',
  );
};

exports.down = async function(db) {
  await db.runSql('DROP TRIGGER set_timestamp ON users;');
  await db.removeColumn('users', 'created_at');
  await db.removeColumn('users', 'updated_at');
};

exports._meta = {
  version: 1,
};
