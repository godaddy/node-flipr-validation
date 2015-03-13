'use strict';

var _ = require('lodash');
var validateValuesByRule = require('./validate-values-by-rule');

module.exports = validateValuesByRules;

function validateValuesByRules(rules, item, key) {
  var values = _.isObject(item) && item.values;
  if(!_.isArray(values) || _.isEmpty(values) || !_.isArray(rules) || _.isEmpty(rules))
    return;
  return _.map(rules, _.partial(validateValuesByRule, key, values));
}