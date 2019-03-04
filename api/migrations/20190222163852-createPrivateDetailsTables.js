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
  // ARCHETYPE_DETAILS
  await db.runSql(`CREATE TABLE archetype_details (
    address VARCHAR(40) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description text NOT NULL,
    created_at timestamptz NOT NULL default NOW(),
    updated_at timestamptz NOT NULL default NOW()
  );`);
  await db.runSql(
    'CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;',
  );
  await db.runSql(
    'CREATE TRIGGER set_timestamp BEFORE UPDATE ON archetype_details FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();',
  );

  // AGREEMENT_DETAILS
  await db.runSql(`CREATE TABLE agreement_details (
    address VARCHAR(40) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at timestamptz NOT NULL default NOW(),
    updated_at timestamptz NOT NULL default NOW()
  );`);
  await db.runSql(
    'CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;',
  );
  await db.runSql(
    'CREATE TRIGGER set_timestamp BEFORE UPDATE ON agreement_details FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();',
  );

  // PACKAGE_DETAILS
  await db.runSql(`CREATE TABLE package_details (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description text NOT NULL,
    created_at timestamptz NOT NULL default NOW(),
    updated_at timestamptz NOT NULL default NOW()
  );`);
  await db.runSql(
    'CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;',
  );
  await db.runSql(
    'CREATE TRIGGER set_timestamp BEFORE UPDATE ON package_details FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();',
  );

  // COLLECTION_DETAILS
  await db.runSql(`CREATE TABLE collection_details (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at timestamptz NOT NULL default NOW(),
    updated_at timestamptz NOT NULL default NOW()
  );`);
  await db.runSql(
    'CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;',
  );
  await db.runSql(
    'CREATE TRIGGER set_timestamp BEFORE UPDATE ON collection_details FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();',
  );

  // DEPARTMENT_DETAILS
  await db.runSql(`CREATE TABLE department_details (
    organization_address VARCHAR(40) NOT NULL,
    id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at timestamptz NOT NULL default NOW(),
    updated_at timestamptz NOT NULL default NOW(),
    PRIMARY KEY(organization_address, id)
  );`);
  await db.runSql(
    'CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;',
  );
  await db.runSql(
    'CREATE TRIGGER set_timestamp BEFORE UPDATE ON department_details FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();',
  );

};

exports.down = async function(db) {
  await db.dropTable('archetype_details');
  await db.dropTable('agreement_details');
  await db.dropTable('package_details');
  await db.dropTable('collection_details');
  await db.dropTable('department_details');
};

exports._meta = {
  "version": 1
};
