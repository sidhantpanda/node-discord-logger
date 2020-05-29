# Node Discord Logger
Send logs to Discord from your NodeJS application.
[See detailed documentation](https://sidhantpanda.github.io/node-discord-logger/)

### Installation
```
npm i -S node-discord-logger
```

### Initialization
```javascript
import DiscordLogger from 'node-discord-logger';

const logger = new  DiscordLogger({
  hook: 'https://your/discord/webhook',
  icon: 'https://icon/for/service', // optional, will be included as an icon in the footer
  serviceName: 'My NodeJS Service', // optional, will be included as text in the footer
  defaultMeta: {                    // optional, will be added to all the messages
    'Process ID': process.pid,
    Host: os.hostname(),            // import os from 'os';
  },
  errorHandler: err => {            // optional, if you don't want this library to log to console
    console.error('error from discord', err);
  }
});
```

## Usage

* Error Message
```javascript
logger.error({
  message: 'This is an error message',
  error: new Error('sample error') // This field can be included in other log functions as well
});
```
![error message example](https://raw.githubusercontent.com/sidhantpanda/public/master/img/projects/node-discord-logger/error-message.png)

* Warning Message
```javascript
logger.warn({ message: 'This is warning message' });
```
![warning message example](https://raw.githubusercontent.com/sidhantpanda/public/master/img/projects/node-discord-logger/warning-message.png)

* Debug Message
```javascript
logger.debug({
  message: 'This is a debug message',
  json: { debug: 'data' } // This field can be included in other log functions as well
});
```
![debug message example](https://raw.githubusercontent.com/sidhantpanda/public/master/img/projects/node-discord-logger/debug-message.png)

* <a name="usage_example_info_message"></a>Info Message
```javascript
logger.info({
  message: 'This is a info message',
  description: 'Some additional description' // This field can be included in other log functions as well
});
```
![info message example](https://raw.githubusercontent.com/sidhantpanda/public/master/img/projects/node-discord-logger/info-message.png)

* Verbose Message
```javascript
logger.verbose({ message: 'This is a verbose message' });
```
![verbose message example](https://raw.githubusercontent.com/sidhantpanda/public/master/img/projects/node-discord-logger/verbose-message.png)

* Silly Message
```javascript
logger.silly({ message: 'This is a silly message' });
```
![silly message example](https://raw.githubusercontent.com/sidhantpanda/public/master/img/projects/node-discord-logger/silly-message.png)

### LogMessage 
| Field  | Type  | Description  | Required |
|---|---|---|---|
| message  | string  | Main log message   |  **yes**  |
| description  |  string  | Log message description  | no  |
| error  |  Error  | Error object to be logged with the message  | no  |
| meta  |  `{ [key: string]: string \| number \| Date }`  | Meta details for log message  | no  |
| json  |  `any` (Valid JSON object) | Additional JSON to be logged in discord message  | no  |
---

## Changelog

### v1.1.0
* Added `description` field in log message. [See usage](#usage_example_info_message).
