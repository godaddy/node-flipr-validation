'use strict';

var chai = require('chai');
var expect = chai.expect;
var sut = require('../lib/validate-rule');
var rule;

describe('validate-rule', function(){
  beforeEach(function(){
    rule = {
      type: 'equal',
      input: 'someId',
      property: 'someProperty'
    };
  });

  it('returns empty array for valid input', function(){
    var result = sut(rule);
    expect(result).to.be.empty;
  });
  it('returns error if the rule does not have a type property', function(){
    delete rule.type;
    var result = sut(rule);
    expect(result.length).to.equal(1);
  });
  it('returns error if the rules does not have a valid type property', function(){
    rule.type = 'notvalid';
    var result = sut(rule);
    expect(result.length).to.equal(1);
  });
  it('returns error if the rule does not have an input property', function(){
    delete rule.input;
    var result = sut(rule);
    expect(result.length).to.be.equal(1);
  });
  it('returns error if input is not a string or function', function(){
    rule.input = {};
    var result = sut(rule);
    expect(result.length).to.be.equal(1);
  });
  it('returns error if rule type is not percent and does not have property property', function(){
    rule.type = 'equal';
    delete rule.property;
    var result = sut(rule);
    expect(result.length).to.be.equal(1);
  });
});
