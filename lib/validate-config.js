const isObject = require('lodash.isobject');
const validateRule = require('./validate-rule');
const validateItem = require('./validate-item');
const validateValues = require('./validate-values');
const validateValuesByRules = require('./validate-values-by-rules/validate-values-by-rules');

function validateConfig({ config, rules = [] }) {
  if (!isObject(config) || Object.keys(config).length === 0) {
    throw new Error('options.config must be an object containing flipr config');
  }
  const errors = [];
  rules.forEach((rule) => {
    errors.push(...validateRule(rule));
  });
  Object.keys(config).forEach((key) => {
    errors.push(...validateItem(config[key], key));
    errors.push(...validateValues(config[key], key));
    errors.push(...validateValuesByRules(rules, config[key], key));
  });
  // compact, remove falsey values
  return errors.filter(error => !!error);
}

module.exports = validateConfig;
