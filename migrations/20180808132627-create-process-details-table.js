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
  return db.createTable('process_details', {
    model_id: {
      type: 'string',
      notNull: true,
      primaryKey: true,
      length: 255
    },
    process_id: {
      type: 'string',
      notNull: true,
      primaryKey: true,
      length: 255
    },
    process_name: {
      type: 'string',
      notNull: true,
      length: 255
    },
  });
};

exports.down = function(db) {
  return db.dropTable('process_details');
};

exports._meta = {
  "version": 1
};
