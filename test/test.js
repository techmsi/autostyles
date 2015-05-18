'use strict';

var chalk = require('chalk');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;

var sampleCss = './css/sample.css';
var autostyles = require('../index');
var StyleGuide = autostyles;

describe('#StyleGuides', function() {
  it('create new guide object', function(done) {
    var styles = new StyleGuide();
    expect(styles).to.be.ok;
    done();
  });


  it('converts css file: ' + chalk.bold.underline.blue(sampleCss) + ' to object', function(done) {
    var styles = new StyleGuide();
    var css = styles.getParsedCss(sampleCss);
    assert.typeOf(css ,'object', 'Parsed Css is an object.');
    done();
  });
});
