import { createLogger, debug, format, Logform, Logger, transports } from 'winston';
import * as process from 'node:process';

const { combine, json, colorize, prettyPrint } = format;

const validLogLevels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];

const defaultLogLevel = 'debug';

const prodLogFormat: Logform.Format = json();
const devLogFormat: Logform.Format = combine(
  process.env.LOCALDEV === 'true' ? prettyPrint() : json(),
  colorize({
    all: true,
    colors: {
      info: 'green',
      error: 'red',
      warn: 'yellow',
      debug: 'blue',
    },
  })
);

export const createLoggerInstance = (): Logger => {
  const logger: Logger = createLogger({
    level: defaultLogLevel,
    format: devLogFormat,
    transports: [new transports.Console()],
  });
  return logger;
};

createLoggerInstance();

export const logger: Logger = createLoggerInstance();
