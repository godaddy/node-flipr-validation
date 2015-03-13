'use strict';

var util = require('util');
var _ = require('lodash');

module.exports = validateValues;

function validateValues(item, key){
  var values = item && item.values;
  if(!_.isArray(values))
    return [];

  return _.reduce(values, function(errorAccumulator, value){
    if(!_.isObject(value))
      errorAccumulator.push(new Error(util.format('items inside values must be objects for key "%s"', key)));
    else if(!value.hasOwnProperty('value'))
      errorAccumulator.push(new Error(util.format('items inside values must have a value property for key "%s"', key)));
    else if(_.isUndefined(value.value))
      errorAccumulator.push(new Error(util.format('value property must be set for items inside values for key "%s"', key)));
    return errorAccumulator;
  }, []);
}