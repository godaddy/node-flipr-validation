'use strict';

var chai = require('chai');
var expect = chai.expect;
var sut = require('../lib/validate-values');

describe('validate-values', function(){
  it('returns empty array if values object is not an array', function(){
    var result = sut({values:'notarray'}, 'testKey');
    expect(result).to.be.empty;
  });
  it('returns error if values item is not an object', function(){
    var result = sut({values: ['notobject']}, 'testKey');
    expect(result.length).to.equal(1);
  });
  it('returns error if value property is missing from values item', function(){
    var result = sut({values: [{notvalue: 123 }]}, 'testKey');
    expect(result.length).to.equal(1);
  });
  it('returns error if value property exists on values item but is undefined', function(){
    var result = sut({values: [{value: void(0)}]}, 'testKey');
    expect(result.length).to.equal(1);
  });
  it('returns empty array if values are valid', function(){
    var result = sut({values:[{value: 123 }]}, 'testKey');
    expect(result).to.be.empty;
  });
});