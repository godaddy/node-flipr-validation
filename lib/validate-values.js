const isNumber = require('lodash.isnumber');
const isObject = require('lodash.isobject');
const isBoolean = require('lodash.isboolean');
const isEmpty = require('lodash.isempty');

function validateValues(item, key) {
  const values = item && item.values;
  if (!Array.isArray(values)) {
    return [];
  }
  return values.reduce((errors, value) => {
    if (!isObject(value)) {
      errors.push(new Error(`items inside values must be objects for key "${key}"`));
    } else if (!Object.prototype.hasOwnProperty.call(value, 'value')) {
      errors.push(new Error(`items inside values must have a value property for key "${key}"`));
    } else if (
      !isNumber(value.value)
      && !isBoolean(value.value)
      && isEmpty(value.value)
    ) {
      errors.push(new Error(`value property must be set for items inside values for key "${key}"`));
    }
    return errors;
  }, []);
}

module.exports = validateValues;
