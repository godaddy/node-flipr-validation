'use strict';

var fliprValidation = require('../lib/validate-config');

console.log('Result from an invalid config');

var errors = fliprValidation({
  rules: [{
    type: 'notARealType',
    input: null,
    property: null
  }, {
    type: 'percent',
    input: 'userId'
  }],
  config: {
    valueAndValuesTogether: {
      value: 'somevalue',
      values: [{value:'hi'}]
    },
    valuesNotAnArray: {
      values: 'notarray'
    },
    emptyValues: {
      values: []
    },
    valueUndefined: {
      value: void(0)
    },
    invalidPercentKey: {
      values: [
        {value: 'hi', percent: 50}
      ]
    },
    valuesWithoutValue: {
      values: [{notvalue: 'notvalue'}]
    }
  }
});

console.dir(errors);