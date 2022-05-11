require('dotenv').config(); /* eslint-disable-line */
import DiscordLogger from './index'; /* eslint-disable-line */
import os from 'os'; /* eslint-disable-line */

const logger = new DiscordLogger({
  hook: process.env.HOOK,
  icon: process.env.ICON_URL,
  serviceName: process.env.SERVICE_NAME,
  defaultUsername: process.env.USERNAME,
  defaultMeta: {
    'Process ID': process.pid,
    Host: os.hostname()
  },
  errorHandler: err => {
    console.error('error from discord', err); /* eslint-disable-line */
  }
});

const sendMessages = async () => {
  await logger.error({
    message: 'This is an error message',
    error: new Error('sample error')
  });
  await logger.warn({ message: 'This is a warning message' });
  await logger.debug({
    message: 'This is a debug message',
    json: { debug: 'data' }
  });
  await logger.info({ message: 'This is an info message' });
  await logger.verbose({ message: 'This is a verbose message' });
  await logger.info({
    message: 'This is an info message',
    description: 'Some additional description'
  });
  await logger.silly({ message: 'This is a silly message' });
};

sendMessages();
