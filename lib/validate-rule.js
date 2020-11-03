const isString = require('lodash.isstring');
const isFunction = require('lodash.isfunction');

const validRuleTypes = [
  'equal', 'list', 'percent', 'pathEqual',
  'includes', 'includesListAll', 'includesListAny',
];

function validateRule(rule) {
  const errors = [];
  if (!Object.prototype.hasOwnProperty.call(rule, 'type')) {
    errors.push(new Error('rule must have a type property'));
  } else if (!validRuleTypes.includes(rule.type)) {
    errors.push(new Error('rule.type must be one of the following: equal, list, percent'));
  }
  if (!Object.prototype.hasOwnProperty.call(rule, 'input')) {
    errors.push(new Error('rule must have an input property'));
  } else if (
    !isFunction(rule.input)
    && !isString(rule.input)
  ) {
    errors.push(new Error('rule.input must be a function or a string'));
  }
  if (
    rule.type !== 'percent'
    && !Object.prototype.hasOwnProperty.call(rule, 'property')
  ) {
    errors.push(new Error('rule.property must exist for all types except "percent"'));
  }
  return errors;
}

module.exports = validateRule;
