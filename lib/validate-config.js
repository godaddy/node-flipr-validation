'use strict';

var _ = require('lodash');
var validateRule = require('./validate-rule');
var validateItem = require('./validate-item');
var validateValues = require('./validate-values');
var validateValuesByRules = require('./validate-values-by-rules/validate-values-by-rules');

module.exports = validateConfig;

function validateConfig(options) {
  if(!_.isObject(options.config) || Object.keys(options.config).length === 0)
    throw new Error('validateConfig: options.config must be an object storing flipr config');

  if(!_.isArray(options.rules))
    options.rules = [];

  var errors = [];
  var config = options.config;
  var rules = options.rules;

  errors.push(_.map(rules, validateRule));
  errors.push(_.map(config, function(item, key) {
    var configErrors = [];
    configErrors.push(validateItem(item, key));
    configErrors.push(validateValues(item, key));
    configErrors.push(validateValuesByRules(rules, item, key));
    return configErrors;
  }));

  return  _(errors).flatten(true).compact().value();
}
