require('dotenv').config();
import DiscordLogger from './index';
import os from 'os';

const logger = new DiscordLogger({
  hook: process.env.HOOK,
  icon: process.env.ICON_URL,
  serviceName: process.env.SERVICE_NAME,
  defaultMeta: {
    'Process ID': process.pid,
    Host: os.hostname(),
  },
  errorHandler: err => {
    console.error('error from discord', err);
  }
});

const sendMessages = async () => {
  await logger.error({ message: 'This is an error message', error: new Error('sample error') });
  await logger.warn({ message: 'This is a warning message' });
  await logger.debug({ message: 'This is a debug message', json: { debug: 'data' } });
  await logger.info({ message: 'This is an info message' });
  await logger.verbose({ message: 'This is a verbose message' });
  await logger.silly({ message: 'This is a silly message' });
}

sendMessages();
