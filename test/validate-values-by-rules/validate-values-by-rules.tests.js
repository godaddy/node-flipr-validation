'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var sutPath = '../../lib/validate-values-by-rules/validate-values-by-rules';

chai.use(sinonChai);

var validateValuesByRuleMock = sinon.stub().returns('somearray');
var sutProxy = proxyquire(sutPath, {
	'./validate-values-by-rule': validateValuesByRuleMock
});

describe('validate-values-by-rules', function(){
  it('returns undefined if item is not an object', function(){
    var result = sutProxy('somerules', 'notobject', 'somekey');
    expect(result).to.be.undefined;
  });
  it('returns undefined if item.values is not an array', function(){
    var result = sutProxy('somerules', {values:'notarray'}, 'somekey');
    expect(result).to.be.undefined;
  });
  it('returns undefined if rules is not an array', function(){
    var result = sutProxy('notarray', {values:[]}, 'somekey');
    expect(result).to.be.undefined;
  });
  it('returns undefined if item.values is empty', function(){
    var result = sutProxy('somerules', {values:[]}, 'somekey');
    expect(result).to.be.undefined;
  });
  it('returns undefined if rules is empty', function(){
    var result = sutProxy([], {values:['notempty']}, 'somekey');
    expect(result).to.be.undefined;
  });
	it('maps rules to validateValuesByRule and returns result', function(){
		var result = sutProxy(['somerule'], {values:['somevalues']}, 'somekey');
		expect(validateValuesByRuleMock).to.be.calledWithMatch('somekey', ['somevalues'], 'somerule');
    expect(result).to.deep.equal(['somearray']);
	});
});