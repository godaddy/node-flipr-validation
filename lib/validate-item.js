'use strict';

var util = require('util');
var _ = require('lodash');

module.exports = validateItem;

function validateItem(item, key){
  var errors = [];
  if(!_.isObject(item)) {
    errors.push(new Error(util.format('config item must be object for key "%s".', key)));
    return errors;
  }
  if(item.hasOwnProperty('value') && item.hasOwnProperty('values'))
    errors.push(new Error(util.format('config items cannot have both value and values for key "%s"', key)));
  if(item.hasOwnProperty('value') && _.isEmpty(item.value))
    errors.push(new Error(util.format('config item value must be defined for key "%s"', key)));
  if(item.hasOwnProperty('values') && (!_.isArray(item.values) || item.values.length === 0))
    errors.push(new Error(util.format('config item values must be an array with at least one value for key "%s"', key)));
  return errors;
}