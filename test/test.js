'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;

var autostyles = require('../index');
var createGuide = autostyles;

describe('#createGuides', function() {
  it('converts css', function(done) {
    createGuide().should.equal(true);
    done();
  });
});
