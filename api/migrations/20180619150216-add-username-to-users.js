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
  await db.addColumn('users', 'username', {
    type: 'string', length: 20
  });
  await db.runSql("UPDATE users SET username = left(split_part(email, '@', 1), 15);");
  await db.runSql(`WITH to_update as 
  (SELECT username FROM users GROUP BY username HAVING COUNT(username) > 1) 
  UPDATE users SET username = concat(username, left(address, 5)) 
  WHERE username IN (SELECT * FROM to_update)`);
  await db.changeColumn('users', 'username', {
    notNull: false,
    unique: true,
  });  
};

exports.down = async function (db) {
  await db.removeColumn('users', 'username');
};

exports._meta = {
  "version": 1
};
