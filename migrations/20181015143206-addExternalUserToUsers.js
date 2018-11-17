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
  await db.addColumn('users', 'external_user', {
    type: 'boolean',
    notNull: true,
    defaultValue: false,
  });
};

exports.down = async function(db) {
  return db.removeColumn('users', 'external_user');
};

exports._meta = {
  "version": 1
};
