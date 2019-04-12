// External dependencies
const fs = require('fs');
const toml = require('toml');
const events = require('events');
const path = require('path');
const _ = require('lodash');

(function bootstrapAPI() {
  module.exports = (customConfigs = { startServer: true, globalVariables: () => {} }) => {
    // Set up global directory constants used throughout the app
    global.__appDir = __dirname;
    global.__common = path.resolve(global.__appDir, 'common');
    global.__config = path.resolve(global.__appDir, 'config');
    global.__contracts = path.resolve(global.__appDir, 'contracts');
    global.__abi = path.resolve(global.__appDir, 'public-abi');
    global.__routes = path.resolve(global.__appDir, 'routes');
    global.__controllers = path.resolve(global.__appDir, 'controllers');
    global.__data = path.resolve(global.__appDir, 'data');
    global.__lib = path.resolve(global.__appDir, 'lib');
    global.__schemas = path.resolve(global.__appDir, 'schemas');

    // Read configuration
    global.__settings = (() => {
      const settings = toml.parse(fs.readFileSync(`${global.__config}/settings.toml`));
      if (process.env.HOARD) _.set(settings, 'hoard', process.env.HOARD);
      if (process.env.ANALYTICS_ID) _.set(settings, 'analyticsID', process.env.ANALYTICS_ID);
      if (process.env.CHAIN_URL_GRPC) _.set(settings, 'chain.url', process.env.CHAIN_URL_GRPC);
      if (process.env.ACCOUNTS_SERVER_KEY) _.set(settings, 'accounts.server', process.env.ACCOUNTS_SERVER_KEY);
      if (process.env.JWT_SECRET) _.set(settings, 'jwt.secret', process.env.JWT_SECRET);
      if (process.env.JWT_ISSUER) _.set(settings, 'jwt.issuer', process.env.JWT_ISSUER);
      if (process.env.JWT_EXPIRES_IN) _.set(settings, 'jwt.expiresIn', process.env.JWT_EXPIRES_IN);
      if (process.env.COOKIE_MAX_AGE) _.set(settings, 'cookie.maxAge', process.env.COOKIE_MAX_AGE);
      if (process.env.IDENTITY_PROVIDER) _.set(settings, 'identity_provider', process.env.IDENTITY_PROVIDER);
      if (process.env.MAX_WAIT_FOR_VENT_MS) _.set(settings, 'max_wait_for_vent_ms', process.env.MAX_WAIT_FOR_VENT_MS);
      _.set(
        settings,
        'db.app_db_url',
        `postgres://${process.env.POSTGRES_DB_USER}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_DB_PORT}/${process.env.POSTGRES_DB_DATABASE}`,
      );
      _.set(settings, 'db.app_db_schema', process.env.POSTGRES_DB_SCHEMA);
      _.set(
        settings,
        'db.chain_db_url',
        `postgres://${process.env.POSTGRES_DB_USER}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_DB_PORT}/${process.env.POSTGRES_DB_DATABASE}`,
      );
      _.set(settings, 'db.chain_db_schema', process.env.POSTGRES_DB_SCHEMA_VENT);
      if (process.env.NODE_ENV === 'production') _.set(settings, 'cookie.secure', true);
      else _.set(settings, 'cookie.secure', false);
      return settings;
    })();

    global.__constants = require(path.join(global.__common, 'constants'));
    global.__bundles = global.__constants.BUNDLES;
    const { hexToString, stringToHex } = require(`${global.__common}/controller-dependencies`);
    global.hexToString = hexToString;
    global.stringToHex = stringToHex;

    customConfigs.globalVariables();

    // EventEmitter to signal application state, e.g. to test suite
    const eventEmitter = new events.EventEmitter();
    const eventConsts = { STARTED: 'started' };

    const logger = require(`${global.__common}/logger`);
    const log = logger.getLogger('app');

    log.info('Loading contracts ...');
    // Local modules require configuration to be loaded
    const contracts = require(`${global.__controllers}/contracts-controller`);
    contracts.load().then(() => {
      log.info('Contracts loaded.');
      if (customConfigs.startServer) {
        // Configure routes and start express server
        require(`${global.__common}/aa-web-api`);
        log.info('Web API started and ready for requests.');
        log.info('Active Agreements Application started successfully');
      }
      eventEmitter.emit(eventConsts.STARTED);
    }).catch((error) => {
      log.error(`Unexpected error initializing the application: ${error.stack}`);
      process.exit();
    });

    return {
      events: eventConsts,
      eventEmitter,
    };
  };
}());
