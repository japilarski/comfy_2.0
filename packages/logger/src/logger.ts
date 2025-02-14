import {
  createLogger,
  format,
  Logform,
  transports,
  Logger,
  debug,
} from 'winston';

const { combine, json, colorize, prettyPrint } = format;

const validLogLevels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];

const defaultLogLevel = 'info';

const prodLogFormat: Logform.Format = json();
const devLogFormat: Logform.Format = combine(
  format.prettyPrint(),
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
