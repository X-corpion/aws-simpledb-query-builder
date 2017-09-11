const idAttr = 'itemname()';

function wrapAttr(attr: string): string {
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

function wrapValue(value: string): string {
  if (value === null || value === undefined) {
    throw new Error('Value cannot be null. Did you mean to use isNull/notNull()?');
  }
  const escapedValue = value.replace(/'/g, '\'\'');
  return `\'${escapedValue}\'`;
}

export {
  wrapAttr,
  wrapValue
};
