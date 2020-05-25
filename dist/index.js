"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
/** Available colors for discord messages */
const COLORS = {
    /** Decimal for #db2828 */
    error: 14362664,
    /** Decimal for #fbbd08 */
    warn: 16497928,
    /** Decimal for #2185d0 */
    info: 2196944,
    /** Decimal for #6435c9 */
    verbose: 6559689,
    /** Decimal for #00ba4e */
    debug: 47694,
    /** Decimal for #f542dd */
    silly: 16073437
};
class DiscordLogger {
    /**
     * Create a discord logger instance
     * @param options Discord logger options
     */
    constructor(options) {
        /** Service icon url */
        this.icon = undefined;
        /** Service name */
        this.serviceName = undefined;
        /** Discord webhook id */
        this.id = undefined;
        /** Discord webhook token */
        this.token = undefined;
        /** Error callback provided to prevent console logging here */
        this.onErrorCallback = undefined;
        this.logInternalError = (err) => {
            if (this.onErrorCallback) {
                this.onErrorCallback(err);
            }
            else {
                console.error(err); // eslint-disable-line
            }
        };
        this.getIdToken = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.id || !this.token) {
                try {
                    const response = yield superagent_1.default
                        .get(this.hook)
                        .set('accept', 'json');
                    this.id = response.body.id;
                    this.token = response.body.token;
                }
                catch (err) {
                    this.logInternalError(err);
                }
            }
            return {
                id: this.id || '',
                token: this.token || ''
            };
        });
        this.getUrl = () => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = yield this.getIdToken();
            return `https://discordapp.com/api/v6/webhooks/${id}/${token}`;
        });
        /**
         * Send a log message to discord
         * @param level Message log level
         * @param data Log message data
         */
        this.log = (level, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                // https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html
                const postBody = {
                    content: undefined,
                    embeds: [{
                            title: data.message,
                            description: data.description,
                            color: COLORS[level],
                            fields: [],
                            timestamp: new Date().toISOString(),
                            footer: {
                                text: this.serviceName,
                                icon_url: this.icon
                            }
                        }]
                };
                const contentStrings = [];
                if (data.json) {
                    contentStrings.push(JSON.stringify(data.json, undefined, '  '));
                }
                if (data.error && data.error.stack) {
                    contentStrings.push(data.error.stack);
                }
                if (contentStrings.length > 0) {
                    postBody.content = `\`\`\`${contentStrings.join('\n\n')}\`\`\``;
                }
                if (data.meta) {
                    Object.keys(data.meta).forEach(key => {
                        postBody.embeds[0].fields.push({
                            name: key,
                            value: data.meta[key]
                        });
                    });
                }
                if (this.defaultMeta) {
                    Object.keys(this.defaultMeta).forEach(key => {
                        postBody.embeds[0].fields.push({
                            name: key,
                            value: this.defaultMeta[key],
                            inline: true
                        });
                    });
                }
                const options = {
                    url: yield this.getUrl(),
                    body: postBody
                };
                yield superagent_1.default
                    .post(options.url)
                    .send(options.body)
                    .set('accept', 'json');
            }
            catch (err) {
                this.logInternalError(err);
            }
        });
        /**
         * Send an error log message to discord
         * @param data Log message data
         */
        this.error = (data) => __awaiter(this, void 0, void 0, function* () { return this.log('error', data); });
        /**
         * Send a warning log message to discord
         * @param data Log message data
         */
        this.warn = (data) => __awaiter(this, void 0, void 0, function* () { return this.log('warn', data); });
        /**
         * Send an info log message to discord
         * @param data Log message data
         */
        this.info = (data) => __awaiter(this, void 0, void 0, function* () { return this.log('info', data); });
        /**
         * Send a verbose log message to discord
         * @param data Log message data
         */
        this.verbose = (data) => __awaiter(this, void 0, void 0, function* () { return this.log('verbose', data); });
        /**
         * Send a debug log message to discord
         * @param data Log message data
         */
        this.debug = (data) => __awaiter(this, void 0, void 0, function* () { return this.log('debug', data); });
        /**
         * Send a silly log message to discord
         * @param data Log message data
         */
        this.silly = (data) => __awaiter(this, void 0, void 0, function* () { return this.log('silly', data); });
        this.hook = options.hook;
        this.icon = options.icon;
        this.serviceName = options.serviceName;
        this.defaultMeta = options.defaultMeta;
        this.onErrorCallback = options.errorHandler;
        this.getIdToken(); // Initialize `id` and `token` values
    }
}
exports.default = DiscordLogger;
//# sourceMappingURL=index.js.map