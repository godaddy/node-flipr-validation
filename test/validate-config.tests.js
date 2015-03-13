'use strict';

var chai = require('chai');
var expect = chai.expect;
var sut = require('../lib/validate-config');

var goodConfig = {
  config: {
    key1: {value: 'somevalue'},
    key2: {values: [{value:'somevalue'}]} 
  }
};

var badConfigTwoErrors = {
  config: {
    key1: {value: void(0)},
    key2: {values: [{notvalue:'notvalue'}]} 
  }
};

var goodConfigWithRule = {
  config: {
    key1: {
      values: [
        {value:'somevalue', percent: 50}, 
        {value:'othervalue', percent: 50}
      ]
    },
  },
  rules: [
    {type:'percent', input:'someProp'}
  ]
};

var goodConfigWithBadRuleOneError = {
  config: {
    key1: {
      values: [
        {value:'somevalue', percent: 50}, 
        {value:'othervalue', percent: 50}
      ]
    },
  },
  rules: [
    {type:'percent'}
  ]
};

var badConfigWithRuleOneError = {
  config: {
    key1: {
      values: [
        {value:'somevalue', percent: 50}, 
        {value:'othervalue', percent: 40}
      ]
    },
  },
  rules: [
    {type:'percent', input:'someProp'}
  ]
};

describe('validate-config', function(){
  it('throws error if options.config is not an object', function(){
    expect(function(){
      sut({config:'notobject'});
    }).to.throw(Error);
  });
  it('throws error if options.config has no properties', function(){
    expect(function(){
      sut({config:{}});
    }).to.throw(Error);
  });
  it('returns empty array with good config', function(){
    var result = sut(goodConfig);
    expect(result).to.be.empty;
  });
  it('returns empty array with good config with rule', function(){
    var result = sut(goodConfigWithRule);
    expect(result).to.be.empty;
  });
  it('returns errors array with bad config', function(){
    var result = sut(badConfigTwoErrors);
    expect(result.length).to.equal(2);
  });
  it('returns errors array with good config bad rule', function(){
    var result = sut(goodConfigWithBadRuleOneError);
    expect(result.length).to.equal(1);
  });
  it('returns errors array with bad config good rule', function(){
    var result = sut(badConfigWithRuleOneError);
    expect(result.length).to.equal(1);
  });
});