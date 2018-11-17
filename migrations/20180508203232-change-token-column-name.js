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

exports.up = function(db) {
  return db.renameColumn('users', 'token', 'session_token');
};

exports.down = function(db) {
  return db.renameColumn('users', 'session_token', 'token');
};

exports._meta = {
  version: 1,
};
