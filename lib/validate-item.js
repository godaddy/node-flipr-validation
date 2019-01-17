const isObject = require('lodash.isobject');
const isNumber = require('lodash.isnumber');
const isBoolean = require('lodash.isboolean');
const isEmpty = require('lodash.isempty');

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
    Object.prototype.hasOwnProperty.call(item, 'value')
    && !isNumber(item.value)
    && !isBoolean(item.value)
    && isEmpty(item.value)
  ) {
    errors.push(new Error(`config item value must be defined for key "${key}"`));
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
