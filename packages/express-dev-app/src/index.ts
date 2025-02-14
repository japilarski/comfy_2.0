import { logger } from '@comfy/logger';
import app from './app';

const port = 5001;

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
