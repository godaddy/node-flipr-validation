const isObject = require('lodash.isobject');

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
    }
    return errors;
  }, []);
}

module.exports = validateValues;
