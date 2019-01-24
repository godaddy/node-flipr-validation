const validateConfig = require('./validate-config');

const badValidation1 = {
  rules: [
    {
      type: 'notARealType',
      input: null,
      property: null,
    }, {
      type: 'percent',
      input: 'userId',
    }, {

    }, {
      type: 'equal',
      input: 'a',
      property: 'someRule',
    }, {
      type: 'list',
      input: 'a',
      property: 'someRule2',
    },
  ],
  config: {
    valueAndValuesTogether: {
      value: 'somevalue',
      values: [{ value: 'hi' }],
    },
    valuesNotAnArray: {
      values: 'notarray',
    },
    emptyValues: {
      values: [],
    },
    valueUndefined: {
      value: undefined,
    },
    invalidPercentKey: {
      values: [
        { value: 'hi', percent: 50 },
      ],
    },
    valuesWithoutValue: {
      values: [{ notvalue: 'notvalue' }],
    },
    notAnObject: 'asdf',
    valuesNotObjects: {
      values: ['notAnObject'],
    },
    valuesWithEmptyValue: {
      values: [{ value: '' }],
    },
    valuesWithoutRule: {
      values: [
        { value: 'someValue', otherRule: 'asdf' },
        { value: 'someValue' },
      ],
    },
    valuesWithUndefinedRuleProp: {
      values: [
        { value: 'someValue', someRule: undefined },
        { value: 'someValue' },
      ],
    },
    valuesWithBadRuleProp: {
      values: [
        { value: 'someValue', someRule: () => {} },
        { value: 'someValue' },
      ],
    },
    valuesWithBadList: {
      values: [
        { value: 'someValue', someRule2: 'not an array' },
        { value: 'someValue' },
      ],
    },
    valuesWithBadListItems: {
      values: [
        { value: 'someValue', someRule2: [null] },
        { value: 'someValue' },
      ],
    },
    valuesWithBadPercent: {
      values: [
        { value: 'someValue', percent: null },
        { value: 'someValue', percent: 50 },
        { value: 'someValue', percent: 50 },
      ],
    },
  },
};

const goodValidation = {
  rules: [
    {
      type: 'percent',
      input: 'someProperty',
    },
    {
      type: 'equal',
      input: 'blah',
      property: 'someRule',
    },
    {
      type: 'list',
      input: 'blah',
      property: 'someRule2',
    },
  ],
  config: {
    someKey: {
      values: [
        { value: 1, percent: 50 },
        { value: 2, percent: 50 },
      ],
    },
    someKey2: {
      values: [
        { value: 1, someRule: 'asdf' },
        { value: 2 },
      ],
    },
    someKey3: {
      values: [
        { value: 1, someRule2: ['asdf'] },
        { value: 2 },
      ],
    },
  },
};

it('throws when options.config is not an object', () => {
  expect(() => validateConfig()).toThrow();
});

it('throws when options.config is an empty object', () => {
  expect(() => validateConfig({ config: {} })).toThrow();
});

it('returns errors in an array for invalid config 1', () => {
  expect(validateConfig(badValidation1)).toEqual([
    new Error('rule.type must be one of the following: equal, list, percent'),
    new Error('rule.input must be a function or a string'),
    new Error('rule must have a type property'),
    new Error('rule must have an input property'),
    new Error('rule.property must exist for all types except "percent"'),
    new Error('config items cannot have both value and values for key "valueAndValuesTogether"'),
    new Error('config item values must be an array with at least one value for key "valuesNotAnArray"'),
    new Error('config item values must be an array with at least one value for key "emptyValues"'),
    new Error('percent properties "percent" in values do not add up to 100 for key "invalidPercentKey"'),
    new Error('items inside values must have a value property for key "valuesWithoutValue"'),
    new Error('config item must be object for key "notAnObject"'),
    new Error('items inside values must be objects for key "valuesNotObjects"'),
    new Error('property "someRule" is undefined for key "valuesWithUndefinedRuleProp"'),
    new Error('equal property "someRule" must be a string, number, or boolean for key "valuesWithBadRuleProp"'),
    new Error('list property "someRule2" must be an array for key "valuesWithBadList"'),
    new Error('values in list property "someRule2" must be a string, number, or boolean for key "valuesWithBadListItems"'),
    new Error('percent property "percent" must be a number between 0 and 100 inclusive for key "valuesWithBadPercent"'),
  ]);
});

it('returns empty array for valid config', () => {
  expect(validateConfig(goodValidation)).toEqual([]);
});
