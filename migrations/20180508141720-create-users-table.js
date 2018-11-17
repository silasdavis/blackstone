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
  return db.createTable('users', {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: 'string',
      notNull: true,
      unique: true,
      length: 255,
    },
    email: { type: 'string', notNull: true, length: 255, unique: true },
    password_digest: { type: 'string', notNull: true, length: 255 },
    token: { type: 'string', length: 255, unique: true },
  });
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  version: 1,
};
