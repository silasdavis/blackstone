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
  await db.addColumn('users', 'first_name', {
    type: 'string',
  });
  await db.addColumn('users', 'last_name', {
    type: 'string',
  });
  await db.addColumn('users', 'country', {
    type: 'string',
  });
  await db.addColumn('users', 'region', {
    type: 'string',
  });
};

exports.down = async function(db) {
  await db.removeColumn('users', 'first_name');
  await db.removeColumn('users', 'last_name');
  await db.removeColumn('users', 'country');
  await db.removeColumn('users', 'region');
};

exports._meta = {
  "version": 1
};
