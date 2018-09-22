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
  return db.createTable('password_change_requests', {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      unique: true,
      foreignKey: {
        name: 'password_change_requests_user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        mapping: 'id',
      },
    },
    recovery_code_digest: {
      type: 'string',
      notNull: true,
      unique: true,
    },
    created_at: { type: 'timestamp', notNull: true, defaultValue: new String('now()') },
  });
};

exports.down = function(db) {
  return db.dropTable('password_change_requests');
};

exports._meta = {
  version: 1,
};
