import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import * as packageJSON from '../../package.json';

export class VersionHealth {
  run = async (req: Request, res: Response): Promise<void> => {
      const version = {
        app: packageJSON.name,
        version: packageJSON.version,
        env: process.env.ENVIRONMENT,
      };
      res.status(httpStatus.OK).send({ ...version })
  };
}
