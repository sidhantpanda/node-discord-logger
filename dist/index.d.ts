declare type LOG_LEVELS = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
interface LogMessage {
    /** Message content */
    message: string;
    /** Message description */
    description?: string;
    /** Error object if any */
    error?: Error;
    /** Additional JSON data for the message */
    json?: any;
    /** Additional meta data for the message */
    meta?: {
        [key: string]: string | number | Date;
    };
}
export interface DiscordLoggerOptions {
    /** Discord Bot webhook */
    hook: string;
    /** An icon which will be displayed for all message in the footer */
    icon?: string;
    /** Service name which will be printed in the footer */
    serviceName?: string;
    /** Default meta to be sent with every request */
    defaultMeta?: {
        [key: string]: string | number | Date;
    };
    /** Error callback to be called instead of logging errors to console */
    errorHandler?: {
        (err: Error): void;
    };
}
export default class DiscordLogger {
    /** Discord webhook */
    private hook;
    /** Default meta to be sent with every message */
    private defaultMeta;
    /** Service icon url */
    private icon;
    /** Service name */
    private serviceName;
    /** Discord webhook id */
    private id;
    /** Discord webhook token */
    private token;
    /** Error callback provided to prevent console logging here */
    private onErrorCallback;
    /**
     * Create a discord logger instance
     * @param options Discord logger options
     */
    constructor(options: DiscordLoggerOptions);
    private logInternalError;
    private getIdToken;
    private getUrl;
    /**
     * Send a log message to discord
     * @param level Message log level
     * @param data Log message data
     */
    log: (level: LOG_LEVELS, data: LogMessage) => Promise<void>;
    /**
     * Send an error log message to discord
     * @param data Log message data
     */
    error: (data: LogMessage) => Promise<void>;
    /**
     * Send a warning log message to discord
     * @param data Log message data
     */
    warn: (data: LogMessage) => Promise<void>;
    /**
     * Send an info log message to discord
     * @param data Log message data
     */
    info: (data: LogMessage) => Promise<void>;
    /**
     * Send a verbose log message to discord
     * @param data Log message data
     */
    verbose: (data: LogMessage) => Promise<void>;
    /**
     * Send a debug log message to discord
     * @param data Log message data
     */
    debug: (data: LogMessage) => Promise<void>;
    /**
     * Send a silly log message to discord
     * @param data Log message data
     */
    silly: (data: LogMessage) => Promise<void>;
}
export {};
