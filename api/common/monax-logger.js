const log4js = require('log4js');
const fs = require('fs');

log4js.addLayout('json', config => (_logEvent) => {
  const logEvent = Object.assign({}, _logEvent);
  delete logEvent['level'];
  delete logEvent['context'];
  delete logEvent['pid'];
  return JSON.stringify(logEvent);
});

(function bootstrapLogger() {
  const initLogger = log4js.getLogger();
  initLogger.info('Initializing LOG4JS ...');

  if (!fs.existsSync('logs')) {
    initLogger.info('Creating missing logs/ default directory.');
    fs.mkdirSync('logs');
  }

  const config = require(`${global.__config}/log4js.json`);
  config.reloadSecs = 300;
  log4js.configure(config);

  config.loggers.forEach((logger) => {
    initLogger.info(`Configuring logger for category: ${(logger.category || 'default')}, level: ${(logger.level || 'default')}`);
    const log = log4js.getLogger(logger.category);
  });

  module.exports = log4js;
}());
