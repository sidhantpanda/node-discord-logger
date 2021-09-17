"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalToHexCode = exports.hexCodeToDecimal = void 0;
const hexCodeToDecimal = (str) => parseInt(str.replace(/^#/, ''), 16);
exports.hexCodeToDecimal = hexCodeToDecimal;
const decimalToHexCode = (decimal) => `#${decimal.toString(16)}`;
exports.decimalToHexCode = decimalToHexCode;
//# sourceMappingURL=utils.js.map