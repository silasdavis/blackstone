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

exports.up = async db => db.createTable('user_activation_requests', {
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
      name: 'activation_requests_user_id_fk',
      table: 'users',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      mapping: 'id',
    },
  },
  activation_code_digest: {
    type: 'string',
    notNull: true,
    unique: true,
  },
  created_at: {
    type: 'timestamp',
    notNull: true,
    defaultValue: new String('now()'),
  },
});

exports.down = async db => db.dropTable('user_activation_requests');

exports._meta = {
  version: 1,
};
