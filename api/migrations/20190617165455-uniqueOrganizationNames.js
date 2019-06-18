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
  await db.runSql(`UPDATE organizations
  SET name = CONCAT(name, '_', id)
  WHERE name IN (
    SELECT name FROM organizations GROUP BY name HAVING COUNT(name) > 1
  );`);
  await db.runSql(`ALTER TABLE organizations
  ADD CONSTRAINT organizations_name_key UNIQUE (name);`);
  await db.runSql(`
  ALTER TABLE organizations
  ALTER COLUMN address DROP NOT NULL;`);
};

exports.down = async (db) => {
  await db.runSql(`ALTER TABLE organizations
  DROP CONSTRAINT organizations_name_key;`);
  await db.runSql(`ALTER TABLE organizations
  ALTER COLUMN address SET NOT NULL;`);
};

exports._meta = {
  version: 1,
};
