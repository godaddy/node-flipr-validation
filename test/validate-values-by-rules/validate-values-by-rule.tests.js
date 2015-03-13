'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var sutPath = '../../lib/validate-values-by-rules/validate-values-by-rule';

chai.use(sinonChai);

var sutProxy;
var lodashMock;
var validateValueByRuleMock;
var reduceResult;

describe('validate-values-by-rule', function(){
  beforeEach(function(){
    reduceResult = {
      errors: [],
      percentTotal: 0
    };
    lodashMock = mockLodash();
    validateValueByRuleMock = 'validateValueByRule';
    sutProxy = proxyquire(sutPath, {
      'lodash': lodashMock,
      './validate-value-by-rule': validateValueByRuleMock
    });
  });

  it('uses "percent" property if rule type is percent and no property is defined', function(){
    sutProxy('somekey', ['somevalue'], {type:'percent'});
    expect(lodashMock.partialRight).to.be.calledWith('validateValueByRule', 'somekey', 'percent', sinon.match.object);
  });
  it('returns error if all values with percent are between 0 and 100 exclusive', function(){
    reduceResult.percentTotal = 5;
    var result = sutProxy('somekey', ['somevalue'], 'somerule');
    expect(result.length).to.equal(1);
  });
  it('returns error if validateValueByRule returns error', function(){
    reduceResult.errors = ['someerror'];
    var result = sutProxy('somekey', ['somevalue'], 'somerule');
    expect(result.length).to.equal(1);
  });
  it('returns empty array if there are no errors', function(){
    var result = sutProxy('somekey', ['somevalue'], 'somerule');
    expect(result).to.be.empty;
  });
});

function mockLodash() {
  return {
    reduce: function(){
      return reduceResult;
    },
    partialRight: sinon.spy()
  };
}