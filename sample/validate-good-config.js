const fliprValidation = require('../lib/validate-config');

console.log('Result from a valid config');

const noErrors = fliprValidation({
  rules: [{
    type: 'percent',
    input: 'someProperty'
  }],
  config: {
    someKey: {
      values: [
        { value: 1, percent: 50 },
        { value: 2, percent: 50}
      ]
    }
  }
});

console.dir(noErrors);
