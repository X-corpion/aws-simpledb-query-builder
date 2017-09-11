"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const idAttr = 'itemname()';
function wrapAttr(attr) {
    if (!attr) {
        throw new Error('Attribute or domain cannot be empty');
    }
    attr = attr.trim();
    if (attr.toLowerCase() === idAttr) {
        return attr;
    }
    const escapedAttr = attr.replace(/`/g, '``');
    return `\`${escapedAttr}\``;
}
exports.wrapAttr = wrapAttr;
function wrapValue(value) {
    if (value === null || value === undefined) {
        throw new Error('Value cannot be null. Did you mean to use isNull/notNull()?');
    }
    const escapedValue = value.replace(/'/g, '\'\'');
    return `\'${escapedValue}\'`;
}
exports.wrapValue = wrapValue;
//# sourceMappingURL=Helpers.js.map