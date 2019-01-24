const isObject = require('lodash.isobject');
const isNumber = require('lodash.isnumber');
const isBoolean = require('lodash.isboolean');
const isString = require('lodash.isstring');

// This is used in a reduce handler.  Accumulator should have two properties,
// errors (array) and percentTotal (number)
function validateValueByRule(accumulator, value, key, property, rule) {
  // If value is not an object, we can't validate it by the rule.
  // A previous validator will have reported this error.
  if (!isObject(value)) {
    return accumulator;
  }

  // property does not exist on value, this is valid
  if (!Object.prototype.hasOwnProperty.call(value, property)) {
    return accumulator;
  }

  const propertyValue = value[property];
  if (propertyValue === undefined) {
    accumulator.errors.push(new Error(`property "${property}" is undefined for key "${key}"`));
    return accumulator;
  }

  switch (rule.type) {
    case 'equal':
      if (
        !isString(propertyValue)
        && !isNumber(propertyValue)
        && !isBoolean(propertyValue)
      ) {
        accumulator.errors.push(new Error(`equal property "${property}" must be a string, number, or boolean for key "${key}"`));
      }
      break;
    case 'list':
      if (!Array.isArray(propertyValue)) {
        accumulator.errors.push(new Error(`list property "${property}" must be an array for key "${key}"`));
        return accumulator;
      }
      propertyValue.forEach((listValue) => {
        if (
          !isString(listValue)
          && !isNumber(listValue)
          && !isBoolean(listValue)
        ) {
          accumulator.errors.push(new Error(`values in list property "${property}" must be a string, number, or boolean for key "${key}"`));
        }
      });
      break;
    case 'percent':
      if (
        !isNumber(propertyValue)
        || propertyValue > 100
        || propertyValue < 0
      ) {
        accumulator.errors.push(new Error(`percent property "${property}" must be a number between 0 and 100 inclusive for key "${key}"`));
      } else {
        accumulator.percentTotal += propertyValue;
      }
      break;
    /* eslint default-case: 0 */
  }

  return accumulator;
}

module.exports = validateValueByRule;
