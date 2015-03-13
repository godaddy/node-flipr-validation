'use strict';

var chai = require('chai');
var expect = chai.expect;
var sutPath = '../lib/validate-item';
var sut = require(sutPath);

describe('validate-item', function(){
  it('returns error if the config item is not an object', function(){
    var result = sut('notobject', 'somekey');
    expect(result.length).to.equal(1);
  });
  it('returns error if item has both value and values properties', function(){
    var result = sut({value: 'somevalue', values: [{value:'somevalue'}]}, 'somekey');
    expect(result.length).to.equal(1);
  });
  it('returns error if values is an empty array', function(){
    var result = sut({values:[]}, 'somekey');
    expect(result.length).to.equal(1);
  });
  it('returns error if the value of value is undefined', function(){
    var result = sut({value: void(0)}, 'somekey');
    expect(result.length).to.equal(1);
  });
  it('returns error if the value of value is null', function(){
    var result = sut({value: null}, 'somekey');
    expect(result.length).to.equal(1);
  });
  it('returns empty array for valid config item', function(){
    var result = sut({value: 'test value'}, 'somekey');
    expect(result).to.be.empty;
  });
});