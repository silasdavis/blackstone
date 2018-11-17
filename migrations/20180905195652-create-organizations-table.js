"use strict";

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
  await db.createTable("organizations", {
    id: {
      type: "int",
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: "string",
      notNull: true,
      unique: true,
      length: 255
    },
    name: { type: "string", notNull: true, length: 255 },
  });
  await db.addIndex("organizations", "organizationsIndex_address", ["address"], true);
};

exports.down = function(db) {
  return db.dropTable("organizations");
};

exports._meta = {
  version: 1
};
