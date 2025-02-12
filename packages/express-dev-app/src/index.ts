import { logger } from '@comfy/logger';
import app from './app';

const port = 3000;

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
