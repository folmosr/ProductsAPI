import { v4 as uuidv4 } from 'uuid';
import { createLogger, format, Logger, transports } from 'winston';

declare global {
  type Log = Logger;
  const log: Log;
  namespace NodeJS {
    interface Global {
      log: Log;
    }
  }
}

export class WinstonLogger {
  private readonly log: Logger;
  private readonly privns: any;

  constructor() {
    const { combine, json, timestamp } = format;
    const logLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info';
    let customFormat = combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      json(),
    );

    this.log = createLogger({
      defaultMeta: {
        'uniqueId': uuidv4(),
        'system': process.env.SYSTEM,
        'country': process.env.COUNTRY,
        'service': process.env.SERVICE,
        'environment': process.env.NODE_ENV,
        'appVersion': process.env.VERSION,
      },
      transports: [
        new transports.Console({
          format: customFormat,
          level: logLevel,
        }),
      ],
    });
  }

  initializer = (): Logger => (global.log = this.log);
}
