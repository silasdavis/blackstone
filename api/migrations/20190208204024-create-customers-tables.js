'use strict';

var dbm;
var type;
var seed;

const fs = require('fs');

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
  const tablesSql = fs.readFileSync('migrations/scripts/create-customers-tables.sql', 'utf8');
  await db.runSql(tablesSql);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
