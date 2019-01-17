const isObject = require('lodash.isobject');
const isEmpty = require('lodash.isempty');
const validateValuesByRule = require('./validate-values-by-rule');

function validateValuesByRules(rules, item, key) {
  const errors = [];
  const values = isObject(item) && item.values;
  if (
    !Array.isArray(values)
    || isEmpty(values)
    || !Array.isArray(rules)
    || isEmpty(rules)
  ) {
    return errors;
  }
  rules.forEach((rule) => {
    errors.push(...validateValuesByRule(key, values, rule));
  });
  return errors;
}

module.exports = validateValuesByRules;
