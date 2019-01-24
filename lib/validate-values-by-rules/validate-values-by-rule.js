const validateValueByRule = require('./validate-value-by-rule');

function validateValuesByRule(key, values, rule) {
  let { property } = rule;

  if (rule.type === 'percent') {
    property = property || 'percent';
  }

  const errors = [];
  const reducedValues = values.reduce(
    (memo, value) => validateValueByRule(memo, value, key, property, rule),
    { errors: [], percentTotal: 0 },
  );
  errors.push(...reducedValues.errors);

  if (
    reducedValues.percentTotal !== 0
    && reducedValues.percentTotal !== 100
  ) {
    errors.push(new Error(`percent properties "${property}" in values do not add up to 100 for key "${key}"`));
  }

  return errors;
}

module.exports = validateValuesByRule;
