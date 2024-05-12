
import express from './shared/core/infrastructure/config/server';


const PORT: string = (process.env.PORT_SERVER as string) || '3000';


const server = express.listen(PORT, () => {
  log.info(`Server listening on port ${PORT}!`);
});
