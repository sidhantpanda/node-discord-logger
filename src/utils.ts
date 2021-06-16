export const hexCodeToDecimal = (str: string) => parseInt(str.replace(/^#/, ''), 16);

export const decimalToHexCode = (decimal: number) => `#${decimal.toString(16)}`;
