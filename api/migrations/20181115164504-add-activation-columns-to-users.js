let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = (options, seedLink) => {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async (db) => {
  await db.addColumn('users', 'activated', {
    type: 'boolean',
    notNull: true,
    defaultValue: false,
  });
  await db.addColumn('users', 'activated_at', {
    type: 'timestamp',
  });
  await db.runSql(
    'CREATE OR REPLACE FUNCTION trigger_set_activated_timestamp() RETURNS TRIGGER AS $$ ' +
    'BEGIN NEW.activated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;',
  );
  await db.runSql(
    'CREATE TRIGGER set_activated_timestamp ' +
    'BEFORE UPDATE ON users ' +
    'FOR EACH ROW ' +
    'WHEN (NEW.activated = true) ' +
    'EXECUTE PROCEDURE trigger_set_activated_timestamp();',
  );
};

exports.down = async (db) => {
  await db.runSql('DROP TRIGGER set_activated_timestamp ON users;');
  await db.removeColumn('users', 'activated');
  await db.removeColumn('users', 'activated_at');
};

exports._meta = {
  version: 1,
};
