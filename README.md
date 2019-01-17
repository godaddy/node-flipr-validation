# node-flipr-validation

[![NPM](https://nodei.co/npm/flipr-validation.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/flipr-validation/)

[![Build Status](https://travis-ci.org/godaddy/node-flipr-validation.svg)](https://travis-ci.org/godaddy/node-flipr-validation)

This project is part of the [flipr family](https://github.com/godaddy/node-flipr).

node-flipr-validation provides validation for flipr config data and rules.  You should use it to catch bad config changes before they are deployed.  Bad config deployments make flipr very [unhappy](http://i.imgur.com/GIBD0X4.gif).

![node-flipr-validation](/flipr.png?raw=true "node-flipr-validation")

#Usage
```javascript
const fliprValidation = require('flipr-validation');
const errors = fliprValidation({
  config: myConfigObject,
  rules: myRulesArray
});
```
The errors array returned by fliprValidation will be empty if there are no validation errors.  If there are validation errors, the errors array will contain one or more Error objects.

## Flipr Validation Options
* `config` - _required_ - object: This is the config object you want to validate.
* `rules` - _optional_ - array: The array of rules you will use against this config.  If you have rules but don't provide them, some of the validation will be skipped.  It's a good idea to pass the rules if you have them.

# Would you like to know [more](http://i.imgur.com/IOvYPfT.jpg)?
* [Validating a good config](sample/validate-good-config.js)
* [Validating a bad config](sample/validate-bad-config.js)
