const isObject = require('lodash.isobject');

function validateItem(item, key) {
  const errors = [];
  if (!isObject(item)) {
    errors.push(new Error(`config item must be object for key "${key}"`));
    return errors;
  }
  if (
    Object.prototype.hasOwnProperty.call(item, 'value')
    && Object.prototype.hasOwnProperty.call(item, 'values')
  ) {
    errors.push(new Error(`config items cannot have both value and values for key "${key}"`));
  }
  if (
    Object.prototype.hasOwnProperty.call(item, 'values')
    && (
      !Array.isArray(item.values)
      || item.values.length === 0
    )
  ) {
    errors.push(new Error(`config item values must be an array with at least one value for key "${key}"`));
  }
  return errors;
}

module.exports = validateItem;
